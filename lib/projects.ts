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

  if (error || !data || data.length === 0) {
    return sortProjects(placeholderProjects);
  }

  return data as Project[];
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

  if (error || !data) {
    return placeholderProjects.find((p) => p.slug === slug) ?? null;
  }

  return data as Project;
}
