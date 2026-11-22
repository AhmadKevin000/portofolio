// CV Ahmad Kevin Malik Zakaria — English version, format ala Rakagali.
// Same facts as the Indonesian version. No invented metrics.

#set page(paper: "a4", margin: (
  top: 1.4cm,
  bottom: 1.4cm,
  left: 1.7cm,
  right: 1.7cm,
))
#set text(font: "New Computer Modern", size: 9pt, lang: "en")
#set par(justify: true, leading: 0.56em)

#let section(title) = {
  v(0.3em)
  block(
    width: 100%,
    inset: (top: 0.3em, bottom: 0.3em),
    stroke: (bottom: 0.7pt + black),
    text(weight: "bold", size: 10.2pt, title),
  )
  v(0.2em)
}

#let entry(title, period) = grid(
  columns: (1fr, auto),
  align(right, text(weight: "bold", period)),
  align(left, text(weight: "bold", title)),
)

#let sub(text_) = text(size: 8.6pt, text_)

#align(center)[#text(weight: "bold", size: 17pt)[AHMAD KEVIN MALIK ZAKARIA]]
#align(center)[
  Malang, East Java, Indonesia | +62 896 0130 2560 | ahmadkevinmalik01\@gmail.com |
  github.com/AhmadKevin000 | portofolio-kepin.vercel.app
]

#section[Professional Summary]
Informatics Engineering student at Politeknik Negeri Malang. I have led a four-person project
team from task breakdown to delivery, built the backend of a laboratory profile website, and
worked with external partners as part of a campus public relations team. Comfortable both in
the field and behind the screen.

#section[Core Competencies]
Project Management · Team Coordination · Public Speaking · Negotiation · External Relations ·
Web Development · Mobile Development · Critical Thinking

#section[Project Experience]

#entry[Backend Developer, Business Analytics Lab Profile Website][Aug – Dec 2025]
#sub[Team of 5, Politeknik Negeri Malang]
- Built the backend of a profile website for the Business Analytics Laboratory at Polinema,
  working in a team of five with primary responsibility for server-side work.

#entry[Project Manager & Frontend Developer, Project-Based Learning][Feb – Jun 2026]
#sub[Team of 4, Politeknik Negeri Malang]
- Led a team of four through a project-based learning project: splitting up tasks, tracking
  progress, and seeing the work through to delivery.
- Built the frontend and kept the project on schedule. We presented the final result to our
  supervising lecturer.

#entry[Machine Learning Team Member & Mobile Developer, Project-Based Learning][2026 – Present]
- Working on the machine learning components of a team project that is still in development.
- Helping build the companion mobile app with Flutter and Dart.

#section[Organisational & Leadership Experience]

#entry[Google Student Ambassador][2026]
- Made 20 pieces of content on Google products, matching the product to what the audience
  actually needed.
- Kept in touch with fellow ambassadors and the wider community.

#entry[External Affairs Staff, Public Relations Subdivision, Polinema Mengajar][2025 – 2026]
- Hosted organisational events and handled day-to-day communication with external parties.
- Supported negotiation and coordination with 4 external partners for program needs.

#entry[Field Coordinator, National Seminar, Polinema Mengajar][2026]
- Coordinated a field team of about 14 people and on-the-day operations for a national seminar
  with 60 attendees.

#section[Technical Skills]
#text[
  *Programming Languages:* JavaScript, TypeScript, Dart, Python, Java, PHP \
  *Web & Mobile:* React, Next.js, Flutter, Laravel, Filament, Tailwind CSS, HTML, CSS \
  *Tools:* Git, GitHub, Figma, Visual Studio Code, Android Studio
]

#section[Education]

#entry[Politeknik Negeri Malang, Applied Bachelor of Informatics Engineering][2024 – Present]

#section[Languages]
Indonesian: Native \
English: Intermediate
