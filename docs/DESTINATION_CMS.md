# Destination CMS — Unified Template (Coral Coast Standard)

Every Fiji destination uses **one CMS model**, **one admin form**, and **one public page template**. Coral Coast is the reference layout — there is no special code path for `coral-coast`; other destinations match it by using the same fields and the same `DestinationDetailView` sections.

## Public URL

| Item | Path |
|------|------|
| Index | `/destinations` |
| Detail | `/destinations/[slug]` (e.g. `/destinations/coral-coast`) |
| Preview (admin) | `/destinations/[slug]?preview=1` |
| Admin list | `/admin/cms/destinations` |
| Admin edit | `/admin/cms/destinations/[id]/edit` |

Legacy `/places-to-go/[slug]` URLs **301 redirect** to `/destinations/[slug]`.

## Page sections (identical for every destination)

All destinations render the same sections in the same order. Limits are defined in `src/lib/destinations/detail-page.ts`.

| # | Section | Limit | Empty state |
|---|---------|-------|-------------|
| 1 | Overview + highlights + hero image | — | — |
| 2 | Top experiences | 6 | Concierge CTA |
| 3 | Featured tours | 4 | Concierge CTA |
| 4 | Luxury resorts & stays | 6 | Concierge CTA |
| 5 | Package deals | 4 (centered row) | Concierge CTA |
| 6 | Transportation | all | Concierge CTA |
| 7 | Island transfers | 2 (concierge links) | always shown |
| 8 | Interactive map | — | — |
| 9 | Best time + travel tips | — | — |
| 10 | FAQs | — | hidden if none |
| 11 | Related destinations | — | hidden if none |
| 12 | Inquiry CTA | — | — |

Package cards use the same grid on every page: **4 columns**, centered (`max-w-[70rem]`), same `DealModernCard` styling.

## CMS admin form tabs

`DestinationForm.tsx` — same tabs for every destination:

### Basics
- **Name** — public title (e.g. `Coral Coast`)
- **Slug** — URL segment (e.g. `coral-coast`, lowercase, hyphens)
- **Tagline** — short hero line
- **Description** — long overview (maps to page intro)
- **Excerpt** — optional summary
- **Featured** — show on homepage hub when enabled
- **Sort order** — index ordering
- **Status** — `DRAFT` | `PUBLISHED` | `ARCHIVED`

### Media
- **Hero image** — main destination photo
- **Gallery** — additional images (one URL per line)
- **Card image** — stored in `content.cardImage` (listing cards)

### Guide content
Stored in `content` JSON — same fields for all destinations:

| Field | Purpose |
|-------|---------|
| `region` | `mainland` or `islands` |
| `listHighlights` | Pill badges on overview |
| `thingsToDo` | Editorial list (CMS) |
| `placesToStay` | Editorial list (CMS) |
| `tours` | Editorial list (CMS) |
| `beaches` | Editorial list (CMS) |
| `dining` | Editorial list (CMS) |
| `transport` | Editorial list (CMS); also fallback for travel tips |
| `culture` | Editorial list (CMS) |
| `weather` | Climate copy |
| `bestTimeToVisit` | Best time card |
| `travelTips` | Bullet tips card |
| `faqs` | `{ question, answer }[]` |
| `relatedSlugs` | Links to other destination slugs |

### Travel info
- **Latitude / longitude** — map pin (seeded for all hubs)
- **Highlights** — duplicate of list highlights for Prisma column

### SEO
- Meta title, description, OG image, canonical, no-index (`SeoMeta` table / local `seo.json`)

## Marketplace seed data (static / local dev)

Editorial marketplace listings are seeded in:

| File | Content |
|------|---------|
| `src/lib/content/experiences.ts` | Tours & experiences (4+ per hub) |
| `src/lib/content/resorts.ts` | Luxury stays (1–3 per hub) |
| `src/lib/content/deals.ts` | Package deals (`category: "Package Deals"`, 4+ per hub) |

Every destination slug in `location-match.ts` has matching experiences, stays and packages so each `/destinations/[slug]` page fills the same section limits as Coral Coast (6 / 4 / 6 / 4).

To add more listings: set `location` and/or `destination` text to match keywords for that slug (see table below).

### Link tours & packages in CMS

| Entity | Admin | Link to destination |
|--------|-------|---------------------|
| Tours / experiences | `/admin/cms/tours` | **Destination** dropdown (`destinationId`) |
| Accommodations | `/admin/cms/accommodations` | Set `location` text to match keywords |
| Package deals | `/admin/cms/deals` | Category `PACKAGE` + `location` / destination text |
| Transport | `/admin/cms/transport` | `destinationId` |

### Location keywords (per slug)

Edit `src/lib/destinations/location-match.ts` when adding a new hub. Example for Coral Coast:

```
coral-coast → coral coast, natadola, sigatoka, korotogo
```

## Data sources

| Environment | Destination editorial | Marketplace listings |
|-------------|----------------------|----------------------|
| **PostgreSQL** (`DATABASE_URL` set) | `Destination` Prisma rows | DB + static merge in `destination-marketplace.service.ts` |
| **Local CMS** (no DB) | `data/cms/destinations.json` | Static `experiences.ts`, `resorts.ts`, `deals.ts` filtered by location |
| **DB unreachable** | Static fallback | Static marketplace fallback |

After editing in admin without Postgres, run:

```bash
npm run seed:cms-destinations   # if provided — seeds data/cms/destinations.json
```

Public pages read `data/cms/destinations.json` when `DATABASE_URL` is not configured.

## Seed all destinations like Coral Coast

1. Static editorial baseline: `src/lib/content/destinations.ts`
2. CMS JSON seed: `src/lib/cms/seed-destinations.ts` → `data/cms/destinations.json`
3. Add marketplace density per slug in:
   - `src/lib/content/experiences.ts`
   - `src/lib/content/resorts.ts`
   - `src/lib/content/deals.ts` (category `Package Deals`)
4. Ensure `DESTINATION_LOCATION_KEYWORDS` includes the new slug
5. Publish in admin with status **PUBLISHED**

## Checklist — new destination matches Coral Coast

- [ ] Slug added to `destinations.ts` + seed script + `location-match.ts`
- [ ] CMS record **PUBLISHED** with hero, tagline, overview, FAQs, related slugs
- [ ] At least 1 experience, 1 stay, 1 package deal with matching location/destination
- [ ] SEO meta saved in admin
- [ ] Preview at `/destinations/[slug]?preview=1`
- [ ] Public page shows all 12 sections (empty sections show concierge message, not hidden layout)

## Related docs

- [DYNAMIC_CMS_ARCHITECTURE.md](./DYNAMIC_CMS_ARCHITECTURE.md) — publish flow, preview, routes
- [CMS_ARCHITECTURE.md](./CMS_ARCHITECTURE.md) — admin modules & API
- [MARKETPLACE_ARCHITECTURE.md](./MARKETPLACE_ARCHITECTURE.md) — tours, accommodations, deals tables
