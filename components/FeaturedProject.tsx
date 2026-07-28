import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/types";
import { isVideoUrl } from "@/lib/media";
import { CoverPlaceholder } from "./CoverPlaceholder";

export function FeaturedProject({ project }: { project: Project }) {
  return (
    <section className="px-6 md:px-10 pt-4 pb-16 md:pb-24">
      <Link
        href={`/work/${project.slug}`}
        className="group block"
      >
        {/* Cover */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-paper mb-6 md:mb-8">
          {project.cover_image ? (
            isVideoUrl(project.cover_image) ? (
              <video
                src={project.cover_image}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            ) : (
              <Image
                src={project.cover_image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                sizes="100vw"
                priority
              />
            )
          ) : (
            <CoverPlaceholder title={project.title} variant="featured" />
          )}
        </div>

        {/* Meta */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-8">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-widest text-mute mb-3">
              Featured · {project.year}
            </p>
            <h2 className="font-display text-3xl md:text-5xl leading-[1.05] group-hover:text-flash transition-colors duration-300">
              {project.title}
            </h2>
            <p className="font-body text-base md:text-lg text-ink/75 mt-3 max-w-xl">
              {project.summary}
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <span className="font-mono text-[11px] uppercase tracking-wider text-mute border border-line px-2.5 py-1">
              {project.type}
            </span>
            <span className="font-mono text-sm uppercase tracking-wider text-ink group-hover:text-flash transition-colors duration-300">
              View project →
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
