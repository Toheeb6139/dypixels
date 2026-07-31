"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Project, ProjectInput, Lead, GalleryItem, GalleryMediaItem } from "@/lib/types";
import { normalizeGallery } from "@/lib/gallery";
import {
  createProject,
  updateProject,
  deleteProject,
  uploadProjectImage,
  deleteLead,
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

export function DashboardClient({
  projects,
  leads,
  renderedAt,
  fetchError,
}: {
  projects: Project[];
  leads: Lead[];
  renderedAt: string;
  fetchError: string | null;
}) {
  const [openId, setOpenId] = useState<string | "new" | null>(null);
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-screen px-6 md:px-10 py-10 bg-paper max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
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

      {/* Diagnostic bar — proves whether this page is actually showing
          fresh server data. If "Server rendered at" doesn't change
          after Hard refresh, the problem is caching upstream of the
          app, not the code itself. */}
      <div className="border border-line px-3 py-2 mb-6 flex items-center justify-between flex-wrap gap-2">
        <p className="font-mono text-[10px] text-mute">
          Server rendered at: {new Date(renderedAt).toLocaleTimeString()} · {projects.length} projects loaded
          {fetchError && <span className="text-flag"> · fetch error: {fetchError}</span>}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="font-mono text-[10px] uppercase tracking-wider text-flash underline underline-offset-2"
        >
          Hard refresh
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
          key={`new-${renderedAt}`}
          draft={emptyDraft}
          onSaved={() => {
            setOpenId(null);
            router.refresh();
          }}
          onFieldSaved={() => router.refresh()}
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
                {p.featured && (
                  <span className="font-mono text-xs text-flash ml-2">
                    ★ featured
                  </span>
                )}
              </span>
              <span className="font-mono text-xs text-mute">
                {openId === p.id ? "−" : "+"}
              </span>
            </button>

            {openId === p.id && (
              <div className="px-4 pb-4">
                <ProjectForm
                  key={`${p.id}-${renderedAt}`}
                  draft={p}
                  existingId={p.id}
                  onSaved={() => {
                    setOpenId(null);
                    router.refresh();
                  }}
                  onFieldSaved={() => router.refresh()}
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

      <div className="mt-16 pt-8 border-t border-line">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl">Leads</h2>
          <span className="font-mono text-xs text-mute uppercase tracking-wider">
            {leads.length} submission{leads.length === 1 ? "" : "s"}
          </span>
        </div>

        {leads.length === 0 ? (
          <p className="font-mono text-sm text-mute">
            No submissions yet — they'll show up here when someone fills
            out the contact form on /about.
          </p>
        ) : (
          <ul className="space-y-4">
            {leads.map((lead) => (
              <LeadRow key={lead.id} lead={lead} onDeleted={() => router.refresh()} />
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

function LeadRow({ lead, onDeleted }: { lead: Lead; onDeleted: () => void }) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete the message from ${lead.name}?`)) return;
    setDeleting(true);
    try {
      await deleteLead(lead.id);
      onDeleted();
    } catch {
      setDeleting(false);
    }
  }

  return (
    <li className="border border-line p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-body">
            {lead.name}{" "}
            <span className="font-mono text-xs text-mute">
              &lt;{lead.email}&gt;
            </span>
          </p>
          <p className="font-mono text-[11px] text-mute mt-1">
            {new Date(lead.created_at).toLocaleString()}
          </p>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="font-mono text-[11px] uppercase tracking-wider text-flag hover:opacity-70 transition-opacity shrink-0"
        >
          {deleting ? "…" : "Delete"}
        </button>
      </div>
      <p className="font-body text-sm text-ink/85 mt-3 whitespace-pre-line">
        {lead.message}
      </p>
    </li>
  );
}

function ProjectForm({
  draft,
  existingId,
  onSaved,
  onFieldSaved,
  onDeleted,
}: {
  draft: Partial<Project>;
  existingId?: string;
  onSaved: () => void;
  onFieldSaved: () => void;
  onDeleted?: () => void;
}) {
  const [form, setForm] = useState<Partial<ProjectInput>>({
    ...emptyDraft,
    ...draft,
    gallery: normalizeGallery(draft.gallery),
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [autoSaveNote, setAutoSaveNote] = useState<string | null>(null);

  function set<K extends keyof ProjectInput>(key: K, value: ProjectInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  // Saves a single field immediately for an existing project — used for
  // toggles and uploads, so nothing depends on remembering to scroll
  // down and click the big Save button. New (not-yet-created) projects
  // just update local state until the first Save creates the row.
  async function autoSave(partial: Partial<ProjectInput>) {
    if (!existingId) return;
    try {
      await updateProject(existingId, partial);
      setAutoSaveNote("Saved ✓");
      onFieldSaved();
      setTimeout(() => setAutoSaveNote(null), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Autosave failed.");
    }
  }

  async function handlePublishedChange(checked: boolean) {
    set("published", checked);
    await autoSave({ published: checked });
  }

  async function handleFeaturedChange(checked: boolean) {
    set("featured", checked);
    await autoSave({ featured: checked });
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
      await autoSave({ cover_image: url });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setUploadingGallery(true);
    setError(null);
    try {
      const uploaded: GalleryItem[] = [];
      for (let i = 0; i < files.length; i++) {
        setUploadProgress(`Uploading ${i + 1} of ${files.length}…`);
        const fd = new FormData();
        fd.append("file", files[i]);
        const url = await uploadProjectImage(fd);
        uploaded.push({ type: "media", url, layout: "half" });
      }
      const nextGallery = [...(form.gallery ?? []), ...uploaded];
      set("gallery", nextGallery);
      await autoSave({ gallery: nextGallery });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploadingGallery(false);
      setUploadProgress(null);
      e.target.value = "";
    }
  }

  async function addTextBlock() {
    const nextGallery: GalleryItem[] = [
      ...(form.gallery ?? []),
      { type: "text", heading: "", body: "" },
    ];
    set("gallery", nextGallery);
    await autoSave({ gallery: nextGallery });
  }

  async function updateTextBlock(index: number, patch: { heading?: string; body?: string }) {
    const nextGallery = (form.gallery ?? []).map((item, i) =>
      i === index && item.type === "text" ? { ...item, ...patch } : item
    );
    set("gallery", nextGallery);
  }

  async function saveTextBlock(index: number) {
    await autoSave({ gallery: form.gallery ?? [] });
  }

  async function removeGalleryItem(index: number) {
    const nextGallery = (form.gallery ?? []).filter((_, i) => i !== index);
    set("gallery", nextGallery);
    await autoSave({ gallery: nextGallery });
  }

  async function setGalleryLayout(index: number, layout: GalleryMediaItem["layout"]) {
    const nextGallery = (form.gallery ?? []).map((item, i) =>
      i === index && item.type === "media" ? { ...item, layout } : item
    );
    set("gallery", nextGallery);
    await autoSave({ gallery: nextGallery });
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
        {existingId ? " Saves immediately on upload." : " Save the project first to unlock instant upload saving."}
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
      <p className="font-mono text-[10px] text-mute mb-1">
        Select multiple files at once if you like. Choose how many sit
        in a row: Full (1), Half (2), Third (3), or Quarter (4). Shown
        as a tight cropped grid — click any image on the live site to
        see the complete, uncropped version. Add a text block to break
        up the images with a heading and paragraph, Behance-style.
      </p>
      <div className="flex items-center gap-3 flex-wrap">
        <input
          type="file"
          multiple
          accept="image/*,video/mp4,video/webm,video/quicktime"
          onChange={handleGalleryUpload}
          className="font-mono text-xs"
        />
        {uploadingGallery && (
          <span className="font-mono text-xs text-mute">{uploadProgress ?? "Uploading…"}</span>
        )}
        <button
          type="button"
          onClick={addTextBlock}
          className="docket px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider hover:text-flash transition-colors"
        >
          + Add text block
        </button>
      </div>
      <p className="font-mono text-[10px] text-mute mt-1">
        Order matters — items appear on the page in the order they're
        listed below (upload, add text, upload more, etc. — whatever
        order you do it in is the order it'll show).
      </p>
      {(form.gallery ?? []).length > 0 && (
        <ul className="mt-2 space-y-2">
          {(form.gallery ?? []).map((item, i) =>
            item.type === "text" ? (
              <li key={i} className="border border-line p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-mute">
                    Text block
                  </span>
                  <button
                    type="button"
                    onClick={() => removeGalleryItem(i)}
                    className="font-mono text-[11px] text-flag hover:opacity-70 transition-opacity"
                  >
                    Remove
                  </button>
                </div>
                <input
                  value={item.heading}
                  onChange={(e) => updateTextBlock(i, { heading: e.target.value })}
                  onBlur={() => saveTextBlock(i)}
                  placeholder="Heading (optional)"
                  className="w-full border border-line bg-paper px-2 py-1.5 font-body text-sm mb-2 focus:outline-none focus-visible:outline-2 focus-visible:outline-flash"
                />
                <textarea
                  value={item.body}
                  onChange={(e) => updateTextBlock(i, { body: e.target.value })}
                  onBlur={() => saveTextBlock(i)}
                  placeholder="Body text"
                  rows={3}
                  className="w-full border border-line bg-paper px-2 py-1.5 font-body text-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-flash"
                />
              </li>
            ) : (
              <li key={i} className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-[11px] text-mute break-all flex-1 min-w-[120px]">
                  {item.url}
                </span>
                <div className="flex border border-line shrink-0">
                  {(["full", "half", "third", "quarter"] as const).map((layout, li) => (
                    <button
                      key={layout}
                      type="button"
                      onClick={() => setGalleryLayout(i, layout)}
                      className={`font-mono text-[10px] uppercase px-2 py-1 ${
                        li > 0 ? "border-l border-line" : ""
                      } ${item.layout === layout ? "bg-flash text-paper" : "text-mute"}`}
                    >
                      {layout}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => removeGalleryItem(i)}
                  className="font-mono text-[11px] text-flag hover:opacity-70 transition-opacity shrink-0"
                >
                  Remove
                </button>
              </li>
            )
          )}
        </ul>
      )}

      <div className="flex items-center gap-6 mt-5">
        <label className="font-mono text-xs flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => handlePublishedChange(e.target.checked)}
          />
          Published
        </label>
        <label className="font-mono text-xs flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => handleFeaturedChange(e.target.checked)}
          />
          Featured
        </label>
        {autoSaveNote && (
          <span className="font-mono text-xs text-flash">{autoSaveNote}</span>
        )}
      </div>
      {!existingId && (
        <p className="font-mono text-[10px] text-mute mt-2">
          Save the project first — toggles here will apply once you do.
        </p>
      )}
      {existingId && (
        <p className="font-mono text-[10px] text-mute mt-2">
          Only one project can be featured at a time on the homepage —
          checking this here doesn't automatically uncheck others.
        </p>
      )}

      {error && <p className="font-mono text-xs text-flag mt-4">{error}</p>}

      <div className="flex items-center gap-3 mt-6">
        <button
          onClick={handleSave}
          disabled={saving || !form.title}
          className="docket px-4 py-2 font-mono text-xs uppercase tracking-wider hover:text-flash transition-colors disabled:opacity-40"
        >
          {saving ? "Saving…" : existingId ? "Save text changes" : "Create project"}
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
