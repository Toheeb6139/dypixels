import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { FeaturedProject } from "@/components/FeaturedProject";
import { Ticker } from "@/components/Ticker";
import { Reveal } from "@/components/Reveal";
import { getPublishedProjects } from "@/lib/projects";

export default async function Home() {
  const projects = await getPublishedProjects();

  const featured = projects.find((p) => p.featured) ?? projects[0] ?? null;
  const rest = featured ? projects.filter((p) => p.id !== featured.id) : projects;

  return (
    <>
      <Nav />

      {/* Hero — the thesis of the page */}
      <section
        className="spec-mark min-h-[80vh] flex flex-col justify-center px-6 md:px-10"
        data-spec-label="HERO"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-mute mb-2 md:mb-3">
          Brand &amp; visual identity designer, based in Lagos, Nigeria — open for work
        </p>

        {/* Mobile: forced 4-line break. Desktop: natural flow */}
        <h1
          className="spec-mark font-display font-extrabold text-[clamp(2.6rem,8vw,5.5rem)] leading-[1.02] tracking-[-0.03em] max-w-4xl"
          data-spec-label="H1 — CLAMP"
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
        className="spec-mark px-6 md:px-10 py-16 md:py-24"
        data-spec-label="WORK GRID"
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
            className="spec-mark font-display text-3xl md:text-5xl leading-tight hover:text-flash transition-colors inline-block max-w-2xl"
            data-spec-label="ABOUT TEASER"
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
