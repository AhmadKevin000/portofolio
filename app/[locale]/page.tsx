import { notFound } from "next/navigation";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Manifesto from "@/components/sections/Manifesto";
import Projects from "@/components/sections/Projects";
import Arsenal from "@/components/sections/Arsenal";
import Beyond from "@/components/sections/Beyond";
import AtlasGrid from "@/components/ui/AtlasGrid";
import { isLocale } from "@/lib/i18n";

/**
 * Seven sections in the order fixed by AGENTS.md §6 / design.md §4.
 *
 * Both locales render this same tree. Nothing here branches on the language:
 * the `locale` prop is handed to each section, which reads its copy from the
 * dictionary. There is no second page implementation to keep in sync.
 *
 * The Spline interlude is intentionally not mounted. The published scene is a
 * Free-plan export with a "Built with Spline" badge baked into the binary, and
 * AGENTS.md §8 forbids hiding it. At natural scale the badge dominates the band
 * and the scene adds little, so the interlude is disabled rather than disguised.
 * See the final report for the scene URL and how to restore it.
 *
 * Selected Projects, Technical Arsenal and Beyond the Code share one
 * decorative band so the perspective grid can run continuously behind all
 * three. The wrapper carries no transform, filter or overflow, so the fixed
 * navigation and the sticky section internals are unaffected; the sections
 * keep their own ids, order and scroll-margin.
 */
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <main>
      <Hero locale={locale} />
      <About locale={locale} />
      <Manifesto locale={locale} />
      <div className="atlas-band">
        <AtlasGrid />
        <Projects locale={locale} />
        <Arsenal locale={locale} />
        <Beyond locale={locale} />
      </div>
    </main>
  );
}
