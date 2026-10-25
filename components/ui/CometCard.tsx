"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ensureGsap, hasFinePointer, prefersReducedMotion } from "@/lib/gsap";

type CometCardProps = {
  children: ReactNode;
  /**
   * False while the real image is missing or failed to load. A tilt on the
   * designed fallback frame would imply a photograph is there.
   */
  enabled?: boolean;
  className?: string;
};

/**
 * Tilt-and-glare card, after Aceternity UI's Comet Card.
 *
 * Ported to GSAP rather than imported verbatim. The published component pulls
 * in `motion/react` plus a `cn()` helper (clsx + tailwind-merge); this project
 * already runs GSAP for every other motion on the page, and adding a second
 * animation library for one hover effect is exactly the duplication AGENTS.md
 * warns about. The behaviour is kept, the dependency is not.
 *
 * Depth is dialled well down from the source. 17.5° of rotation and a 20px
 * translate read as a product card; this sits in an editorial column, so it
 * gets 6° and 6px — enough to feel like the print has weight, not enough to
 * detach from the layout.
 *
 * Inert on touch and under `prefers-reduced-motion`: no listeners are attached
 * at all, so the photo simply sits there, correctly cropped.
 */
const MAX_ROTATE = 6;
const MAX_SHIFT = 6;

export function CometCard({
  children,
  enabled = true,
  className = "",
}: CometCardProps) {
  const card = useRef<HTMLDivElement>(null);
  const glare = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!enabled) return;
    if (!hasFinePointer() || prefersReducedMotion()) return;

    const el = card.current;
    if (!el) return;

    ensureGsap();

    const rotX = gsap.quickTo(el, "rotationX", {
      duration: 0.55,
      ease: "power3.out",
    });
    const rotY = gsap.quickTo(el, "rotationY", {
      duration: 0.55,
      ease: "power3.out",
    });
    const moveX = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const moveY = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });

    let frame: number | null = null;
    let mx = 0;
    let my = 0;

    const apply = () => {
      frame = null;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;

      // -0.5 .. 0.5 relative to the card centre.
      const px = (mx - r.left) / r.width - 0.5;
      const py = (my - r.top) / r.height - 0.5;

      rotX(-py * MAX_ROTATE);
      rotY(px * MAX_ROTATE);
      moveX(px * MAX_SHIFT);
      moveY(py * MAX_SHIFT);

      const g = glare.current;
      if (g) {
        g.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
        g.style.setProperty("--gy", `${(py + 0.5) * 100}%`);
      }
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (el.getAttribute("data-tilt") !== "active") {
        el.setAttribute("data-tilt", "active");
      }
      if (frame === null) frame = requestAnimationFrame(apply);
    };

    const reset = () => {
      if (frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
      el.removeAttribute("data-tilt");
      rotX(0);
      rotY(0);
      moveX(0);
      moveY(0);
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", reset);
    el.addEventListener("pointercancel", reset);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
      el.removeEventListener("pointercancel", reset);
      if (frame !== null) cancelAnimationFrame(frame);
      el.removeAttribute("data-tilt");
      gsap.set(el, { rotationX: 0, rotationY: 0, x: 0, y: 0 });
    };
  }, [enabled]);

  return (
    <div
      className={className}
      style={{ perspective: "1200px", perspectiveOrigin: "50% 45%" }}
    >
      <div
        ref={card}
        className="relative"
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        {children}
        <span ref={glare} aria-hidden="true" className="comet-glare" />
      </div>
    </div>
  );
}
