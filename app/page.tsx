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
      {/* Ticker pins to the bottom of the screen on real desktop (see
          .hero-fill-* rules in globals.css, gated on hover+pointer so
          "Desktop site" mode on a phone — which is wide but still
          touch-only — doesn't trigger it and create a huge gap there).
          Elsewhere, these classes are inert and the fixed padding
          below is what's actually shown. */}
      <div className="hero-fill-wrap flex flex-col">
        <Nav />

        <section className="hero-fill-section flex flex-col justify-center px-6 md:px-10 py-16 md:py-28">
          <p className="font-mono text-[9px] sm:text-xs uppercase tracking-wide sm:tracking-widest text-mute mb-2 md:mb-3 whitespace-nowrap">
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
