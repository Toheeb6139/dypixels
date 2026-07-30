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
      <Nav />

      {/* Hero — the thesis of the page */}
      <section
        className="min-h-[80vh] flex flex-col justify-center px-6 md:px-10"
       
      >
        <p className="font-mono text-xs uppercase tracking-widest text-mute mb-2 md:mb-3">
          Brand &amp; visual identity designer, based in Lagos, Nigeria — open for work
        </p>

        {/* Mobile: forced 4-line break. Desktop: natural flow */}
        <h1
          className="font-display font-extrabold text-[clamp(2.6rem,8vw,5.5rem)] leading-[1.02] tracking-[-0.03em] max-w-4xl"
         
        >
          <span className="md:hidden">
            I design
            <br />
            <span className="text-flash">brands</span>
            <br />
            that get
            <br />
            remembered.
          </span>
          <span className="hidden md:inline">
            I design <span className="text-flash">brands</span> that get remembered.
          </span>
        </h1>

        <p className="font-body text-lg md:text-xl max-w-xl mt-8 text-ink/80 leading-relaxed">
          I design the identity, the visuals, the whole outfit.
        </p>
      </section>

      <Ticker />

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
            A little about the person behind the tag
          </p>
          <a
            href="/about"
            className="font-display text-3xl md:text-5xl leading-tight hover:text-flash transition-colors inline-block max-w-2xl"
           
          >
            I studied engineering, then decided brands needed me more than
            circuits did. Here's the rest of the story →
          </a>
        </section>
      </Reveal>

      <Footer />
    </>
  );
}
