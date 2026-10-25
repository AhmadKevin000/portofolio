import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Manifesto from "@/components/sections/Manifesto";
import Projects from "@/components/sections/Projects";
import Arsenal from "@/components/sections/Arsenal";
import Beyond from "@/components/sections/Beyond";

/**
 * Seven sections in the order fixed by AGENTS.md §6 / design.md §4.
 *
 * The Spline interlude is intentionally not mounted. The published scene is a
 * Free-plan export with a "Built with Spline" badge baked into the binary, and
 * AGENTS.md §8 forbids hiding it. At natural scale the badge dominates the band
 * and the scene adds little, so the interlude is disabled rather than disguised.
 * See the final report for the scene URL and how to restore it.
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Manifesto />
      <Projects />
      <Arsenal />
      <Beyond />
    </main>
  );
}
