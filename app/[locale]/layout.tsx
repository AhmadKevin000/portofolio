import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Bricolage_Grotesque,
  Geist,
  Geist_Mono,
  Instrument_Serif,
} from "next/font/google";
import "../globals.css";
import SiteNav from "@/components/SiteNav";
import Contact from "@/components/sections/Contact";
import { getContent, profile } from "@/content/site";
import {
  SITE_URL,
  defaultLocale,
  isLocale,
  localeTag,
  locales,
  openGraphLocale,
  otherLocale,
} from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Bricolage_Grotesque({
  variable: "--font-display-face",
  subsets: ["latin"],
  display: "swap",
});

const editorial = Instrument_Serif({
  variable: "--font-editorial-face",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

type Params = { params: Promise<{ locale: string }> };

/**
 * Only `en` and `id` are prerendered. Any other value under the dynamic
 * segment is rejected by `isLocale()` below and becomes a 404, instead of
 * rendering English under a made-up language code.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Per-locale metadata.
 *
 * Canonical and `hreflang` are absolute (via `metadataBase`) so a crawler can
 * pair the two pages without guessing the origin. The language map is derived
 * from `locales`, so adding a third locale cannot leave an alternate missing.
 * `x-default` points at the default locale, which is what `/` redirects to.
 */
export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const t = getContent(locale);

  const languages = Object.fromEntries([
    ...locales.map((code) => [code, `/${code}`]),
    ["x-default", `/${defaultLocale}`],
  ]);

  return {
    metadataBase: new URL(SITE_URL),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages,
    },
    openGraph: {
      type: "website",
      url: `/${locale}`,
      title: t.meta.title,
      description: t.meta.ogDescription,
      siteName: profile.fullName,
      locale: openGraphLocale[locale],
      alternateLocale: [openGraphLocale[otherLocale(locale)]],
    },
  };
}

/**
 * There is deliberately no bootstrap script.
 *
 * The hidden pre-reveal state is a server-rendered attribute (see the `<html>`
 * below), so nothing has to run before paint to arm it, and the "GSAP never
 * arrived" rescue is a CSS animation in globals.css keyed on
 * `data-motion-ready`. Both escape hatches therefore work without a single
 * line of inline JavaScript:
 *
 *  - the watchdog used to be an inline `<script>` in `<head>`. It set an
 *    attribute on `<html>` before React hydrated, which React then reported as
 *    a server/client mismatch; and because it was rendered from a component,
 *    React warned that the tag would never execute on a client render. Both
 *    symptoms had that one cause, and removing the script removes both.
 */

export default async function LocaleLayout({
  children,
  params,
}: Params & { children: React.ReactNode }) {
  const { locale: raw } = await params;
  // The layout owns `<html lang>`, so it is the one place that has to decide
  // whether the segment is a language at all. Anything else is not a page.
  if (!isLocale(raw)) notFound();
  const t = getContent(raw);

  return (
    <html
      lang={localeTag[raw]}
      /*
        The pre-reveal hidden state, rendered by the server.

        It used to be written by an inline script in `<head>`. That script ran
        during HTML parsing, so by the time React hydrated, `<html>` carried an
        attribute React had not rendered — a genuine mismatch, reported on every
        load. Emitting the attribute here instead puts the same hidden state in
        the first byte of HTML: no script has to run before paint, and the
        server and client props agree by construction.

        It is safe to ship hidden markup because both escape hatches are
        script-free: the `prefers-reduced-motion` block in globals.css forces
        `[data-reveal]` visible, the rescue animation in the same file covers a
        bundle that never loads, and the `<noscript>` style at the end of
        `<body>` covers a browser with JS off entirely.
      */
      data-reveal-armed=""
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} ${editorial.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink text-fg">
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:border focus:border-accent focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-[10px] focus:uppercase focus:tracking-[0.24em] focus:text-accent"
        >
          {t.nav.skipToProjects}
        </a>
        <SiteNav locale={raw} />
        {children}
        <Contact locale={raw} />
        {/* Without JS nothing would ever leave the pre-reveal state. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </body>
    </html>
  );
}
