import { supabase } from "./supabase";
import { Project } from "./types";
import { placeholderProjects } from "./placeholder-data";

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

function sortProjects(projects: Project[]) {
  return [...projects].sort((a, b) => a.sort_order - b.sort_order);
}

export async function getPublishedProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured()) {
    return sortProjects(placeholderProjects);
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    // A real connection/config problem — fall back so the site doesn't
    // show nothing. An empty result (no rows published yet) is NOT an
    // error and should NOT trigger this — it should show as empty.
    console.error("getPublishedProjects error:", error.message);
    return sortProjects(placeholderProjects);
  }

  return (data as Project[]) ?? [];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!isSupabaseConfigured()) {
    return placeholderProjects.find((p) => p.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) {
    // PGRST116 = "no rows found" — a real, expected outcome for a
    // draft or nonexistent slug, not a connection problem. Let it 404
    // instead of masking it with placeholder content.
    if (error.code === "PGRST116") return null;

    console.error("getProjectBySlug error:", error.message);
    return placeholderProjects.find((p) => p.slug === slug) ?? null;
  }

  return data as Project;
}
