"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ensureGsap, hasFinePointer, prefersReducedMotion } from "@/lib/gsap";
import { useScopePointer } from "@/lib/pointer";

/**
 * Sections the band spans, in document order. The ramp and the
 * intensity scrub both key off these, so the ids are the contract.
 */
const SECTION_IDS = ["work", "arsenal", "beyond"] as const;

/** Which tonal step each section sits on. */
const SECTION_TONE = ["var(--surface-1)", "var(--surface-2)", "var(--surface-1)"];

/** Cap on simultaneously lit cells. */
const MAX_LIT = 40;
/** Per-frame alpha decay at 60fps — a cell fades out in about 0.7s. */
const DECAY = 0.9;
/** Below this a cell is cleared and dropped from the active set. */
const FLOOR = 0.012;

/**
 * Relative grid intensity per section, from the brief. These are ratios
 * applied to the layer's own opacity — not absolute opacities — so the
 * grid never disappears and the copy never has to fight it.
 */
const SECTION_STRENGTH = [1, 0.8, 0.55];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Decorative perspective grid behind Selected Projects, Technical
 * Arsenal and Beyond the Code.
 *
 * The layer is inert and paints below every section (z-0). The grid lines
 * are CSS gradients; the plane is one 3D-transformed stage, and the trail
 * canvas lives *inside* that stage. That is deliberate: the canvas is
 * painted in the stage's own untransformed coordinates and the browser
 * applies the identical projection to it, so the light can never drift
 * out of register with the lines. The alternative — a screen-space canvas
 * re-deriving the projection by hand — is exactly the kind of thing that
 * looks aligned until the tilt changes.
 *
 * Client Component because the tonal ramp is measured (Arsenal alone is
 * 1692px tall at 1440 and 3102px at 390) and the pointer layers need a
 * browser.
 */
export default function AtlasGrid() {
  const layerRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /**
   * Pointer work is opt-in: a fine pointer must exist and reduced motion
   * must be off. Both are read after mount, never during render, so the
   * server HTML and the first client render always agree.
   */
  const [pointerOn, setPointerOn] = useState(false);
  const [inView, setInView] = useState(false);
  /** The grid cell size changes at the 768px breakpoint, so the cell
   *  buffer has to be rebuilt when it flips. */
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    setPointerOn(hasFinePointer() && !prefersReducedMotion());

    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // The spotlight and the trail both stop while the band is off screen.
  // Without this the rAF loop would keep ticking through the whole hero.
  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "240px 0px" },
    );
    observer.observe(layer);
    return () => observer.disconnect();
  }, []);

  useScopePointer(fadeRef, pointerOn && inView);

  /* ---------------------------------------------------------------- */
  /* Tonal ramp                                                       */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    const layer = layerRef.current;
    const band = layer?.parentElement;
    if (!layer || !band) return;

    const sections = SECTION_IDS.map((id) => document.getElementById(id));
    if (sections.some((section) => section === null)) return;

    const paintRamp = () => {
      const total = band.offsetHeight;
      if (total === 0) return;

      const stops = (sections as HTMLElement[]).flatMap((section, index) => {
        const start = (section.offsetTop / total) * 100;
        const end = ((section.offsetTop + section.offsetHeight) / total) * 100;
        const tone = SECTION_TONE[index];
        return [`${tone} ${start.toFixed(3)}%`, `${tone} ${end.toFixed(3)}%`];
      });

      band.style.setProperty(
        "--atlas-ramp",
        `linear-gradient(to bottom, ${stops.join(", ")})`,
      );
    };

    paintRamp();

    // Section heights move with the breakpoint, with webfont loading, and
    // when a project card gains its screenshot. One observer covers all three.
    const observer = new ResizeObserver(paintRamp);
    observer.observe(band);

    return () => {
      observer.disconnect();
      band.style.removeProperty("--atlas-ramp");
    };
  }, []);

  /* ---------------------------------------------------------------- */
  /* Light trail                                                      */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    if (!pointerOn || !inView) return;

    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const fade = fadeRef.current;
    if (!stage || !canvas || !fade) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Read the transform straight off the stylesheet instead of duplicating
    // the numbers here. If the tilt or scale is retuned in globals.css the
    // pointer mapping follows without a second edit.
    const cs = getComputedStyle(stage);
    const cell = parseFloat(cs.getPropertyValue("--grid-cell")) || 80;
    const tilt =
      ((parseFloat(cs.getPropertyValue("--grid-tilt")) || 30) * Math.PI) / 180;
    const scale = parseFloat(cs.getPropertyValue("--grid-scale")) || 1.6;
    const persp = parseFloat(cs.getPropertyValue("--grid-perspective")) || 1200;

    const size = stage.offsetWidth;
    if (size === 0) return;

    const cols = Math.max(1, Math.round(size / cell));
    const rows = cols;
    const cw = size / cols;
    const ch = size / rows;

    // The trail is a soft glow that the 3D transform blurs anyway, so a
    // 1.5x backing store is plenty and keeps a 1600px stage off 64MB.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const alpha = new Float32Array(cols * rows);
    const lit = new Set<number>();

    // One pre-rendered sprite, drawn per lit cell. Cheaper than building a
    // radial gradient 40 times a frame.
    const sprite = document.createElement("canvas");
    sprite.width = 64;
    sprite.height = 64;
    const sctx = sprite.getContext("2d");
    if (!sctx) return;
    const gradient = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(206, 220, 238, 1)");
    gradient.addColorStop(0.18, "rgba(196, 214, 234, 0.62)");
    gradient.addColorStop(0.46, "rgba(196, 214, 234, 0.16)");
    gradient.addColorStop(1, "rgba(196, 214, 234, 0)");
    sctx.fillStyle = gradient;
    sctx.fillRect(0, 0, 64, 64);

    /**
     * Invert `rotateX(tilt) scale(scale)` under `perspective: persp`.
     *
     * Forward: d = 1 - s*y*sinθ/p,  X = s*x/d,  Y = s*y*cosθ/d
     * Solved for x,y. The stage is centred on the perspective origin, so
     * X/Y are just the pointer offset from the fade box's centre.
     */
    const toLocal = (sx: number, sy: number) => {
      const sinT = Math.sin(tilt);
      const cosT = Math.cos(tilt);
      const y = sy / (scale * (cosT + (sy * sinT) / persp));
      const x = (sx * (1 - (scale * y * sinT) / persp)) / scale;
      return { x, y };
    };

    const evictDimmest = () => {
      let worst = -1;
      let worstAlpha = Infinity;
      for (const idx of lit) {
        if (alpha[idx] < worstAlpha) {
          worstAlpha = alpha[idx];
          worst = idx;
        }
      }
      if (worst !== -1) {
        alpha[worst] = 0;
        lit.delete(worst);
      }
    };

    let raf = 0;
    let pointerX = 0;
    let pointerY = 0;
    let pending = false;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      if (lit.size === 0) return;

      for (const idx of lit) {
        const a = alpha[idx];
        if (a <= 0) continue;
        const col = idx % cols;
        const row = (idx / cols) | 0;
        const cx = col * cw + cw / 2;
        const cy = row * ch + ch / 2;
        const w = cw * 0.98;
        const h = ch * 0.98;
        ctx.globalAlpha = Math.min(1, a * 0.3);
        ctx.drawImage(sprite, cx - w / 2, cy - h / 2, w, h);
      }
      ctx.globalAlpha = 1;
    };

    const frame = () => {
      raf = 0;

      if (pending) {
        pending = false;
        const rect = fade.getBoundingClientRect();
        const local = toLocal(
          pointerX - (rect.left + rect.width / 2),
          pointerY - (rect.top + rect.height / 2),
        );
        const col = Math.floor((local.x + size / 2) / cw);
        const row = Math.floor((local.y + size / 2) / ch);

        if (col >= 0 && col < cols && row >= 0 && row < rows) {
          const idx = row * cols + col;
          if (!lit.has(idx)) {
            if (lit.size >= MAX_LIT) evictDimmest();
            lit.add(idx);
          }
          alpha[idx] = 1;
        }
      }

      for (const idx of lit) {
        alpha[idx] *= DECAY;
        if (alpha[idx] < FLOOR) {
          alpha[idx] = 0;
          lit.delete(idx);
        }
      }

      draw();
      if (lit.size > 0) schedule();
    };

    const schedule = () => {
      if (raf !== 0 || document.hidden) return;
      raf = requestAnimationFrame(frame);
    };

    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      pending = true;
      schedule();
    };

    const onVisibility = () => {
      if (document.hidden) {
        if (raf !== 0) cancelAnimationFrame(raf);
        raf = 0;
      } else if (lit.size > 0) {
        schedule();
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      if (raf !== 0) cancelAnimationFrame(raf);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [pointerOn, inView, compact]);

  /* ---------------------------------------------------------------- */
  /* Intensity across the band                                        */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const layer = layerRef.current;
    const band = layer?.parentElement;
    if (!layer || !band) return;

    const sections = SECTION_IDS.map((id) => document.getElementById(id));
    if (sections.some((section) => section === null)) return;

    ensureGsap();

    /** Scroll positions where each section's centre meets the viewport centre. */
    let anchors: number[] = [];

    const measure = () => {
      const vh = window.innerHeight;
      anchors = (sections as HTMLElement[]).map((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top + window.scrollY + rect.height / 2 - vh / 2;
      });
    };

    const apply = () => {
      if (anchors.length !== 3) return;
      const y = window.scrollY;
      let strength: number;

      if (y <= anchors[0]) {
        strength = SECTION_STRENGTH[0];
      } else if (y >= anchors[2]) {
        strength = SECTION_STRENGTH[2];
      } else if (y <= anchors[1]) {
        const span = anchors[1] - anchors[0];
        strength = lerp(
          SECTION_STRENGTH[0],
          SECTION_STRENGTH[1],
          span > 0 ? (y - anchors[0]) / span : 1,
        );
      } else {
        const span = anchors[2] - anchors[1];
        strength = lerp(
          SECTION_STRENGTH[1],
          SECTION_STRENGTH[2],
          span > 0 ? (y - anchors[1]) / span : 1,
        );
      }

      layer.style.setProperty("--grid-strength", strength.toFixed(4));
    };

    // One trigger for the whole band. No pin, no snap: it only reads scroll
    // position, so anchors and native scrolling keep working untouched.
    const trigger = ScrollTrigger.create({
      trigger: band,
      start: "top bottom",
      end: "bottom top",
      onRefresh: () => {
        measure();
        apply();
      },
      onUpdate: apply,
    });

    measure();
    apply();

    return () => {
      trigger.kill();
      layer.style.removeProperty("--grid-strength");
    };
  }, []);

  return (
    <div ref={layerRef} aria-hidden="true" className="atlas-grid-layer">
      <div className="atlas-grid-viewport">
        <div ref={fadeRef} className="atlas-grid-fade">
          <div className="atlas-grid-persp">
            <div ref={stageRef} className="atlas-grid-stage">
              <div className="atlas-grid-lines" />
              <canvas ref={canvasRef} className="atlas-trail" />
            </div>
          </div>
          <div className="atlas-spotlight" />
        </div>
      </div>
    </div>
  );
}
