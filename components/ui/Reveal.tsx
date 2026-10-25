"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ensureGsap, prefersReducedMotion, rescueAlreadyFired } from "@/lib/gsap";

export type RevealVariant = "up" | "mask" | "line" | "scale" | "fade";

type RevealProps = {
  children: ReactNode;
  variant?: RevealVariant;
  /** Seconds. Stagger a group by passing an increasing value. */
  delay?: number;
  className?: string;
};

/**
 * Scroll-triggered entrance.
 *
 * The initial hidden state lives in CSS (`html[data-reveal-armed] …`) and is
 * opt-in: it only applies to markup the server rendered with the armed flag,
 * and a CSS rescue animation in globals.css clears it if GSAP never reports
 * in. The markup is therefore never painted visible-then-hidden, but it is
 * also never left hidden by a bundle that failed to arrive.
 *
 * `once: true` — an element that has entered does not replay when the user
 * scrolls back up. Replaying is the fastest way to make a long page feel
 * twitchy.
 */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => el.classList.add("is-in");

    // Not armed, or reduced motion: show, don't animate.
    if (
      prefersReducedMotion() ||
      !document.documentElement.hasAttribute("data-reveal-armed")
    ) {
      show();
      return;
    }

    let ctx: gsap.Context | undefined;

    try {
      ensureGsap();

      // GSAP arrived after the CSS rescue already uncovered the page. Animating
      // now would re-hide content that is on screen, so leave it as it is.
      if (rescueAlreadyFired()) {
        show();
        return;
      }

      ctx = gsap.context(() => {
        const from: gsap.TweenVars = { opacity: 0 };
        const to: gsap.TweenVars = {
          opacity: 1,
          duration: 0.9,
          delay,
          ease: "power3.out",
          overwrite: "auto",
          // Durable marker: survives the inline styles being reverted.
          onComplete: show,
        };

        switch (variant) {
          case "mask":
            from.clipPath = "inset(0% 0% 100% 0%)";
            from.y = 18;
            to.clipPath = "inset(0% 0% 0% 0%)";
            to.y = 0;
            to.duration = 1.05;
            to.ease = "expo.out";
            break;
          case "line":
            from.clipPath = "inset(0% 100% 0% 0%)";
            to.clipPath = "inset(0% 0% 0% 0%)";
            to.duration = 1;
            to.ease = "expo.out";
            break;
          case "scale":
            from.scale = 0.94;
            from.y = 22;
            to.scale = 1;
            to.y = 0;
            break;
          case "fade":
            break;
          default:
            from.y = 30;
            to.y = 0;
        }

        gsap.fromTo(el, from, {
          ...to,
          scrollTrigger: {
            trigger: el,
            // "bottom", not "88%". With a percentage start, anything already
            // painted in the bottom slice of the viewport sat there fully
            // transparent until the reader scrolled further — which is exactly
            // what a deep link, a restored scroll position, or a resize lands
            // on. Revealing from the viewport edge keeps the animation and
            // removes the band where visible copy could stay invisible.
            start: "top bottom",
            once: true,
          },
        });
      }, el);
    } catch {
      // A GSAP or ScrollTrigger failure must never cost the reader the copy.
      show();
      return;
    }

    return () => ctx?.revert();
  }, [variant, delay]);

  return (
    <div ref={ref} data-reveal={variant} className={className}>
      {children}
    </div>
  );
}
