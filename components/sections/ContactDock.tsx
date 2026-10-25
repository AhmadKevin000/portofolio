"use client";

import { useEffect, useRef } from "react";
import { hasFinePointer, prefersReducedMotion } from "@/lib/gsap";
import { profile, CV_PATH } from "@/content/site";

/** Where the owner's CV is expected to live. See `CV_PATH` in content/site.ts. */

/* ---------------------------------------------------------------- */
/* Icons                                                             */
/*                                                                   */
/* Hand-drawn rather than pulled from `@tabler/icons-react`, which  */
/* the published Floating Dock demo imports. Four icons do not       */
/* justify a dependency, and inline paths let the stroke weight     */
/* match the hairlines already used across the page.                */
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

function IconDocument() {
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
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z" />
      <path d="M9 13h6M9 17h4" />
    </svg>
  );
}

/* ---------------------------------------------------------------- */

type DockLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
  /** PDF opens in a new tab; profile links too. Both get rel hardening. */
  external: boolean;
};

/**
 * Social dock for the closing section.
 *
 * The published Floating Dock magnifies icons as the cursor approaches, which
 * is the part worth keeping. Two things are deliberately different:
 *
 * 1. No tooltip-on-hover. Labels are always visible, so the links are readable
 *    on touch, in a screen reader, and before any pointer exists. A hover-only
 *    tooltip hides the label from exactly the people who need it.
 * 2. No popover on mobile. The source collapses to a hamburger button; here the
 *    group simply wraps into a grid, so every link is one tap away and nothing
 *    can be left undiscovered behind a toggle.
 *
 * This is a link group, not navigation between sections — it sits inside
 * Let's Connect rather than adding a section of its own.
 */
export function ContactDock({ hasCv }: { hasCv: boolean }) {
  const listRef = useRef<HTMLUListElement>(null);
  const links: DockLink[] = [
    {
      label: "GitHub",
      href: profile.links.github,
      icon: <IconGitHub />,
      external: true,
    },
    {
      label: "Instagram",
      href: profile.links.instagram,
      icon: <IconInstagram />,
      external: true,
    },
    {
      label: "LinkedIn",
      href: profile.links.linkedin,
      icon: <IconLinkedIn />,
      external: true,
    },
  ];

  // Only rendered when the PDF actually exists on disk — see Contact.tsx.
  if (hasCv) {
    links.push({
      label: "CV",
      href: CV_PATH,
      icon: <IconDocument />,
      external: true,
    });
  }

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    const list = listRef.current;
    if (!list) return;

    const icons = Array.from(
      list.querySelectorAll<HTMLElement>("[data-dock-icon]"),
    );
    if (icons.length === 0) return;

    // Writes a 0..1 proximity value per icon as a CSS variable. The scale is
    // then applied by CSS, so the whole effect is one rAF-throttled listener
    // and no animation library state — the same idiom as `--px`/`--py` in
    // lib/pointer.ts.
    let frame: number | null = null;
    let mx = 0;
    let my = 0;

    const apply = () => {
      frame = null;
      for (const icon of icons) {
        const r = icon.getBoundingClientRect();
        const dist = Math.hypot(
          mx - (r.left + r.width / 2),
          my - (r.top + r.height / 2),
        );
        // Field reaches past the icon so neighbours react before you arrive.
        const radius = Math.max(r.width, r.height) * 2.6;
        const near = dist > radius ? 0 : 1 - dist / radius;
        icon.style.setProperty("--near", near.toFixed(3));
      }
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (frame === null) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      if (frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
      for (const icon of icons) icon.style.setProperty("--near", "0");
    };

    list.addEventListener("pointermove", onMove, { passive: true });
    list.addEventListener("pointerleave", onLeave);

    return () => {
      list.removeEventListener("pointermove", onMove);
      list.removeEventListener("pointerleave", onLeave);
      if (frame !== null) cancelAnimationFrame(frame);
      for (const icon of icons) icon.style.removeProperty("--near");
    };
  }, [hasCv]);

  return (
    <div className="mt-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-fg-faint">
        Elsewhere
      </p>

      <ul
        ref={listRef}
        aria-label="Social links"
        className="mt-3 flex flex-wrap gap-1.5 border border-line bg-ink/50 p-1.5"
      >
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="group flex min-h-11 items-center gap-2.5 px-3 py-2.5 text-fg-dim transition-colors hover:bg-surface-2 hover:text-fg"
            >
              <span
                data-dock-icon
                aria-hidden="true"
                className="dock-icon flex h-4 w-4 shrink-0 items-center justify-center text-fg-faint transition-colors group-hover:text-accent"
              >
                {link.icon}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
                {link.label}
              </span>
              {link.external && (
                <span className="sr-only"> (opens in a new tab)</span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
