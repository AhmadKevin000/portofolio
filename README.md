# Ahmad Kevin — Portfolio

Personal portfolio for Ahmad Kevin (Kepin), built with Next.js (App Router), React,
TypeScript, Tailwind CSS, and GSAP.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

The site is bilingual and the language is part of the URL:

| Path  | Result                                 |
| ----- | -------------------------------------- |
| `/`   | 307 redirect to `/en`                  |
| `/en` | English                                |
| `/id` | Indonesian                             |
| `/fr` | 404 — only `en` and `id` are locales   |

Both locales render the same component tree. The copy lives in `content/en.ts` and
`content/id.ts`; structure (ids, order, asset paths, technology names, statuses,
links) lives once in `content/site.ts`, which merges the two through
`getContent(locale)`. Locale primitives — the locale list, `<html lang>` tags,
Open Graph locales, and the site origin — are in `lib/i18n.ts`.

Adding a locale means adding it to `locales` in `lib/i18n.ts` and adding a
dictionary that satisfies `Dictionary` in `content/site.ts`. The type checker
fails on any missing string, so a half-translated locale cannot ship silently.

## Environment

| Variable              | Required | Purpose                                                                 |
| --------------------- | -------- | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | No       | Absolute origin used for canonical URLs, `hreflang`, Open Graph and the sitemap. No trailing slash. Falls back to `http://localhost:3000`. |

Set it to the real origin before deploying, otherwise every canonical and
`hreflang` URL will point at localhost. `.env.example` has the template.

## Content

`content/` is the single source of truth for copy. Nothing there is invented:
unconfirmed facts are absent rather than filled in, and each technology carries a
status (`used`, `in-progress`, `experiment`, `planned`) instead of a proficiency
score. Screenshots are only rendered when the file exists in `public/images/`.

## Checks

```bash
npx tsc --noEmit     # types
npx next build       # production build
```

There is no ESLint configuration in this repository, so `next lint` is not
available (and was removed in Next.js 16).
