import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/types";
import { isVideoUrl } from "@/lib/media";
import { CoverPlaceholder } from "./CoverPlaceholder";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block relative"
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-paper mb-5">
        {project.cover_image ? (
          isVideoUrl(project.cover_image) ? (
            <video
              src={project.cover_image}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <Image
              src={project.cover_image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          )
        ) : (
          <CoverPlaceholder title={project.title} />
        )}

        {/* Soft indigo accent line on hover */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-flash origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-400 ease-out" />
      </div>

      {/* Content */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-2xl md:text-[1.75rem] leading-none group-hover:text-flash transition-colors duration-300">
          {project.title}
        </h3>
        <span className="font-mono text-xs text-mute whitespace-nowrap pt-1.5">
          {project.year}
        </span>
      </div>

      <p className="font-body text-sm text-mute mt-2.5 max-w-md leading-relaxed">
        {project.summary}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-mute border border-line px-2 py-1">
          {project.client}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-mute border border-line px-2 py-1">
          {project.type}
        </span>
      </div>
    </Link>
  );
}
