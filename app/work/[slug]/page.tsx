import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CoverPlaceholder } from "@/components/CoverPlaceholder";
import { getProjectBySlug } from "@/lib/projects";
import { isVideoUrl } from "@/lib/media";

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
          <h1
            className="spec-mark font-display text-4xl md:text-6xl leading-[0.95] max-w-3xl"
            data-spec-label="PROJECT TITLE"
          >
            {project.title}
          </h1>
          <div className="flex gap-2 flex-wrap font-mono text-[11px] uppercase tracking-wider text-mute">
            <span className="border border-line px-2 py-1">{project.client}</span>
            <span className="bg-flash text-paper px-2 py-1">{project.type}</span>
            <span className="border border-line px-2 py-1">{project.year}</span>
          </div>
        </header>

        <div
          className="spec-mark relative w-full aspect-[16/10] bg-ink mb-10"
          data-spec-label="COVER — 16:10"
        >
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

        <div
          className="spec-mark max-w-2xl font-body text-lg leading-relaxed whitespace-pre-line text-ink/85"
          data-spec-label="DESCRIPTION"
        >
          {project.description}
        </div>

        {(() => {
          // Defensive normalization: handles gallery being missing/null
          // entirely, the old string[] shape, stray null entries from a
          // not-yet-migrated database, and anything else malformed — so
          // a messy DB state never takes down the build.
          const rawGallery = Array.isArray(project.gallery) ? project.gallery : [];
          const galleryItems = rawGallery
            .filter((item): item is NonNullable<typeof item> => item != null)
            .map((item) =>
              typeof item === "string" ? { url: item, layout: "half" as const } : item
            )
            .filter((item) => typeof item?.url === "string" && item.url.length > 0);

          if (galleryItems.length === 0) return null;

          return (
            <div
              className="spec-mark grid md:grid-cols-2 gap-6 mt-16"
              data-spec-label="GALLERY"
            >
              {galleryItems.map((item, i) => (
                <div
                  key={i}
                  className={`relative w-full bg-ink ${
                    item.layout === "full"
                      ? "md:col-span-2 h-[60vh] md:h-[80vh]"
                      : "aspect-[4/3]"
                  }`}
                >
                  {isVideoUrl(item.url) ? (
                    <video
                      src={item.url}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  ) : (
                    <Image
                      src={item.url}
                      alt={`${project.title} detail ${i + 1}`}
                      fill
                      className="object-contain"
                      sizes={item.layout === "full" ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                    />
                  )}
                </div>
              ))}
            </div>
          );
        })()}
      </article>

      <Footer />
    </>
  );
}
