import { Reveal } from "@/components/ui/Reveal";
import { ArsenalList } from "@/components/sections/ArsenalList";
import {
  techCategories,
  techStatusMeta,
  techStatusOrder,
} from "@/content/site";

/**
 * Technical Arsenal — an editorial index, not a skill dashboard.
 *
 * Server Component. The data is static; only the list animation needs a
 * browser, and that lives inside `ArsenalList`.
 *
 * Every row carries a status instead of a proficiency number, because a
 * percentage would be invented and a finished-looking list would imply that
 * everything on it works.
 */
export default function Arsenal() {
  return (
    <section
      id="arsenal"
      aria-labelledby="arsenal-heading"
      className="relative bg-surface-2 py-24 md:py-32"
    >
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal variant="fade">
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
                Technical arsenal
              </p>
            </Reveal>
            <Reveal variant="mask" delay={0.06}>
              <h2
                id="arsenal-heading"
                className="mt-4 font-display text-[clamp(2.5rem,6.5vw,5rem)] font-extrabold leading-[0.88] tracking-tight"
              >
                The index.
              </h2>
            </Reveal>
          </div>

          <Reveal variant="line" delay={0.12} className="lg:col-span-5 lg:col-start-8">
            <p className="text-sm leading-relaxed text-fg-dim">
              An index, not a scoreboard. Each entry is tagged with how far it
              actually got — in use, still being wired up, proven only in an
              experiment, or not built at all. No ratings, no percentages.
            </p>

            <ul
              aria-label="Technology status key"
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
                    <span className={meta.text}>{meta.label}</span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        <ArsenalList categories={techCategories} />

        <Reveal variant="fade" delay={0.1}>
          {/*
            Git/GitHub lives here as a footnote rather than a fifth category:
            version control is a workflow, not one of the four domains above,
            and inventing a category for it would flatten the structure.
          */}
          <div className="mt-10 max-w-xl border-l border-accent/40 pl-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
              Tools &amp; Workflow
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-fg-faint">
              Git for version control, GitHub for hosting — on every project
              listed here.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
