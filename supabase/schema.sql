-- Run this once in your Supabase project's SQL editor (Database > SQL Editor).

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  client text default '',
  type text default '',
  year int default extract(year from now()),
  summary text default '',
  description text default '',
  cover_image text,
  -- Each gallery item is {"url": "...", "layout": "full" | "half"}.
  -- "full" spans the whole width (a single hero shot or video), "half"
  -- sits side-by-side with another "half" item, forming a 2-up grid.
  gallery jsonb default '[]'::jsonb,
  featured boolean default false,
  sort_order int default 999,
  published boolean default false,
  created_at timestamptz default now()
);

-- Already created the table before this column type changed? Run this
-- instead of the create table above (safe to run even if gallery is
-- already empty):
--   alter table projects alter column gallery type jsonb using (
--     case
--       when gallery is null then '[]'::jsonb
--       else (
--         select coalesce(jsonb_agg(jsonb_build_object('url', g, 'layout', 'half')), '[]'::jsonb)
--         from unnest(gallery) as g
--       )
--     end
--   );
--   alter table projects alter column gallery set default '[]'::jsonb;

-- Row Level Security: the public site can only ever read published rows.
-- All writes happen through the admin dashboard, which uses the service
-- role key and bypasses RLS entirely.
alter table projects enable row level security;

create policy "public can read published projects"
  on projects for select
  using (published = true);

-- Storage bucket for uploaded cover/gallery images, publicly readable.
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

create policy "public can view project images"
  on storage.objects for select
  using (bucket_id = 'project-images');

-- Leads from the contact form on /about. Public can INSERT (submit an
-- inquiry) but never SELECT — nobody can read other people's messages
-- through the public API. You read leads through /admin, which uses
-- the service role key and bypasses RLS.
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);

alter table leads enable row level security;

create policy "public can submit a lead"
  on leads for insert
  with check (true);
