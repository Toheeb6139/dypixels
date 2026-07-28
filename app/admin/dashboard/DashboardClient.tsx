"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Project, ProjectInput } from "@/lib/types";
import {
  createProject,
  updateProject,
  deleteProject,
  uploadProjectImage,
} from "./actions";

const emptyDraft: Partial<ProjectInput> = {
  title: "",
  slug: "",
  client: "",
  type: "",
  year: new Date().getFullYear(),
  summary: "",
  description: "",
  cover_image: "",
  gallery: [],
  featured: false,
  published: false,
  sort_order: 999,
};

export function DashboardClient({ projects }: { projects: Project[] }) {
  const [openId, setOpenId] = useState<string | "new" | null>(null);
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-screen px-6 md:px-10 py-10 bg-paper max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-mute">
            dypixels / admin
          </p>
          <h1 className="font-display text-3xl mt-1">Your projects</h1>
        </div>
        <button
          onClick={handleLogout}
          className="font-mono text-xs uppercase tracking-wider text-mute hover:text-flash transition-colors"
        >
          Log out
        </button>
      </div>

      <button
        onClick={() => setOpenId(openId === "new" ? null : "new")}
        className="docket w-full px-4 py-3 mb-6 font-mono text-xs uppercase tracking-wider hover:text-flash transition-colors text-left"
      >
        {openId === "new" ? "− Cancel new project" : "+ Add a project"}
      </button>

      {openId === "new" && (
        <ProjectForm
          draft={emptyDraft}
          onSaved={() => {
            setOpenId(null);
            router.refresh();
          }}
        />
      )}

      <ul className="space-y-3 mt-8">
        {projects.map((p) => (
          <li key={p.id} className="border border-line">
            <button
              onClick={() => setOpenId(openId === p.id ? null : p.id)}
              className="w-full flex items-center justify-between px-4 py-3 text-left"
            >
              <span className="font-body">
                {p.title}{" "}
                <span className="font-mono text-xs text-mute ml-2">
                  {p.published ? "published" : "draft"}
                </span>
              </span>
              <span className="font-mono text-xs text-mute">
                {openId === p.id ? "−" : "+"}
              </span>
            </button>

            {openId === p.id && (
              <div className="px-4 pb-4">
                <ProjectForm
                  draft={p}
                  existingId={p.id}
                  onSaved={() => {
                    setOpenId(null);
                    router.refresh();
                  }}
                  onDeleted={() => {
                    setOpenId(null);
                    router.refresh();
                  }}
                />
              </div>
            )}
          </li>
        ))}
      </ul>

      {projects.length === 0 && (
        <p className="font-mono text-sm text-mute mt-10">
          No projects yet. Add your first one above.
        </p>
      )}
    </main>
  );
}

function ProjectForm({
  draft,
  existingId,
  onSaved,
  onDeleted,
}: {
  draft: Partial<Project>;
  existingId?: string;
  onSaved: () => void;
  onDeleted?: () => void;
}) {
  const [form, setForm] = useState<Partial<ProjectInput>>({
    ...emptyDraft,
    ...draft,
    gallery: draft.gallery ?? [],
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof ProjectInput>(key: K, value: ProjectInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const url = await uploadProjectImage(fd);
      set("cover_image", url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingGallery(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const url = await uploadProjectImage(fd);
      setForm((f) => ({ ...f, gallery: [...(f.gallery ?? []), url] }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploadingGallery(false);
      e.target.value = "";
    }
  }

  function removeGalleryItem(index: number) {
    setForm((f) => ({
      ...f,
      gallery: (f.gallery ?? []).filter((_, i) => i !== index),
    }));
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      if (existingId) {
        await updateProject(existingId, form);
      } else {
        await createProject(form);
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!existingId) return;
    if (!confirm(`Delete "${form.title}"? This can't be undone.`)) return;
    setSaving(true);
    try {
      await deleteProject(existingId, form.slug ?? "");
      onDeleted?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed.");
      setSaving(false);
    }
  }

  const inputClass =
    "w-full border border-line bg-paper px-3 py-2 font-body text-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-flash";
  const labelClass = "font-mono text-[11px] uppercase tracking-wider text-mute block mb-1 mt-4";

  return (
    <div>
      <label className={labelClass}>Title</label>
      <input className={inputClass} value={form.title} onChange={(e) => set("title", e.target.value)} />

      <label className={labelClass}>Slug (URL — leave blank to auto-generate from title)</label>
      <input className={inputClass} value={form.slug} onChange={(e) => set("slug", e.target.value)} />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Client</label>
          <input className={inputClass} value={form.client} onChange={(e) => set("client", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Type</label>
          <input
            className={inputClass}
            placeholder="Brand Identity, Social..."
            value={form.type}
            onChange={(e) => set("type", e.target.value)}
          />
        </div>
      </div>

      <label className={labelClass}>Year</label>
      <input
        type="number"
        className={inputClass}
        value={form.year}
        onChange={(e) => set("year", Number(e.target.value))}
      />

      <label className={labelClass}>Summary (one line, shown on the work grid)</label>
      <input className={inputClass} value={form.summary} onChange={(e) => set("summary", e.target.value)} />

      <label className={labelClass}>Description (project page, line breaks OK)</label>
      <textarea
        className={inputClass}
        rows={5}
        value={form.description}
        onChange={(e) => set("description", e.target.value)}
      />

      <label className={labelClass}>Cover image or video</label>
      <p className="font-mono text-[10px] text-mute mb-1">
        Images (jpg, png, webp) or short clips (mp4, webm) — avoid GIF if
        you can; convert to webm first, same look, much smaller file.
      </p>
      <div className="flex items-center gap-3">
        <input
          type="file"
          accept="image/*,video/mp4,video/webm,video/quicktime"
          onChange={handleUpload}
          className="font-mono text-xs"
        />
        {uploading && <span className="font-mono text-xs text-mute">Uploading…</span>}
      </div>
      {form.cover_image && (
        <p className="font-mono text-[11px] text-mute mt-1 break-all">{form.cover_image}</p>
      )}

      <label className={labelClass}>Gallery (optional — extra shots on the project page)</label>
      <div className="flex items-center gap-3">
        <input
          type="file"
          accept="image/*,video/mp4,video/webm,video/quicktime"
          onChange={handleGalleryUpload}
          className="font-mono text-xs"
        />
        {uploadingGallery && <span className="font-mono text-xs text-mute">Uploading…</span>}
      </div>
      {(form.gallery ?? []).length > 0 && (
        <ul className="mt-2 space-y-1">
          {(form.gallery ?? []).map((url, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-mute break-all flex-1">{url}</span>
              <button
                type="button"
                onClick={() => removeGalleryItem(i)}
                className="font-mono text-[11px] text-flag hover:opacity-70 transition-opacity shrink-0"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center gap-6 mt-5">
        <label className="font-mono text-xs flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => set("published", e.target.checked)}
          />
          Published
        </label>
        <label className="font-mono text-xs flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => set("featured", e.target.checked)}
          />
          Featured
        </label>
      </div>

      {error && <p className="font-mono text-xs text-flag mt-4">{error}</p>}

      <div className="flex items-center gap-3 mt-6">
        <button
          onClick={handleSave}
          disabled={saving || !form.title}
          className="docket px-4 py-2 font-mono text-xs uppercase tracking-wider hover:text-flash transition-colors disabled:opacity-40"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        {existingId && (
          <button
            onClick={handleDelete}
            disabled={saving}
            className="font-mono text-xs uppercase tracking-wider text-flag hover:opacity-70 transition-opacity"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
