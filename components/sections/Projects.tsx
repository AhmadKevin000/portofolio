import { existsSync } from "node:fs";
import { join } from "node:path";
import { Reveal } from "@/components/ui/Reveal";
import {
  ProjectsGrid,
  type ProjectWithShots,
} from "@/components/sections/ProjectsGrid";
import { getContent, getProjects } from "@/content/site";
import type { Locale } from "@/lib/i18n";

/**
 * Server Component. Resolves which screenshots actually exist on disk, then
 * hands a plain serialisable array to the client grid that owns the motion.
 */
export default function Projects({ locale }: { locale: Locale }) {
  const t = getContent(locale);

  const items: ProjectWithShots[] = getProjects(locale).map((project) => {
    // A screenshot is only wired up when the file is really there, so a
    // missing asset drops out of the gallery instead of becoming a 404. A
    // project left with no shots falls back to the typographic plate.
    const shots = (project.gallery ?? []).filter((shot) =>
      existsSync(join(process.cwd(), "public", shot.src)),
    );
    return { ...project, shots };
  });

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative z-10 py-24 md:py-32"
    >
      <div className="shell">
        <div className="flex flex-col gap-4 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal variant="fade">
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
                {t.projects.eyebrow}
              </p>
            </Reveal>
            <Reveal variant="mask" delay={0.06}>
              <h2
                id="work-heading"
                className="mt-4 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[0.88] tracking-tight"
              >
                {t.projects.headingLead}
                <br />
                <span className="text-fg-faint">{t.projects.headingTail}</span>
              </h2>
            </Reveal>
          </div>
          <Reveal variant="up" delay={0.14}>
            <p className="max-w-xs text-sm leading-relaxed text-fg-dim">
              {t.projects.note}
            </p>
          </Reveal>
        </div>

        <ProjectsGrid
          items={items}
          locale={locale}
          liveDemoLabel={t.projects.liveDemo}
        />
      </div>
    </section>
  );
}
