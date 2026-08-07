import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { FeaturedProject } from "@/components/FeaturedProject";
import { Ticker } from "@/components/Ticker";
import { Reveal } from "@/components/Reveal";
import { getPublishedProjects } from "@/lib/projects";

// Always fetch live from the database — no static caching layer that
// can drift out of sync with what's actually toggled in /admin.
export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await getPublishedProjects();

  // Strictly follows the Featured toggle: if nothing is marked
  // featured, nothing gets the spotlight slot — no automatic fallback
  // pick of "whatever's first."
  const featured = projects.find((p) => p.featured) ?? null;
  const rest = featured ? projects.filter((p) => p.id !== featured.id) : projects;

  return (
    <>
      {/* Fixed, deterministic spacing — no viewport-height math (100vh/
          100dvh/min-h-screen), on purpose. That approach kept breaking
          in edge cases like Chrome's "Desktop site" mode on a phone,
          where reported viewport dimensions don't behave predictably.
          Trades "ticker pixel-perfect at the screen's bottom edge" for
          "renders correctly everywhere, always." */}
      <div className="flex flex-col">
        <Nav />

        <section className="flex flex-col justify-center px-6 md:px-10 py-16 md:py-28">
          <p className="font-mono text-xs uppercase tracking-widest text-mute mb-2 md:mb-3">
            Research • Strategy • Identity • Execution
          </p>

          {/* Mobile: forced line breaks. Desktop: natural flow */}
          <h1 className="font-display font-extrabold text-[clamp(2.6rem,8vw,5.5rem)] leading-[1.02] tracking-[-0.03em] max-w-4xl">
            <span className="md:hidden">
              Good brands
              <br />
              get noticed.
              <br />
              Great ones get
              <br />
              <span className="text-flash">remembered.</span>
            </span>
            <span className="hidden md:inline">
              Good brands get noticed. Great ones get{" "}
              <span className="text-flash">remembered.</span>
            </span>
          </h1>

          <p className="font-body text-lg md:text-xl max-w-xl mt-6 md:mt-8 text-ink/80 leading-relaxed">
            I help ambitious brands become the second kind.
          </p>
        </section>

        <Ticker />
      </div>

      {featured && <FeaturedProject project={featured} />}

      {/* Work */}
      <section
        id="work"
        className="px-6 md:px-10 py-16 md:py-24"
       
      >
        <div className="flex items-baseline justify-between mb-12">
          <h2 className="font-display text-2xl md:text-3xl">More work</h2>
          <span className="font-mono text-xs text-mute uppercase tracking-wider">
            {rest.length} project{rest.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12">
          {rest.map((project, i) => (
            <Reveal key={project.id} className={i % 2 === 1 ? "md:mt-12" : ""}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* About teaser */}
      <Reveal>
        <section className="px-6 md:px-10 py-16 md:py-24 border-t border-line">
          <p className="font-mono text-xs uppercase tracking-widest text-mute mb-4">
            Beyond the work
          </p>
          <a
            href="/about"
            className="font-display text-3xl md:text-5xl leading-tight hover:text-flash transition-colors inline-block max-w-2xl"
          >
            I studied engineering, then decided brands needed me more than
            circuits did. Here's the story. →
          </a>
        </section>
      </Reveal>

      <Footer />
    </>
  );
}
