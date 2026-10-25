"use client";

import { useRef, useState } from "react";
import {
  getContent,
  techStatusMeta,
  techStatusOrder,
  type TechCategory,
  type TechStatus,
} from "@/content/site";
import type { Locale } from "@/lib/i18n";

function tally(items: { status: TechStatus }[]) {
  const counts = new Map<TechStatus, number>();
  for (const item of items) {
    counts.set(item.status, (counts.get(item.status) ?? 0) + 1);
  }
  return techStatusOrder
    .filter((status) => (counts.get(status) ?? 0) > 0)
    .map((status) => ({ status, count: counts.get(status) ?? 0 }));
}

/**
 * Interactive Technology Atlas — the only representation of the arsenal.
 *
 * It carries the full record for all twenty-five entries: name, status, the
 * one-line context, and the project an entry belongs to. That context used to
 * live in a second list rendered below this one; keeping both meant the same
 * data appeared twice, so the detail moved here instead.
 *
 * Keyboard model is the standard automatic-activation tab pattern: arrows
 * move selection and focus together, Home/End jump to the ends, and Tab
 * leaves the strip entirely. Touch targets are 44px minimum. The selected
 * tab is never indicated by colour alone — it also carries the accent rule,
 * a filled marker, and a brighter arrow, while every idle tab keeps a faint
 * arrow so selectability never depends on hover.
 *
 * The panel repeats the domain name as an h3 rather than relying on the
 * outlined numeral, which reads as a chapter mark on its own.
 */
export function TechAtlas({
  categories,
  locale,
}: {
  categories: TechCategory[];
  locale: Locale;
}) {
  const t = getContent(locale);
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const total = categories.reduce((sum, category) => sum + category.items.length, 0);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const last = categories.length - 1;
    let next = -1;

    if (event.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (event.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;

    if (next === -1) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="border border-line bg-ink/35">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line px-5 py-4 md:px-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent">
            {t.arsenal.atlas.eyebrow}
          </p>
          {/* The tabs carry arrows and an active rule, but a plain sentence
              removes any doubt that this is a control rather than a list. */}
          <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-fg-faint">
            {t.arsenal.atlas.hint}
          </p>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
          {total} {t.arsenal.atlas.entriesLabel} / {categories.length}{" "}
          {t.arsenal.atlas.domainsLabel}
        </p>
      </div>

      {/* The strip closes on a hairline so the four domains read as one
          segmented control rather than four columns of body copy. */}
      <div
        role="tablist"
        aria-label={t.arsenal.atlas.categoriesAria}
        onKeyDown={onKeyDown}
        className="grid grid-cols-1 border-b border-line sm:grid-cols-2 lg:grid-cols-4"
      >
        {categories.map((category, index) => {
          const selected = index === active;
          return (
            <button
              key={category.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`atlas-tab-${category.id}`}
              aria-selected={selected}
              aria-controls={`atlas-panel-${category.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              // Dividers are drawn per cell so the strip reads as one
              // segmented control at every width: a rule between rows, and
              // between columns only where a column actually starts a row.
              // `border-b` is suppressed on the final row so it never doubles
              // up with the strip's own closing hairline.
              className={`atlas-tab group relative flex min-h-[44px] cursor-pointer items-start gap-3 border-b border-line px-5 py-4 text-left transition-colors last:border-b-0 sm:border-l sm:[&:nth-child(2n+1)]:border-l-0 sm:[&:nth-child(3)]:border-b-0 md:px-6 lg:border-b-0 lg:[&:nth-child(3)]:border-l ${
                selected ? "bg-accent/5" : "hover:bg-fg/[0.04]"
              }`}
            >
              <span
                aria-hidden="true"
                className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                  selected ? "bg-accent" : "bg-line-3 group-hover:bg-fg-faint"
                }`}
              />
              <span className="min-w-0 flex-1">
                {/* The ordinal is a supporting mark: smaller, mono, and
                    quieter than the domain name at every breakpoint. */}
                <span
                  aria-hidden="true"
                  className={`block font-mono text-[9px] uppercase tracking-[0.24em] transition-colors ${
                    selected
                      ? "text-accent"
                      : "text-fg-faint group-hover:text-fg-dim"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`mt-1 block text-[13px] font-bold uppercase leading-tight tracking-tight transition-colors md:text-sm ${
                    selected ? "text-fg" : "text-fg-dim group-hover:text-fg"
                  }`}
                >
                  {category.title}
                </span>
              </span>
              {/* Direction cue, visible on every tab so selectability never
                  depends on hover — which touch devices never fire. It only
                  changes weight: faint when idle, bright on hover, accent
                  when active. The arrow is always in the flow, so no state
                  can shift the label. */}
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                fill="none"
                className={`mt-1 h-3 w-3 shrink-0 transition-all duration-300 ${
                  selected
                    ? "translate-x-0 text-accent"
                    : "-translate-x-0.5 text-fg-faint group-hover:translate-x-0 group-hover:text-fg"
                }`}
              >
                <path
                  d="M2.5 8h10M8.5 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="square"
                />
              </svg>
              {/* Sits over the strip's own hairline, so the active domain
                  looks attached to the panel it opens. */}
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 -bottom-px h-0.5 origin-left bg-accent transition-transform duration-300 ${
                  selected ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* All four panels stay mounted so every tab's `aria-controls` resolves.
          Inactive ones are `hidden`, which also removes them from the
          accessibility tree — so a screen reader still only sees one. */}
      {categories.map((category, index) => {
        const selected = index === active;
        const first =
          categories
            .slice(0, index)
            .reduce((sum, entry) => sum + entry.items.length, 0) + 1;

        return (
          <div
            key={category.id}
            role="tabpanel"
            id={`atlas-panel-${category.id}`}
            aria-labelledby={`atlas-tab-${category.id}`}
            tabIndex={0}
            hidden={!selected}
          >
            {/* Keyed on the selection flag so becoming active remounts the
                inner block and the entrance animation re-runs. Under reduced
                motion the global rule drops the duration to ~0, so the swap
                is instant rather than merely fast. */}
            <div
              key={selected ? "on" : "off"}
              className="atlas-specimen grid gap-8 px-5 py-8 md:px-6 md:py-10 lg:grid-cols-12 lg:gap-10"
            >
              <div className="lg:col-span-5">
                {/* Outlined numeral, matching the project plates. It is a
                    chapter mark, not the heading — the h3 below names the
                    domain, so the two are never confused. */}
                <span
                  aria-hidden="true"
                  className="block font-display text-[clamp(3.5rem,7vw,5.5rem)] font-extrabold leading-[0.8] tracking-tight text-transparent"
                  style={{ WebkitTextStroke: "1.5px var(--line-3)" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Read from `category.title`, the same string the tab uses,
                    so the heading can never drift from the control. */}
                <h3 className="mt-5 font-display text-[clamp(1.4rem,2.3vw,1.95rem)] font-extrabold uppercase leading-[1.05] tracking-tight text-fg">
                  {category.title}
                </h3>

                {category.note && (
                  <p className="mt-3 max-w-sm font-editorial text-[clamp(1.05rem,1.7vw,1.3rem)] italic leading-snug text-fg-dim">
                    {category.note}
                  </p>
                )}

                {/* Counts are derived from the active category's own items —
                    nothing is hardcoded, so switching domains recomputes
                    both the total and the per-status tally. */}
                <div className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-2 border-t border-line pt-5 font-mono text-[9px] uppercase tracking-[0.16em]">
                  <p className="text-fg-faint">
                    {category.items.length} {t.arsenal.atlas.entriesLabel} ·{" "}
                    {first}–{first + category.items.length - 1}{" "}
                    {t.arsenal.atlas.rangeOf} {total}
                  </p>
                  <dl className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                    {tally(category.items).map(({ status, count }) => {
                      const meta = techStatusMeta[status];
                      const label = t.arsenal.statusLabels[status];
                      return (
                        <div
                          key={status}
                          className="inline-flex items-center gap-1.5"
                        >
                          <span
                            aria-hidden="true"
                            className={`h-1.5 w-1.5 rounded-full ${meta.dot}`}
                          />
                          <dt className="sr-only">{label}</dt>
                          <dd className={meta.text}>
                            {count} {label}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </div>
              </div>

              <div className="lg:col-span-7">
                <ul className="border-t border-line">
                  {category.items.map((item) => {
                    const meta = techStatusMeta[item.status];
                    return (
                      <li
                        key={item.name}
                        className="flex items-start justify-between gap-4 border-b border-line/70 py-3.5"
                      >
                        <div className="min-w-0">
                          <p className="font-display text-[clamp(1rem,1.7vw,1.35rem)] font-bold uppercase leading-tight tracking-tight text-fg">
                            {item.name}
                          </p>
                          {item.context && (
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
                        <span className="mt-1 inline-flex shrink-0 items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em]">
                          <span
                            aria-hidden="true"
                            className={`h-1.5 w-1.5 rounded-full ${meta.dot}`}
                          />
                          <span className={meta.text}>
                            {t.arsenal.statusLabels[item.status]}
                          </span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
