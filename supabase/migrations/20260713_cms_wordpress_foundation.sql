-- Fiji Luxury CMS — WordPress-like foundation on Supabase
-- Run via: supabase db push / SQL editor
-- Compatible with existing Prisma tables on the same Postgres.

-- ── Roles for admin CMS (maps to auth.users) ─────────────────────────────────
create type public.cms_role as enum ('super_admin', 'admin', 'editor');

create table if not exists public.cms_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  avatar_url text,
  role public.cms_role not null default 'editor',
  is_active boolean not null default true,
  invited_by uuid references public.cms_profiles(id) on delete set null,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists cms_profiles_role_idx on public.cms_profiles(role);
create index if not exists cms_profiles_active_idx on public.cms_profiles(is_active);

-- ── Taxonomy ─────────────────────────────────────────────────────────────────
create table if not exists public.cms_categories (
  id text primary key default gen_random_uuid()::text,
  name text not null,
  slug text not null unique,
  description text,
  parent_id text references public.cms_categories(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_tags (
  id text primary key default gen_random_uuid()::text,
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Pages ────────────────────────────────────────────────────────────────────
create table if not exists public.cms_pages (
  id text primary key default gen_random_uuid()::text,
  title text not null,
  slug text not null unique,
  excerpt text,
  content jsonb not null default '{}'::jsonb,
  content_html text,
  featured_image text,
  status text not null default 'DRAFT' check (status in ('DRAFT','PUBLISHED','SCHEDULED','ARCHIVED')),
  published_at timestamptz,
  scheduled_at timestamptz,
  author_id uuid references public.cms_profiles(id) on delete set null,
  parent_id text references public.cms_pages(id) on delete set null,
  template text default 'default',
  seo jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists cms_pages_status_idx on public.cms_pages(status);
create index if not exists cms_pages_slug_idx on public.cms_pages(slug);

-- ── Blog posts ───────────────────────────────────────────────────────────────
create table if not exists public.cms_posts (
  id text primary key default gen_random_uuid()::text,
  title text not null,
  slug text not null unique,
  excerpt text,
  content jsonb not null default '{}'::jsonb,
  content_html text,
  featured_image text,
  category_id text references public.cms_categories(id) on delete set null,
  author_id uuid references public.cms_profiles(id) on delete set null,
  status text not null default 'DRAFT' check (status in ('DRAFT','PUBLISHED','SCHEDULED','ARCHIVED')),
  published_at timestamptz,
  scheduled_at timestamptz,
  featured boolean not null default false,
  reading_time_min int not null default 1,
  seo jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists cms_posts_status_idx on public.cms_posts(status);
create index if not exists cms_posts_category_idx on public.cms_posts(category_id);
create index if not exists cms_posts_featured_idx on public.cms_posts(featured);

create table if not exists public.cms_post_tags (
  post_id text not null references public.cms_posts(id) on delete cascade,
  tag_id text not null references public.cms_tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

-- ── Revisions ────────────────────────────────────────────────────────────────
create table if not exists public.cms_revisions (
  id text primary key default gen_random_uuid()::text,
  entity_type text not null,
  entity_id text not null,
  title text,
  content jsonb,
  content_html text,
  author_id uuid references public.cms_profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists cms_revisions_entity_idx on public.cms_revisions(entity_type, entity_id, created_at desc);

-- ── Media (Supabase Storage metadata) ────────────────────────────────────────
create table if not exists public.cms_media_folders (
  id text primary key default gen_random_uuid()::text,
  name text not null,
  parent_id text references public.cms_media_folders(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.cms_media (
  id text primary key default gen_random_uuid()::text,
  storage_path text not null unique,
  public_url text not null,
  filename text not null,
  mime_type text,
  width int,
  height int,
  bytes int,
  folder_id text references public.cms_media_folders(id) on delete set null,
  alt_text text,
  caption text,
  uploaded_by uuid references public.cms_profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists cms_media_folder_idx on public.cms_media(folder_id);

-- ── Navigation ───────────────────────────────────────────────────────────────
create table if not exists public.cms_menus (
  id text primary key default gen_random_uuid()::text,
  name text not null,
  location text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_menu_items (
  id text primary key default gen_random_uuid()::text,
  menu_id text not null references public.cms_menus(id) on delete cascade,
  parent_id text references public.cms_menu_items(id) on delete cascade,
  label text not null,
  url text,
  page_id text references public.cms_pages(id) on delete set null,
  target text not null default '_self',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists cms_menu_items_menu_idx on public.cms_menu_items(menu_id, sort_order);

-- ── Settings / redirects / activity ──────────────────────────────────────────
create table if not exists public.cms_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.cms_profiles(id) on delete set null
);

create table if not exists public.cms_redirects (
  id text primary key default gen_random_uuid()::text,
  from_path text not null unique,
  to_path text not null,
  status_code int not null default 301,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.cms_activity_log (
  id text primary key default gen_random_uuid()::text,
  actor_id uuid references public.cms_profiles(id) on delete set null,
  action text not null,
  entity_type text,
  entity_id text,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists cms_activity_created_idx on public.cms_activity_log(created_at desc);

-- ── updated_at trigger ───────────────────────────────────────────────────────
create or replace function public.cms_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare
  t text;
begin
  foreach t in array array[
    'cms_profiles','cms_categories','cms_tags','cms_pages','cms_posts',
    'cms_media','cms_menus','cms_menu_items','cms_settings'
  ]
  loop
    execute format(
      'drop trigger if exists %I_updated_at on public.%I; create trigger %I_updated_at before update on public.%I for each row execute function public.cms_set_updated_at();',
      t, t, t, t
    );
  end loop;
end $$;

-- ── Helpers ──────────────────────────────────────────────────────────────────
create or replace function public.cms_current_role()
returns public.cms_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.cms_profiles
  where id = auth.uid() and is_active = true
$$;

create or replace function public.cms_is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.cms_profiles
    where id = auth.uid() and is_active = true
  )
$$;

create or replace function public.cms_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.cms_profiles
    where id = auth.uid()
      and is_active = true
      and role in ('super_admin', 'admin')
  )
$$;

-- ── RLS ──────────────────────────────────────────────────────────────────────
alter table public.cms_profiles enable row level security;
alter table public.cms_categories enable row level security;
alter table public.cms_tags enable row level security;
alter table public.cms_pages enable row level security;
alter table public.cms_posts enable row level security;
alter table public.cms_post_tags enable row level security;
alter table public.cms_revisions enable row level security;
alter table public.cms_media_folders enable row level security;
alter table public.cms_media enable row level security;
alter table public.cms_menus enable row level security;
alter table public.cms_menu_items enable row level security;
alter table public.cms_settings enable row level security;
alter table public.cms_redirects enable row level security;
alter table public.cms_activity_log enable row level security;

-- Profiles
create policy cms_profiles_select_self_or_admin on public.cms_profiles
  for select using (id = auth.uid() or public.cms_is_admin());
create policy cms_profiles_update_self on public.cms_profiles
  for update using (id = auth.uid() or public.cms_is_admin());
create policy cms_profiles_insert_admin on public.cms_profiles
  for insert with check (public.cms_is_admin());

-- Public read for published content
create policy cms_pages_public_read on public.cms_pages
  for select using (status = 'PUBLISHED' or public.cms_is_staff());
create policy cms_posts_public_read on public.cms_posts
  for select using (status = 'PUBLISHED' or public.cms_is_staff());
create policy cms_categories_public_read on public.cms_categories for select using (true);
create policy cms_tags_public_read on public.cms_tags for select using (true);
create policy cms_menus_public_read on public.cms_menus for select using (true);
create policy cms_menu_items_public_read on public.cms_menu_items for select using (true);
create policy cms_settings_public_read on public.cms_settings for select using (true);
create policy cms_redirects_public_read on public.cms_redirects
  for select using (is_active = true);
create policy cms_media_public_read on public.cms_media for select using (true);
create policy cms_media_folders_public_read on public.cms_media_folders for select using (true);

-- Staff write
create policy cms_pages_staff_write on public.cms_pages
  for all using (public.cms_is_staff()) with check (public.cms_is_staff());
create policy cms_posts_staff_write on public.cms_posts
  for all using (public.cms_is_staff()) with check (public.cms_is_staff());
create policy cms_post_tags_staff_write on public.cms_post_tags
  for all using (public.cms_is_staff()) with check (public.cms_is_staff());
create policy cms_categories_staff_write on public.cms_categories
  for all using (public.cms_is_staff()) with check (public.cms_is_staff());
create policy cms_tags_staff_write on public.cms_tags
  for all using (public.cms_is_staff()) with check (public.cms_is_staff());
create policy cms_revisions_staff on public.cms_revisions
  for all using (public.cms_is_staff()) with check (public.cms_is_staff());
create policy cms_media_staff_write on public.cms_media
  for all using (public.cms_is_staff()) with check (public.cms_is_staff());
create policy cms_media_folders_staff_write on public.cms_media_folders
  for all using (public.cms_is_staff()) with check (public.cms_is_staff());
create policy cms_menus_staff_write on public.cms_menus
  for all using (public.cms_is_staff()) with check (public.cms_is_staff());
create policy cms_menu_items_staff_write on public.cms_menu_items
  for all using (public.cms_is_staff()) with check (public.cms_is_staff());
create policy cms_settings_admin_write on public.cms_settings
  for all using (public.cms_is_admin()) with check (public.cms_is_admin());
create policy cms_redirects_staff_write on public.cms_redirects
  for all using (public.cms_is_staff()) with check (public.cms_is_staff());
create policy cms_activity_staff_read on public.cms_activity_log
  for select using (public.cms_is_staff());
create policy cms_activity_staff_insert on public.cms_activity_log
  for insert with check (public.cms_is_staff());

-- ── Storage bucket ───────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('cms-media', 'cms-media', true)
on conflict (id) do nothing;

create policy cms_media_storage_public_read on storage.objects
  for select using (bucket_id = 'cms-media');
create policy cms_media_storage_staff_insert on storage.objects
  for insert with check (bucket_id = 'cms-media' and public.cms_is_staff());
create policy cms_media_storage_staff_update on storage.objects
  for update using (bucket_id = 'cms-media' and public.cms_is_staff());
create policy cms_media_storage_staff_delete on storage.objects
  for delete using (bucket_id = 'cms-media' and public.cms_is_staff());

-- Seed default settings + menus
insert into public.cms_settings (key, value) values
  ('site', '{"siteName":"My Fiji Tour","tagline":"Luxury Fiji journeys"}'::jsonb),
  ('contact', '{"email":"","phone":"","address":""}'::jsonb),
  ('social', '{"instagram":"","facebook":"","youtube":""}'::jsonb),
  ('analytics', '{"gaId":"","clarityId":""}'::jsonb),
  ('newsletter', '{"enabled":true,"provider":"resend"}'::jsonb)
on conflict (key) do nothing;

insert into public.cms_menus (name, location) values
  ('Primary', 'header'),
  ('Footer', 'footer')
on conflict (location) do nothing;
