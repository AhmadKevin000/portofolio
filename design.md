# Portfolio Design System — Ahmad Kevin / Kepin

## 1. Design Vision

Create a distinctive, premium personal developer portfolio that combines experimental 3D typography with editorial storytelling and professional clarity.

The experience should feel:

- Creative but credible
- Experimental but controlled
- Cinematic but usable
- Personal but professionally presented
- Technically sophisticated without becoming visually noisy

Use HAOQI.DESIGN as a reference for the quality of dimensional typography, lighting, cursor interaction, and cinematic transitions.

Use it as inspiration, not as a template. Do not copy its exact layout, assets, text, or identity.

The result must establish its own identity around the wordmark "Kepin".

## 2. Core Visual Principles

### Visual hierarchy

Every section must have a clear primary focus.

Use large display typography, deliberate spacing, controlled contrast, and editorial composition.

Do not give every element equal visual weight.

### Restraint

Not every element needs an animation, glow, gradient, or hover effect.

Use strong effects for a small number of important moments. Let informational sections remain calm enough to read comfortably.

### Dark, tonal visual system

The website uses a dark visual foundation, but it must not look like one uninterrupted flat black page.

Use tonal variation between sections.

Suggested starting palette:

- Deep ink: `#0B0C10`
- Primary surface: `#11141A`
- Secondary surface: `#171B22`
- Elevated surface: `#202630`
- Primary text: `#F3F4F6`
- Secondary text: `#A5ADB8`
- Muted text: `#7D8794`
- Accent: a restrained cool silver or blue-white tone

These values are initial design tokens, not an instruction to replace every existing color blindly.

Inspect the current implementation and tune the palette to preserve contrast and consistency.

Use subtle gradients, radial lighting, surface variation, and restrained borders to create depth.

Avoid:

- Pure black as the only background color across all sections
- Excessive neon
- Rainbow gradients
- Uncontrolled glow
- Heavy glassmorphism everywhere
- Random decorative shapes with no compositional purpose

The background should feel layered and intentional rather than uniformly black.

## 3. Typography

Use a hybrid typographic system.

### Display typography

Large, expressive, dimensional typography is reserved for the hero and selected cinematic moments.

Display typography may use:

- Large scale
- Tight but readable tracking
- Controlled dimensional depth
- Specular highlights
- Subtle gradients
- Intentional cropping where legibility is preserved

### Information typography

Use clean, highly readable typography for:

- Body copy
- Project descriptions
- Technical skills
- Navigation
- Metadata
- Contact information

Do not use experimental display typography for long paragraphs.

Keep a clear difference between headings, body text, labels, and metadata.

## 4. Section Architecture

The website has seven primary sections, in this order:

1. Hero
2. About Me
3. Innovate with Purpose
4. Selected Projects
5. Technical Arsenal
6. Beyond the Code
7. Let's Connect

Each section must have its own composition and purpose while sharing a coherent design language.

Use tonal background changes, spacing, typography, and lighting to distinguish sections. Avoid adding arbitrary dividers everywhere.

## 5. Hero

### Primary identity

The hero wordmark is:

**Kepin**

Use the exact capitalization: uppercase `K`, lowercase `epin`.

The wordmark is the primary visual anchor.

### "known as" overlay

Place the small phrase `known as` near the upper-left portion of the wordmark.

It should:

- Be significantly smaller than the main wordmark
- Use an italic or editorial style
- Remain readable
- Overlap the wordmark slightly
- Feel intentionally composed rather than accidentally misplaced
- Avoid excessive decoration

### Personal identity

Include the owner's actual name, Ahmad Kevin, and an accurate role or introduction.

The actual name must remain readable independently of the decorative wordmark.

Do not invent a professional title or claim seniority that has not been established.

Include a clear CTA leading to the projects section.

### 3D treatment

The preferred direction is premium, glossy, dimensional typography with controlled lighting.

Aim for:

- Smooth dimensional forms
- Convincing depth
- Restrained highlights
- Carefully controlled reflections
- A premium, tactile quality
- Subtle cursor-reactive lighting or movement

Avoid excessive chrome, aggressive neon, or distracting movement.

Do not let 3D objects pierce, obscure, or compete with the main wordmark.

The wordmark must remain the strongest element.

### Portrait

Do not place a large portrait in the hero.

The main portrait belongs in About Me to keep the opening composition focused.

## 6. Spline and 3D Visual Direction

Spline should support the overall composition rather than become a separate showcase that distracts from the content.

### Intended role

Use Spline when an actual 3D scene materially improves the design.

Potential uses include:

- Dimensional typography
- Abstract atmospheric objects
- Controlled lighting
- Interactive 3D details
- Visual transitions between major sections

Do not add a 3D object simply because the project supports Spline.

### Composition

- Establish one clear visual focal point at a time.
- Keep important text above decorative layers.
- Avoid intersections between 3D objects and foreground text.
- Use clipping and positioning intentionally.
- Keep lighting controlled.
- Avoid continuous movement that competes with reading.
- Maintain a clean fallback when the scene is unavailable.

If the existing scene conflicts with the wordmark, prioritize readability and composition over forcing the scene behind the text.

A separate full-bleed 3D interlude is acceptable when it creates a deliberate transition.

### Actual 3D versus CSS effects

Distinguish actual Spline geometry from CSS-based dimensional text.

A CSS extrusion may be an acceptable implementation if it achieves the visual objective, but it must not be described as actual Spline geometry.

If a true 3D wordmark is a required acceptance criterion, do not silently substitute CSS extrusion. Explain the trade-offs and request authorization when scene editing or Spline MCP access is necessary.

### Watermark and licensing

Do not purchase a Spline subscription or change the licensing setup without the owner's approval.

Do not treat cropping or hiding a watermark as removing it from the underlying scene.

If the watermark affects the final design, present the options and let the owner decide.

### Performance

The 3D experience must not compromise the rest of the website.

Consider:

- Scene size
- Loading time
- WebGL availability
- Mobile performance
- Responsive layout
- Reduced-motion preferences
- Keyboard and touch interaction

A lightweight or static alternative is preferable to an expensive scene that provides little visual value.

## 7. About Me

### Purpose

Introduce the person behind the portfolio.

Use an editorial two-column layout:

- One side: a substantial portrait
- Other side: a concise introduction and selected personal details

The heading may use:

`A LITTLE ABOUT ME`

`Hi, I'm Kevin.`

### Portrait

Use the owner's authentic portrait at:

`public/images/kepin-portrait.jpg`

The image must be supplied and verified before use.

Preserve a natural appearance. Prioritize framing, crop, aspect ratio, and composition over aggressive filters.

### Copy

The introduction should sound personal, direct, and credible.

Avoid generic claims such as "passionate innovator" unless supported by meaningful, specific writing.

Keep the paragraph concise and readable.

## 8. Innovate with Purpose

### Purpose

Create a cinematic typographic transition that connects the personal introduction to the project showcase.

Primary phrase:

**INNOVATE WITH PURPOSE**

### Motion direction

Use GSAP and ScrollTrigger for a controlled change in scale, position, or composition.

The animation should create a memorable visual pause without becoming a long obstacle.

Requirements:

- Preserve native scrolling.
- Do not trap the user in a scroll sequence.
- Do not delay access to projects unnecessarily.
- Provide a reduced-motion alternative.
- Keep the typography readable during the transition.
- Ensure the section remains coherent on mobile.

The experience should feel cinematic, not like a forced animation demo.

## 9. Selected Projects

Only two projects are currently established for this portfolio:

1. Bimbel KAIFA
2. RoastMate

Do not invent additional projects to fill space.

Two well-presented, honest case studies are preferable to a larger list of weak or fictional projects.

### Visual direction

Use editorial project presentations with generous space for actual screenshots or product imagery.

Each project should have:

- Project name
- Accurate development status
- Concise problem or purpose
- Verified contribution
- Confirmed technology stack
- Actual screenshots when available
- A short explanation of implementation or decisions
- Next steps when the project is unfinished

Avoid generic, tiny project cards when a larger case-study composition is more appropriate.

### Bimbel KAIFA

Asset path:

`public/images/kaifa.jpg`

The project is still in progress.

Do not label it as completed without owner confirmation.

Describe only the actual features, contributions, and technologies that can be verified.

### RoastMate

Asset path:

`public/images/roastmate.jpg`

The project is in development.

Some implementation work exists, but the status of the machine learning system must be confirmed.

The portfolio may explain the intended computer-vision workflow and the current technical challenge, provided the wording accurately distinguishes implemented functionality from planned work.

Do not claim that YOLOv8, HSV processing, or another model works successfully unless that has been verified.

Use an honest status label such as `IN DEVELOPMENT`.

### Project imagery integrity

Use real screenshots, photographs, or verified assets from the projects.

Do not fabricate product screenshots or present generated imagery as actual application output.

If the screenshots are not available, use an intentional neutral visual treatment rather than fake evidence.

## 10. Technical Arsenal

Present the technical stack as an editorial index rather than a gamified skill dashboard.

Potential categories:

- Frontend
- Backend & Database
- Data & Machine Learning
- Tools & Workflow

Only display technologies that the owner has actually used and can discuss.

Do not use arbitrary percentages, skill bars, or proficiency ratings.

Do not fill empty categories with technologies simply to make the layout look balanced.

Use typography, grouping, spacing, and restrained interaction to create visual interest.

Hover effects must have an accessible touch and keyboard equivalent where relevant.

## 11. Beyond the Code

### Purpose

Show the experiences that shape the person behind the technical work.

This section should communicate real-world experience, communication, teaching, community involvement, and responsibility.

It should not be a generic résumé section or an exaggerated soft-skills list.

### Confirmed experience themes

The owner's known experiences include:

- Public speaking and delivering religious talks or sermons during and after boarding-school experience
- Paid sermon or khutbah engagements at several mosques after entering high school
- Experience as an MC
- Teaching elementary-school children at a tutoring center while in high school
- Participation in Polinema Mengajar, including external-relations responsibilities; the owner is now demisioner but sometimes still teaches
- Working as a ShopeeFood driver for approximately eight months and remaining active
- Serving on the security and health committee for a Polinema Information Technology student-association orientation event in 2025

Use these facts carefully and verify details with the owner when needed.

Possible editorial groupings:

- Communication & Education
- Community & Collaboration
- Real-World Experience

Do not imply that the owner held an education or creative-division role in Polinema Mengajar.

Do not invent dates, achievements, awards, or outcomes.

Use activity photos only when authentic assets are available.

## 12. Let's Connect

Create a clear and approachable closing section.

The visual design may become more minimal and focused to provide a calm ending.

Include only verified contact channels.

Potential elements:

- A concise invitation to connect
- Approved public email
- Verified GitHub profile or repository
- Verified LinkedIn profile

The email `ahmadkevinmalik01@gmail.com` has been found in Git configuration but has not yet been confirmed for public display.

Do not publish it until the owner approves.

Do not invent a LinkedIn URL.

Avoid fake contact forms or buttons that do not work.

## 13. Navigation and Interaction

Navigation should be simple, predictable, and unobtrusive.

Requirements:

- Clear active or hover feedback when appropriate
- Keyboard accessibility
- Mobile usability
- Adequate contrast
- No scroll hijacking
- No interactions that prevent access to content

Cursor-reactive effects should be subtle and should not be essential to understanding the page.

Do not make the website unusable on touch devices.

## 14. Responsive Behavior

The design must be intentional at:

- Desktop
- Tablet
- Mobile

Do not simply scale the desktop composition down.

At smaller sizes:

- Recompose typography and layouts.
- Preserve the wordmark's hierarchy.
- Prevent horizontal overflow.
- Keep project content readable.
- Simplify or disable expensive 3D effects where appropriate.
- Maintain accessible controls.
- Ensure that all essential content remains available.

If the Spline scene is not mounted on mobile, the surrounding layout must still feel complete rather than broken or empty.

## 15. Motion Accessibility

Respect `prefers-reduced-motion`.

When reduced motion is enabled:

- Avoid long cinematic transitions.
- Remove or simplify unnecessary parallax and cursor-driven motion.
- Keep content immediately readable.
- Ensure ScrollTrigger animations do not leave content hidden.
- Do not require animated movement to reveal important information.

Motion should enhance the design, never become a prerequisite for using it.

## 16. Visual Quality Checklist

Before considering a design change complete, check:

- Does the section have one clear visual focus?
- Does the design maintain contrast and readability?
- Does the dark palette have sufficient tonal variation?
- Is the use of 3D intentional?
- Does motion support the content?
- Is the layout coherent on mobile? 
- Does the section fit the overall visual identity?
- Are project and personal claims factually accurate?
- Are all referenced assets real and available?
- Does the page remain usable with reduced motion?
- Does the design avoid unnecessary decoration?

The final experience should feel cohesive, deliberate, personal, and technically polished.