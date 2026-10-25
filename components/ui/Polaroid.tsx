import type { ReactNode } from "react";

type PolaroidProps = {
  /** Short label printed on the bottom band. Not a substitute for `alt`. */
  caption: string;
  /** `width / height` of the image inside the window. Nothing is cropped. */
  ratio: number;
  children: ReactNode;
  className?: string;
};

/**
 * A single physical-print frame, shared by the About portrait and the project
 * galleries.
 *
 * The window keeps the image's own ratio rather than a house ratio, so a
 * landscape dashboard and a portrait phone capture both sit in a correctly
 * proportioned frame. The bottom band is wider than the top and side margins —
 * that asymmetry is what makes it read as a Polaroid rather than a bordered
 * image — and it is part of the frame, so the caption can never be mistaken
 * for a separate description below the picture.
 *
 * Deliberately plain: no paper texture, no tape, no stickers. The depth comes
 * from one soft shadow and one hairline edge.
 */
export function Polaroid({
  caption,
  ratio,
  children,
  className = "",
}: PolaroidProps) {
  return (
    <figure className={`polaroid ${className}`}>
      <div className="polaroid__window" style={{ aspectRatio: `${ratio}` }}>
        {children}
      </div>
      <figcaption className="polaroid__caption">{caption}</figcaption>
    </figure>
  );
}
