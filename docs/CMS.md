# Enterprise Headless CMS

Production CMS platform for Fiji Luxury — surpasses WordPress-style workflows while **keeping the public frontend design unchanged**.

## Stack (this upgrade)

- Next.js App Router + TypeScript
- Supabase Postgres + Auth + Storage (RLS)
- Prisma for typed admin CRUD against Supabase DB
- TipTap rich editor + visual page builder
- TanStack Query + TanStack Table
- React Hook Form / Zod (module forms)
- cmdk command palette (`Ctrl+K`)

## Apply migrations

1. `supabase/migrations/20260713_cms_wordpress_foundation.sql`
2. `supabase/migrations/20260713_cms_enterprise_upgrade.sql`
3. `npx prisma db push && npx prisma generate`

## Roles

`super_admin` · `admin` · `editor` · `seo_manager` · `content_writer` · `moderator`

Permission matrix: `src/lib/cms/enterprise-rbac.ts`

## Key surfaces

| Area | Path |
|---|---|
| Dashboard | `/admin/cms` |
| Visual builder | `/admin/cms/pages/builder` |
| Blog | `/admin/cms/posts` |
| AI SEO helpers | `POST /api/v1/admin/cms/ai` |
| Command palette | `Ctrl+K` inside CMS |

## What is live vs phased

### Live now
- RBAC model + SQL policies
- React Query dashboard widgets
- Pages / Posts CRUD with draft-publish-schedule + revisions
- Visual section builder (hero, features, gallery, FAQ, CTA, …)
- SEO score + AI meta/FAQ/slug/alt helpers (local deterministic; swap for OpenAI via same API)
- Categories, tags, settings, users
- Existing destinations / experiences / stays / deals / visa / media / bookings modules
- Public content still served via `public-content.service` (Supabase Postgres)

### Next enterprise slices (same architecture)
- Full shadcn component kit migration for every admin form
- Supabase Storage media pipeline (crop/WebP/AVIF UI)
- GA4 / Search Console connectors
- Nested menu DnD on `cms_menu_items`
- Partners / Events / Jobs admin UIs (tables already in SQL)
- 2FA enrollment UX for CMS profiles
- External LLM provider behind `/api/v1/admin/cms/ai`

Frontend pages remain magazine UI; CMS only changes data.
