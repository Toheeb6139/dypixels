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
  gallery text[] default '{}',
  featured boolean default false,
  sort_order int default 999,
  published boolean default false,
  created_at timestamptz default now()
);

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
