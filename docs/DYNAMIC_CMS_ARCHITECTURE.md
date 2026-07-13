# Dynamic CMS Architecture — WordPress-Style Content Platform

This document describes how the public site is **fully database-driven**: admins create content in the CMS and pages appear automatically — no code deploys required.

For admin module inventory and API routes, see [CMS_ARCHITECTURE.md](./CMS_ARCHITECTURE.md).

For destination pages specifically (Coral Coast standard template, form fields, marketplace linking), see [DESTINATION_CMS.md](./DESTINATION_CMS.md).

## North star

| WordPress / Shopify / Webflow | This platform |
|------------------------------|---------------|
| Post → `/blog/my-slug` | Destination → `/destinations/nadi` |
| Product → `/products/handle` | Tour → `/tours/island-hopping` |
| Collection item → URL | Guide → `/guides/best-time-to-visit` |
| Site settings | Homepage sections → `/` |
| FAQ plugin | FAQ entries → `/faq` |
| Draft + Preview | `?preview=1` for logged-in admins |
| Publish triggers cache bust | `revalidatePath()` in Server Actions |

## Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 App Router |
| Language | TypeScript |
| Database | PostgreSQL + Prisma |
| Mutations | Server Actions (`src/server/actions/cms.ts`) |
| Reads | `public-content.service.ts` (React `cache`) |
| Auth | Cookie session + CMS RBAC |
| Rendering | `dynamic = "force-dynamic"` on CMS pages |

## End-to-end flow

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Admin CMS UI   │────▶│  Server Actions  │────▶│  PostgreSQL     │
│  /admin/cms/*   │     │  save*Action()   │     │  Prisma models  │
└─────────────────┘     └────────┬─────────┘     └────────┬────────┘
                                 │                        │
                                 ▼                        │
                        revalidatePath()                    │
                        (canonical + legacy URLs)           │
                                 │                        │
┌─────────────────┐              │                        │
│  Public visitor │◀─────────────┴────────────────────────┘
│  /destinations/ │        public-content.service.ts
│  nadi           │        (PUBLISHED rows only)
└─────────────────┘
```

### Publish workflow

1. Admin saves content with status `DRAFT`, `PUBLISHED`, or `ARCHIVED`.
2. Server Action validates input, writes to Prisma (or `data/cms/*.json` when no DB).
3. `revalidatePath()` clears Next.js cache for affected routes.
4. Next request to the public URL reads fresh data from PostgreSQL.

### Preview workflow

1. Admin opens `https://site.com/destinations/nadi?preview=1` while logged in.
2. `resolveCmsPreview()` checks admin cookie + `preview=1`.
3. `getDestinationBySlug(slug, { allowDraft: true })` returns `DRAFT` rows.
4. `CmsPreviewBanner` warns that content is not public.

## Canonical public URLs

Defined in `src/lib/cms/public-routes.ts`:

| Content type | Index | Detail | Admin module |
|--------------|-------|--------|--------------|
| Destinations | `/destinations` | `/destinations/[slug]` | `/admin/cms/destinations` |
| Tours | `/tours` | `/tours/[slug]` | `/admin/cms/tours` |
| Guides | `/guides` | `/guides/[slug]` | `/admin/cms/guides` |
| FAQ | `/faq` | (single page, accordion) | `/admin/cms/faqs` |
| Homepage | `/` | section keys in DB | `/admin/cms/homepage` |

Legacy URLs (`/places-to-go`, `/things-to-do`) **301 redirect** to canonical paths so existing bookmarks and SEO equity are preserved.

## Dynamic routes (App Router)

Every detail page uses the same WordPress-style pattern:

```tsx
// src/app/destinations/[slug]/page.tsx (tours/guides identical)
export const dynamicParams = true;   // unknown slugs resolved at runtime
export const dynamic = "force-dynamic"; // always read DB, never static export

export async function generateStaticParams() {
  return (await getDestinationSlugs()).map((slug) => ({ slug }));
}
```

- **`dynamicParams: true`** — new slug in DB → page exists on first request (no rebuild).
- **`force-dynamic`** — no stale static HTML; content changes are immediate after revalidation.
- **`generateStaticParams`** — optional warm paths for known slugs; does not block new ones.

### Page files

```
src/app/
├── page.tsx                      # Homepage (CMS sections)
├── destinations/
│   ├── page.tsx                  # Index — published destinations
│   └── [slug]/page.tsx           # Auto-generated destination pages
├── tours/
│   ├── page.tsx                  # Index — published tours
│   └── [slug]/page.tsx           # Auto-generated tour pages
├── guides/
│   ├── page.tsx                  # Hub — published guides
│   └── [slug]/page.tsx           # Auto-generated guide pages
├── faq/page.tsx                  # FAQ — merges DB + static fallback
├── places-to-go/**               # Legacy → permanentRedirect
└── things-to-do/**               # Legacy → permanentRedirect
```

## Database models (content)

| Prisma model | Slug field | Status | Public mapper |
|--------------|------------|--------|---------------|
| `Destination` | `slug` (unique) | `DRAFT` / `PUBLISHED` / `ARCHIVED` | `mapPrismaDestination` |
| `Tour` | `slug` (unique) | marketplace + CMS status | `mapPrismaTour` |
| `TravelGuide` | `slug` (unique) | `ContentStatus` | `mapPrismaGuide` |
| `Faq` | — | `status` + `published` | `mapPrismaFaq` |
| `HomepageSection` | `key` (unique) | `status` | `mapHomepageSection` |
| `Testimonial` | — | `status` | `mapTestimonial` |
| `SeoMeta` | `entityType` + `entityId` | — | `getPublicSeoMeta` |

Rich body fields are stored as JSON (`content`, `body`) and mapped to the existing public `Destination` / `Experience` / `Guide` TypeScript shapes so UI components require no redesign.

## Service layer

### Writes — `src/server/actions/cms.ts`

| Action | Revalidates |
|--------|-------------|
| `saveDestinationAction` | `/`, `/destinations`, `/destinations/[slug]`, legacy paths |
| `saveTourAction` | `/`, `/tours`, `/tours/[slug]`, legacy paths |
| `saveGuideAction` | `/guides`, `/guides/[slug]`, `/` |
| `saveFaqAction` | `/faq`, `/` |
| `saveHomepageSectionAction` | `/` |
| `saveSeoAction` | entity public path |

### Reads — `src/server/services/public-content.service.ts`

When `DATABASE_URL` is set:

- **Only** `PUBLISHED` rows are returned (unless `allowDraft` in preview).
- **No** static TypeScript fallback — empty DB means empty public pages.
- All list/detail functions are wrapped in React `cache()` for per-request deduplication.

When `DATABASE_URL` is unset (local dev):

- Falls back to `src/lib/content/*.ts` and `data/cms/*.json`.
- Same Server Actions and admin UI work identically.

### SEO — `src/server/services/public-seo.service.ts`

- Polymorphic `SeoMeta` keyed by `entityType` + `entityId`.
- `buildCmsPageMetadata()` merges DB SEO with sensible fallbacks (title, OG image, canonical).
- JSON-LD uses canonical paths from `CMS_ROUTES`.

### Sitemap — `src/app/sitemap.ts`

Async sitemap reads live slugs from `getDestinationSlugs()`, `getExperienceSlugs()`, `getGuideSlugs()` — new published content is indexed automatically.

## Admin forms (no UI redesign)

Forms live in `src/components/cms/forms/` and call Server Actions directly:

| Form | Create | Edit |
|------|--------|------|
| `DestinationForm` | `/admin/cms/destinations/new` | `…/[id]/edit` |
| `TourForm` | `/admin/cms/tours/new` | `…/[id]/edit` |
| `GuideForm` | `/admin/cms/guides/new` | `…/[id]/edit` |
| `FaqForm` | `/admin/cms/faqs/new` | `…/[id]/edit` |
| `HomepageSectionForm` | `/admin/cms/homepage/new` | `…/[id]/edit` |
| `TestimonialForm` | `/admin/cms/testimonials/new` | `…/[id]/edit` |
| `TransportForm` | `/admin/cms/transport/new` | `…/[id]/edit` |

Each form includes:

- Title / slug (auto-generated from title)
- Status (`DRAFT` → `PUBLISHED`)
- Media fields (Cloudinary URLs)
- `SeoEditor` (meta title, description, OG, canonical, noindex)

## Example: adding “Nadi” destination

1. Go to `/admin/cms/destinations/new`.
2. Enter name **Nadi**, upload hero image, write description, set status **Published**.
3. Submit → `saveDestinationAction` creates row `slug: "nadi"`.
4. `revalidatePath("/destinations/nadi")` runs.
5. Public page is live at **`/destinations/nadi`** with SEO metadata and JSON-LD.
6. Appears on `/destinations` index and in sitemap on next crawl.

No developer involvement. No `git push`. No `generateStaticParams` rebuild.

## Environment setup (production)

```env
# .env.local
DATABASE_URL="postgresql://user:pass@host:5432/neyum"
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

```bash
npx prisma db push    # or npm run db:migrate
npx prisma generate   # stop dev server first on Windows if EPERM
npm run dev
```

Open `http://localhost:3000/admin/cms` — assign `AdminStaffProfile` with `CONTENT_MANAGER` or `SUPER_ADMIN`.

## File map (dynamic platform)

```
prisma/schema.prisma
src/lib/cms/
  public-routes.ts      # Canonical URL helpers
  preview.ts            # Admin preview gate
  metadata.ts           # buildCmsPageMetadata()
src/server/
  actions/cms.ts        # Server Actions + revalidation
  services/
    public-content.service.ts
    public-content.mappers.ts
    public-seo.service.ts
    cms/cms.service.ts
src/app/
  destinations/[slug]/page.tsx
  tours/[slug]/page.tsx
  guides/[slug]/page.tsx
  faq/page.tsx
  page.tsx
  sitemap.ts
src/components/cms/
  CmsPreviewBanner.tsx
  forms/*
docs/DYNAMIC_CMS_ARCHITECTURE.md   # This document
```

## Remaining static surfaces (optional migration)

These still use hardcoded `src/lib/content/*` but do not block the CMS platform:

| Surface | Notes |
|---------|-------|
| `things-to-do-categories.ts` | Rich category landing pages; `/tours` index is DB-driven |
| `ExperiencesGrid` (homepage) | Static featured cards; can wire to `getPublishedExperiences()` |
| `CheckoutFlow` | Static tour lookup; can wire to `getExperienceBySlug()` |
| Homepage banners tab | List-only; no create/edit form yet |
| Seed script | No one-shot import from static TS → PostgreSQL yet |

## Security

- Server Actions call `requireCmsAction("cms:write" | "cms:publish")`.
- Preview mode requires valid admin session cookie — drafts are never exposed to anonymous users.
- `ARCHIVED` content returns 404 on public routes.

## Summary

This is **not a static site**. It is a **content-driven platform**:

- Dynamic routes + dynamic slugs
- PostgreSQL as source of truth
- Server Actions for mutations with cache revalidation
- SEO-friendly canonical URLs
- Draft / publish / preview workflow
- Automatic page generation on publish

Behavior matches WordPress, Shopify CMS, and Webflow CMS — implemented with Next.js 15, Prisma, PostgreSQL, Server Actions, and TypeScript.
