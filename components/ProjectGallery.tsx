"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { GalleryItem, GalleryMediaItem } from "@/lib/types";
import { isVideoUrl } from "@/lib/media";

// How many columns (of 12) each layout choice spans — full = 1 per
// row, half = 2, third = 3, quarter = 4.
const COL_SPAN: Record<GalleryMediaItem["layout"], string> = {
  full: "col-span-12",
  half: "col-span-6",
  third: "col-span-4",
  quarter: "col-span-3",
};

export function ProjectGallery({
  items,
  projectTitle,
}: {
  items: GalleryItem[];
  projectTitle: string;
}) {
  const mediaItems = items.filter(
    (item): item is GalleryMediaItem => item.type === "media"
  );
  const [openUrl, setOpenUrl] = useState<string | null>(null);
  const openItem = mediaItems.find((m) => m.url === openUrl) ?? null;

  useEffect(() => {
    if (!openItem) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenUrl(null);
    }
    window.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [openItem]);

  if (items.length === 0) return null;

  // Group consecutive media items into their own grid runs, so a text
  // block breaks the tight image grid cleanly instead of becoming an
  // awkward 12-column cell itself.
  const runs: (
    | { kind: "media"; items: GalleryMediaItem[] }
    | { kind: "text"; heading: string; body: string }
  )[] = [];

  for (const item of items) {
    if (item.type === "text") {
      runs.push({ kind: "text", heading: item.heading, body: item.body });
    } else {
      const last = runs[runs.length - 1];
      if (last && last.kind === "media") {
        last.items.push(item);
      } else {
        runs.push({ kind: "media", items: [item] });
      }
    }
  }

  return (
    <>
      <div className="mt-16 space-y-12 md:space-y-16">
        {runs.map((run, ri) =>
          run.kind === "text" ? (
            <div key={ri} className="max-w-2xl">
              {run.heading && (
                <h3 className="font-display text-2xl md:text-3xl mb-3">
                  {run.heading}
                </h3>
              )}
              {run.body && (
                <p className="font-body text-lg leading-relaxed text-ink/85 whitespace-pre-line">
                  {run.body}
                </p>
              )}
            </div>
          ) : (
            <div key={ri} className="grid grid-cols-12 gap-1">
              {run.items.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setOpenUrl(item.url)}
                  aria-label={`View ${projectTitle} detail full size`}
                  className={`relative w-full block p-0 m-0 border-0 bg-charcoal cursor-pointer overflow-hidden ${
                    COL_SPAN[item.layout]
                  } ${item.layout === "full" ? "aspect-[16/9]" : "aspect-[4/5]"}`}
                >
                  {isVideoUrl(item.url) ? (
                    <video
                      src={item.url}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={item.url}
                      alt={`${projectTitle} detail`}
                      fill
                      className="object-cover"
                      sizes={
                        item.layout === "full"
                          ? "100vw"
                          : item.layout === "half"
                            ? "50vw"
                            : item.layout === "third"
                              ? "33vw"
                              : "25vw"
                      }
                    />
                  )}
                </button>
              ))}
            </div>
          )
        )}
      </div>

      {/* Lightbox — dimmed backdrop, complete uncropped image/video.
          Close button sits below the image on mobile (centered) and
          in the top-right corner on desktop. */}
      {openItem && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/95 flex flex-col md:items-center md:justify-center"
          onClick={() => setOpenUrl(null)}
        >
          <div
            className="flex-1 min-h-0 flex items-center justify-center p-4 md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            {isVideoUrl(openItem.url) ? (
              <video
                src={openItem.url}
                controls
                autoPlay
                loop
                playsInline
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={openItem.url}
                alt={`${projectTitle} full view`}
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>

          {/* Mobile: below the image, centered */}
          <div
            className="md:hidden flex justify-center pb-6 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpenUrl(null)}
              className="docket bg-paper px-4 py-2 font-mono text-xs uppercase tracking-wider hover:text-flash"
            >
              Close ✕
            </button>
          </div>

          {/* Desktop: top-right corner */}
          <div className="hidden md:block absolute top-6 right-6">
            <button
              type="button"
              onClick={() => setOpenUrl(null)}
              className="docket bg-paper px-3 py-1.5 font-mono text-xs uppercase tracking-wider hover:text-flash"
            >
              Close ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
