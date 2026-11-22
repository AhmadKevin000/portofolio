// English translation of the Indonesian CV (public/cv/ahmad-kevin-cv.pdf).
// Layout matches the original: Helvetica, same sizes, colors, margins, and spacing.

#set page(
  paper: "a4",
  margin: (top: 53.57pt, bottom: 51.02pt, left: 51.02pt, right: 51.02pt),
)
#set text(font: "Helvetica", size: 9.5pt, fill: rgb("#222222"), lang: "en")
#set par(justify: false, leading: 5.69pt)
#set block(spacing: 0pt)

#let ink = rgb("#222222")
#let muted = rgb("#555555")
#let rule-ink = rgb("#333333")

// Gaps between blocks. Baseline distance = gap + ascent of the next line.
#let gap-title-contact = 9.4pt
#let gap-contact-section = 14.94pt
#let gap-section-body = 3.69pt
#let gap-body-section = 13.94pt
#let gap-entry-sub = 5.69pt
#let gap-sub-bullet = 6.69pt
#let gap-bullet-entry = 9.69pt
#let gap-entry-bullet = 6.69pt
#let gap-line-line = 5.69pt

#let section(title) = block(
  width: 100%,
  inset: (left: 6pt, bottom: 4.5pt),
  stroke: (bottom: 0.8pt + rule-ink),
  text(size: 10.5pt, weight: "bold", fill: black, title),
)

#let body(content) = block(inset: (left: 6pt), content)

#let entry(title, period) = grid(
  columns: (1fr, auto),
  column-gutter: 12pt,
  align: (left, right),
  text(size: 9.5pt, weight: "bold", fill: black, title),
  text(size: 9.5pt, weight: "bold", fill: ink, period),
)

#let sub(content) = block(
  inset: (left: 6pt),
  text(size: 9.5pt, style: "italic", fill: muted, content),
)

#let bullet(content) = block(
  inset: (left: 4pt),
  grid(
    columns: (12pt, 1fr),
    column-gutter: 0pt,
    move(dy: -0.43pt, text(size: 8pt, fill: black)[•]), content,
  ),
)

#let contact(content) = block(width: 100%, {
  set par(leading: 6.4pt)
  align(center, text(size: 8.5pt, fill: ink, content))
})

#align(center, text(
  size: 18pt,
  weight: "bold",
  fill: black,
)[AHMAD KEVIN MALIK ZAKARIA])
#v(gap-title-contact)
#contact[Malang, East Java, Indonesia | +62 896 0130 2560 | ahmadkevinmalik01\@gmail.com | github.com/AhmadKevin000 | \ portofolio-kepin.vercel.app]
#v(gap-contact-section)

#section[PROFESSIONAL SUMMARY]
#v(gap-section-body)
#body[Informatics Engineering student at Politeknik Negeri Malang with experience leading teams, developing websites and mobile applications, and communicating with external partners. Comfortable working both in the field and behind the scenes.]

#v(gap-body-section)
#section[CORE COMPETENCIES]
#v(gap-section-body)
#body[Project Management · Team Coordination · Public Speaking · Negotiation · External Relations · Web Development · Mobile Development · Critical Thinking]

#v(gap-body-section)
#section[PROJECT EXPERIENCE]
#v(gap-section-body)

#entry[Backend Developer, Business Analytics Lab Profile Website][August – December 2025]
#v(gap-entry-sub)
#sub[Team of 5, Politeknik Negeri Malang]
#v(gap-sub-bullet)
#bullet[Developed a profile website for the Business Analytics Lab at Polinema as part of a five-person team, with primary responsibility for the backend.]

#v(gap-bullet-entry)
#entry[Project Manager & Frontend Developer, Project-Based Learning][February – June 2026]
#v(gap-entry-sub)
#sub[Team of 4, Politeknik Negeri Malang]
#v(gap-sub-bullet)
#bullet[Led a four-person team through a project-based learning project, from task breakdown and progress tracking to final delivery.]
#v(gap-line-line)
#bullet[Developed the frontend and kept the project on schedule, then presented the result to the supervising lecturer.]

#v(gap-bullet-entry)
#entry[Machine Learning Team Member & Mobile Developer, Project-Based Learning][2026 – Present]
#v(gap-entry-bullet)
#bullet[Contributing to the machine learning components of an ongoing team project.]
#v(gap-line-line)
#bullet[Assisting with mobile app development using Flutter and Dart.]

#v(gap-body-section)
#section[ORGANISATIONAL & LEADERSHIP EXPERIENCE]
#v(gap-section-body)

#entry[Google Student Ambassador][2026]
#v(gap-entry-bullet)
#bullet[Created 20 pieces of content and researched audience needs to introduce relevant Google products.]
#v(gap-line-line)
#bullet[Built relationships with fellow ambassadors and the wider community.]

#v(gap-bullet-entry)
#entry[External Affairs Staff, Public Relations Subdivision, Polinema Mengajar][2025 – 2026]
#v(gap-entry-bullet)
#bullet[Hosted organisational events and maintained communication with external parties.]
#v(gap-line-line)
#bullet[Supported negotiation and coordination with 4 external partners for programme needs.]

#v(gap-bullet-entry)
#entry[Field Coordinator, National Seminar, Polinema Mengajar][2026]
#v(gap-entry-bullet)
#bullet[Coordinated a field team of about 14 people and on-the-day operations for a national seminar with 60 attendees.]

#v(gap-body-section)
#section[TECHNICAL SKILLS]
#v(gap-section-body)
#body[
  #text(weight: "bold")[Programming Languages:] JavaScript, TypeScript, Dart, Python, Java, PHP \
  #text(weight: "bold")[Web & Mobile:] React, Next.js, Flutter, Laravel, Filament, Tailwind CSS, HTML, CSS \
  #text(weight: "bold")[Tools:] Git, GitHub, Figma, Visual Studio Code, Android Studio
]

#v(gap-body-section)
#section[EDUCATION]
#v(gap-section-body)
#entry[Politeknik Negeri Malang — Applied Bachelor of Informatics Engineering][2024 – Present]

#v(gap-body-section)
#section[LANGUAGES]
#v(gap-section-body)
#body[Indonesian — Native \ English — Intermediate]
