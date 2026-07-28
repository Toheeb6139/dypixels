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
  gallery: string[]; // additional image URLs
  featured: boolean;
  sort_order: number;
  published: boolean;
  created_at: string;
};

export type ProjectInput = Omit<Project, "id" | "created_at">;
