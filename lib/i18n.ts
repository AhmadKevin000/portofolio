/**
 * Locale primitives.
 *
 * The URL is the only source of truth for the active language: `/en` and `/id`
 * are real routes, so a refresh, a shared link, or a crawler all land on the
 * same content. Nothing is stored in localStorage.
 *
 * Kept free of React and of `content/site.ts` so both the server routing layer
 * and the client components can import it without a cycle.
 */

export const locales = ["en", "id"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** The other locale — used by the switcher and by `alternateLocale` metadata. */
export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "id" : "en";
}

/** Short label inside the switcher. */
export const localeLabel: Record<Locale, string> = {
  en: "EN",
  id: "ID",
};

/** Full name, used as the link's accessible name. */
export const localeName: Record<Locale, string> = {
  en: "English",
  id: "Bahasa Indonesia",
};

/**
 * BCP 47 tag for `<html lang>` and `hreflang`.
 *
 * Spelled out rather than reusing the key so nobody "corrects" `id` to `in`:
 * `in` is the deprecated legacy code for Indonesian and would be wrong here.
 */
export const localeTag: Record<Locale, string> = {
  en: "en",
  id: "id",
};

/** Open Graph wants `language_TERRITORY`, not a bare language tag. */
export const openGraphLocale: Record<Locale, string> = {
  en: "en_US",
  id: "id_ID",
};

/**
 * Absolute origin used for canonical URLs, `hreflang`, Open Graph and the
 * sitemap.
 *
 * `NEXT_PUBLIC_SITE_URL` is the only deployment-specific value in the codebase.
 * The fallback is the local dev origin, so a fresh clone still produces valid
 * absolute URLs instead of relative ones Next cannot resolve. Set it to the
 * real origin (no trailing slash) before deploying, e.g.
 *
 *   NEXT_PUBLIC_SITE_URL=https://example.com
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

/**
 * Absolute URL for a locale's page, optionally with a section hash.
 *
 * Absolute because its callers are the sitemap and metadata, which a crawler
 * reads without a base URL. The in-page switcher deliberately does *not* use
 * this: it needs a relative href so `next/link` keeps the navigation client-side.
 */
export function localeUrl(locale: Locale, hash = ""): string {
  return `${SITE_URL}/${locale}${hash}`;
}
