import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/types";
import { isVideoUrl } from "@/lib/media";
import { CoverPlaceholder } from "./CoverPlaceholder";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block border-b border-line pb-8 mb-8 last:border-none"
    >
      <div
        className="spec-mark relative w-full aspect-[4/3] overflow-hidden bg-ink mb-4"
        data-spec-label="IMG — 4:3"
      >
        {project.cover_image ? (
          isVideoUrl(project.cover_image) ? (
            <video
              src={project.cover_image}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <Image
              src={project.cover_image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          )
        ) : (
          <CoverPlaceholder title={project.title} />
        )}
      </div>

      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-2xl md:text-3xl leading-none">
          {project.title}
        </h3>
        <span className="font-mono text-xs text-mute whitespace-nowrap pt-1">
          {project.year}
        </span>
      </div>

      <p className="font-body text-sm text-mute mt-2 max-w-md">
        {project.summary}
      </p>

      <div className="mt-3 flex flex-wrap gap-y-2">
        <span className="font-mono text-[11px] uppercase tracking-wider text-mute border border-line px-2 py-1 mr-2">
          {project.client}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-wider text-paper bg-flash px-2 py-1">
          {project.type}
        </span>
      </div>
    </Link>
  );
}
