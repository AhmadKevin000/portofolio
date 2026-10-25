"use client";

import { useGsapScope, prefersReducedMotion } from "@/lib/gsap";
import { getContent } from "@/content/site";
import type { Locale } from "@/lib/i18n";

/**
 * The scroll peak.
 *
 * Pinning is done with `position: sticky` rather than ScrollTrigger's `pin`.
 * Sticky needs no pin-spacer, so it cannot shift the document height or fight
 * the browser's own scroll anchoring, and if GSAP never initialises the
 * section still renders as a normal static block. The scrub timeline is then
 * driven by the wrapper's own travel, which is exactly what sticky pins.
 */
export default function Manifesto({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  const scopeRef = useGsapScope<HTMLElement>(({ gsap, scope }) => {
    if (prefersReducedMotion()) return;

    const q = gsap.utils.selector(scope);
    const words = q("[data-word]");
    const rule = q("[data-rule]")[0];
    const kicker = q("[data-kicker]")[0];
    const glow = q("[data-glow]")[0];
    if (words.length < 3) return;

    gsap.set(words, { willChange: "transform, opacity" });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: scope,
        start: "top bottom",
        end: "bottom bottom",
        scrub: 0.65,
        invalidateOnRefresh: true,
      },
    });

    // 0.00–0.30 — INNOVATE is wiped in from the left edge. It starts
    // partially revealed rather than fully clipped: a scrub that begins at
    // opacity 0 leaves the section visibly empty while it scrolls into view.
    tl.fromTo(
      words[0],
      {
        clipPath: "inset(0% 62% 0% 0%)",
        yPercent: 12,
        letterSpacing: "0.05em",
        opacity: 0.3,
      },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        yPercent: 0,
        letterSpacing: "-0.04em",
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      },
      0,
    )
      // 0.14–0.42 — WITH drops in from above and settles.
      .fromTo(
        words[1],
        { opacity: 0, scale: 1.55, rotate: -5, yPercent: -34 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          yPercent: 0,
          duration: 0.28,
          ease: "power2.out",
        },
        0.14,
      )
      // 0.30–0.62 — PURPOSE rises and its outline fills from hairline to ink.
      .fromTo(
        words[2],
        {
          opacity: 0.35,
          yPercent: 42,
          scale: 0.94,
          "--stroke": "#232934",
        },
        {
          opacity: 1,
          yPercent: 0,
          scale: 1,
          "--stroke": "#f3f4f6",
          duration: 0.32,
          ease: "power2.out",
        },
        0.3,
      )
      // 0.52–0.68 — the rule draws, then the kicker lands.
      .fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.16 }, 0.52)
      .fromTo(
        kicker,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.14, ease: "power2.out" },
        0.6,
      )
      // 0.68–0.80 — deliberate hold. The composition sits still so the line
      // can be read before the section releases.
      .to({}, { duration: 0.12 }, 0.68)
      // 0.80–1.00 — release: the block lifts and dims so Projects can take over.
      .to(
        words,
        {
          yPercent: -14,
          opacity: 0.16,
          scale: 0.95,
          duration: 0.2,
          stagger: 0.015,
        },
        0.8,
      )
      .to([rule, kicker], { opacity: 0, duration: 0.14 }, 0.82);

    if (glow) {
      // Never fully hidden: this is the only thing filling the pinned area
      // while the first word is still wiping in.
      tl.fromTo(
        glow,
        { scale: 0.75, opacity: 0.4 },
        { scale: 1.15, opacity: 1, duration: 0.5, ease: "power2.out" },
        0.05,
      ).to(glow, { opacity: 0.3, duration: 0.2 }, 0.8);
    }
  }, []);

  return (
    <section
      id="manifesto"
      aria-labelledby="manifesto-heading"
      ref={scopeRef}
      className="manifesto-scroll relative h-[260svh] bg-ink"
    >
      <div className="manifesto-sticky sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div
          aria-hidden="true"
          data-glow
          className="pointer-events-none absolute left-1/2 top-1/2 -ml-[35vmin] -mt-[35vmin] h-[70vmin] w-[70vmin] rounded-full bg-[radial-gradient(circle,rgba(196,214,234,0.10)_0%,transparent_68%)] blur-2xl"
        />

        <div className="shell relative w-full">
          <h2 id="manifesto-heading" className="sr-only">
            {t.manifesto.words.join(" ")}
          </h2>

          <div aria-hidden="true" className="select-none">
            <span
              data-word="innovate"
              className="block font-display text-[clamp(3rem,14.5vw,11.5rem)] font-extrabold leading-[0.82] tracking-[-0.04em] text-fg"
            >
              {t.manifesto.words[0]}
            </span>

            <span
              data-word="with"
              className="my-1 block pl-[8%] font-editorial text-[clamp(1.6rem,4.2vw,3.4rem)] italic leading-none text-accent md:pl-[16%]"
            >
              {t.manifesto.words[1]}
            </span>

            <span
              data-word="purpose"
              className="block font-display text-[clamp(3rem,14.5vw,11.5rem)] font-extrabold leading-[0.82] tracking-[-0.04em] text-transparent"
              style={{ WebkitTextStroke: "1.5px var(--stroke, #f3f4f6)" }}
            >
              {t.manifesto.words[2]}
            </span>

            <div data-rule className="mt-10 h-px w-full origin-left bg-line-2" />

            <p
              data-kicker
              className="mt-6 max-w-md font-mono text-[10px] uppercase leading-relaxed tracking-[0.28em] text-fg-faint"
            >
              {t.manifesto.kicker}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
