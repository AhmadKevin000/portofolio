import { existsSync } from "node:fs";
import { join } from "node:path";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectsGrid, type ProjectWithAsset } from "@/components/sections/ProjectsGrid";
import { projects } from "@/content/site";

/**
 * Server Component. Resolves which screenshots actually exist on disk, then
 * hands a plain serialisable array to the client grid that owns the motion.
 */
export default function Projects() {
  const items: ProjectWithAsset[] = projects.map((project) => {
    const hasImage = existsSync(
      join(process.cwd(), "public", "images", `${project.id}.jpg`),
    );
    return {
      ...project,
      imageSrc: hasImage ? `/images/${project.id}.jpg` : null,
    };
  });

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative bg-surface-1 py-24 md:py-32"
    >
      <div className="shell">
        <div className="flex flex-col gap-4 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal variant="fade">
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
                Selected projects
              </p>
            </Reveal>
            <Reveal variant="mask" delay={0.06}>
              <h2
                id="work-heading"
                className="mt-4 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[0.88] tracking-tight"
              >
                Work in progress,
                <br />
                <span className="text-fg-faint">stated honestly.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal variant="up" delay={0.14}>
            <p className="max-w-xs text-sm leading-relaxed text-fg-dim">
              Two projects are active right now. Neither is finished, and
              neither is presented as finished.
            </p>
          </Reveal>
        </div>

        <ProjectsGrid items={items} />
      </div>
    </section>
  );
}
