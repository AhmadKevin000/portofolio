"use client";

import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import {
  localeLabel,
  localeName,
  locales,
  type Locale,
} from "@/lib/i18n";

type Props = {
  /** The locale currently being rendered. */
  locale: Locale;
  /** Accessible name for the group, in the active language. */
  label: string;
};

/**
 * `EN | ID` switch.
 *
 * Both languages are always visible and the active one is not a link, so the
 * control never depends on hover to say where you are. The inactive entry is a
 * real `next/link`, which means a client-side transition — no `window.location`
 * and no full reload.
 *
 * The section hash is read from the URL after mount and appended to the target
 * so switching language mid-page keeps you on the same section. It is read in
 * an effect rather than during render because the server has no hash to read,
 * and rendering a different `href` on the server would be a hydration
 * mismatch. Until the effect runs the href is just `/id`, which is still a
 * valid destination.
 *
 * `hrefLang` and `lang` are set per entry so a screen reader pronounces each
 * label in its own language instead of the page's.
 */
export default function LocaleSwitch({ locale, label }: Props) {
  const [hash, setHash] = useState("");

  useEffect(() => {
    const read = () => setHash(window.location.hash);
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  return (
    <nav
      aria-label={label}
      className="flex shrink-0 items-center gap-0.5 font-mono text-[9px] uppercase tracking-[0.08em] sm:gap-1 sm:text-[10px] sm:tracking-[0.22em]"
    >
      {locales.map((code, index) => (
        <Fragment key={code}>
          {index > 0 && (
            <span aria-hidden="true" className="text-line-3">
              |
            </span>
          )}

          {code === locale ? (
            <span
              aria-current="true"
              className="inline-flex items-center py-2 text-accent"
            >
              <span lang={code}>{localeLabel[code]}</span>
              <span className="sr-only"> ({localeName[code]})</span>
            </span>
          ) : (
            <Link
              href={`/${code}${hash}`}
              hrefLang={code}
              lang={code}
              className="inline-flex items-center py-2 text-fg-faint transition-colors hover:text-fg"
            >
              {localeLabel[code]}
              <span className="sr-only"> ({localeName[code]})</span>
            </Link>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
