import { existsSync } from "node:fs";
import { join } from "node:path";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { ContactDock } from "@/components/sections/ContactDock";
import { profile, CV_PATH } from "@/content/site";

/**
 * Closing section.
 *
 * Server Component — no client state. Its motion signature is a slow scale-in
 * on the call to action, so the page ends on an arrival rather than another
 * fade.
 *
 * The owner's email is not approved for public display, so no address and no
 * `mailto:` link appears anywhere on this page. GitHub is the one verified,
 * working channel; it is the primary call to action rather than a decorative
 * button pointing nowhere.
 */
export default function Contact() {
  // Checked at build time, exactly like the portrait: a CV link only exists if
  // the PDF is really there. No broken link, no invented document.
  const hasCv = existsSync(join(process.cwd(), "public", CV_PATH));

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
                Let&apos;s connect
              </p>
            </Reveal>

            <Reveal variant="mask" delay={0.06}>
              <h2
                id="contact-heading"
                className="mt-5 font-display text-[clamp(2.75rem,8vw,6rem)] font-extrabold leading-[0.86] tracking-tight"
              >
                Got something
                <br />
                worth building?
              </h2>
            </Reveal>

            <Reveal variant="up" delay={0.14}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-fg-dim">
                Open to internships, junior roles, and projects where I can
                learn something real.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:pl-10">
            <Reveal variant="scale" delay={0.2}>
              <Magnetic strength={8}>
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center justify-between gap-4 border border-line-2 px-5 py-5 transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink"
                >
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.24em] text-fg-faint group-hover:text-accent-ink/70">
                      Reach me on
                    </span>
                    <span className="mt-1 block truncate text-sm font-medium sm:text-base">
                      GitHub — AhmadKevin000
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-mono text-lg transition-transform group-hover:translate-x-1"
                  >
                    ↗
                  </span>
                </a>
              </Magnetic>
            </Reveal>

            <Reveal variant="fade" delay={0.28}>
              <p className="mt-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-fg-faint">
                GitHub is the fastest way to reach me. Open an issue or a
                discussion on any repository.
              </p>
            </Reveal>

            <Reveal variant="up" delay={0.32}>
              <ContactDock hasCv={hasCv} />
            </Reveal>

            <Reveal variant="fade" delay={0.38}>
              <a
                href="#hero"
                className="mt-8 inline-flex items-center gap-2 py-2 font-mono text-[10px] uppercase tracking-[0.26em] text-fg-faint transition-colors hover:text-accent"
              >
                <span aria-hidden="true">↑</span> Back to top
              </a>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-line pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {profile.fullName} — {profile.nickname}
          </p>
          <p>Built with Next.js · GSAP</p>
        </div>
      </div>
    </footer>
  );
}
