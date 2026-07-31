[README.md](https://github.com/user-attachments/files/30577975/README.md)
# dypixels

Your portfolio site. Next.js + Tailwind + Supabase. Right now it's running
entirely on **placeholder content** (see `lib/placeholder-data.ts`) —
nothing needs to be connected for it to look and work correctly. Connect
Supabase whenever you're ready to manage real projects from `/admin`.

## Design notes (so future-you remembers the reasoning)

- **Palette**: chalk paper (`#EFEDE7`) + near-black ink (`#16161B`), one
  signature electric indigo (`#4B3AFF`) and one "wit" accent, flag red
  (`#FF4433`), used sparingly. Deliberately not the cream+terracotta or
  dark+acid-green combos every AI portfolio defaults to.
- **Type**: Bricolage Grotesque (display, has personality without being
  a cliché), Inter (body), JetBrains Mono (meta — client/type/year tags,
  captions). The mono is doing double duty: it nods to production specs,
  like a print job docket, which fits your print/social collateral work.
- **Signature element**: the "docket tag" (`.docket` in `globals.css`) —
  a hang-tag / swing-tag shape with a little punched hole. It shows up in
  nav, buttons, and the hero. It's not decoration — it's a nod to apparel
  tagging, which is literally in your Behance work (mike., Levi's).
- **No numbered 01/02/03 markers** — your projects aren't a sequence, so
  each project card is tagged by CLIENT / TYPE / YEAR instead, which is
  actually useful information.

Feel free to tell me to change any of this — it's a starting point, not a
verdict.

## Structure

```
app/
  page.tsx              → homepage (hero, work grid, about teaser)
  about/page.tsx         → about page
  work/[slug]/page.tsx    → individual project page
  admin/page.tsx          → password login
  admin/dashboard/        → add / edit / delete projects (protected)
  api/admin/               → login / logout routes
lib/
  placeholder-data.ts     → what's showing right now, no Supabase needed
  projects.ts              → fetch helpers (falls back to placeholders)
  types.ts                  → Project shape
components/                → Nav, Footer, ProjectCard, Tag, etc.
supabase/
  schema.sql               → run this once in Supabase to create the table
  seed.sql                  → optional: pre-fill with the placeholder projects
```

## Running it locally

```
npm install
npm run dev
```

Opens at `localhost:3000`, using placeholder projects — no setup required.

## Connecting Supabase (when you're ready to manage real content)

1. Create a free project at supabase.com.
2. In the SQL Editor, paste and run `supabase/schema.sql` (this also
   creates the `leads` table the contact form on /about writes to).
   Optionally
   also run `supabase/seed.sql` to start from the placeholder projects
   instead of an empty table.
3. In Project Settings → API, copy your Project URL, `anon` public key,
   and `service_role` key.
4. Copy `.env.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_PASSWORD` — whatever you want to log into `/admin` with
   - `SESSION_SECRET` — any random long string (e.g. mash your keyboard)
5. Restart the dev server. The site now reads from Supabase instead of
   placeholders, and `/admin` will let you add/edit/delete projects and
   upload images.

## Deploying (your usual GitHub → Vercel flow)

1. Push this whole folder to a new GitHub repo.
2. Import it in Vercel.
3. Add the same environment variables from `.env.local` in Vercel's
   Project Settings → Environment Variables.
4. Deploy. From then on, editing files on GitHub and merging to `main`
   auto-redeploys, same as your other projects — and editing content
   through `/admin` updates the live site without touching code at all.
5. `/admin` is password-gated using `ADMIN_PASSWORD` — bookmark
   `yoursite.vercel.app/admin` on your phone.

**About the contact form:** the form on `/about` tries to save
submissions to the `leads` table in Supabase, viewable in `/admin`.
Until Supabase is connected, it falls back to opening a pre-filled
email instead — so it's never broken, just less convenient until step
5 above is done.

## Asset checklist — what I need from you per project

For each project you want live, send me (or fill in directly via
`/admin` once it's connected):

- **Title** — e.g. "mike."
- **Client** — who it was for (or "Personal" if self-initiated)
- **Type** — e.g. "Brand Identity", "Social Campaign", "Illustration"
- **Year**
- **Summary** — one sentence, shown on the work grid card
- **Description** — a short paragraph: the brief, the constraint, what
  you're proud of. This is the part that carries your voice — write it
  like you talk, not like a case study template.
- **Cover image** — the hero shot for the project (upload via `/admin`,
  or send me the file and I'll note where it goes)
- **Gallery images** (optional) — supporting shots, detail crops, mockups

For the **about page** (`app/about/page.tsx`), replace the three
`[bracketed]` paragraphs with your real intro whenever you're ready — I
left them as placeholders on purpose rather than guessing your voice.

For the **footer**, swap in your real email and WhatsApp link
(`components/Footer.tsx` — currently placeholder values).
