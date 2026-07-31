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

function sanitizeFilename(name: string) {
  const dot = name.lastIndexOf(".");
  const base = dot > 0 ? name.slice(0, dot) : name;
  const ext = dot > 0 ? name.slice(dot + 1) : "";
  const safeBase = base
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
  return { safeBase: safeBase || "file", ext: ext.toLowerCase() };
}

// Issues a short-lived signed upload slot instead of accepting the
// file directly. Vercel's serverless functions hard-cap request
// bodies at 4.5MB regardless of any config we set — so instead of
// sending the file through this server action, the browser uploads
// straight to Supabase using this signed URL. This action's own
// request/response stays tiny (just a filename in, a URL out).
export async function createUploadSlot(originalFilename: string) {
  const { safeBase, ext } = sanitizeFilename(originalFilename);
  const path = `${crypto.randomUUID().slice(0, 8)}-${safeBase}${ext ? "." + ext : ""}`;

  const { data, error } = await supabaseAdmin.storage
    .from("project-images")
    .createSignedUploadUrl(path);

  if (error) throw new Error(error.message);

  const { data: publicUrlData } = supabaseAdmin.storage
    .from("project-images")
    .getPublicUrl(path);

  return { path, token: data.token, url: publicUrlData.publicUrl };
}

export async function deleteLead(id: string) {
  const { error } = await supabaseAdmin.from("leads").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/dashboard");
}
