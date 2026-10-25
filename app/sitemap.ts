import type { MetadataRoute } from "next";
import { locales, localeUrl } from "@/lib/i18n";

/**
 * Both locale homepages, each declaring the other as an alternate.
 *
 * There is one page per locale and no nested routes, so the sitemap is just
 * the pair. The origin comes from `SITE_URL` (`NEXT_PUBLIC_SITE_URL`), so the
 * file needs no edit when the site moves domains.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localeUrl(locale)]),
  );

  return locales.map((locale) => ({
    url: localeUrl(locale),
    changeFrequency: "monthly",
    priority: locale === "en" ? 1 : 0.9,
    alternates: { languages },
  }));
}
