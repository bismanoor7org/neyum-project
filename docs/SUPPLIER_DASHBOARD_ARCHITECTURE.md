# Supplier Dashboard — Enterprise Architecture

Production-grade supplier partner portal for **My Fiji Tour**, mirroring admin dashboard patterns and the platform theme system.

## System overview

```
┌─────────────────────────────────────────────────────────────────┐
│  /supplier/*  (Next.js App Router)                                │
│  SupplierProvider → SupplierLoginGate → SupplierShell           │
│  Theme: admin-panel.css + ThemeProvider (shared light/dark)       │
└───────────────────────────┬─────────────────────────────────────┘
                            │ credentials: include
┌───────────────────────────▼─────────────────────────────────────┐
│  /api/v1/supplier/*  (REST)                                     │
│  supplierApiHandler → requireSupplierPermission → scoped services │
└───────────────────────────┬─────────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────────┐
│  PostgreSQL + Prisma (or local file store for dev)                │
│  suppliers, tours, bookings, settlements, team, documents, …    │
└─────────────────────────────────────────────────────────────────┘
```

## Theme & design (mandatory reuse)

| Asset | Path |
|-------|------|
| Theme provider | `src/components/providers/ThemeProvider.tsx` |
| Theme toggle | `src/components/layout/ThemeToggle.tsx` |
| Design tokens | `src/lib/design-system.ts`, `src/app/globals.css` |
| Dashboard tokens | `src/styles/admin-panel.css` (`.admin-panel`) |
| UI kit | `src/components/admin/ui/*` (PageHeader, KpiCard, DataTable, Charts) |
| Auth styling | `src/styles/auth-panel.css` (`.admin-login-*`) |

Supplier shell uses **identical** `admin-panel` wrapper — no separate palette.

## Database schema (Prisma)

### Core (existing)
- `User`, `Supplier`, `Tour`, `Booking`, `Payment`, `Settlement`, `Review`, `SupportTicket`, `Notification`

### Enterprise extensions (added)
- `SupplierTeamMember` — RBAC roles (OWNER, MANAGER, SALES_AGENT, …)
- `SupplierDocument` — KYC, licenses, insurance, expiry tracking
- `SupplierCalendarBlock` — blackout / holiday / maintenance
- `TourAvailability` — per-date capacity & pricing
- `SupplierAutomation` — booking confirmations, reminders, review requests
- `SupplierMessage` — customer / admin / internal chat
- `SupplierGuide`, `SupplierVehicle` — operations
- `SupplierCustomerNote` — CRM segments & VIP
- `SupplierPerformanceLog` — health score history
- `SupplierNotificationPreference` — channel preferences

### Supplier profile fields (extended)
- KYC: `kycStatus`, `onboardingStep`, `taxId`, `businessLicenseNo`
- Performance: `healthScore`, `responseRate`, `cancellationRate`
- Payouts: `stripeOnboarded`, `paypalMerchantId`, `instantBooking`

## API structure

| Method | Route | Permission |
|--------|-------|------------|
| POST | `/api/v1/supplier/auth/login` | Public |
| POST | `/api/v1/supplier/auth/logout` | Session |
| GET | `/api/v1/supplier/auth/session` | Session |
| GET | `/api/v1/supplier/dashboard` | `dashboard:read` |
| GET | `/api/v1/supplier/bookings` | `bookings:read` |
| GET | `/api/v1/supplier/tours` | `tours:read` |
| GET | `/api/v1/supplier/profile` | `settings:read` |

All supplier routes enforce **supplierId scoping** via `requireSupplierPermission`.

## Folder structure

```
src/
  app/supplier/           # UI routes (16 sections)
  app/api/v1/supplier/    # REST APIs
  components/supplier/      # Shell, Provider, Gate
  server/services/        # supplier-dashboard.service.ts, supplier-auth.service.ts
  server/auth/            # local-supplier-store, context extensions
  lib/auth/               # permissions, supplier-session
docs/
  SUPPLIER_DASHBOARD_ARCHITECTURE.md
```

## RBAC

- Platform role: `UserRole.SUPPLIER`
- Team roles: `SupplierMemberRole` with `SUPPLIER_MEMBER_ROLE_PERMISSIONS`
- Route map: `SUPPLIER_ROUTE_PERMISSIONS` in `permissions.ts`

## Security

- HttpOnly signed session cookie (`mft_supplier_session`)
- bcrypt password + TOTP 2FA (same as admin)
- Audit logging via `activity_logs`
- Supplier-scoped queries — no cross-tenant data access
- GDPR-ready: document retention, consent flags in notification prefs

## Local development (no PostgreSQL)

```bash
npm run supplier:setup -- partner@company.com 'StrongPass123!' 'Island Adventures Ltd'
npm run dev
# Sign in at /supplier/login with email, password, and TOTP code printed in terminal
```

## Admin integration

Admins approve suppliers via `/admin/suppliers` and `PATCH /api/v1/admin/suppliers`.
Supplier-submitted tours use `TourStatus.PENDING` → admin `APPROVED`.

## Deployment

1. Set `DATABASE_URL`, `ADMIN_SESSION_SECRET`
2. `npx prisma db push` / migrate
3. Stripe Connect keys for payouts
4. Redis for rate limits & job queues (future)
5. AWS S3 for document uploads (future)
6. WebSockets for real-time messaging (future)

## Roadmap (phased)

1. ✅ Portal shell, auth, dashboard, bookings, tours APIs
2. Onboarding wizard + document upload + admin approval flow
3. Tour builder, calendar, availability engine
4. Stripe Connect onboarding, escrow, automated settlements
5. Messaging (WebSockets), automation engine, analytics warehouse
6. Mobile push, WhatsApp, cohort analytics
