"use client";

import Image from "next/image";
import { useState } from "react";
import { CometCard } from "@/components/ui/CometCard";
import { Polaroid } from "@/components/ui/Polaroid";
import { getContent, profile } from "@/content/site";
import type { Locale } from "@/lib/i18n";

type Props = {
  src: string;
  /**
   * Resolved on the server from the filesystem, so a missing portrait never
   * produces a 404 or a broken image icon.
   */
  available: boolean;
  locale: Locale;
};

/**
 * Portrait, presented as a Polaroid.
 *
 * Renders `public/images/kepin-portrait.jpg` as-is — no filters or grading, per
 * design.md §7. If the file is ever removed, the window falls back to a
 * deliberate tonal composition so the About column stays balanced rather than
 * collapsing or showing a broken-image notice.
 *
 * The existing interaction is untouched: CometCard still owns the tilt, and it
 * still wraps the frame only — the caption sits inside the card so it tilts
 * with the print, but the glare layer is confined to the image window, so no
 * highlight can ever land on the caption text. Parallax and Reveal are applied
 * by the parent and never see this component's markup.
 *
 * The card is rotated a degree off-axis. That is a `rotate` declaration, not a
 * `transform`, so it composes with CometCard's GSAP transforms instead of
 * fighting them for the same property.
 */
export default function Portrait({ src, available, locale }: Props) {
  const t = getContent(locale);
  const [failed, setFailed] = useState(false);
  const showImage = available && !failed;

  return (
    // The off-axis rotation lives on the outermost wrapper, so the glare layer
    // inside CometCard rotates with the print instead of sitting askew over it.
    // It is a `rotate` declaration, not a `transform`, so it composes with the
    // GSAP transforms on the inner element instead of competing for the same
    // property.
    <CometCard
      enabled={showImage}
      className="rotate-[-1.1deg]"
      glareClassName="polaroid-glare"
    >
      <Polaroid caption={`${profile.fullName} · ${profile.location}`} ratio={1}>
        {showImage ? (
          <Image
            src={src}
            alt={`${profile.fullName} — ${t.about.portraitLabel}`}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <>
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px)",
                backgroundSize: "56px 56px",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(196,214,234,0.09),transparent_66%)]"
            />

            <div className="relative flex h-full flex-col justify-between p-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fg-faint">
                {profile.nickname}
              </span>

              <div
                aria-hidden="true"
                className="flex flex-1 items-center justify-center"
              >
                <span
                  className="font-display text-[clamp(4rem,9vw,7rem)] font-extrabold leading-none tracking-tight text-transparent"
                  style={{ WebkitTextStroke: "1.5px var(--line-3)" }}
                >
                  AK
                </span>
              </div>

              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint">
                {t.hero.role}
              </span>
            </div>
          </>
        )}
      </Polaroid>
    </CometCard>
  );
}
