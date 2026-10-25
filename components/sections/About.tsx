import { existsSync } from "node:fs";
import { join } from "node:path";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import Portrait from "@/components/sections/Portrait";
import { getContent } from "@/content/site";
import type { Locale } from "@/lib/i18n";

const PORTRAIT_PATH = "/images/kepin-portrait.jpg";

export default function About({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  // Checked at build time so a missing photo never produces a 404 request.
  const hasPortrait = existsSync(join(process.cwd(), "public", PORTRAIT_PATH));

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden bg-surface-1 py-24 md:py-32"
    >
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* The portrait drifts against the scroll, the copy drifts with it.
              Two different rates is what reads as depth; the same rate reads
              as the whole block sliding. */}
          <div className="lg:col-span-5">
            <Parallax speed={-7}>
              <Reveal variant="scale">
                <Portrait
                  src={PORTRAIT_PATH}
                  available={hasPortrait}
                  locale={locale}
                />
              </Reveal>
            </Parallax>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Parallax speed={3}>
              <Reveal variant="fade">
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
                  {t.about.eyebrow}
                </p>
              </Reveal>

              <Reveal variant="mask" delay={0.06}>
                <h2
                  id="about-heading"
                  className="mt-5 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[0.92] tracking-tight"
                >
                  {t.about.heading}
                </h2>
              </Reveal>

              <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-fg-dim md:text-base">
                {t.about.paragraphs.map((para, i) => (
                  <Reveal key={i} variant="up" delay={0.1 + i * 0.08}>
                    <p>{para}</p>
                  </Reveal>
                ))}
              </div>

              <Reveal variant="up" delay={0.34}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <a
                    href="#work"
                    className="inline-flex items-center gap-2 border border-line-2 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-fg transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink"
                  >
                    {t.about.seeWork}
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-2 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-fg-dim underline-offset-4 transition-colors hover:text-accent hover:underline"
                  >
                    {t.about.getInTouch}
                  </a>
                </div>
              </Reveal>
            </Parallax>
          </div>
        </div>
      </div>
    </section>
  );
}
