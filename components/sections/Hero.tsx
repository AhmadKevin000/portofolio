"use client";

import { getContent, profile } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { useHasFinePointer, usePrefersReducedMotion } from "@/lib/hooks";
import { useGsapScope, prefersReducedMotion } from "@/lib/gsap";
import { useScopePointer } from "@/lib/pointer";
import { Magnetic } from "@/components/ui/Magnetic";

export default function Hero({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  const reduced = usePrefersReducedMotion();
  const finePointer = useHasFinePointer();

  const sectionRef = useGsapScope<HTMLElement>(({ gsap, scope }) => {
    if (prefersReducedMotion()) return;

    const q = gsap.utils.selector(scope);
    const eyebrow = q("[data-hero-eyebrow]");
    const known = q("[data-hero-known]");
    const depth = q("[data-hero-depth]");
    const face = q("[data-hero-face]");
    const name = q("[data-hero-name]");
    const intro = q("[data-hero-intro]");
    const meta = q("[data-hero-meta]");
    const cta = q("[data-hero-cta]");

    // --- Entrance -------------------------------------------------------
    // The wordmark is wiped in left-to-right rather than faded. A wipe reads
    // as the type being printed; a fade reads as a slide transition.
    gsap.set(face, { clipPath: "inset(0% 100% 0% 0%)" });
    gsap.set(depth, { opacity: 0, y: 26 });
    gsap.set(known, { opacity: 0 });
    gsap.set([eyebrow, name, intro, meta, cta], { opacity: 0, y: 18 });

    gsap
      .timeline({ defaults: { ease: "power3.out" } })
      .to(eyebrow, { opacity: 1, y: 0, duration: 0.6 }, 0)
      .to(depth, { opacity: 1, y: 0, duration: 1.2, ease: "expo.out" }, 0.08)
      .to(
        face,
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.05, ease: "power2.inOut" },
        0.12,
      )
      .to(known, { opacity: 1, duration: 0.5 }, 0.66)
      .to(name, { opacity: 1, y: 0, duration: 0.55 }, 0.78)
      .to(intro, { opacity: 1, y: 0, duration: 0.7 }, 0.72)
      .to(meta, { opacity: 1, y: 0, duration: 0.7 }, 0.86)
      .to(cta, { opacity: 1, y: 0, duration: 0.7 }, 0.96);

    // --- Exit -----------------------------------------------------------
    // Scrubbed, not triggered: the hero recedes in proportion to the scroll
    // rather than playing a fixed animation the user cannot influence.
    gsap
      .timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: scope,
          start: "top top",
          end: "bottom top",
          scrub: 0.7,
        },
      })
      .to(q("[data-hero-wordmark]"), { yPercent: -10, scale: 0.95 }, 0)
      .to(q("[data-hero-wordmark]"), { opacity: 0.15 }, 0)
      .to(q("[data-hero-right]"), { yPercent: -24, opacity: 0.1 }, 0)
      .to(q("[data-hero-glow]"), { yPercent: 14, opacity: 0.35 }, 0);
  }, []);

  // One pointer listener for the whole hero; every layer reacts through CSS.
  useScopePointer(sectionRef, finePointer && !reduced);

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-labelledby="hero-name"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-ink"
    >
      {/* Layer 1 — base studio light. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_58%_52%_at_34%_46%,#181c23_0%,#0e1015_44%,#0b0c10_100%)]"
      />

      {/* Layer 2 — broad silver-blue orb, drifts against the pointer. */}
      <div aria-hidden="true" data-hero-glow className="absolute inset-0">
        <div className="hero-orb" />
      </div>

      {/* Layer 3 — the cursor spotlight. */}
      <div aria-hidden="true" className="hero-spotlight" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent"
      />

      <div className="shell relative z-10 pb-16 pt-32 md:pb-24 md:pt-36">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <p
              data-hero-eyebrow
              className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent"
            >
              {t.hero.eyebrow}
            </p>

            <div data-hero-wordmark className="mt-5 md:mt-7">
              <div className="wordmark-tilt">
                <h1
                  id="hero-name"
                  aria-label={t.hero.nameAria(profile.fullName, profile.nickname)}
                  className="wordmark"
                  style={{ fontSize: "clamp(4.5rem, 21vw, 18rem)" }}
                >
                  <span className="known-as" data-hero-known aria-hidden="true">
                    {t.hero.knownAs}
                  </span>
                  <span className="wordmark__depth" data-hero-depth aria-hidden="true">
                    {profile.nickname}
                  </span>
                  <span
                    className="wordmark__face"
                    data-hero-face
                    data-text={profile.nickname}
                    aria-hidden="true"
                  >
                    {profile.nickname}
                  </span>
                </h1>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3 md:mt-10">
              <span
                data-hero-name
                className="h-px w-12 origin-left bg-accent"
                aria-hidden="true"
              />
              <p
                data-hero-name
                className="font-mono text-[11px] uppercase tracking-[0.3em] text-fg-dim"
              >
                {profile.fullName}
              </p>
            </div>
          </div>

          <div data-hero-right className="lg:col-span-4 lg:pb-4">
            <p
              data-hero-intro
              className="max-w-sm text-[15px] leading-relaxed text-fg-dim"
            >
              {t.hero.intro}
            </p>

            <dl
              data-hero-meta
              className="mt-7 space-y-2 border-l border-line pl-4 font-mono text-[10px] uppercase tracking-[0.22em]"
            >
              <div className="flex gap-3">
                <dt className="w-16 text-fg-faint">{t.hero.roleLabel}</dt>
                <dd className="text-fg">{t.hero.role}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-16 text-fg-faint">{t.hero.baseLabel}</dt>
                <dd className="text-fg">{profile.location}</dd>
              </div>
            </dl>

            <div data-hero-cta className="mt-7 md:mt-9">
              <Magnetic strength={10}>
                <a
                  href="#work"
                  className="group inline-flex items-center gap-3 border border-line-2 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-fg transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink"
                >
                  {t.hero.cta}
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    ↓
                  </span>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent" />
    </section>
  );
}
