import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import Contact from "@/components/sections/Contact";
import { profile } from "@/content/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Bricolage_Grotesque({
  variable: "--font-display-face",
  subsets: ["latin"],
  display: "swap",
});

const editorial = Instrument_Serif({
  variable: "--font-editorial-face",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.fullName} — ${profile.nickname}`,
  description: `${profile.fullName}, known as ${profile.nickname}. ${profile.role}. Portfolio of work in progress.`,
  openGraph: {
    title: `${profile.fullName} — ${profile.nickname}`,
    description: `${profile.role}. Portfolio of work in progress.`,
    type: "website",
  },
};

/**
 * Runs in `<head>`, before the body paints.
 *
 * Arms the pre-reveal hidden state so the first frame is never
 * "visible, then hidden, then animated", and starts a watchdog that gives up
 * after two seconds if GSAP has not reported in.
 *
 * `data-motion-ready` is set by `ensureGsap()`. If the bundle fails to load —
 * blocked chunk, hydration error, offline, an aggressive content blocker — the
 * attribute is never set, the watchdog disarms, and every section renders
 * plainly visible instead of sitting at opacity 0 forever.
 */
const REVEAL_BOOTSTRAP = `(function(){try{
var d=document.documentElement;
d.setAttribute("data-reveal-armed","");
setTimeout(function(){
  if(!d.hasAttribute("data-motion-ready")){
    d.removeAttribute("data-reveal-armed");
  }
},2000);
}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} ${editorial.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: REVEAL_BOOTSTRAP }} />
      </head>
      <body className="min-h-full bg-ink text-fg">
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:border focus:border-accent focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-[10px] focus:uppercase focus:tracking-[0.24em] focus:text-accent"
        >
          Skip to work
        </a>
        <SiteNav />
        {children}
        <Contact />
        {/* Without JS nothing would ever leave the pre-reveal state. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </body>
    </html>
  );
}
