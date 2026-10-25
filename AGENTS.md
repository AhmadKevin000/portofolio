# AGENTS.md — Portfolio Development Instructions

## 1. Project Overview

This repository contains a personal portfolio website for Ahmad Kevin, also known as Kepin.

The website should present the owner as a credible, creative, and technically curious developer. It must balance professional presentation with distinctive visual design.

The portfolio is intended for recruiters, internship opportunities, collaborators, and other developers.

The goal is not to create a generic résumé website. Build a memorable digital experience without sacrificing usability, readability, accessibility, or performance.

## 2. Existing Technology Stack

The project currently uses:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- GSAP
- GSAP ScrollTrigger
- Spline React integration
- next/font

Before introducing a new dependency, inspect the existing implementation and determine whether the requirement can be met using the installed stack.

Do not replace existing libraries or restructure the application without a clear technical reason.

## 3. Read the Design Specification

Before implementing any visual change, read `design.md`.

Treat `design.md` as the source of truth for:

- Visual identity
- Color direction
- Typography
- Section order
- Layout and composition
- Motion and interaction
- Spline integration
- Responsive behavior
- Content presentation

If a task conflicts with the established design, identify the conflict before proceeding.

Do not silently introduce a new visual direction.

## 4. General Engineering Rules

- Inspect relevant existing files before modifying them.
- Prefer small, focused changes over unnecessary rewrites.
- Preserve existing working behavior.
- Keep components maintainable and responsibilities clearly separated.
- Use TypeScript appropriately.
- Avoid unnecessary client components.
- Avoid adding dependencies without justification.
- Do not introduce placeholder content that looks like verified information.
- Do not leave debugging code, temporary test components, or development-only messages in production.
- Never claim that a feature works unless it has been verified.
- Do not remove functioning features merely to simplify implementation.

When a requested change requires a significant architectural decision, explain the trade-offs before making a destructive change.

## 5. Content Integrity

The portfolio must accurately represent Ahmad Kevin's real experience, skills, and projects.

Never fabricate:

- Project outcomes
- Client names
- User counts
- Business impact
- Technical proficiency
- Employment history
- Certifications
- Testimonials
- Project completion status
- Machine learning results

If information is missing, use a clear and minimal TODO for the owner or ask for clarification.

Do not publish internal implementation notes, raw TODO comments, or development instructions as website copy.

Do not replace missing facts with generic claims that imply experience the owner has not confirmed.

### Project status

Bimbel KAIFA is still in development. Do not mark it as completed without confirmation.

RoastMate is also in development. Some implementation work exists, but the actual state of the machine learning components must be confirmed before describing them as functional.

Use accurate status labels and distinguish implemented functionality from planned functionality.

### Contact information

Do not assume that an email discovered in Git configuration is approved for public display.

Do not invent a LinkedIn profile URL.

Only publish contact information that the owner has confirmed.

## 6. Required Website Sections

Preserve the following section order unless the owner explicitly requests a change:

1. Hero
2. About Me
3. Innovate with Purpose
4. Selected Projects
5. Technical Arsenal
6. Beyond the Code
7. Let's Connect

Do not add new major sections just to make the website appear longer or more complete.

## 7. Animation and Scrolling

Use GSAP and ScrollTrigger when they genuinely improve the experience.

Requirements:

- Preserve native browser scrolling.
- Never hijack the scroll wheel or trap the user in a long animation.
- Keep cinematic transitions purposeful and reasonably short.
- Make important content accessible without requiring users to complete an animation.
- Support `prefers-reduced-motion`.
- Avoid excessive parallax, continuous animation, and competing motion.
- Clean up GSAP contexts, event listeners, and ScrollTrigger instances when components unmount.
- Avoid layout shifts caused by animation initialization.
- Ensure that animations remain usable on touch devices.

Animations should communicate hierarchy and create visual continuity, not merely demonstrate technical capability.

## 8. Spline Integration Rules

Spline is an optional visual layer within the portfolio. It must support the design rather than dictate the entire layout.

### Before changing Spline

1. Inspect the existing Spline component and its integration.
2. Identify whether the scene is embedded, externally hosted, or represented by another implementation.
3. Check existing loading, sizing, clipping, layering, and responsive behavior.
4. Confirm that the proposed change addresses an actual visual or technical problem.
5. Preserve the working implementation unless there is a clear reason to change it.

### Spline MCP authorization

Do not call Spline MCP tools, create scenes, modify remote scenes, or consume limited MCP calls unless the owner explicitly authorizes the operation.

Do not assume permission to modify a scene just because Spline is mentioned in a task.

When remote Spline access is unavailable or not authorized, work with the existing scene and local integration.

### Technical honesty

Do not describe CSS-based extrusion, layered text shadows, or DOM effects as actual Spline geometry.

Clearly distinguish between:

- Actual 3D objects rendered by Spline
- CSS-based dimensional effects
- DOM overlays
- Canvas lighting or interaction
- GSAP animation

Do not claim that a Spline interaction works without verifying it.

### Spline visual requirements

Follow `design.md`.

In particular:

- Do not let a 3D object obstruct the primary wordmark or important text.
- Keep lighting controlled and visually intentional.
- Avoid excessive glow, random movement, and distracting objects.
- Preserve readable foreground text.
- Keep 3D visuals responsive to the available viewport.
- Do not allow a decorative canvas to block navigation or interaction.
- Provide a suitable fallback when WebGL is unavailable or the scene is not mounted.
- Respect reduced-motion preferences.
- Consider the performance cost of loading Spline assets.

### Watermarks and paid features

Do not purchase a Spline plan or enable paid services without explicit owner approval.

Do not conceal, crop, or manipulate a watermark as a substitute for obtaining the appropriate license or plan. If a watermark affects the final presentation, explain the available options and ask the owner to decide.

## 9. Performance and Responsive Design

The site must remain usable on desktop, tablet, and mobile.

Requirements:

- Prevent horizontal overflow.
- Keep headings readable at small viewport widths.
- Avoid oversized fixed-width elements.
- Avoid loading expensive 3D scenes on mobile without a clear benefit.
- Lazy-load or defer noncritical visual assets when appropriate.
- Avoid unnecessary JavaScript and repeated rendering.
- Reserve layout space for images and visual components.
- Provide image dimensions and appropriate responsive behavior.
- Check keyboard navigation and touch interactions.
- Preserve usable content when animations or WebGL are disabled.

Do not optimize exclusively for a desktop screenshot.

## 10. Accessibility

- Use semantic HTML.
- Maintain sufficient text contrast.
- Ensure keyboard-accessible navigation and controls.
- Provide visible focus states.
- Use meaningful alternative text for informative images.
- Avoid relying on color alone to communicate important information.
- Keep interactive elements large enough for touch.
- Respect reduced-motion settings.
- Ensure text remains understandable when visual effects fail.

Decorative imagery should not introduce redundant screen-reader announcements.

## 11. Project Images and Assets

Expected image paths include:

- `public/images/kepin-portrait.jpg`
- `public/images/kaifa.jpg`
- `public/images/roastmate.jpg`

Verify that these files actually exist before referencing them.

Do not fabricate screenshots of the real projects.

Do not present generated mockups as actual product screenshots.

If an asset is missing, use an intentional fallback or ask the owner to provide the asset.

Preserve the authenticity of the owner's portrait. Do not apply aggressive filters or unnecessary stylization.

## 12. Technical Arsenal

Only list technologies the owner has actually used or understands sufficiently to present publicly.

Organize verified skills into appropriate categories, such as:

- Frontend
- Backend & Database
- Data & Machine Learning
- Tools & Workflow

Do not invent skill percentages, rankings, proficiency scores, or years of experience.

If a category lacks confirmed information, leave it unpopulated until the owner provides the necessary details.

## 13. Verification Workflow

After making meaningful changes:

1. Inspect the diff.
2. Run TypeScript checks.
3. Run the production build.
4. Run available linting or tests when configured.
5. Inspect the page at desktop and mobile viewport sizes.
6. Check for horizontal overflow.
7. Check browser console errors and failed asset requests when browser testing is available.
8. Verify reduced-motion behavior when animations are affected.
9. Verify that unrelated sections still work.
10. Report what was actually tested and what remains unverified.

Use the scripts defined in `package.json`. Do not claim that a test was executed if it was not.

If browser-based verification is unavailable, state that limitation explicitly.

## 14. Git and Deployment

Do not automatically commit, push, or deploy changes unless explicitly requested.

Before committing:

- Review the diff.
- Check for accidental secrets.
- Check that no temporary files or generated artifacts were added unintentionally.
- Confirm the relevant checks have passed.

Before deployment, confirm that required assets, content, environment variables, and public contact details are ready.

## 15. Final Report Format

After completing a task, report:

1. Summary of changes
2. Files changed
3. Design decisions and trade-offs
4. Verification performed and actual results
5. Known limitations
6. Missing content or assets
7. Any decisions requiring owner approval

Be concise, factual, and explicit about incomplete work.

Never describe a partially implemented feature as finished.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
