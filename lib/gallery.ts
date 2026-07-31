import { GalleryItem } from "./types";

// Defensive normalization: handles gallery being missing/null entirely,
// the old plain string[] shape, the old {url, layout} shape without a
// "type" field, stray null entries from a not-yet-migrated database,
// and anything else malformed — so a messy DB state never breaks a
// page. Anything that looks like a media item becomes a proper
// GalleryMediaItem; text items must already be well-formed (they're
// only ever created through the current admin UI, which always sets
// type: "text").
export function normalizeGallery(raw: unknown): GalleryItem[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .filter((item): item is NonNullable<typeof item> => item != null)
    .map((item): GalleryItem | null => {
      if (typeof item === "string") {
        return item.length > 0 ? { type: "media", url: item, layout: "half" } : null;
      }

      if (typeof item !== "object") return null;

      if (item.type === "text") {
        if (typeof item.heading !== "string" && typeof item.body !== "string") return null;
        return {
          type: "text",
          heading: typeof item.heading === "string" ? item.heading : "",
          body: typeof item.body === "string" ? item.body : "",
        };
      }

      // Legacy media item (no "type" field) or a modern one — either
      // way, if it has a usable url, treat it as media.
      if (typeof item.url === "string" && item.url.length > 0) {
        const layout = ["full", "half", "third", "quarter"].includes(item.layout)
          ? item.layout
          : "half";
        return { type: "media", url: item.url, layout };
      }

      return null;
    })
    .filter((item): item is GalleryItem => item !== null);
}
