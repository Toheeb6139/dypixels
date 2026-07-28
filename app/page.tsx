import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { Tag } from "@/components/Tag";
import { Ticker } from "@/components/Ticker";
import { Reveal } from "@/components/Reveal";
import { getPublishedProjects } from "@/lib/projects";

export default async function Home() {
  const projects = await getPublishedProjects();

  return (
    <>
      <Nav />

      {/* Hero — the thesis of the page */}
      <section className="min-h-[80vh] flex flex-col justify-center px-6 md:px-10">
        <p className="font-mono text-xs uppercase tracking-widest text-mute mb-6">
          Brand &amp; Visual Identity — Lagos, NG
        </p>
        <h1
          className="spec-mark font-display font-extrabold text-[15vw] md:text-[8.5vw] leading-[0.88] tracking-tight"
          data-spec-label="H1 — CLAMP(15VW, 8.5VW)"
        >
          BRANDS,
          <br />
          <span className="text-flash">TAGGED.</span>
        </h1>
        <p className="font-body text-lg md:text-xl max-w-xl mt-10 text-ink/80">
          I design the identity, the visuals, the whole outfit.
          <Tag>Toheeb, a.k.a dypixels</Tag>
        </p>
      </section>

      <Ticker />

      {/* Work */}
      <section id="work" className="px-6 md:px-10 py-16 md:py-24">
        <div className="flex items-baseline justify-between mb-12">
          <h2 className="font-display text-2xl md:text-3xl">Selected work</h2>
          <span className="font-mono text-xs text-mute uppercase tracking-wider">
            {projects.length} project{projects.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12">
          {projects.map((project, i) => (
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
