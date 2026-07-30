export type GalleryItem = {
  url: string;
  layout: "full" | "half" | "third" | "quarter"; // how many sit in a row: full = 1, half = 2, third = 3, quarter = 4
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  client: string;
  type: string; // e.g. "Brand Identity", "Social Campaign", "Personal"
  year: number;
  summary: string; // one or two sentences, shown on the card
  description: string; // longer body copy for the project page, supports line breaks
  cover_image: string | null; // URL
  gallery: GalleryItem[]; // additional images/videos, each with its own layout
  featured: boolean;
  sort_order: number;
  published: boolean;
  created_at: string;
};

export type ProjectInput = Omit<Project, "id" | "created_at">;

export type Lead = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};
