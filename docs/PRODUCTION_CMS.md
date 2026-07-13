# Production CMS — Architecture

This project uses **Next.js App Router + Prisma + PostgreSQL** for the CMS API layer (not a separate NestJS server). The design follows NestJS-style separation: **DTOs (Zod) → Services → API routes / Server Actions → Admin UI**.

## Stack

| Layer | Path |
|-------|------|
| Database | `prisma/schema.prisma` |
| DTOs / validation | `src/lib/validations/cms.ts` |
| Services | `src/server/services/cms/cms.service.ts`, `cms-extended.service.ts` |
| API (REST) | `src/app/api/v1/admin/cms/**` |
| Mutations | `src/server/actions/cms.ts`, `cms-extended.ts` |
| Admin UI | `src/app/admin/cms/**` |
| Permissions | `src/lib/auth/admin-roles.ts` |

## Ten core modules

| # | Module | Admin route | API |
|---|--------|-------------|-----|
| 1 | Homepage | `/admin/cms/homepage` | `GET/POST/PATCH /homepage` |
| 2 | Destinations | `/admin/cms/destinations` | `GET/POST /destinations`, `PATCH …/[id]` |
| 3 | Experiences | `/admin/cms/tours` | Server Actions + `GET /tours` |
| 4 | Places to Stay | `/admin/cms/accommodations` | `GET/POST /accommodations`, `PATCH/DELETE …/[id]` |
| 5 | Fiji Guides | `/admin/cms/guides` | `GET/POST /guides`, `PATCH/DELETE …/[id]` |
| 6 | Deals & Offers | `/admin/cms/deals` | `GET/POST /deals`, `PATCH/DELETE …/[id]` |
| 7 | Global SEO | `/admin/cms/seo` | `GET/PUT/PATCH /seo` |
| 8 | Media Library | `/admin/cms/media` | `GET/POST/PATCH/DELETE /media` |
| 9 | Navigation | `/admin/cms/navigation` | `GET/POST /navigation`, `PATCH/DELETE …/[id]` |
| 10 | Roles | `/admin/cms/roles` | `GET/PATCH /staff` |

## Roles

| Role | Permissions |
|------|-------------|
| **Super Admin** | Full platform + CMS + `settings:write` (assign roles) |
| **Editor** | `cms:read/write/publish/media/seo` — content only |

Assign roles at `/admin/cms/roles` (Super Admin only).

## Homepage section keys

Use these `HomepageSection.key` values for structured homepage blocks:

- `hero` — hero copy and CTA
- `featured_destinations` — section titles
- `featured_experiences` — experiences block copy
- `cta_primary` / `cta_secondary` — conversion CTAs
- `faq_preview`, `customer_stories` — supporting blocks

## Deploy

```bash
# Set DATABASE_URL in .env.local
npx prisma db push
npx prisma generate
npm run dev
# → http://localhost:3000/admin/cms
```

Without `DATABASE_URL`, CMS persists to `data/cms/*.json` for local development.

See also [DYNAMIC_CMS_ARCHITECTURE.md](./DYNAMIC_CMS_ARCHITECTURE.md) for public-site integration.

## Enterprise features (13 modules)

| # | Feature | Admin route | Notes |
|---|---------|-------------|-------|
| 1 | Advanced Dashboard | `/admin/cms` | Content inventory, SEO health, scheduler |
| 2 | Homepage Builder | `/admin/cms/homepage` | Visual block cards + section presets |
| 3 | Mega Menu Manager | `/admin/cms/navigation` | PRIMARY / MEGA_MENU / FOOTER + featured images |
| 4 | Dynamic SEO Suite | `/admin/cms/seo` | Meta, OG, schema + coverage health panel |
| 5 | Media Library Pro | `/admin/cms/media` | Cloudinary upload, folder tabs, `MediaPicker` in forms |
| 6 | Role-Based Permissions | `/admin/cms/roles` | Super Admin, Editor, permission matrix |
| 7 | Analytics Dashboard | `/admin/cms/analytics` | Published vs draft inventory |
| 8 | Booking Management | `/admin/cms/bookings` | Links to `/admin/bookings/[id]` detail |
| 9 | Lead Management | `/admin/cms/leads` | Enquiry inbox |
| 10 | Activity Logs | `/admin/cms/activity` | Filterable audit trail |
| 11 | Global Search | CMS shell header | `GET /api/v1/admin/cms/search` |
| 12 | Content Scheduling | Dashboard → Run scheduler | `POST /api/v1/admin/cms/scheduler` |
| 13 | Draft/Publish Workflow | All content forms | `CmsPublishBar` — Draft / Scheduled / Published |

### Scheduler

Promotes `SCHEDULED` content and banner windows (`startsAt` / `endsAt`). Trigger manually from the dashboard or via cron hitting `POST /api/v1/admin/cms/scheduler`.

### Media picker

Forms use `CmsImageField` + `MediaPicker` modal — browse the library instead of pasting URLs.

