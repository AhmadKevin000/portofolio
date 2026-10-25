"use client";

import { useEffect, type RefObject } from "react";

/** Below this distance the easing has visually settled and the loop stops. */
const SETTLE = 0.0006;

/**
 * Publishes eased pointer coordinates as CSS custom properties on a scope
 * element, so every layer inside can react with pure CSS.
 *
 * Deliberately not React state: a pointermove handler that calls setState
 * would re-render the whole tree 100+ times a second. This writes two numbers
 * to one element's style and lets the compositor do the rest.
 *
 * The rAF loop is self-terminating — it runs only while the eased value is
 * still catching up to the pointer, and pauses while the tab is hidden.
 */
export function useScopePointer(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    let tx = 0.5;
    let ty = 0.5;
    let cx = 0.5;
    let cy = 0.5;
    let frame: number | null = null;

    const write = () => {
      el.style.setProperty("--px", cx.toFixed(4));
      el.style.setProperty("--py", cy.toFixed(4));
    };

    const tick = () => {
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      write();

      if (Math.abs(tx - cx) < SETTLE && Math.abs(ty - cy) < SETTLE) {
        frame = null;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (frame !== null || document.hidden) return;
      frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX / window.innerWidth;
      ty = e.clientY / window.innerHeight;
      if (el.getAttribute("data-pointer") !== "active") {
        el.setAttribute("data-pointer", "active");
      }
      start();
    };

    const onLeave = () => {
      el.removeAttribute("data-pointer");
    };

    const onVisibility = () => {
      if (document.hidden) {
        if (frame !== null) cancelAnimationFrame(frame);
        frame = null;
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    write();

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      if (frame !== null) cancelAnimationFrame(frame);
      el.removeAttribute("data-pointer");
      el.style.removeProperty("--px");
      el.style.removeProperty("--py");
    };
  }, [ref, enabled]);
}
