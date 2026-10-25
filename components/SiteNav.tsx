"use client";

import { useEffect, useRef, useState } from "react";
import { navItems, profile } from "@/content/site";

/**
 * Minimal fixed header: identity, anchors, and a reading-progress rule.
 * No scroll hijacking — it only observes window.scrollY.
 */
export default function SiteNav() {
  const barRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame: number | null = null;

    const update = () => {
      frame = null;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
      setScrolled(window.scrollY > 24);
    };

    const onScroll = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-ink/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="shell flex h-14 items-center justify-between gap-6 md:h-16">
        <a
          href="#hero"
          className="group flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-[0.26em]"
        >
          <span className="text-fg transition-colors group-hover:text-accent">
            {profile.nickname}
          </span>
          <span className="hidden text-fg-faint sm:inline">
            / {profile.fullName}
          </span>
        </a>

        <nav aria-label="Sections" className="flex items-center gap-3.5 sm:gap-5 md:gap-7">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex items-center py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-fg-dim transition-colors hover:text-accent sm:text-[10px] sm:tracking-[0.22em]"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="h-px w-full overflow-hidden bg-transparent">
        <div
          ref={barRef}
          className="h-px w-full origin-left scale-x-0 bg-accent"
          aria-hidden="true"
        />
      </div>
    </header>
  );
}
