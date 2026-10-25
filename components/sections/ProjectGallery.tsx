"use client";

import Image from "next/image";
import { useState } from "react";
import { CometCard } from "@/components/ui/CometCard";
import { Polaroid } from "@/components/ui/Polaroid";
import { getContent, type ProjectShot } from "@/content/site";
import type { Locale } from "@/lib/i18n";

type Props = {
  /** Only the shots whose files actually exist on disk. Never empty here. */
  shots: ProjectShot[];
  /** Used for the group's accessible name. */
  label: string;
  /** When set, the active screenshot opens the project in a new tab. */
  liveUrl?: string;
  locale: Locale;
};

/**
 * Slot geometry for the fanned deck, indexed by distance from the active card.
 *
 * Offsets are percentages of the card's own box, so the stack keeps its
 * proportions at every breakpoint instead of needing a second set of pixel
 * values for mobile. Rotation is the only absolute unit: 1.6° reads the same
 * on a 300px card as on a 630px one.
 */
const SLOTS = [
  { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 },
  { x: 3.2, y: -1.8, rotate: 1.6, scale: 0.972, opacity: 0.62 },
  { x: 6.4, y: -3.6, rotate: 3.1, scale: 0.944, opacity: 0.38 },
];

/** Beyond the last slot a card is parked behind the deck and hidden. */
function slotFor(rel: number) {
  const slot = SLOTS[rel];
  if (slot) return slot;
  const last = SLOTS[SLOTS.length - 1];
  return { ...last, x: last.x + 3.2, y: last.y - 1.8, opacity: 0 };
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Stacked Polaroid gallery.
 *
 * Layout, not animation, does the work: every card is placed in the same grid
 * cell, so the deck is exactly as tall as its tallest card and switching
 * screenshots never changes the height of the project card. That is what keeps
 * a 2.14-ratio landing page and a 1.90-ratio dashboard from nudging the copy
 * beside them when you page through.
 *
 * Three transform owners, each on its own element, so none can fight another:
 *
 *   1. the slot  — inline `transform` written from React state, animated by a
 *                  CSS transition;
 *   2. the tilt  — GSAP, inside CometCard, on a child element;
 *   3. the frame — none.
 *
 * Under `prefers-reduced-motion` the global rule collapses the slot transition
 * to zero, so paging is instant but the gallery still works. CometCard never
 * attaches its pointer listeners at all.
 */
export function ProjectGallery({ shots, label, liveUrl, locale }: Props) {
  const t = getContent(locale);
  const [active, setActive] = useState(0);
  const total = shots.length;

  const go = (next: number) =>
    setActive(Math.min(Math.max(next, 0), total - 1));

  return (
    <div
      className="gallery"
      role="group"
      aria-roledescription="carousel"
      aria-label={t.gallery.groupAria(label)}
    >
      <div className="gallery__stack">
        {shots.map((shot, i) => {
          const rel = (i - active + total) % total;
          const slot = slotFor(rel);
          const isActive = rel === 0;
          const isPortrait = shot.height > shot.width;

          const image = (
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              sizes={isPortrait ? "320px" : "(max-width: 1024px) 100vw, 50vw"}
              className="object-cover"
            />
          );

          return (
            <div
              // `src` is unique per project, and the deck is small.
              key={shot.src}
              className={`gallery__card ${isPortrait ? "max-w-[320px]" : ""}`}
              // The slot is published as custom properties and the transform is
              // composed in CSS, so a media query can dial the stack back on
              // narrow viewports without a second set of values here.
              style={
                {
                  "--gx": `${slot.x}%`,
                  "--gy": `${slot.y}%`,
                  "--gr": `${slot.rotate}deg`,
                  "--gs": slot.scale,
                  "--go": slot.opacity,
                  zIndex: total - rel,
                } as React.CSSProperties
              }
              // Cards behind the active one are covered, so they leave the
              // focus order and the accessibility tree until they surface.
              inert={!isActive}
            >
              <CometCard enabled={isActive} glareClassName="polaroid-glare">
                <Polaroid
                  caption={shot.caption}
                  ratio={shot.width / shot.height}
                >
                  {liveUrl ? (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full w-full"
                    >
                      {image}
                      <span className="sr-only"> {t.ui.opensInNewTab}</span>
                    </a>
                  ) : (
                    image
                  )}
                </Polaroid>
              </CometCard>
            </div>
          );
        })}
      </div>

      {total > 1 && (
        <nav className="gallery__nav" aria-label={t.gallery.navLabel}>
          <button
            type="button"
            className="gallery__btn"
            onClick={() => go(active - 1)}
            disabled={active === 0}
            aria-label={t.gallery.previousAria}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              fill="none"
              className="h-4 w-4"
            >
              <path
                d="M13.5 8h-10M7.5 4l-4 4 4 4"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="square"
              />
            </svg>
          </button>

          <p className="gallery__count" aria-live="polite" aria-atomic="true">
            <span className="sr-only">
              {t.gallery.counter(active + 1, total, shots[active].caption)}
            </span>
            <span aria-hidden="true">
              {pad(active + 1)} / {pad(total)}
            </span>
          </p>

          <button
            type="button"
            className="gallery__btn"
            onClick={() => go(active + 1)}
            disabled={active === total - 1}
            aria-label={t.gallery.nextAria}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              fill="none"
              className="h-4 w-4"
            >
              <path
                d="M2.5 8h10M8.5 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="square"
              />
            </svg>
          </button>
        </nav>
      )}
    </div>
  );
}
