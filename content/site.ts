/**
 * Single source of truth for the site.
 *
 * Split in two:
 *
 *   - **Structure** lives here: ids, ordering, asset paths, intrinsic image
 *     sizes, external hrefs, technology names, statuses. None of it changes
 *     with the language, and duplicating it per locale would let the two
 *     copies drift.
 *   - **Copy** lives in `content/en.ts` and `content/id.ts`, typed by the
 *     `Dictionary` below so a missing translation is a compile error.
 *
 * `getContent(locale)` merges the two. Components never branch on the locale;
 * they read a finished object.
 *
 * Content rules (AGENTS.md §5):
 * - Nothing here is invented.
 * - Anything not confirmed by the owner is simply absent — the UI is
 *   designed to read as finished when a field is empty.
 * - No public contact detail appears here unless the owner approved it.
 */

import type { Locale } from "@/lib/i18n";
import { en } from "@/content/en";
import { id } from "@/content/id";

/* ------------------------------------------------------------------ */
/* Identity                                                            */
/* ------------------------------------------------------------------ */

/**
 * Locale-independent identity. Proper nouns are never translated, so the
 * name, the nickname and the profile URLs exist exactly once.
 */
export const profile = {
  nickname: "Kepin",
  fullName: "Ahmad Kevin",
  location: "Indonesia",
  /**
   * Only verified channels. GitHub is confirmed by `git remote -v`; Instagram
   * and LinkedIn were supplied directly by the owner. No email: it has not
   * been approved for public display.
   */
  links: {
    github: "https://github.com/AhmadKevin000",
    instagram: "https://www.instagram.com/kemii.zkaria/",
    linkedin:
      "https://id.linkedin.com/in/ahmad-kevin-malik-zakaria-78069b364",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Documents                                                           */
/* ------------------------------------------------------------------ */

/**
 * Public URL of the owner's CV PDF.
 *
 * The file lives at `public/cv/ahmad-kevin-cv.pdf`. Drop it in and the CV link
 * in the contact section appears on the next build — the existence check is a
 * build-time `existsSync`, not a placeholder. Do not point this at a generated
 * or substituted document.
 */
export const CV_PATH = "/cv/ahmad-kevin-cv.pdf";

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

/**
 * One screenshot in a project's Polaroid gallery.
 *
 * `caption` is the short line printed on the Polaroid's bottom band. `alt` is
 * the description a screen reader gets — deliberately separate, because the
 * caption is a label, not a substitute for describing what is in the frame.
 */
export type ProjectShot = {
  /** Path under `public/`. Only rendered when the file exists on disk. */
  src: string;
  /** Intrinsic pixel size, used to keep the frame at the screenshot's ratio. */
  width: number;
  height: number;
  alt: string;
  /** 1–3 words. Must name what the screenshot actually shows. */
  caption: string;
};

export type Project = {
  id: string;
  index: string;
  name: string;
  kind: string;
  status: string;
  summary: string;
  /** Case-study blocks. Only factual, owner-supported statements. */
  sections: { label: string; body: string }[];
  /** Only technologies confirmed in the project's own manifest. */
  stack: string[];
  /** Empty until a real, public URL exists. */
  links: { label: string; href: string }[];
  /**
   * Screenshots, in reading order. Empty or absent until real captures are
   * added to `public/` — never a mockup. One shot renders as a single Polaroid
   * with no navigation; two or more render as a stack.
   */
  gallery?: ProjectShot[];
  /** Set only for projects that are actually deployed and reachable. */
  liveUrl?: string;
};

/**
 * Screenshots and links, in reading order. Shared by both locales: the files
 * are the same files, and a typo in a second copy would only surface as a
 * broken image.
 */
const projectBases = [
  {
    id: "kaifa",
    index: "01",
    name: "Bimbel KAIFA",
    gallery: [
      { src: "/images/kaifa/kaifa-home.png", width: 2940, height: 1376 },
      { src: "/images/kaifa/kaifa-admin.png", width: 2940, height: 1550 },
      {
        src: "/images/kaifa/kaifa-admin-kas.png",
        width: 2940,
        height: 1538,
      },
    ],
    stack: ["Laravel", "Filament", "MySQL"],
    liveUrl: "https://bimbelkaifa.alwaysdata.net/",
  },
  {
    id: "roastmate",
    index: "02",
    name: "RoastMate",
    gallery: [
      {
        src: "/images/roastmate/roastmate-camera.png",
        width: 1080,
        height: 2400,
      },
      {
        src: "/images/roastmate/roastmate-home.png",
        width: 1080,
        height: 2400,
      },
    ],
    stack: ["Flutter", "Dart", "Riverpod"],
    liveUrl: undefined,
  },
] as const;

export type ProjectId = (typeof projectBases)[number]["id"];

/** The screenshots belonging to one project. */
type ShotSrcFor<P extends ProjectId> = Extract<
  (typeof projectBases)[number],
  { id: P }
>["gallery"][number]["src"];

/** Every screenshot path on the site, across both projects. */
export type ShotSrc = (typeof projectBases)[number]["gallery"][number]["src"];

/* ------------------------------------------------------------------ */
/* Technical arsenal                                                   */
/* ------------------------------------------------------------------ */

/**
 * Every entry below was checked against source, not memory:
 *
 * - This portfolio repo → Next.js, React, TypeScript, Tailwind, GSAP.
 * - `PBL_Semester4` (Bimbel KAIFA) → Laravel 12, PHP 8.3, Filament 4,
 *   MySQL (`composer.json`, `database/migrations`, `.env.example`); the
 *   Filament `admin` and `guru` panels match the admin/teacher claim.
 * - `pt_aft` (PT AFT) → Prisma 7 on PostgreSQL (`prisma/schema.prisma`,
 *   `@prisma/adapter-pg`); the name comes from `src/lib/site.ts`.
 * - `pbl_sem5` (RoastMate) → Flutter, Dart, Riverpod, `camera`, `sqflite`
 *   (`mobile/pubspec.yaml`, `mobile/lib/`); YOLOv8n-cls training,
 *   evaluation and INT8 export in `ml/`.
 *
 * Deliberately absent because the evidence does not support them:
 * GoRouter (not in `pubspec.yaml`, not imported), `tflite_flutter` and
 * OpenCV (neither is a dependency; the model is exported but not wired in).
 * They appear only under `planned`, which is what the docs actually say.
 */
export type TechStatus = "used" | "in-progress" | "experiment" | "planned";

export type TechItem = {
  name: string;
  context?: string;
  /**
   * Which project a technology was used in. Only set for categories that span
   * more than one project — everywhere else the category note already names it,
   * and repeating it on every row is noise.
   */
  project?: string;
  status: TechStatus;
};

export type TechCategory = {
  id: string;
  title: string;
  note: string;
  items: TechItem[];
};

/**
 * Names and statuses only. The wording lives in the dictionary, keyed by
 * `id` and by technology name, so neither locale can silently reorder or drop
 * an entry.
 */
const techBases = [
  {
    id: "web",
    items: [
      { name: "Next.js", status: "used" },
      { name: "React", status: "used" },
      { name: "TypeScript", status: "used" },
      { name: "Tailwind CSS", status: "used" },
      { name: "GSAP", status: "used" },
      { name: "ScrollTrigger", status: "used" },
    ],
  },
  {
    id: "mobile",
    items: [
      { name: "Flutter", status: "used" },
      { name: "Dart", status: "used" },
      { name: "Riverpod", status: "used" },
      { name: "camera", status: "used" },
      // Schema and seeding are real; the history screen still reads mock data,
      // so the write path is genuinely unfinished. "In progress" is the honest
      // label, not a hedge.
      { name: "sqflite", status: "in-progress" },
    ],
  },
  {
    id: "ml",
    items: [
      { name: "Python", status: "used" },
      { name: "YOLOv8n-cls", status: "experiment" },
      { name: "Image classification", status: "experiment" },
      { name: "Model evaluation", status: "used" },
      { name: "Dataset curation", status: "used" },
      // Exported and verified as a file, but `tflite_flutter` is not a
      // dependency — so this is "experiment", never "used in the app".
      { name: "TensorFlow Lite", status: "experiment" },
      { name: "Object detection", status: "planned" },
      { name: "OpenCV", status: "planned" },
    ],
  },
  {
    id: "backend",
    items: [
      { name: "Laravel", status: "used" },
      { name: "PHP", status: "used" },
      { name: "Filament", status: "used" },
      { name: "MySQL", status: "used" },
      { name: "PostgreSQL", status: "used" },
      { name: "Prisma", status: "used" },
    ],
  },
] as const;

export type TechCategoryId = (typeof techBases)[number]["id"];
export type TechItemName = (typeof techBases)[number]["items"][number]["name"];

/**
 * Only the backend category spans two projects, so only its rows name one.
 * Keyed by technology name so a rename cannot leave a stale tag behind.
 */
const techProjects: Partial<Record<TechItemName, string>> = {
  Laravel: "Bimbel KAIFA",
  PHP: "Bimbel KAIFA",
  Filament: "Bimbel KAIFA",
  MySQL: "Bimbel KAIFA",
  PostgreSQL: "PT AFT",
  Prisma: "PT AFT",
};

/**
 * How each status reads on screen. The dot is never the only signal — the
 * label is always rendered next to it, so the distinction survives greyscale
 * and colour blindness.
 */
export const techStatusMeta: Record<
  TechStatus,
  { dot: string; text: string }
> = {
  used: { dot: "bg-accent", text: "text-accent" },
  "in-progress": {
    dot: "bg-accent/25 ring-1 ring-accent",
    text: "text-fg",
  },
  experiment: { dot: "bg-fg-dim", text: "text-fg-dim" },
  planned: { dot: "ring-1 ring-line-3", text: "text-fg-faint" },
};

export const techStatusOrder: TechStatus[] = [
  "used",
  "in-progress",
  "experiment",
  "planned",
];

/* ------------------------------------------------------------------ */
/* Beyond the code                                                     */
/* ------------------------------------------------------------------ */

export type StoryChapter = {
  id: string;
  index: string;
  title: string;
  lede: string;
  entries: { title: string; body: string }[];
};

const storyBases = [
  { id: "communication", index: "01" },
  { id: "leadership", index: "02" },
  { id: "technology", index: "03" },
] as const;

export type StoryChapterId = (typeof storyBases)[number]["id"];

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export type NavId = "about" | "work" | "arsenal" | "beyond" | "contact";

/**
 * Section anchors are identical in both locales — the sections are the same
 * sections, so a hash survives a language switch.
 */
export const navItems: { id: NavId; href: string }[] = [
  { id: "about", href: "#about" },
  { id: "work", href: "#work" },
  { id: "arsenal", href: "#arsenal" },
  { id: "beyond", href: "#beyond" },
  { id: "contact", href: "#contact" },
];

/* ------------------------------------------------------------------ */
/* Dictionary shape                                                    */
/* ------------------------------------------------------------------ */

export type ProjectCopy<P extends ProjectId = ProjectId> = {
  kind: string;
  status: string;
  summary: string;
  sections: { label: string; body: string }[];
  /** Keyed by screenshot path, so every frame in *this* project is captioned. */
  shots: Record<ShotSrcFor<P>, { caption: string; alt: string }>;
};

export type Dictionary = {
  meta: {
    title: string;
    description: string;
    ogDescription: string;
  };
  ui: {
    opensInNewTab: string;
  };
  nav: {
    ariaLabel: string;
    skipToProjects: string;
    languageLabel: string;
    labels: Record<NavId, string>;
  };
  hero: {
    eyebrow: string;
    knownAs: string;
    intro: string;
    roleLabel: string;
    baseLabel: string;
    role: string;
    cta: string;
    /** The h1 has no visible text of its own, so it needs a spoken name. */
    nameAria: (fullName: string, nickname: string) => string;
  };
  about: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    seeWork: string;
    getInTouch: string;
    /** "portrait" / "potret" — the full name is prepended by the caller. */
    portraitLabel: string;
  };
  manifesto: {
    words: readonly [string, string, string];
    kicker: string;
  };
  projects: {
    eyebrow: string;
    headingLead: string;
    headingTail: string;
    note: string;
    liveDemo: string;
    /** Mapped per project so each one only has to caption its own shots. */
    items: { [P in ProjectId]: ProjectCopy<P> };
  };
  gallery: {
    navLabel: string;
    /**
     * The controls are icon-only, so these two are the *only* thing that names
     * them. They describe images because that is what the pager moves between:
     * every shot in the deck belongs to one project.
     */
    previousAria: string;
    nextAria: string;
    /** Names the group: "Bimbel KAIFA screenshots". */
    groupAria: (projectName: string) => string;
    /** Spoken counter, since the visible one is just "01 / 03". */
    counter: (current: number, total: number, caption: string) => string;
  };
  arsenal: {
    eyebrow: string;
    heading: string;
    description: string;
    statusKeyLabel: string;
    statusLabels: Record<TechStatus, string>;
    toolsLabel: string;
    toolsNote: string;
    atlas: {
      eyebrow: string;
      hint: string;
      entriesLabel: string;
      domainsLabel: string;
      categoriesAria: string;
      /** Joins a range: "{first}–{last} of {total}". */
      rangeOf: string;
      categories: Record<TechCategoryId, { title: string; note: string }>;
      contexts: Record<TechItemName, string>;
    };
  };
  beyond: {
    eyebrow: string;
    headingLead: string;
    headingTail: string;
    lede: string;
    chapters: Record<
      StoryChapterId,
      { title: string; lede: string; entries: { title: string; body: string }[] }
    >;
  };
  contact: {
    eyebrow: string;
    headingLead: string;
    headingTail: string;
    body: string;
    github: string;
    instagram: string;
    linkedin: string;
    downloadCv: string;
    backToTop: string;
  };
};

/* ------------------------------------------------------------------ */
/* Registry                                                            */
/* ------------------------------------------------------------------ */

const dictionaries: Record<Locale, Dictionary> = { en, id };

/** All copy for one locale. */
export function getContent(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Projects with the active locale's copy merged onto the shared assets. */
export function getProjects(locale: Locale): Project[] {
  const copy = getContent(locale).projects.items;

  return projectBases.map((base) => {
    const text = copy[base.id];
    const shots = base.gallery as readonly {
      src: ShotSrc;
      width: number;
      height: number;
    }[];
    // The loop already pairs each project with its own copy, so widening the
    // key set here is safe — and it is the only place the two are joined.
    const shotsCopy = text.shots as Record<
      ShotSrc,
      { caption: string; alt: string }
    >;

    return {
      id: base.id,
      index: base.index,
      name: base.name,
      kind: text.kind,
      status: text.status,
      summary: text.summary,
      sections: text.sections.map((section) => ({ ...section })),
      stack: [...base.stack],
      links: [],
      liveUrl: base.liveUrl,
      gallery: shots.map((shot) => ({
        src: shot.src,
        width: shot.width,
        height: shot.height,
        caption: shotsCopy[shot.src].caption,
        alt: shotsCopy[shot.src].alt,
      })),
    };
  });
}

/** Technology atlas with the active locale's copy merged onto the names. */
export function getTechCategories(locale: Locale): TechCategory[] {
  const copy = getContent(locale).arsenal.atlas;

  return techBases.map((base) => {
    const items = base.items as readonly {
      name: TechItemName;
      status: TechStatus;
    }[];

    return {
      id: base.id,
      title: copy.categories[base.id].title,
      note: copy.categories[base.id].note,
      items: items.map((item) => ({
        name: item.name,
        context: copy.contexts[item.name],
        project: techProjects[item.name],
        status: item.status,
      })),
    };
  });
}

/** Beyond the Code chapters, in the fixed order. */
export function getStoryChapters(locale: Locale): StoryChapter[] {
  const copy = getContent(locale).beyond.chapters;

  return storyBases.map((base) => ({
    id: base.id,
    index: base.index,
    ...copy[base.id],
  }));
}

/** Header anchors with localized labels. */
export function getNavItems(locale: Locale): { href: string; label: string }[] {
  const labels = getContent(locale).nav.labels;

  return navItems.map((item) => ({ href: item.href, label: labels[item.id] }));
}
