"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ensureGsap, hasFinePointer, prefersReducedMotion } from "@/lib/gsap";

type MagneticProps = {
  children: ReactNode;
  /** Maximum travel in pixels. Keep it small — this is a nudge, not a drag. */
  strength?: number;
  className?: string;
};

/**
 * Pulls its child a few pixels toward the cursor as it approaches, then eases
 * back when the pointer leaves.
 *
 * The wrapper carries padding that is cancelled by an equal negative margin,
 * so the "magnetic field" is larger than the button without moving anything in
 * the layout. The button itself never changes size, so click targets and
 * layout are unaffected.
 *
 * No-op on touch devices and under reduced motion.
 */
export function Magnetic({
  children,
  strength = 12,
  className = "",
}: MagneticProps) {
  const zone = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    const z = zone.current;
    const i = inner.current;
    if (!z || !i) return;

    ensureGsap();

    const xTo = gsap.quickTo(i, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(i, "y", { duration: 0.5, ease: "power3.out" });

    let frame: number | null = null;
    let mx = 0;
    let my = 0;

    const apply = () => {
      frame = null;
      const r = z.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;

      const dx = mx - (r.left + r.width / 2);
      const dy = my - (r.top + r.height / 2);
      const radius = Math.max(r.width, r.height) * 0.72;
      const dist = Math.hypot(dx, dy);

      if (dist > radius) {
        xTo(0);
        yTo(0);
        return;
      }

      const falloff = 1 - dist / radius;
      xTo(
        gsap.utils.clamp(
          -strength,
          strength,
          (dx / (r.width / 2)) * strength * falloff,
        ),
      );
      yTo(
        gsap.utils.clamp(
          -strength,
          strength,
          (dy / (r.height / 2)) * strength * falloff,
        ),
      );
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (frame === null) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      if (frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
      xTo(0);
      yTo(0);
    };

    z.addEventListener("pointermove", onMove, { passive: true });
    z.addEventListener("pointerleave", onLeave);

    return () => {
      z.removeEventListener("pointermove", onMove);
      z.removeEventListener("pointerleave", onLeave);
      if (frame !== null) cancelAnimationFrame(frame);
      gsap.set(i, { x: 0, y: 0 });
    };
  }, [strength]);

  return (
    <div ref={zone} className={`-m-4 inline-block p-4 ${className}`}>
      <div ref={inner} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
