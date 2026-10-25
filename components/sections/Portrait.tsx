"use client";

import Image from "next/image";
import { useState } from "react";
import { CometCard } from "@/components/ui/CometCard";
import { profile } from "@/content/site";

type Props = {
  src: string;
  /**
   * Resolved on the server from the filesystem, so a missing portrait never
   * produces a 404 or a broken image icon.
   */
  available: boolean;
};

/**
 * Portrait frame.
 *
 * Renders `public/images/kepin-portrait.jpg` as-is — no filters or grading, per
 * design.md §7. If the file is ever removed, the frame falls back to a
 * deliberate tonal composition so the About column stays balanced rather than
 * collapsing or showing a broken-image notice.
 *
 * The frame is square and the image is `object-cover`, so the supplied photo is
 * cropped to fit rather than stretched. The Comet Card tilt wraps only the
 * frame — never the caption — so the glare can never land on text.
 */
export default function Portrait({ src, available }: Props) {
  const [failed, setFailed] = useState(false);
  const showImage = available && !failed;

  return (
    <figure className="relative">
      <CometCard enabled={showImage}>
        <div className="relative aspect-square w-full overflow-hidden border border-line bg-surface-2">
          {showImage ? (
            <Image
              src={src}
              alt={`${profile.fullName} — portrait`}
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
                  {profile.role}
                </span>
              </div>
            </>
          )}
        </div>
      </CometCard>

      <figcaption className="mt-3 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-faint">
        <span>{profile.fullName}</span>
        <span>{profile.location}</span>
      </figcaption>
    </figure>
  );
}
