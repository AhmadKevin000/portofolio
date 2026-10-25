/**
 * Single source of truth for every piece of copy on the site.
 *
 * Content rules (AGENTS.md §5):
 * - Nothing here is invented.
 * - Anything not confirmed by the owner is simply absent — the UI is
 *   designed to read as finished when a field is empty.
 * - No public contact detail appears here unless the owner approved it.
 */

export const profile = {
  nickname: "Kepin",
  fullName: "Ahmad Kevin",
  /** Change this one string to re-scope the hero + about copy. */
  role: "IT Student & Developer",
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
  heroIntro:
    "Building interfaces, learning in public, and shipping projects that are still in progress — honestly.",
  aboutIntro: [
    "I'm a student who got into software because I wanted to make things people could actually use, not because I wanted a title.",
    "Most of what I know comes from building: a tutoring platform, a mobile app that is still fighting its machine-learning problems, and this site.",
    "Outside the editor I teach, speak in front of rooms, and drive for ShopeeFood. Different contexts, same skill — explaining something clearly and then following through.",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Documents                                                           */
/* ------------------------------------------------------------------ */

/**
 * Public URL of the owner's CV PDF.
 *
 * No PDF exists in the repo yet, so nothing links to this. Drop the file at
 * `public/cv/ahmad-kevin-cv.pdf` and the CV item in the contact dock appears
 * on the next build — the existence check is a build-time `existsSync`, not a
 * placeholder. Do not point this at a generated or substituted document.
 */
export const CV_PATH = "/cv/ahmad-kevin-cv.pdf";

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type Project = {
  id: string;
  index: string;
  name: string;
  kind: string;
  status: string;
  summary: string;
  /** Case-study blocks. Only factual, owner-supported statements. */
  sections: { label: string; body: string }[];
  /** Empty until a stack is confirmed. Never guessed. */
  stack: string[];
  /** Empty until a real, public URL exists. */
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: "kaifa",
    index: "01",
    name: "Bimbel KAIFA",
    kind: "Web platform",
    status: "In development",
    summary:
      "A web project for Bimbel KAIFA, a tutoring centre. Currently being built — it has not been released.",
    sections: [
      {
        label: "Context",
        body: "Bimbel KAIFA is a tutoring centre. This is a web project built for it.",
      },
      {
        label: "Current stage",
        body: "Still under construction. There is no public release yet.",
      },
    ],
    stack: [],
    links: [],
  },
  {
    id: "roastmate",
    index: "02",
    name: "RoastMate",
    kind: "Mobile application",
    status: "In development",
    summary:
      "A mobile application in active development. The machine-learning component is the open problem right now.",
    sections: [
      {
        label: "Current stage",
        body: "In development. Some implementation work exists; the product is not finished.",
      },
      {
        label: "Open problem",
        body: "The machine-learning component is unfinished. No model is claimed as working here.",
      },
      {
        label: "Intended direction",
        body: "Computer vision is the intended approach. It has not been validated yet.",
      },
    ],
    stack: [],
    links: [],
  },
];

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
 * How each status reads on screen. The dot is never the only signal — the
 * label is always rendered next to it, so the distinction survives greyscale
 * and colour blindness.
 */
export const techStatusMeta: Record<
  TechStatus,
  { label: string; dot: string; text: string }
> = {
  used: { label: "Used", dot: "bg-accent", text: "text-accent" },
  "in-progress": {
    label: "In progress",
    dot: "bg-accent/25 ring-1 ring-accent",
    text: "text-fg",
  },
  experiment: { label: "Experiment", dot: "bg-fg-dim", text: "text-fg-dim" },
  planned: {
    label: "Planned",
    dot: "ring-1 ring-line-3",
    text: "text-fg-faint",
  },
};

export const techStatusOrder: TechStatus[] = [
  "used",
  "in-progress",
  "experiment",
  "planned",
];

export const techCategories: TechCategory[] = [
  {
    id: "web",
    title: "Web Development",
    note: "Interfaces, layout systems, and scroll choreography.",
    items: [
      { name: "Next.js", context: "App Router, this site", status: "used" },
      { name: "React", context: "Component architecture", status: "used" },
      { name: "TypeScript", context: "Strict mode, typed props", status: "used" },
      { name: "Tailwind CSS", context: "Design tokens, layout", status: "used" },
      { name: "GSAP", context: "Scroll choreography", status: "used" },
      { name: "ScrollTrigger", context: "Scrubbed timelines", status: "used" },
    ],
  },
  {
    id: "mobile",
    title: "Mobile Development",
    note: "RoastMate — a Flutter app, still in development.",
    items: [
      { name: "Flutter", context: "App shell, screens, theme", status: "used" },
      { name: "Dart", context: "Application language", status: "used" },
      {
        name: "Riverpod",
        context: "State and dependency injection",
        status: "used",
      },
      {
        name: "camera",
        context: "Live preview, capture to file",
        status: "used",
      },
      {
        name: "sqflite",
        // Schema and seeding are real; the history screen still reads mock
        // data, so the write path is genuinely unfinished. "In progress"
        // is the honest label, not a hedge.
        context: "Schema and seed done; history still on mock data",
        status: "in-progress",
      },
    ],
  },
  {
    id: "ml",
    title: "Machine Learning & Computer Vision",
    // No "validated" language anywhere in this group. The external check in
    // `EXT-ROAST-002-DS006` scored 33.92%, so generalisation is unproven and
    // the note says so.
    note: "RoastMate research. Trained and evaluated, not shipped; generalisation to unseen photos is unproven.",
    items: [
      {
        name: "Python",
        context: "Training and evaluation scripts",
        status: "used",
      },
      {
        name: "YOLOv8n-cls",
        context: "Roast classifier, four classes",
        status: "experiment",
      },
      {
        name: "Image classification",
        context: "Fine-tuning a pretrained backbone",
        status: "experiment",
      },
      {
        name: "Model evaluation",
        context: "Macro-F1, confusion matrix, external set",
        status: "used",
      },
      {
        name: "Dataset curation",
        context: "Duplicate and near-duplicate removal",
        status: "used",
      },
      {
        name: "TensorFlow Lite",
        // Exported and verified as a file, but `tflite_flutter` is not a
        // dependency — so this is "experiment", never "used in the app".
        context: "INT8 file exported, not wired into the app",
        status: "experiment",
      },
      {
        name: "Object detection",
        context: "Not implemented — bean detector unbuilt",
        status: "planned",
      },
      {
        name: "OpenCV",
        context: "Not implemented — shape analysis still planned",
        status: "planned",
      },
    ],
  },
  {
    id: "backend",
    title: "Data & Backend",
    note: "Server-side work across two projects.",
    items: [
      {
        name: "Laravel",
        context: "Application framework",
        project: "Bimbel KAIFA",
        status: "used",
      },
      {
        name: "PHP",
        context: "Server language",
        project: "Bimbel KAIFA",
        status: "used",
      },
      {
        name: "Filament",
        context: "Admin and teacher panels",
        project: "Bimbel KAIFA",
        status: "used",
      },
      {
        name: "MySQL",
        context: "Application data",
        project: "Bimbel KAIFA",
        status: "used",
      },
      {
        name: "PostgreSQL",
        context: "Content and admin data",
        project: "PT AFT",
        status: "used",
      },
      {
        name: "Prisma",
        context: "Schema, migrations, typed client",
        project: "PT AFT",
        status: "used",
      },
    ],
  },
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

export const storyChapters: StoryChapter[] = [
  {
    id: "communication",
    index: "01",
    title: "Communication & Education",
    lede: "Most of what I do outside code is explaining things to people who did not ask for a lecture.",
    entries: [
      {
        title: "Pesantren & public speaking",
        body: "Studied at a pesantren, where speaking in front of a room was part of the routine, not an event.",
      },
      {
        title: "Paid sermons at several mosques",
        body: "Delivered ceramah and khotbah for a fee at a number of mosques.",
      },
      {
        title: "Master of ceremonies",
        body: "Have run events as MC — holding the room, keeping the order, keeping time.",
      },
      {
        title: "Teaching primary school children",
        body: "Taught SD students at a tutoring centre while I was in SMA.",
      },
      {
        title: "Polinema Mengajar",
        body: "Worked in external relations for Polinema Mengajar. Now demisioner, but sometimes still teaches.",
      },
    ],
  },
  {
    id: "community",
    index: "02",
    title: "Community & Collaboration",
    lede: "Showing up for people when the work is unglamorous.",
    entries: [
      {
        title: "Orientation committee, 2025",
        body: "Served on the security and health committee for the 2025 IT student orientation.",
      },
    ],
  },
  {
    id: "realworld",
    index: "03",
    title: "Real-World Experience",
    lede: "Work that has nothing to do with a laptop, and taught me the most about people.",
    entries: [
      {
        title: "ShopeeFood driver",
        body: "Roughly eight months and still active. Time pressure, strangers, and no room for a bad day.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const navItems = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#arsenal", label: "Toolkit" },
  { href: "#beyond", label: "Story" },
  { href: "#contact", label: "Contact" },
] as const;

export const manifesto = ["INNOVATE", "WITH", "PURPOSE"] as const;
