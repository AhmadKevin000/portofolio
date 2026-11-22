import { existsSync } from "node:fs";
import { join } from "node:path";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { getContent, profile, CV_PATH } from "@/content/site";
import type { Locale } from "@/lib/i18n";

/* ---------------------------------------------------------------- */
/* Icons                                                             */
/*                                                                   */
/* Inline paths rather than an icon package: three marks do not      */
/* justify a dependency, and drawing them here lets the stroke       */
/* weight match the hairlines used across the page. They live in     */
/* this Server Component so the SVGs cost no client JavaScript.      */
/* ---------------------------------------------------------------- */

function IconGitHub() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.19 1.84 1.19 3.1 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

/* Download, drawn to the same 16px box and 1.7 stroke as the social marks so
   the icon slot reads as one set. The arrow-into-tray form says "file" rather
   than "external page". */
function IconDownload() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M12 3v12" />
      <path d="m7 11 5 5 5-5" />
      <path d="M4 20h16" />
    </svg>
  );
}

/* ---------------------------------------------------------------- */
/* Button treatment                                                  */
/*                                                                   */
/* One frame, one icon slot, one label weight, one arrow — declared  */
/* once and shared by every action in this section, including the CV */
/* document. Kept as constants rather than a component so each row   */
/* can stay a plain <a> with its own href, target and label.         */
/* ---------------------------------------------------------------- */

const BTN_FRAME =
  "group flex min-h-14 w-full items-center gap-3.5 border border-line-2 bg-surface-1 px-4 py-4 transition-colors hover:border-accent/60 hover:bg-surface-2";

const BTN_ICON =
  "flex h-4 w-4 shrink-0 items-center justify-center text-fg-faint transition-colors group-hover:text-accent";

const BTN_LABEL =
  "min-w-0 flex-1 truncate text-sm font-medium text-fg-dim transition-colors group-hover:text-fg";

const BTN_ARROW =
  "shrink-0 font-mono text-base leading-none text-fg-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent";

/**
 * The Hero call to action uses `Magnetic` at strength 10. These rows reuse the
 * same component and therefore the same easing, but at a lower strength: the
 * field here is the row's own box (`field="exact"`), so the vertical pull is
 * measured against a 56px height rather than a small button floating in
 * whitespace, and the rows sit only 8px apart. Strength 6 keeps the largest
 * travel (~5px) inside that gap, so no row can reach its neighbour.
 */
const MAGNET_STRENGTH = 6;

/**
 * Closing section.
 *
 * Server Component — no client state. Its motion signature is a slow scale-in
 * on the call to action, so the page ends on an arrival rather than another
 * fade.
 *
 * The owner's email is not approved for public display, so no address and no
 * `mailto:` link appears anywhere on this page. GitHub is the one verified,
 * working channel.
 *
 * The right column used to show GitHub twice — a primary button, then the same
 * account again inside an "Elsewhere" dock. It is now a single group of three
 * buttons, so each channel appears exactly once.
 *
 * One system: identical frame, padding, icon slot, label weight, and arrow —
 * the `BTN_*` constants above, which the CV document below also uses, so the
 * fourth action cannot drift from the other three. Every row is labelled with
 * the channel name alone; the account handle is not repeated in the label.
 *
 * Two independent responses, on two different elements:
 *
 *   - the pull is `Magnetic` on the row wrapper, in `field="exact"` mode so
 *     each row has its own 8px-separated field instead of three overlapping
 *     16px-expanded ones;
 *   - the colour change and the arrow travel are CSS (`group-hover`), on the
 *     `<a>` itself.
 *
 * They never share an element or a transform property, so the arrow can slide
 * while the row is offset without the two fighting over `transform`.
 */
export default function Contact({ locale }: { locale: Locale }) {
  const t = getContent(locale);

  // Checked at build time, exactly like the portrait: a CV link only exists if
  // the PDF is really there. No broken link, no invented document.
  const hasCv = existsSync(join(process.cwd(), "public", CV_PATH));

  const channels = [
    {
      label: t.contact.github,
      href: profile.links.github,
      icon: <IconGitHub />,
    },
    {
      label: t.contact.instagram,
      href: profile.links.instagram,
      icon: <IconInstagram />,
    },
    {
      label: t.contact.linkedin,
      href: profile.links.linkedin,
      icon: <IconLinkedIn />,
    },
  ];

  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden border-t border-line bg-surface-3"
    >
      <div className="shell py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
                {t.contact.eyebrow}
              </p>
            </Reveal>

            <Reveal variant="mask" delay={0.06}>
              <h2
                id="contact-heading"
                className="mt-5 font-display text-[clamp(2.75rem,8vw,6rem)] font-extrabold leading-[0.86] tracking-tight"
              >
                {t.contact.headingLead}
                <br />
                {t.contact.headingTail}
              </h2>
            </Reveal>

            <Reveal variant="up" delay={0.14}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-fg-dim">
                {t.contact.body}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:pl-10">
            <Reveal variant="scale" delay={0.2}>
              <ul className="flex flex-col gap-2">
                {channels.map((channel) => (
                  <li key={channel.href}>
                    <Magnetic field="exact" strength={MAGNET_STRENGTH}>
                      <a
                        href={channel.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className={BTN_FRAME}
                      >
                        <span aria-hidden="true" className={BTN_ICON}>
                          {channel.icon}
                        </span>
                        <span className={BTN_LABEL}>{channel.label}</span>
                        <span aria-hidden="true" className={BTN_ARROW}>
                          ↗
                        </span>
                        <span className="sr-only"> {t.ui.opensInNewTab}</span>
                      </a>
                    </Magnetic>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Same frame as the channels above, and the same 8px rhythm, so it
                reads as the fourth action in the group rather than a separate
                call to action. Still rendered only when the file exists. */}
            {hasCv && (
              <Reveal variant="fade" delay={0.26}>
                <Magnetic
                  field="exact"
                  strength={MAGNET_STRENGTH}
                  className="mt-2"
                >
                  <a
                    href={CV_PATH}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={BTN_FRAME}
                  >
                    <span aria-hidden="true" className={BTN_ICON}>
                      <IconDownload />
                    </span>
                    <span className={BTN_LABEL}>{t.contact.downloadCv}</span>
                    <span aria-hidden="true" className={BTN_ARROW}>
                      ↗
                    </span>
                    <span className="sr-only"> {t.ui.opensInNewTab}</span>
                  </a>
                </Magnetic>
              </Reveal>
            )}

            <Reveal variant="fade" delay={0.32}>
              <a
                href="#hero"
                className="mt-8 inline-flex items-center gap-2 py-2 font-mono text-[10px] uppercase tracking-[0.26em] text-fg-faint transition-colors hover:text-accent"
              >
                <span aria-hidden="true">↑</span> {t.contact.backToTop}
              </a>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 border-t border-line pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
          <p>
            © {profile.fullName} — {profile.nickname}
          </p>
        </div>
      </div>
    </footer>
  );
}
