"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Register plugins once, on the client only. */
export function ensureGsap() {
  if (registered) return gsap;

  gsap.registerPlugin(ScrollTrigger);

  // Mobile browsers fire `resize` every time the URL bar collapses. Without
  // this, every one of those would re-measure and jump every scrubbed
  // timeline mid-scroll.
  ScrollTrigger.config({ ignoreMobileResize: true });

  gsap.defaults({ ease: "power3.out" });

  // Tells the bootstrap in app/layout.tsx that GSAP is alive, so its watchdog
  // leaves the pre-reveal hidden state armed.
  document.documentElement.setAttribute("data-motion-ready", "");

  // Webfonts change the height of every text block. Measuring before they
  // land puts every ScrollTrigger start/end in the wrong place.
  if ("fonts" in document) {
    document.fonts.ready
      .then(() => ScrollTrigger.refresh())
      .catch(() => {
        /* refresh is best-effort */
      });
  }

  // Images and late layout shift the same way fonts do. A deep link that
  // arrives before they settle would otherwise leave triggers below the fold.
  if (document.readyState === "complete") {
    ScrollTrigger.refresh();
  } else {
    window.addEventListener("load", () => ScrollTrigger.refresh(), {
      once: true,
    });
  }

  registered = true;
  return gsap;
}

/**
 * Read once per effect, never in render — the value must not be part of the
 * server/client HTML diff.
 */
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** True only where a real cursor exists. Touch devices must skip pointer work. */
export function hasFinePointer() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}

/**
 * Scoped GSAP context that always reverts on unmount.
 *
 * Every animation in this project goes through this so no ScrollTrigger
 * instance survives a re-render, and so React Strict Mode's double mount
 * cannot leave a duplicate trigger behind.
 */
export function useGsapScope<T extends HTMLElement = HTMLElement>(
  setup: (ctx: { gsap: typeof gsap; scope: T }) => void,
  deps: unknown[] = [],
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const scope = ref.current;
    if (!scope) return;

    ensureGsap();
    const ctx = gsap.context(() => setup({ gsap, scope }), scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
