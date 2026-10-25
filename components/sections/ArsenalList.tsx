"use client";

import { useGsapScope, prefersReducedMotion } from "@/lib/gsap";
import {
  techStatusMeta,
  type TechCategory,
  type TechStatus,
} from "@/content/site";

function StatusTag({ status }: { status: TechStatus }) {
  const meta = techStatusMeta[status];
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em]">
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${meta.dot}`}
      />
      <span className={meta.text}>{meta.label}</span>
    </span>
  );
}

/**
 * The arsenal index.
 *
 * One ScrollTrigger for the whole list drives three nested staggers — the
 * category rows, the rules that close them, and the individual technologies.
 * Deliberately a single trigger rather than one per group: twenty-odd
 * separate ScrollTriggers on one section is how a page starts to stutter.
 *
 * Under reduced motion nothing is registered at all; the markup is already in
 * its final state.
 */
export function ArsenalList({ categories }: { categories: TechCategory[] }) {
  const scopeRef = useGsapScope<HTMLUListElement>(({ gsap, scope }) => {
    if (prefersReducedMotion()) return;

    const rows = scope.querySelectorAll("[data-row]");
    if (rows.length === 0) return;

    const rules = scope.querySelectorAll("[data-row-rule]");
    const items = scope.querySelectorAll("[data-item]");

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: { trigger: scope, start: "top 84%", once: true },
    });

    tl.fromTo(
      rows,
      { opacity: 0, y: 26 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 },
      0,
    )
      .fromTo(
        rules,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.9, stagger: 0.08, ease: "expo.out" },
        0,
      )
      // Items arrive just behind their own row, tightly staggered. Small
      // travel: this is a list being read, not a cascade of cards.
      .fromTo(
        items,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.015 },
        0.2,
      );
  }, []);

  return (
    <ul ref={scopeRef} className="mt-14 border-t border-line md:mt-20">
      {categories.map((cat, i) => (
        <li key={cat.id} data-row className="relative">
          {/*
            The three-track split only starts at `lg`. At 768px a 3-column
            title track is ~175px wide and "Web Development" wraps into its own
            item column, so tablets get the stacked reading order instead.
          */}
          <div className="grid gap-6 py-10 lg:grid-cols-12 lg:gap-8 lg:px-3">
            <div className="lg:col-span-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-fg-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="lg:col-span-4 xl:col-span-3">
              <h3 className="font-display text-xl font-bold uppercase leading-tight tracking-tight md:text-2xl">
                {cat.title}
              </h3>
              {cat.note && (
                <p className="mt-2 max-w-[30ch] text-[12px] leading-relaxed text-fg-faint">
                  {cat.note}
                </p>
              )}
            </div>

            <div className="lg:col-span-7 xl:col-span-8">
              {cat.items.length > 0 ? (
                <ul className="grid gap-x-10 sm:grid-cols-2">
                  {cat.items.map((item) => (
                    <li key={item.name} data-item className="group/item">
                      <div className="flex items-start justify-between gap-4 border-b border-line/70 py-3 transition-colors group-hover/item:border-line-2">
                        <div className="min-w-0">
                          <p className="text-sm text-fg transition-colors group-hover/item:text-accent">
                            {item.name}
                          </p>
                          {(item.context || item.project) && (
                            <p className="mt-1 text-[11px] leading-snug text-fg-faint">
                              {item.context}
                              {item.project && (
                                <span className="ml-1.5 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.16em] text-fg-dim">
                                  / {item.project}
                                </span>
                              )}
                            </p>
                          )}
                        </div>
                        <StatusTag status={item.status} />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-lg leading-none text-fg-faint">
                  <span aria-hidden="true">—</span>
                  <span className="sr-only">
                    No technologies listed in this category yet.
                  </span>
                </p>
              )}
            </div>
          </div>

          <span
            aria-hidden="true"
            data-row-rule
            className="absolute inset-x-0 bottom-0 h-px origin-left bg-line"
          />
        </li>
      ))}
    </ul>
  );
}
