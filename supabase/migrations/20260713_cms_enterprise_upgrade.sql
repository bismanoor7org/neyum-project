-- Enterprise Headless CMS upgrade (RBAC, page builder, sessions, audit)
-- Safe to run after 20260713_cms_wordpress_foundation.sql

-- Expand roles
do $$ begin
  alter type public.cms_role add value if not exists 'seo_manager';
  alter type public.cms_role add value if not exists 'content_writer';
  alter type public.cms_role add value if not exists 'moderator';
exception when duplicate_object then null;
end $$;

-- Fine-grained permissions
create table if not exists public.cms_permissions (
  id text primary key default gen_random_uuid()::text,
  key text not null unique,
  label text not null,
  description text
);

create table if not exists public.cms_role_permissions (
  role public.cms_role not null,
  permission_key text not null references public.cms_permissions(key) on delete cascade,
  primary key (role, permission_key)
);

insert into public.cms_permissions (key, label, description) values
  ('content.read', 'Read content', 'View CMS content'),
  ('content.create', 'Create content', 'Create new content'),
  ('content.edit', 'Edit content', 'Edit existing content'),
  ('content.delete', 'Delete content', 'Delete content'),
  ('content.publish', 'Publish', 'Publish content'),
  ('content.schedule', 'Schedule', 'Schedule publish'),
  ('content.approve', 'Approve', 'Approve submissions'),
  ('content.restore', 'Restore', 'Restore revisions'),
  ('media.manage', 'Manage media', 'Upload and manage media'),
  ('seo.manage', 'Manage SEO', 'Edit SEO settings'),
  ('users.manage', 'Manage users', 'Invite and role users'),
  ('settings.manage', 'Manage settings', 'Site settings'),
  ('analytics.read', 'Read analytics', 'View analytics'),
  ('bookings.manage', 'Manage bookings', 'Bookings and leads'),
  ('ai.use', 'Use AI tools', 'AI content assistants')
on conflict (key) do nothing;

-- Role → permission matrix
insert into public.cms_role_permissions (role, permission_key)
select 'super_admin', key from public.cms_permissions
on conflict do nothing;

insert into public.cms_role_permissions (role, permission_key)
select 'admin', key from public.cms_permissions
where key not in ('users.manage')
on conflict do nothing;

insert into public.cms_role_permissions (role, permission_key) values
  ('editor', 'content.read'),
  ('editor', 'content.create'),
  ('editor', 'content.edit'),
  ('editor', 'content.publish'),
  ('editor', 'content.schedule'),
  ('editor', 'content.restore'),
  ('editor', 'media.manage'),
  ('editor', 'seo.manage'),
  ('editor', 'ai.use'),
  ('seo_manager', 'content.read'),
  ('seo_manager', 'content.edit'),
  ('seo_manager', 'seo.manage'),
  ('seo_manager', 'analytics.read'),
  ('seo_manager', 'ai.use'),
  ('content_writer', 'content.read'),
  ('content_writer', 'content.create'),
  ('content_writer', 'content.edit'),
  ('content_writer', 'media.manage'),
  ('content_writer', 'ai.use'),
  ('moderator', 'content.read'),
  ('moderator', 'content.approve'),
  ('moderator', 'content.delete')
on conflict do nothing;

-- Login sessions / history
create table if not exists public.cms_login_history (
  id text primary key default gen_random_uuid()::text,
  user_id uuid references public.cms_profiles(id) on delete set null,
  email text,
  ip text,
  user_agent text,
  success boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists cms_login_history_user_idx on public.cms_login_history(user_id, created_at desc);

create table if not exists public.cms_sessions (
  id text primary key default gen_random_uuid()::text,
  user_id uuid not null references public.cms_profiles(id) on delete cascade,
  refresh_token_hash text,
  ip text,
  user_agent text,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists cms_sessions_user_idx on public.cms_sessions(user_id) where revoked_at is null;

-- Page builder documents (JSON sections/blocks)
create table if not exists public.cms_page_documents (
  id text primary key default gen_random_uuid()::text,
  page_id text unique references public.cms_pages(id) on delete cascade,
  title text not null,
  slug text not null unique,
  status text not null default 'DRAFT' check (status in ('DRAFT','PUBLISHED','SCHEDULED','ARCHIVED')),
  sections jsonb not null default '[]'::jsonb,
  global_styles jsonb not null default '{}'::jsonb,
  seo jsonb not null default '{}'::jsonb,
  published_at timestamptz,
  scheduled_at timestamptz,
  created_by uuid references public.cms_profiles(id) on delete set null,
  updated_by uuid references public.cms_profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_block_templates (
  id text primary key default gen_random_uuid()::text,
  name text not null,
  category text not null default 'general',
  thumbnail text,
  schema jsonb not null default '{}'::jsonb,
  is_global boolean not null default false,
  created_by uuid references public.cms_profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_reusable_blocks (
  id text primary key default gen_random_uuid()::text,
  name text not null,
  block_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_by uuid references public.cms_profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Authors (blog)
create table if not exists public.cms_authors (
  id text primary key default gen_random_uuid()::text,
  name text not null,
  slug text not null unique,
  bio text,
  avatar_url text,
  email text,
  social jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.cms_posts
  add column if not exists author_profile_id text references public.cms_authors(id) on delete set null;

-- Partners / sponsors / events / careers
create table if not exists public.cms_partners (
  id text primary key default gen_random_uuid()::text,
  name text not null,
  logo_url text,
  website text,
  kind text not null default 'partner' check (kind in ('partner','sponsor')),
  sort_order int not null default 0,
  status text not null default 'PUBLISHED',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_events (
  id text primary key default gen_random_uuid()::text,
  title text not null,
  slug text not null unique,
  kind text not null default 'event' check (kind in ('event','festival')),
  starts_at timestamptz,
  ends_at timestamptz,
  location text,
  hero_image text,
  description text,
  status text not null default 'DRAFT',
  seo jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_jobs (
  id text primary key default gen_random_uuid()::text,
  title text not null,
  slug text not null unique,
  department text,
  location text,
  employment_type text,
  description text,
  status text not null default 'DRAFT',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_form_submissions (
  id text primary key default gen_random_uuid()::text,
  form_key text not null,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'NEW',
  created_at timestamptz not null default now()
);

create index if not exists cms_form_submissions_key_idx on public.cms_form_submissions(form_key, created_at desc);

-- Redirects already exist; add 404 hits
create table if not exists public.cms_not_found_hits (
  id text primary key default gen_random_uuid()::text,
  path text not null,
  referrer text,
  hits int not null default 1,
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique(path)
);

-- SEO score cache
create table if not exists public.cms_seo_scores (
  id text primary key default gen_random_uuid()::text,
  entity_type text not null,
  entity_id text not null,
  score int not null default 0,
  focus_keyword text,
  checks jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  unique(entity_type, entity_id)
);

-- RLS
alter table public.cms_permissions enable row level security;
alter table public.cms_role_permissions enable row level security;
alter table public.cms_login_history enable row level security;
alter table public.cms_sessions enable row level security;
alter table public.cms_page_documents enable row level security;
alter table public.cms_block_templates enable row level security;
alter table public.cms_reusable_blocks enable row level security;
alter table public.cms_authors enable row level security;
alter table public.cms_partners enable row level security;
alter table public.cms_events enable row level security;
alter table public.cms_jobs enable row level security;
alter table public.cms_form_submissions enable row level security;
alter table public.cms_not_found_hits enable row level security;
alter table public.cms_seo_scores enable row level security;

create policy cms_permissions_read on public.cms_permissions for select using (public.cms_is_staff());
create policy cms_role_permissions_read on public.cms_role_permissions for select using (public.cms_is_staff());

create policy cms_page_documents_public_read on public.cms_page_documents
  for select using (status = 'PUBLISHED' or public.cms_is_staff());
create policy cms_page_documents_staff_write on public.cms_page_documents
  for all using (public.cms_is_staff()) with check (public.cms_is_staff());

create policy cms_block_templates_staff on public.cms_block_templates
  for all using (public.cms_is_staff()) with check (public.cms_is_staff());
create policy cms_reusable_blocks_staff on public.cms_reusable_blocks
  for all using (public.cms_is_staff()) with check (public.cms_is_staff());

create policy cms_authors_public_read on public.cms_authors for select using (true);
create policy cms_authors_staff_write on public.cms_authors
  for all using (public.cms_is_staff()) with check (public.cms_is_staff());

create policy cms_partners_public_read on public.cms_partners
  for select using (status = 'PUBLISHED' or public.cms_is_staff());
create policy cms_partners_staff_write on public.cms_partners
  for all using (public.cms_is_staff()) with check (public.cms_is_staff());

create policy cms_events_public_read on public.cms_events
  for select using (status = 'PUBLISHED' or public.cms_is_staff());
create policy cms_events_staff_write on public.cms_events
  for all using (public.cms_is_staff()) with check (public.cms_is_staff());

create policy cms_jobs_public_read on public.cms_jobs
  for select using (status = 'PUBLISHED' or public.cms_is_staff());
create policy cms_jobs_staff_write on public.cms_jobs
  for all using (public.cms_is_staff()) with check (public.cms_is_staff());

create policy cms_form_submissions_staff on public.cms_form_submissions
  for all using (public.cms_is_staff()) with check (true);

create policy cms_not_found_staff on public.cms_not_found_hits
  for all using (public.cms_is_staff()) with check (true);
create policy cms_seo_scores_staff on public.cms_seo_scores
  for all using (public.cms_is_staff()) with check (public.cms_is_staff());

create policy cms_login_history_admin on public.cms_login_history
  for select using (public.cms_is_admin() or user_id = auth.uid());
create policy cms_sessions_self on public.cms_sessions
  for select using (user_id = auth.uid() or public.cms_is_admin());

-- Seed block templates
insert into public.cms_block_templates (name, category, schema) values
  ('Hero', 'layout', '{"type":"hero","fields":["eyebrow","title","subtitle","ctaLabel","ctaHref","image"]}'),
  ('Features', 'layout', '{"type":"features","fields":["title","items"]}'),
  ('Gallery', 'media', '{"type":"gallery","fields":["images"]}'),
  ('Testimonials', 'social', '{"type":"testimonials","fields":["title","items"]}'),
  ('FAQ', 'content', '{"type":"faq","fields":["title","items"]}'),
  ('CTA Banner', 'conversion', '{"type":"cta","fields":["title","subtitle","buttonLabel","buttonHref"]}'),
  ('Stats', 'layout', '{"type":"stats","fields":["items"]}'),
  ('Newsletter', 'conversion', '{"type":"newsletter","fields":["title","subtitle"]}')
on conflict do nothing;
