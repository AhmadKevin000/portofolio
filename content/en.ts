/**
 * English copy.
 *
 * Structure lives in `content/site.ts`; this file is only the words. The type
 * is imported with `import type`, so there is no runtime cycle: the module
 * never imports the registry that imports it.
 *
 * Every string here was reviewed for the owner's voice — first person, plain,
 * no slogans, no metrics, no claims the projects cannot back up.
 */

import type { Dictionary } from "@/content/site";

export const en: Dictionary = {
  meta: {
    title: "Ahmad Kevin — Kepin · Informatics Student & Developer",
    description:
      "Portfolio of Ahmad Kevin (Kepin), an informatics student at Polinema building web and mobile projects.",
    ogDescription:
      "Informatics Student & Developer. Web and mobile projects, and the experience behind them.",
  },

  ui: {
    opensInNewTab: "(opens in a new tab)",
  },

  nav: {
    ariaLabel: "Sections",
    skipToProjects: "Skip to projects",
    languageLabel: "Language",
    labels: {
      about: "About",
      work: "Work",
      arsenal: "Toolkit",
      beyond: "Story",
      contact: "Contact",
    },
  },

  hero: {
    eyebrow: "Informatics Student — Portfolio",
    knownAs: "known as",
    intro:
      "Curious by nature, adaptable by habit, and always up for a good conversation, an unexpected fun fact, or a cup of coffee.",
    roleLabel: "Role",
    baseLabel: "Base",
    role: "Informatics Student & Developer",
    cta: "Explore Projects",
    nameAria: (fullName, nickname) => `${fullName}, known as ${nickname}`,
  },

  about: {
    eyebrow: "A little about me",
    heading: "Hi, I'm Kevin.",
    paragraphs: [
      "I'm naturally curious about how things work, whether it's a new technology, an unfamiliar problem, or a random fact worth exploring. I enjoy learning by experimenting, adapting to new situations, and turning ideas into something practical.",
      "Beyond coding, I've spent time hosting events, teaching, and working with different communities. These experiences have taught me to communicate with different people, stay adaptable, and approach challenges from different perspectives. I bring that same mindset into the way I learn, collaborate, and build things.",
    ],
    seeWork: "See the work",
    getInTouch: "Get in touch",
    portraitLabel: "portrait",
  },

  manifesto: {
    words: ["INNOVATE", "WITH", "PURPOSE"],
    kicker:
      "A feature earns its place when it answers a question someone actually asked. That is the standard I work to.",
  },

  projects: {
    eyebrow: "Selected projects",
    headingLead: "What I'm building,",
    headingTail: "and where it stands.",
    note: "Bimbel KAIFA is live. RoastMate is still in development.",
    liveDemo: "Live demo",
    items: {
      kaifa: {
        kind: "Web platform",
        status: "Live",
        summary:
          "The website for Bimbel KAIFA, a tutoring centre: a public landing page, plus an admin panel for running the day-to-day.",
        sections: [
          {
            label: "Public site",
            body: "Programmes, facilities, and FAQ, with registration handled over WhatsApp.",
          },
          {
            label: "Admin panel",
            body: "Students, teachers, class sessions, attendance, and payments in one place.",
          },
        ],
        shots: {
          "/images/kaifa/kaifa-home.png": {
            caption: "Public Website",
            alt: "Bimbel KAIFA homepage: the headline \u201cBelajar lebih percaya diri, bertumbuh setiap hari\u201d beside a photo of students studying, with a WhatsApp registration button.",
          },
          "/images/kaifa/kaifa-admin.png": {
            caption: "Admin Dashboard",
            alt: "Bimbel KAIFA admin dashboard: totals for teachers, students and classes, today's session list, and a sidebar for attendance, reports and question banks.",
          },
          "/images/kaifa/kaifa-admin-kas.png": {
            caption: "Cashflow Management",
            alt: "Bimbel KAIFA cashflow screen: total income, total spending and remaining balance above a filterable transaction table with categories and amounts.",
          },
        },
      },
      roastmate: {
        kind: "Mobile application",
        status: "In development",
        summary:
          "A Flutter app for inspecting coffee beans with computer vision. The camera interface and scan screen are implemented; the machine-learning side is still under development.",
        sections: [
          {
            label: "Working now",
            body: "The app shell, navigation, and the scan screen are implemented. The camera plugin opens a live viewfinder and a capture is saved to the device.",
          },
          {
            label: "Machine learning",
            body: "A roast classifier is trained on four classes and exported to TensorFlow Lite, but it is not connected to the app. No inference runs on a captured photo today.",
          },
          {
            label: "Not built yet",
            body: "Defect detection and bean-level classification are planned, not implemented. The history screen still reads placeholder data instead of the database.",
          },
        ],
        shots: {
          "/images/roastmate/roastmate-camera.png": {
            caption: "Camera Interface",
            alt: "RoastMate camera interface on Android: a live viewfinder inside a scan frame, with a scan-mode pill, a lighting badge, zoom steps, gallery and flash buttons, and a shutter.",
          },
          "/images/roastmate/roastmate-home.png": {
            caption: "Application Home",
            alt: "RoastMate home screen on Android: a welcome heading, a bean-composition card with a donut chart, two summary cards, a \u201cScan Batch Baru\u201d panel with a camera button, and a bottom bar for Beranda, Analisis and Seduh. The figures on this screen are placeholder values, not analysis results.",
          },
        },
      },
    },
  },

  gallery: {
    navLabel: "Screenshot navigation",
    previousAria: "Previous image",
    nextAria: "Next image",
    groupAria: (projectName) => `${projectName} screenshots`,
    counter: (current, total, caption) =>
      `Screenshot ${current} of ${total}: ${caption}`,
  },

  arsenal: {
    eyebrow: "Technical arsenal",
    heading: "The index.",
    description:
      "Each entry is tagged with where it stands: in use, still being wired up, proven in an experiment, or planned.",
    statusKeyLabel: "Technology status key",
    statusLabels: {
      used: "Used",
      "in-progress": "In progress",
      experiment: "Experiment",
      planned: "Planned",
    },
    toolsLabel: "Tools & Workflow",
    toolsNote:
      "Managing code changes with Git and collaborating through GitHub.",
    atlas: {
      eyebrow: "Technology atlas",
      hint: "Explore by domain",
      entriesLabel: "entries",
      domainsLabel: "domains",
      categoriesAria: "Technology categories",
      rangeOf: "of",
      categories: {
        web: {
          title: "Web Development",
          note: "Interfaces, layout, and motion.",
        },
        mobile: {
          title: "Mobile Development",
          note: "RoastMate, a Flutter app still in development.",
        },
        ml: {
          // No "validated" language anywhere in this group. The external check
          // in `EXT-ROAST-002-DS006` scored 33.92%, so generalisation is
          // unproven and the note says so.
          title: "Machine Learning & Computer Vision",
          note: "RoastMate research: trained and evaluated, not shipped. It performs poorly on photos outside the training set.",
        },
        backend: {
          title: "Data & Backend",
          note: "Server-side work across two projects.",
        },
      },
      contexts: {
        "Next.js": "App Router, this site",
        React: "Component architecture",
        TypeScript: "Strict mode, typed props",
        "Tailwind CSS": "Design tokens, layout",
        GSAP: "Scroll choreography",
        ScrollTrigger: "Scrubbed timelines",
        Flutter: "App shell, screens, theme",
        Dart: "Application language",
        Riverpod: "State and dependency injection",
        camera: "Live preview, capture to file",
        sqflite: "Schema and seed done; history still on mock data",
        Python: "Training and evaluation scripts",
        "YOLOv8n-cls": "Roast classifier, four classes",
        "Image classification": "Fine-tuning a pretrained backbone",
        "Model evaluation": "Macro-F1, confusion matrix, external set",
        "Dataset curation": "Duplicate and near-duplicate removal",
        "TensorFlow Lite": "INT8 file exported, not wired into the app",
        "Object detection": "Planned — bean detector not built",
        OpenCV: "Planned — shape analysis not started",
        Laravel: "Application framework",
        PHP: "Server language",
        Filament: "Admin and teacher panels",
        MySQL: "Application data",
        PostgreSQL: "Content and admin data",
        Prisma: "Schema, migrations, typed client",
      },
    },
  },

  beyond: {
    eyebrow: "Beyond the code",
    headingLead: "The parts that",
    headingTail: "don't fit in a repo.",
    lede: "Three areas of work that happen outside the editor.",
    chapters: {
      communication: {
        title: "Communication & Education",
        lede: "Teaching, public speaking, and hosting events.",
        entries: [
          {
            title: "Master of ceremonies",
            body: "I host events as an MC, introducing speakers and keeping the schedule on track.",
          },
          {
            title: "Khotbah at several mosques",
            body: "I delivered khotbah at several mosques for a fee during high school.",
          },
          {
            title: "Teaching primary school students",
            body: "I taught elementary school students at a tutoring centre during high school.",
          },
          {
            title: "Polinema Mengajar",
            body: "Actively involved in teaching at community learning centers and orphanages.",
          },
        ],
      },
      leadership: {
        title: "Leadership & Organization",
        lede: "Coordination work: external relations, events, and team management.",
        entries: [
          {
            title: "External Division Staff — Public Relations",
            body: "As staff in the Public Relations sub-division, I frequently work as an MC and handle communication and negotiation with external parties.",
          },
          {
            title: "Project Manager — Project-Based Learning",
            body: "I was Project Manager for the PBL projects in semester 3 and semester 4.",
          },
          {
            title: "Orientation Committee — 2025",
            body: "I served on the security and health committee for the 2025 Informatics student association orientation.",
          },
        ],
      },
      technology: {
        title: "Technology & Community",
        lede: "Content, audience, and the technical side of a current project.",
        entries: [
          {
            title: "Google Student Ambassador — 2026",
            body: "Selected in semester four. The program is mostly content creation: learning to understand audience needs and how Google products might address them. It has also been a way to build relationships with people from different backgrounds.",
          },
          {
            title: "Machine Learning — current PBL project",
            body: "I am responsible for the machine learning part of my current PBL project.",
          },
        ],
      },
    },
  },

  contact: {
    eyebrow: "Let's connect",
    headingLead: "Got something",
    headingTail: "worth building?",
    body: "Open to internships, junior roles, and projects where I can learn something real.",
    github: "GitHub",
    instagram: "Instagram",
    linkedin: "LinkedIn",
    downloadCv: "CV",
    backToTop: "Back to top",
  },
};
