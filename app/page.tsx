import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { FeaturedProject } from "@/components/FeaturedProject";
import { Tag } from "@/components/Tag";
import { getPublishedProjects } from "@/lib/projects";

export default async function Home() {
  const projects = await getPublishedProjects();

  // Prefer explicitly featured project (Koma Kitchen), fall back to first
  const featured =
    projects.find((p) => p.featured) ?? projects[0] ?? null;
  const rest = featured
    ? projects.filter((p) => p.id !== featured.id)
    : projects;

  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="min-h-[85vh] flex flex-col justify-center px-6 md:px-10">
        <p className="font-mono text-xs uppercase tracking-widest text-mute mb-6">
          Brand &amp; Visual Identity — Lagos, NG
        </p>
        <h1
          className="spec-mark font-display font-extrabold text-[clamp(3.25rem,8.5vw,7.25rem)] leading-[0.9] tracking-tight"
          data-spec-label="H1 — CLAMP"
        >
          BRANDS,
          <br />
          TAGGED.
        </h1>
        <p className="font-body text-lg md:text-xl max-w-xl mt-10 text-ink/80">
          I design the identity, the visuals, the whole outfit.
          <Tag>Toheeb, a.k.a dypixels</Tag>
        </p>
      </section>

      {/* Featured — immediately after hero */}
      {featured && <FeaturedProject project={featured} />}

      {/* Work grid */}
      <section id="work" className="px-6 md:px-10 py-16 md:py-24 border-t border-line">
        <div className="flex items-baseline justify-between mb-12 md:mb-16">
          <h2 className="font-display text-2xl md:text-3xl">Selected work</h2>
          <span className="font-mono text-xs text-mute uppercase tracking-wider">
            {rest.length} project{rest.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-x-10 gap-y-14 md:gap-y-16">
          {rest.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* About teaser */}
      <section className="px-6 md:px-10 py-16 md:py-24 border-t border-line">
        <p className="font-mono text-xs uppercase tracking-widest text-mute mb-4">
          A little about the person behind the tag
        </p>
        <a
          href="/about"
          className="font-display text-3xl md:text-5xl leading-tight hover:text-flash transition-colors inline-block max-w-2xl"
        >
          I studied engineering, then decided brands needed me more than
          circuits did. Here&apos;s the rest of the story →
        </a>
      </section>

      <Footer />
    </>
  );
}
