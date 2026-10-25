"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGsapScope, prefersReducedMotion, hasFinePointer } from "@/lib/gsap";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import type { Project, ProjectShot } from "@/content/site";
import type { Locale } from "@/lib/i18n";

export type ProjectWithShots = Project & { shots: ProjectShot[] };

/**
 * Typographic stand-in for a project with no screenshots on disk.
 *
 * A real screenshot is rendered only when the file actually exists, so a
 * missing asset never produces a broken image or a 404. Until then the plate is
 * a deliberate composition — an outlined index numeral on a tonal surface —
 * not a fake screenshot and not a developer note.
 */
function ProjectPlate({ project }: { project: ProjectWithShots }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-surface-2 lg:aspect-[5/4]">
      {/* Hairline grid: structure, not decoration. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Outlined numeral as the single focal element. */}
      <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
        <span
          data-plate-numeral
          className="font-display text-[clamp(5rem,17vw,13rem)] font-extrabold leading-none tracking-tight text-transparent"
          style={{ WebkitTextStroke: "1.5px var(--line-3)" }}
        >
          {project.index}
        </span>
      </div>

      <div className="relative flex h-full flex-col justify-between p-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fg-faint">
          {project.kind}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint">
          {project.name}
        </span>
      </div>

      {/* Pointer-tracked sheen. Pure CSS on top of two custom properties. */}
      <div aria-hidden="true" className="card-glow" />
    </div>
  );
}

/**
 * Writes the pointer position into the card as percentages. No React state —
 * this fires on every pointermove and must not re-render anything.
 */
function useCardPointer(ref: React.RefObject<HTMLElement | null>) {
  const frame = useRef<number | null>(null);

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!hasFinePointer()) return;
    const el = ref.current;
    if (!el || frame.current !== null) return;

    const { clientX, clientY } = e;
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      const r = el.getBoundingClientRect();
      if (r.width === 0) return;
      el.style.setProperty("--mx", (((clientX - r.left) / r.width) * 100).toFixed(2));
      el.style.setProperty("--my", (((clientY - r.top) / r.height) * 100).toFixed(2));
    });
  };

  return { onPointerMove: onMove };
}

function ProjectCard({
  project,
  flipped,
  locale,
  liveDemoLabel,
}: {
  project: ProjectWithShots;
  flipped: boolean;
  locale: Locale;
  liveDemoLabel: string;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const pointer = useCardPointer(cardRef);

  // The live demo sits in the same action row as any other project links, so
  // there is one place to look for a way out of the card.
  const links = project.liveUrl
    ? [{ label: liveDemoLabel, href: project.liveUrl }, ...project.links]
    : project.links;

  return (
    <article
      ref={cardRef}
      data-card
      aria-labelledby={`project-${project.id}`}
      onPointerMove={pointer.onPointerMove}
      className="group grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12"
    >
      <div
        data-card-part
        className={`lg:col-span-6 ${flipped ? "lg:order-2 lg:col-start-7" : ""}`}
      >
        <div className="transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
          {project.shots.length > 0 ? (
            // The gallery owns its own outbound link, on the active screenshot
            // only: wrapping the whole deck in an <a> would nest the pager
            // buttons inside a link.
            <ProjectGallery
              shots={project.shots}
              label={project.name}
              liveUrl={project.liveUrl}
              locale={locale}
            />
          ) : (
            <ProjectPlate project={project} />
          )}
        </div>
      </div>

      <div
        className={`lg:col-span-5 ${
          flipped ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"
        }`}
      >
        <div data-card-part className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fg-faint">
            {project.index} / {project.kind}
          </span>
          <span className="inline-flex items-center gap-2 border border-accent/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            {project.status}
          </span>
        </div>

        <h3
          data-card-part
          id={`project-${project.id}`}
          className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[0.94] tracking-tight"
        >
          {project.name}
        </h3>

        <p
          data-card-part
          className="mt-4 max-w-md text-[15px] leading-relaxed text-fg-dim"
        >
          {project.summary}
        </p>

        <dl className="mt-7 space-y-5">
          {project.sections.map((section) => (
            <div key={section.label} data-card-part>
              <dt className="font-mono text-[10px] uppercase tracking-[0.26em] text-fg-faint">
                {section.label}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-fg-dim">
                {section.body}
              </dd>
            </div>
          ))}
        </dl>

        {project.stack.length > 0 && (
          <ul data-card-part className="mt-7 flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <li
                key={t}
                className="border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-dim"
              >
                {t}
              </li>
            ))}
          </ul>
        )}

        {links.length > 0 && (
          <div data-card-part className="mt-7 flex flex-wrap gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-line-2 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-fg transition-colors hover:border-accent hover:text-accent"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export function ProjectsGrid({
  items,
  locale,
  liveDemoLabel,
}: {
  items: ProjectWithShots[];
  locale: Locale;
  liveDemoLabel: string;
}) {
  const scopeRef = useGsapScope<HTMLDivElement>(({ gsap, scope }) => {
    if (prefersReducedMotion()) return;

    const q = gsap.utils.selector(scope);
    const cards = q("[data-card]") as HTMLElement[];

    cards.forEach((card) => {
      const parts = card.querySelectorAll("[data-card-part]");

      gsap.fromTo(
        card,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: card, start: "top 86%", once: true },
        },
      );

      gsap.fromTo(
        parts,
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.075,
          delay: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 86%", once: true },
        },
      );

      // The numeral drifts inside its frame — enough to register as depth,
      // small enough that it never collides with the frame edges.
      const numeral = card.querySelector("[data-plate-numeral]");
      if (numeral) {
        gsap.fromTo(
          numeral,
          { yPercent: 9 },
          {
            yPercent: -9,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.9,
            },
          },
        );
      }
    });
  }, []);

  return (
    <div ref={scopeRef} className="mt-16 space-y-24 md:mt-24 md:space-y-32">
      {items.map((project, i) => (
        <ProjectCard
          key={project.id}
          project={project}
          flipped={i % 2 === 1}
          locale={locale}
          liveDemoLabel={liveDemoLabel}
        />
      ))}
    </div>
  );
}
