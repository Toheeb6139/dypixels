"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { ProjectInput } from "@/lib/types";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function createProject(input: Partial<ProjectInput>) {
  const slug = input.slug?.trim() || slugify(input.title ?? "untitled");

  const { error } = await supabaseAdmin.from("projects").insert({
    title: input.title ?? "Untitled project",
    slug,
    client: input.client ?? "",
    type: input.type ?? "",
    year: input.year ?? new Date().getFullYear(),
    summary: input.summary ?? "",
    description: input.description ?? "",
    cover_image: input.cover_image ?? null,
    gallery: input.gallery ?? [],
    featured: input.featured ?? false,
    sort_order: input.sort_order ?? 999,
    published: input.published ?? false,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath(`/work/${slug}`);
}

export async function updateProject(id: string, input: Partial<ProjectInput>) {
  const { error } = await supabaseAdmin
    .from("projects")
    .update(input)
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/");
  if (input.slug) revalidatePath(`/work/${input.slug}`);
}

export async function deleteProject(id: string, slug: string) {
  const { error } = await supabaseAdmin.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath(`/work/${slug}`);
}

export async function uploadProjectImage(formData: FormData) {
  const file = formData.get("file") as File | null;
  if (!file) throw new Error("No file provided.");

  const ext = file.name.split(".").pop();
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabaseAdmin.storage
    .from("project-images")
    .upload(path, file, { cacheControl: "3600", upsert: false });

  if (error) throw new Error(error.message);

  const { data } = supabaseAdmin.storage.from("project-images").getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteLead(id: string) {
  const { error } = await supabaseAdmin.from("leads").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/dashboard");
}
