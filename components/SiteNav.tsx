"use client";

import { useEffect, useRef, useState } from "react";
import LocaleSwitch from "@/components/LocaleSwitch";
import { getContent, getNavItems, profile } from "@/content/site";
import type { Locale } from "@/lib/i18n";

/**
 * Minimal fixed header: identity, anchors, language, and a reading-progress
 * rule. No scroll hijacking — it only observes window.scrollY.
 *
 * The anchors are plain `#hash` links on purpose. They resolve against the
 * current URL, so they stay inside whichever locale is being viewed without
 * the component having to know about routing.
 */
export default function SiteNav({ locale }: { locale: Locale }) {
  const barRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  const t = getContent(locale);
  const items = getNavItems(locale);

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
      <div className="shell flex h-14 items-center justify-between gap-2 md:h-16 md:gap-6">
        {/* Below 375px there is not enough room for the wordmark, five anchors
            and the language switch on one line at a legible size. The wordmark
            is the one that goes: every section stays reachable, and the footer
            already offers "back to top". */}
        <a
          href="#hero"
          className="group flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-[0.26em] max-[374px]:hidden"
        >
          <span className="text-fg transition-colors group-hover:text-accent">
            {profile.nickname}
          </span>
          <span className="hidden text-fg-faint sm:inline">
            / {profile.fullName}
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-5 md:gap-7">
          <nav
            aria-label={t.nav.ariaLabel}
            className="flex items-center gap-1.5 sm:gap-5 md:gap-7"
          >
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="inline-flex items-center py-2 font-mono text-[9px] uppercase tracking-[0.08em] text-fg-dim transition-colors hover:text-accent sm:text-[10px] sm:tracking-[0.22em]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* A hairline keeps the switch from reading as a sixth section link.
              It only appears once there is room for it. */}
          <div className="border-l-0 pl-0 sm:border-l sm:border-line sm:pl-5 md:pl-7">
            <LocaleSwitch locale={locale} label={t.nav.languageLabel} />
          </div>
        </div>
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
