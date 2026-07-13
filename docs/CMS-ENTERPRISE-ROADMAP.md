# Enterprise CMS Upgrade Roadmap

**Rules:** Do not rebuild. Do not redesign public frontend. Do not remove working features. Extend modules only.

## Audit summary (2026-07-13)

### What already works
- Full CRUD: destinations, tours, stays, deals, guides, FAQs, testimonials, transport, homepage, visa, pages, posts
- Cloudinary `MediaAsset` + `MediaPicker`
- TipTap editor + visual section builder (JSON on `CmsPage`)
- Dashboard, activity, leads, bookings, navigation reorder
- Dual auth gate (admin cookie / Supabase `cms_profiles`)

### Gaps vs world-class CMS
| Area | Gap |
|---|---|
| Media | Flat folders, no crop/WebP UI, no bulk move/usage |
| Builder | No true DnD, no iframe preview, limited inspector |
| AI | Local helpers only — no AI Studio UI / LLM |
| Analytics | Inventory only — no GA4/GSC |
| Workflow | No Pending Review / approval comments |
| Menus | ↑↓ only — no nested DnD mega builder |
| RBAC | `enterprise-rbac` not wired into API handlers |
| UX | No toast system; `CmsDataTable` unused |

### Do not touch
- Public magazine UI
- `public-content.service` contract (additive only)
- Live travel entity public mappers without migration plan

---

## Implementation order

| # | Module | Approach |
|---|---|---|
| **1** | **Enterprise Media Library** | Extend Cloudinary + `MediaAsset` (keep picker/API) |
| 2 | Toast + wire `enterprise-rbac` aliases | CMS layout only |
| 3 | Visual Builder polish | DnD + iframe preview + MediaPicker inspector |
| 4 | Editorial workflow statuses | Additive status + approval queue |
| 5 | Menu builder DnD | Extend `NavigationManager` |
| 6 | AI Studio dashboard | Same `/api/.../ai` + OpenAI/Gemini provider |
| 7 | SEO enterprise (redirects, OG preview, audit) | Extend SEO page + `CmsRedirect` |
| 8 | Analytics connectors | GA4/GSC behind settings |
| 9 | Session manager / 2FA UI | Use existing SQL tables |
| 10 | Unify lists → `CmsDataTable` | Gradual, per module |

---

## Module 1 — Enterprise Media Library ✅

Extended existing Cloudinary + `MediaAsset` stack (no rewrite, `MediaPicker` preserved).

### Added
- Path folders + create/select folder for uploads
- Drag & drop + multi upload
- Bulk delete / move / favorite
- Search, sort (newest/oldest/name/size), favorites filter
- Detail panel: alt, caption, folder, replace file, copy CDN URL
- Cloudinary transforms: WebP / AVIF / thumb delivery URLs
- Storage usage stats
- Usage detection across destinations, tours, stays, deals, pages, posts
- `isFavorite` on `MediaAsset`

### Files
- `src/app/admin/cms/media/page.tsx`
- `src/app/api/v1/admin/cms/media/route.ts`
- `src/server/lib/cloudinary.ts`
- `src/server/services/cms/cms.service.ts` (media section)
- `prisma/schema.prisma` (`isFavorite`)

### Apply DB
```bash
npx prisma db push
```

---

## Modules 2–8 — Complete ✅ (2026-07-13)

Public frontend untouched. Existing CMS modules extended only.

| # | Module | Delivered |
|---|---|---|
| 2 | Toast + enterprise RBAC | `CmsToastProvider` in CMS layout; `assertEnterpriseCmsAccess` on `cms:*` API guards |
| 3 | Visual Builder | HTML5 DnD, iframe live preview, MediaPicker on image props |
| 4 | Editorial workflow | `PENDING_REVIEW` / `NEEDS_CHANGES` / `APPROVED` + `/admin/cms/workflow` queue |
| 5 | Menu DnD | Nested parent select + drag reorder in `NavigationManager` |
| 6 | AI Studio | `/admin/cms/ai` + OpenAI/Gemini when env keys set |
| 7 | SEO enterprise | Redirects CRUD, OG preview, coverage audit on SEO page |
| 8 | Analytics + sessions | GA4/GSC connectors on Analytics; `/admin/cms/sessions` |

### Apply DB (workflow statuses + media favorite)
```bash
npx prisma db push
```

Optional LLM:
```
OPENAI_API_KEY=
# or
GEMINI_API_KEY=
```

