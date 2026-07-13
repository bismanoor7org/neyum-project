# Traveller Dashboard — Enterprise Architecture

## Global branding (mandatory)

All portals reuse the **homepage FIJI wordmark** via a single component:

| Asset | Path |
|-------|------|
| Brand constants | `src/lib/brand.ts` |
| Logo component | `src/components/layout/BrandLogo.tsx` |
| Dashboard chrome | `DashboardBrandHeader` (logo + portal label) |

Used on: Homepage `Navbar`, `Footer`, public auth (`AuthSplitLayout`), Admin/Supplier/Traveller shells & login pages, loading states.

Logo always links to `/`. Tagline from i18n (`t.brand.luxuryExperiences`). Image assets (`/fav.png`, `/footer logo.png`) available via `format="image"` when needed.

---

Production-grade traveller portal for **My Fiji Tour**, comparable to Airbnb / Booking.com account experiences — built on the same theme system as admin and supplier dashboards.

## System overview

```
┌─────────────────────────────────────────────────────────────────┐
│  /traveller/*  (Next.js App Router)                              │
│  TravellerProvider → TravellerLoginGate → TravellerShell         │
│  Theme: admin-panel.css + ThemeProvider (shared light/dark)      │
└───────────────────────────┬─────────────────────────────────────┘
                            │ credentials: include
┌───────────────────────────▼─────────────────────────────────────┐
│  /api/v1/traveller/*  (REST)                                    │
│  travellerApiHandler → requireTravellerPermission → services    │
└───────────────────────────┬─────────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────────┐
│  PostgreSQL + Prisma (or local JSON store for dev)                │
│  users, traveller_profiles, bookings, wishlist, loyalty, …      │
└─────────────────────────────────────────────────────────────────┘
```

## Design system (mandatory reuse)

| Asset | Path |
|-------|------|
| Theme provider | `src/components/providers/ThemeProvider.tsx` |
| Theme toggle | `src/components/layout/ThemeToggle.tsx` |
| Dashboard tokens | `src/styles/admin-panel.css` |
| Auth styling | `src/styles/auth-panel.css` |
| UI kit | `src/components/admin/ui/*` |

No separate traveller palette — `.admin-panel` wrapper throughout.

## Database schema (Prisma)

### Identity
- `User` (`role: TRAVELER`) — Clerk or password auth
- `TravellerProfile` — passport, emergency, dietary, accessibility, preferences

### Bookings & trips
- `Booking` (existing) — `travelerId`, status, payments
- `BookingEvent` — timeline (confirmed, voucher, refund, etc.)
- `TravellerItinerary` + `ItineraryDay` — trip planner, day-by-day schedule

### Discovery & saves
- `WishlistItem` + `WishlistCollection` — tours, destinations, packages
- `Favourite` — tours, suppliers, destinations
- `SavedSearch` — alerts on search criteria

### Commerce
- `TravellerPaymentMethod` — Stripe payment methods
- `TravellerInvoice` — per-booking invoices
- `TravellerRefund` — refund tracking
- `TravellerWallet` — wallet balance
- `LoyaltyAccount` + `LoyaltyTransaction` — points & tiers
- `TravellerPromoRedemption` — promo codes

### Communication
- `TravellerMessage` + `TravellerMessageAttachment` — supplier & support chat
- `Notification` (existing) — in-app alerts
- `TravellerNotificationPreference` — email, SMS, push, WhatsApp

### Documents & companions
- `TravelDocument` — passport, visa, insurance (S3-backed URLs)
- `TravelCompanion` — family, friends, shared bookings

### Reviews & security
- `Review` + `ReviewMedia` — ratings, photos, videos
- `LoginSession` — device management, login history
- `SupportTicket` (existing) — tickets & disputes

### Indexes & constraints
- All traveller tables scoped by `userId` with FK → `users.id` CASCADE
- Unique: `TravellerProfile.userId`, `LoyaltyAccount.userId`, `Favourite(userId, type, referenceId)`
- Composite indexes on `bookings.travelerId`, `wishlist_items.userId`, `notifications.userId`

## API structure

| Method | Route | Permission |
|--------|-------|------------|
| POST | `/api/v1/traveller/auth/login` | Public |
| POST | `/api/v1/traveller/auth/logout` | Session |
| GET | `/api/v1/traveller/auth/session` | Session |
| GET | `/api/v1/traveller/dashboard` | `dashboard:read` |
| GET | `/api/v1/traveller/bookings?filter=` | `bookings:read` |
| GET | `/api/v1/traveller/wishlist` | `bookings:read` |
| GET | `/api/v1/traveller/messages` | `messages:read` |
| GET | `/api/v1/traveller/profile` | `settings:read` |
| GET | `/api/v1/traveller/analytics` | `analytics:read` |
| GET | `/api/v1/traveller/recommendations` | `dashboard:read` |

Planned (same handler pattern):
- `POST /bookings/:id/cancel`, `POST /bookings/:id/reschedule`
- `POST /wishlist`, `DELETE /wishlist/:id`
- `POST /messages`, WebSocket `/ws/traveller`
- `POST /reviews`, `POST /documents/upload` (S3 presigned)
- `GET /payments`, `POST /payments/methods` (Stripe)
- `GET /loyalty`, `POST /loyalty/redeem`
- `GET /notifications`, `PATCH /notifications/preferences`
- `POST /support/tickets`

## Folder structure

```
src/
  app/traveller/              # 17 UI sections
    layout.tsx
    TravellerLayoutClient.tsx
    page.tsx                  # Dashboard home
    login/page.tsx
    bookings/, trips/, wishlist/, favourites/, messages/
    profile/, payments/, documents/, reviews/, loyalty/
    notifications/, companions/, support/, recommendations/
    analytics/, security/
  app/api/v1/traveller/       # REST APIs
  components/traveller/       # Shell, Provider, Gate, SectionPage
  components/auth/            # TravellerLoginExperience
  server/services/
    traveller-auth.service.ts
    traveller-dashboard.service.ts
  server/auth/
    local-traveller-store.ts
    local-traveller-auth.ts
  lib/auth/
    traveller-session.ts
    permissions.ts            # TRAVELLER_ROUTE_PERMISSIONS
docs/
  TRAVELLER_DASHBOARD_ARCHITECTURE.md
scripts/
  setup-local-traveller.ts
data/
  local-traveller.json        # Dev without PostgreSQL
```

## User flows

### Sign in
1. `/traveller/login` → email + password
2. `POST /api/v1/traveller/auth/login` → HMAC cookie `mft_traveller_session`
3. `TravellerLoginGate` → `TravellerShell` → dashboard

### Booking lifecycle
1. Dashboard shows upcoming trips KPI + list
2. `/traveller/bookings` — filter upcoming / completed / cancelled
3. Booking card → timeline, voucher, invoice, rebook, refund status

### Recommendation engine
Inputs: `Booking` history, `WishlistItem`, `SavedSearch`, `TravellerProfile.interests`
Output: ranked tours on dashboard + `/traveller/recommendations`
Production: Redis cache + nightly batch job; real-time on wishlist add.

## Component structure

| Component | Role |
|-----------|------|
| `TravellerProvider` | Session, signIn/out, profile summary |
| `TravellerLoginGate` | Blocks shell until authenticated |
| `TravellerShell` | Sidebar nav (17 sections), theme, mobile |
| `TravellerSectionPage` | PageHeader + content wrapper |
| `TravellerLoginExperience` | Auth UI (reuses admin-login CSS) |

## Business logic

- **Scoping**: every query filters `travelerId === auth.travelerId`
- **RBAC**: `TRAVELER_PERMISSIONS` in `permissions.ts`
- **Local dev**: `npm run traveller:setup` → `data/local-traveller.json` + rich mock dashboard data
- **Production**: Prisma queries against PostgreSQL; Clerk primary auth path via `resolveAuthContext`

## Notification system

| Channel | Storage | Delivery |
|---------|---------|----------|
| In-app | `Notification` | Real-time via WebSocket (planned) |
| Email | SendGrid/Resend | `TravellerNotificationPreference.email` |
| SMS | Twilio | `preference.sms` |
| Push | FCM | `preference.push` |
| WhatsApp | Business API | `preference.whatsapp` |

Event types: booking confirmed, supplier message, refund processed, promo offer, travel alert, reminder.

## Security architecture

| Layer | Implementation |
|-------|----------------|
| Session | HMAC-signed cookie, httpOnly, secure in prod |
| Auth priority | Clerk → traveller session → blocked |
| RBAC | `requireTravellerPermission` per route |
| Documents | S3 encrypted objects, presigned upload URLs |
| 2FA | Optional TOTP on `User` (enterprise `/traveller/security`) |
| Rate limit | Login: shared `rate-limit.ts` (to wire) |
| Audit | `ActivityLog` on auth events |

## Responsive design

- Collapsible sidebar (desktop) + slide-over nav (mobile)
- `admin-mobile-header` sticky bar on `< lg`
- KPI grids: 2-col mobile → 4-col desktop
- Charts stack vertically on narrow viewports

## Tech stack alignment

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 App Router |
| ORM | Prisma 6 + PostgreSQL |
| Styling | Tailwind 4 + admin-panel tokens |
| Motion | Framer Motion (login, alerts) |
| Payments | Stripe (`TravellerPaymentMethod`) |
| Cache | Redis (recommendations, sessions) — planned |
| Real-time | WebSockets (messaging) — planned |
| Files | AWS S3 (documents, review media) — planned |

## Local development

```bash
npm run traveller:setup -- you@email.com 'YourPassword123!'
npm run dev
# → http://localhost:3000/traveller/login
```

Requires `ADMIN_SESSION_SECRET` in `.env.local` (auto-set by setup script).

## Production checklist

- [ ] `DATABASE_URL` + `prisma migrate deploy`
- [ ] Clerk production keys + webhook sync (`role: TRAVELER`)
- [ ] Stripe customer + payment method APIs
- [ ] S3 bucket + document upload Lambda
- [ ] Redis for recommendation cache
- [ ] WebSocket server for messaging
- [ ] Email/SMS notification workers
