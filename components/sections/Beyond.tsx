import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { storyChapters } from "@/content/site";

/**
 * Beyond the Code — Server Component.
 *
 * Its motion signature is a slow lateral drift on the chapter marker against
 * the copy, so this section reads differently from the row-stagger of the
 * arsenal and the card-stagger of the projects.
 */
export default function Beyond() {
  return (
    <section
      id="beyond"
      aria-labelledby="beyond-heading"
      className="relative overflow-hidden bg-surface-1 py-24 md:py-32"
    >
      <div className="shell">
        <div className="max-w-3xl">
          <Reveal variant="fade">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
              Beyond the code
            </p>
          </Reveal>
          <Reveal variant="mask" delay={0.06}>
            <h2
              id="beyond-heading"
              className="mt-4 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[0.88] tracking-tight"
            >
              The parts that
              <br />
              <span className="text-fg-faint">don&apos;t fit in a repo.</span>
            </h2>
          </Reveal>
          <Reveal variant="up" delay={0.14}>
            <p className="mt-6 font-editorial text-[clamp(1.1rem,2.2vw,1.5rem)] italic leading-snug text-fg-dim">
              Three chapters that shaped how I work with people — none of them
              written in a terminal.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 space-y-16 md:mt-24 md:space-y-24">
          {storyChapters.map((chapter) => (
            <div key={chapter.id} className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <Parallax speed={-5}>
                  <Reveal variant="fade">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
                        {chapter.index}
                      </span>
                      <span className="h-px w-8 bg-line-2" aria-hidden="true" />
                    </div>
                  </Reveal>
                  <Reveal variant="mask" delay={0.05}>
                    <h3 className="mt-4 font-display text-[clamp(1.6rem,3.2vw,2.5rem)] font-extrabold uppercase leading-[0.95] tracking-tight">
                      {chapter.title}
                    </h3>
                  </Reveal>
                  <Reveal variant="fade" delay={0.12}>
                    <p className="mt-4 max-w-sm font-editorial text-lg italic leading-snug text-fg-faint">
                      {chapter.lede}
                    </p>
                  </Reveal>
                </Parallax>
              </div>

              <div className="lg:col-span-7 lg:col-start-6">
                <ul className="border-t border-line">
                  {chapter.entries.map((entry, ei) => (
                    <li key={entry.title}>
                      <Reveal variant="line" delay={ei * 0.07}>
                        <div className="group grid gap-2 border-b border-line py-6 transition-colors hover:border-line-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:gap-8">
                          <h4 className="text-base font-semibold leading-snug text-fg transition-colors group-hover:text-accent">
                            {entry.title}
                          </h4>
                          <p className="text-sm leading-relaxed text-fg-dim">
                            {entry.body}
                          </p>
                        </div>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <Reveal variant="line" delay={0.08}>
          <p className="mt-16 max-w-xl border-l border-accent/40 pl-5 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-fg-faint">
            These experiences are listed as facts, not as proof of a skill
            level. What they show is context, not a score.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
