import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { getContent, getStoryChapters } from "@/content/site";
import type { Locale } from "@/lib/i18n";

/**
 * Beyond the Code — Server Component.
 *
 * Its motion signature is a slow lateral drift on the chapter marker against
 * the copy, so this section reads differently from the row-stagger of the
 * arsenal and the card-stagger of the projects.
 */
export default function Beyond({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  const chapters = getStoryChapters(locale);

  return (
    <section
      id="beyond"
      aria-labelledby="beyond-heading"
      className="relative z-10 overflow-hidden py-24 md:py-32"
    >
      <div className="shell">
        <div className="max-w-3xl">
          <Reveal variant="fade">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
              {t.beyond.eyebrow}
            </p>
          </Reveal>
          <Reveal variant="mask" delay={0.06}>
            <h2
              id="beyond-heading"
              className="mt-4 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[0.88] tracking-tight"
            >
              {t.beyond.headingLead}
              <br />
              <span className="text-fg-faint">{t.beyond.headingTail}</span>
            </h2>
          </Reveal>
          <Reveal variant="up" delay={0.14}>
            <p className="mt-6 font-editorial text-[clamp(1.1rem,2.2vw,1.5rem)] italic leading-snug text-fg-dim">
              {t.beyond.lede}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 space-y-16 md:mt-24 md:space-y-24">
          {chapters.map((chapter) => (
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
                {/* One rule opens the chapter; the rows inside carry no
                    separators. The perspective grid behind this section is
                    already a field of hairlines, and a rule per row made the
                    two compete. Spacing and the title/body column split do
                    the separating instead. */}
                <ul className="border-t border-line">
                  {chapter.entries.map((entry, ei) => (
                    <li key={entry.title}>
                      <Reveal variant="line" delay={ei * 0.07}>
                        <div className="group grid gap-2 py-7 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:gap-8">
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
      </div>
    </section>
  );
}
