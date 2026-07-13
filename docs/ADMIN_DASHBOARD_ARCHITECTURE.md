# Admin Dashboard Architecture

Enterprise admin console for My Fiji Tour — built on the existing `admin-panel` theme, `AdminShell`, `BrandLogo`, and cookie-based authentication.

## Design principles

- **No separate design language** — reuses `admin-panel.css`, dark/light `ThemeToggle`, and `DashboardBrandHeader`
- **No mock data in UI** — pages fetch from `/api/v1/admin/*` via `useAdminApi`
- **Local-first dev** — without `DATABASE_URL`, data aggregates from JSON stores (checkout, traveller, supplier, enquiries)

## Architecture

```
Admin UI (src/app/admin/*)
    ↓ useAdminApi / fetch (credentials: include)
API Routes (src/app/api/v1/admin/*)
    ↓ apiHandler + permission guard
admin-data.service.ts (facade)
    ├── dashboard.service.ts + marketplace.service.ts (PostgreSQL)
    └── admin-local-data.service.ts (JSON stores)
```

## Auth

| Layer | File |
|-------|------|
| Login | `AdminLoginExperience` → `POST /api/v1/admin/auth/login` |
| Session | `mft_admin_session` HMAC cookie (`admin-session.ts`) |
| Context | `resolveAuthContext` — supports **local admin** + DB admin |
| Permissions | `permissions.ts` — 40+ permissions, `apiHandler(route, permission)` |

Local admin: `npm run admin:setup -- email password` → `data/local-admin.json`

## Data sources (local mode)

| Store | Metrics / entities |
|-------|------------------|
| `checkout-bookings.json` | Revenue, bookings, payments |
| `checkout-refunds.json` | Refund center |
| `traveller-seed.json` | Seed bookings, dashboard sync |
| `local-supplier.json` | Supplier management |
| `local-traveller.json` | Traveller management |
| `enquiries.jsonl` | Support tickets, enquiries |
| `admin-activity.jsonl` | Security / audit logs |
| `experiences` catalogue | Tour list |

## Admin sections

| Route | API | Status |
|-------|-----|--------|
| `/admin` | `GET /dashboard` | Live KPIs + charts |
| `/admin/cms` | `GET /api/v1/admin/cms/*` | **Production CMS** (10 modules) |
| `/admin/bookings` | `GET /bookings` | Live list + filters |
| `/admin/refunds` | `GET/PATCH /refunds` | Approval workflow |
| `/admin/suppliers` | `GET/PATCH /suppliers` | Approve/suspend/verify |
| `/admin/tours` | `GET /tours` | Catalogue from experiences |
| `/admin/users` | `GET /users` | Traveller profiles |
| `/admin/payments` | `GET /payments` | Stripe attempts |
| `/admin/analytics` | `GET /analytics` | 12-month charts |
| `/admin/security` | `GET /activity` | Audit trail |
| `/admin/enquiries` | `GET /api/enquiry` | Concierge inbox |
| `/admin/notifications` | `GET /notifications` | Derived alerts |

## RBAC

Roles defined in `permissions.ts`:

- **ADMIN** — full `ADMIN_PERMISSIONS` (production default)
- Sub-roles (Super Admin, Finance, Support, Operations, Marketing) — extend via `AdminRoleAssignment` when multi-admin is required

Route guards: each API route specifies permission e.g. `"bookings:refund"`, `"activity:read"`.

## Database (production)

Uses existing Prisma models: `User`, `Supplier`, `Tour`, `Booking`, `Payment`, `ActivityLog`, `SupportTicket`, `Notification`, `Settlement`, `TravellerRefund`, `AnalyticsSnapshot`.

## Commands

```bash
npm run admin:setup -- admin@myfijitour.com 'SecurePassword123!'
npm run dev
# → http://localhost:3000/admin
```
