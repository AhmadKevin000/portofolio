import { Reveal } from "@/components/ui/Reveal";
import { TechAtlas } from "@/components/sections/TechAtlas";
import {
  getContent,
  getTechCategories,
  techStatusMeta,
  techStatusOrder,
} from "@/content/site";
import type { Locale } from "@/lib/i18n";

/**
 * Technical Arsenal — an editorial index, not a skill dashboard.
 *
 * Server Component. The data is static; the only browser work is the atlas
 * tab state, which lives inside `TechAtlas`.
 *
 * The atlas is the single representation of the arsenal. A second list used
 * to render the same twenty-five entries below it; the per-entry context it
 * carried now lives in the atlas rows, so the section has one subject
 * instead of two copies of it.
 *
 * Every row carries a status instead of a proficiency number, because a
 * percentage would be invented and a finished-looking list would imply that
 * everything on it works.
 */
export default function Arsenal({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  const categories = getTechCategories(locale);

  return (
    <section
      id="arsenal"
      aria-labelledby="arsenal-heading"
      className="relative z-10 py-24 md:py-32"
    >
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal variant="fade">
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
                {t.arsenal.eyebrow}
              </p>
            </Reveal>
            <Reveal variant="mask" delay={0.06}>
              <h2
                id="arsenal-heading"
                className="mt-4 font-display text-[clamp(2.5rem,6.5vw,5rem)] font-extrabold leading-[0.88] tracking-tight"
              >
                {t.arsenal.heading}
              </h2>
            </Reveal>
          </div>

          <Reveal variant="line" delay={0.12} className="lg:col-span-5 lg:col-start-8">
            <p className="text-sm leading-relaxed text-fg-dim">
              {t.arsenal.description}
            </p>

            <ul
              aria-label={t.arsenal.statusKeyLabel}
              className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              {techStatusOrder.map((status) => {
                const meta = techStatusMeta[status];
                return (
                  <li
                    key={status}
                    className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em]"
                  >
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 rounded-full ${meta.dot}`}
                    />
                    <span className={meta.text}>
                      {t.arsenal.statusLabels[status]}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        <Reveal variant="fade" delay={0.1}>
          <div className="mt-14 md:mt-20">
            <TechAtlas categories={categories} locale={locale} />
          </div>
        </Reveal>

        <Reveal variant="fade" delay={0.1}>
          {/*
            Git/GitHub lives here as a footnote rather than a fifth category:
            version control is a workflow, not one of the four domains above,
            and inventing a category for it would flatten the structure.
          */}
          <div className="mt-10 max-w-xl border-l border-accent/40 pl-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
              {t.arsenal.toolsLabel}
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-fg-faint">
              {t.arsenal.toolsNote}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
