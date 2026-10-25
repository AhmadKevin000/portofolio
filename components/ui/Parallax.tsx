"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";

type ParallaxProps = {
  children: ReactNode;
  /**
   * Percentage of the element's own height to travel across the viewport
   * crossing. Negative moves against the scroll (reads as "closer"), positive
   * with it (reads as "further away"). Keep magnitudes small — past ~15% this
   * starts fighting the reader instead of adding depth.
   */
  speed?: number;
  className?: string;
};

/**
 * Scrub-linked vertical drift.
 *
 * Uses `yPercent` rather than `y` so the travel scales with the element and
 * stays sane at every breakpoint without extra media queries. Nothing here
 * touches scroll position — native scrolling is untouched.
 */
export function Parallax({
  children,
  speed = -6,
  className = "",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    ensureGsap();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -speed / 2 },
        {
          yPercent: speed / 2,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
