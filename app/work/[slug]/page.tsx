import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CoverPlaceholder } from "@/components/CoverPlaceholder";
import { ProjectGallery } from "@/components/ProjectGallery";
import { getProjectBySlug } from "@/lib/projects";
import { isVideoUrl } from "@/lib/media";
import { normalizeGallery } from "@/lib/gallery";

// Always fetch live from the database — same reasoning as the
// homepage: correctness (a draft never leaking, a publish always
// showing immediately) matters far more than static-generation speed
// for a portfolio site's traffic level.
export const dynamic = "force-dynamic";

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  const galleryItems = normalizeGallery(project.gallery);

  return (
    <>
      <Nav />

      <article className="px-6 md:px-10 py-8 md:py-12">
        <Link
          href="/#work"
          className="font-mono text-xs uppercase tracking-wider text-mute hover:text-flash transition-colors"
        >
          ← Back to work
        </Link>

        <header className="mt-8 mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h1 className="font-display text-4xl md:text-6xl leading-[0.95] max-w-3xl">
            {project.title}
          </h1>
          <div className="flex gap-2 flex-wrap font-mono text-[11px] uppercase tracking-wider text-mute">
            <span className="border border-line px-2 py-1">{project.client}</span>
            <span className="bg-flash text-paper px-2 py-1">{project.type}</span>
            <span className="border border-line px-2 py-1">{project.year}</span>
          </div>
        </header>

        <div className="relative w-full aspect-[16/10] bg-ink mb-10">
          {project.cover_image ? (
            isVideoUrl(project.cover_image) ? (
              <video
                src={project.cover_image}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <Image
                src={project.cover_image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            )
          ) : (
            <CoverPlaceholder title={project.title} variant="featured" />
          )}
        </div>

        <div className="max-w-2xl font-body text-lg leading-relaxed whitespace-pre-line text-ink/85">
          {project.description}
        </div>

        <ProjectGallery items={galleryItems} projectTitle={project.title} />
      </article>

      <Footer />
    </>
  );
}
