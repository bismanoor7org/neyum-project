# My Fiji Tour — CMS Architecture

Production content management system integrated into the Admin Dashboard. Built for scale — Shopify Admin (operations) + Webflow CMS (structured content) patterns.

## Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Database | PostgreSQL + Prisma |
| Styling | Tailwind CSS + `admin-panel.css` |
| Media | Cloudinary |
| Auth | Cookie session + RBAC staff roles |

## CMS modules

| # | Module | Route | API | Prisma models |
|---|--------|-------|-----|---------------|
| 1 | Homepage Manager | `/admin/cms/homepage` | `GET/POST/PATCH /api/v1/admin/cms/homepage` | `HomepageSection`, `Banner` |
| 2 | Destinations Manager | `/admin/cms/destinations` | `GET/POST /api/v1/admin/cms/destinations`, `GET/PATCH …/[id]` | `Destination`, `SeoMeta` |
| 3 | Tours Manager | `/admin/cms/tours` | `GET /api/v1/admin/cms/tours` | `Tour` (marketplace) |
| 4 | Transportation Manager | `/admin/cms/transport` | `GET /api/v1/admin/cms/transport` | `TransportationService` |
| 5 | Travel Guides Manager | `/admin/cms/guides` | `GET/POST /api/v1/admin/cms/guides`, `GET/PATCH/DELETE …/[id]` | `TravelGuide`, `SeoMeta` |
| 6 | FAQ Manager | `/admin/cms/faqs` | `GET/POST/PATCH/DELETE /api/v1/admin/cms/faqs` | `Faq`, `SeoMeta` |
| 7 | Media Library | `/admin/cms/media` | `GET/POST/PATCH/DELETE /api/v1/admin/cms/media` | `MediaAsset` |
| 8 | Testimonials Manager | `/admin/cms/testimonials` | `GET/POST/PATCH /api/v1/admin/cms/testimonials` | `Testimonial` |
| 9 | Supplier Content Approval | `/admin/cms/supplier-approval` | `GET/PATCH /api/v1/admin/cms/supplier-submissions` | `SupplierContentSubmission` |
| 10 | SEO Manager | `/admin/cms/seo` | `GET/PUT/PATCH /api/v1/admin/cms/seo` | `SeoMeta` |

Dashboard overview: `/admin/cms` → `GET /api/v1/admin/cms/dashboard`

## Architecture diagram

```
Admin CMS UI (src/app/admin/cms/*)
    ↓ fetch / useCmsApi (credentials: include)
API Routes (src/app/api/v1/admin/cms/*)
    ↓ apiHandler + cms:* permission guard
cms-data.service.ts (facade)
    ├── cms.service.ts (PostgreSQL via Prisma)
    └── cms-local-store.ts (data/cms/*.json fallback)
Cloudinary (src/server/lib/cloudinary.ts)
    ↓ signed uploads
MediaAsset records
```

## Database schema (CMS additions)

### Admin roles

```prisma
enum AdminStaffRole {
  SUPER_ADMIN
  CONTENT_MANAGER
  SUPPORT_MANAGER
}

model AdminStaffProfile {
  userId    String @unique
  staffRole AdminStaffRole
  permissions Json?  // optional overrides
}
```

### SEO (polymorphic)

```prisma
model SeoMeta {
  entityType      CmsEntityType
  entityId        String
  metaTitle       String?
  metaDescription String?
  ogTitle         String?
  ogDescription   String?
  ogImage         String?
  canonicalUrl    String?
  schemaMarkup    Json?      // JSON-LD
  noIndex         Boolean
  @@unique([entityType, entityId])
}
```

### Media (Cloudinary)

```prisma
model MediaAsset {
  cloudinaryId String @unique
  publicId     String
  secureUrl    String
  folder       String @default("mft")
  altText      String?
  tags         String[]
}
```

### Supplier approval queue

```prisma
model SupplierContentSubmission {
  supplierId   String
  contentType  SupplierContentType  // TOUR | TRANSPORT | DESCRIPTION | IMAGE | GALLERY
  payload      Json
  status       ApprovalStatus       // PENDING | APPROVED | REJECTED | REVISION_REQUESTED
}
```

## Role permissions

Defined in `src/lib/auth/admin-roles.ts`:

| Permission | Super Admin | Content Manager | Support Manager |
|------------|:-----------:|:---------------:|:---------------:|
| `cms:read` | ✓ | ✓ | ✓ |
| `cms:write` | ✓ | ✓ | — |
| `cms:publish` | ✓ | ✓ | — |
| `cms:media` | ✓ | ✓ | — |
| `cms:seo` | ✓ | ✓ | — |
| `cms:approve` | ✓ | — | ✓ |
| `tours:approve` | ✓ | — | ✓ |
| `bookings:*` | ✓ | — | ✓ |
| `settings:write` | ✓ | — | — |

Staff role resolved in `resolveAuthContext()` via `AdminStaffProfile`. Local dev admin defaults to `SUPER_ADMIN`.

## API conventions

- All routes use `apiHandler(handler, "cms:read" | "cms:write" | …)`
- Responses: `{ ok: true, data }` or `{ ok: false, error, code }`
- Mutations logged via `withActivity(auth, action, "CONTENT", entityId)`
- Validation: Zod schemas in `src/lib/validations/cms.ts`
- Pagination: `?page=1&pageSize=25&search=&status=DRAFT`

### SEO Manager fields

| Field | Purpose |
|-------|---------|
| `metaTitle` | `<title>` — max 70 chars |
| `metaDescription` | Meta description — max 320 chars |
| `ogTitle` | Open Graph title |
| `ogDescription` | Open Graph description |
| `ogImage` | OG image URL (Cloudinary) |
| `canonicalUrl` | Canonical link |
| `schemaMarkup` | JSON-LD structured data |
| `noIndex` | Robots noindex flag |

## Cloudinary setup

Add to `.env.local`:

```env
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

Upload flow: `POST /api/v1/admin/cms/media` (multipart `file`) → Cloudinary → `MediaAsset` row.

## Local development (no PostgreSQL)

When `DATABASE_URL` is unset, CMS persists to `data/cms/*.json`:

- `homepage-sections.json`, `banners.json`, `destinations.json`
- `guides.json`, `faqs.json`, `testimonials.json`
- `media.json`, `seo.json`, `supplier-submissions.json`

Same API surface — UI works identically.

## Production deployment

```bash
# 1. Migrate schema
npm run db:migrate

# 2. Assign staff roles (Prisma Studio or seed)
# AdminStaffProfile { userId, staffRole: CONTENT_MANAGER }

# 3. Configure Cloudinary + DATABASE_URL

# 4. Access CMS
npm run dev
# → http://localhost:3000/admin/cms
```

## Public site integration

**Implemented.** The public site reads published content from PostgreSQL via `public-content.service.ts`. See [DYNAMIC_CMS_ARCHITECTURE.md](./DYNAMIC_CMS_ARCHITECTURE.md) for the full WordPress-style flow (dynamic routes, slugs, preview, revalidation).

Quick reference:

1. Admin saves content → Server Action → Prisma
2. `revalidatePath()` busts cache
3. Public pages at `/destinations/[slug]`, `/tours/[slug]`, `/guides/[slug]`, `/faq`, `/`
4. Legacy `/places-to-go` and `/things-to-do` redirect to canonical URLs

## File map

```
prisma/schema.prisma                          # CMS models
src/lib/cms/types.ts                          # Shared types
src/lib/cms/modules.ts                        # Module registry
src/lib/auth/admin-roles.ts                   # Staff role permissions
src/lib/validations/cms.ts                    # Zod schemas
src/server/services/cms/cms.service.ts        # Prisma CRUD
src/server/services/cms/cms-local-store.ts    # JSON fallback
src/server/services/cms-data.service.ts       # Facade
src/server/lib/cloudinary.ts                  # Media uploads
src/app/api/v1/admin/cms/**                   # REST API
src/app/admin/cms/**                          # Admin UI
src/components/cms/CmsShell.tsx               # CMS sidebar
src/components/cms/SeoEditor.tsx              # SEO form
src/hooks/useCmsApi.ts                        # Client API hook
docs/CMS_ARCHITECTURE.md                      # This document
```

## Audit trail

All CMS mutations write to `ActivityLog` with `module: CONTENT`:

- `cms.homepage_section.created`
- `cms.destination.updated`
- `cms.guide.deleted`
- `cms.media.uploaded`
- `cms.seo.upserted`
- `cms.supplier_submission.approved`

View in `/admin/security`.
