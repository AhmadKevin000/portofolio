"use client";

import { useEffect, useState } from "react";

/** Live-updating media query hook. SSR-safe (defaults to false). */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

/** True on devices with a real pointer — cursor effects should be skipped otherwise. */
export const useHasFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine)");
