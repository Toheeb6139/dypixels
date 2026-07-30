"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { GalleryItem } from "@/lib/types";
import { isVideoUrl } from "@/lib/media";

// How many columns (of 12) each layout choice spans — full = 1 per
// row, half = 2, third = 3, quarter = 4.
const COL_SPAN: Record<GalleryItem["layout"], string> = {
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
    }
    window.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [openIndex]);

  if (items.length === 0) return null;

  const openItem = openIndex !== null ? items[openIndex] : null;

  return (
    <>
      {/* Tight, cropped, edge-to-edge grid — click any tile for the
          complete, uncropped view in the lightbox below. */}
      <div className="grid grid-cols-12 gap-1 mt-16">
        {items.map((item, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`View ${projectTitle} detail ${i + 1} full size`}
            className={`relative w-full block p-0 m-0 border-0 bg-ink cursor-pointer overflow-hidden ${
              COL_SPAN[item.layout]
            } ${item.layout === "full" ? "aspect-[16/9]" : "aspect-square"}`}
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
                alt={`${projectTitle} detail ${i + 1}`}
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

      {/* Lightbox — dimmed backdrop, complete uncropped image/video */}
      {openItem && (
        <div
          className="fixed inset-0 z-50 bg-ink/95 flex items-center justify-center p-4 md:p-10"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Close"
            className="docket absolute top-4 right-4 md:top-6 md:right-6 bg-paper px-3 py-1.5 font-mono text-xs uppercase tracking-wider hover:text-flash"
          >
            Close ✕
          </button>

          {isVideoUrl(openItem.url) ? (
            <video
              src={openItem.url}
              controls
              autoPlay
              loop
              playsInline
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={openItem.url}
              alt={`${projectTitle} full view`}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </>
  );
}
