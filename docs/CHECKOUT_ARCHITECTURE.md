# Checkout & Payment Architecture

Enterprise checkout flow for My Fiji Tour — integrated with the existing luxury theme, traveller auth, and local-first development pattern.

## Flow overview

```
Tour detail → /checkout/[slug]
  Step 1: Selection (date, slot, guests, add-ons, pickup)
  Step 2: Travellers (primary + additional + emergency)
  Step 3: Review (pricing, promo, payment mode)
  Step 4: Payment (Stripe Payment Element or dev confirm)
  → /checkout/confirmation/[bookingId]
```

## API endpoints

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/v1/checkout/start` | Create checkout session |
| POST | `/api/v1/checkout/validate` | Validate selection + compute pricing |
| POST | `/api/v1/checkout/travellers` | Save traveller details |
| POST | `/api/v1/checkout/apply-coupon` | Apply promo / recalculate |
| POST | `/api/v1/checkout/create-payment-intent` | Stripe PI + idempotency |
| POST | `/api/v1/checkout/confirm` | Confirm booking after payment |
| POST | `/api/v1/bookings/create` | Alias confirm (dev) |
| GET | `/api/v1/bookings/:id` | Booking detail |
| GET | `/api/v1/invoice/:id` | Invoice payload |
| GET | `/api/v1/voucher/:id` | Voucher + QR data |
| POST | `/api/v1/refund/request` | Refund request |

## Database (Prisma)

Extended models in `prisma/schema.prisma`:

- `CheckoutSession` — multi-step state
- `BookingItem` — line items (tour, add-ons)
- `BookingTraveller` — guest records
- `PaymentAttempt` — idempotency + fraud audit
- `Transaction` — charge/refund ledger
- `BookingInvoice` / `BookingVoucher` — documents
- `PromoCode` / `Coupon` — discounts
- `BookingLog` — audit trail

`Booking` extended with: `paymentMode`, counts, tax/fee/discount fields, `timeSlot`, `pickupLocation`.

## Local development (no DATABASE_URL)

| File | Purpose |
|------|---------|
| `data/checkout-sessions.json` | Active checkout sessions |
| `data/checkout-bookings.json` | Confirmed bookings |
| `data/checkout-availability.json` | Slot capacity |
| `data/checkout-payment-attempts.json` | Payment idempotency |
| `data/checkout-refunds.json` | Refund requests |
| `data/checkout-promos.json` | Promo codes |

Confirmed bookings sync to `data/traveller-seed.json` for the traveller dashboard.

## Payments

### Stripe (production)

Set in `.env.local`:

```
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

- Payment Intents with `automatic_payment_methods` (card, Apple Pay, Google Pay, PayPal when enabled in Stripe Dashboard)
- PCI: card data never touches our servers — Stripe.js Payment Element only
- Webhook: `src/app/api/v1/webhooks/stripe/route.ts` updates `Payment` + `Booking`

### Development mode

Without Stripe keys, Step 4 shows a secure dev confirm button. Payment attempts are logged locally; no card storage.

## Security

- Idempotency-Key header on payment intent creation
- Double-charge prevention via `PaymentAttempt` status check
- Re-validation of availability on confirm
- Session expiry (60 minutes)
- Audit logs via `console.info` + `BookingLog` (DB mode)

## Promo codes (local)

- `VOYAGER15` — 15% off (min FJD 200)
- `FIJI100` — FJD 100 off (min FJD 300)
- `EARLYBIRD` — FJD 200 off (min FJD 500)

## Post-booking automation

On confirm, the service logs notification intents for:

- Traveller: confirmation, invoice, voucher email
- Supplier: new booking alert
- Admin: revenue + booking alert

Wire to email provider (SendGrid, Resend) in production.

## Frontend

- `src/components/checkout/CheckoutFlow.tsx` — multi-step wizard
- `src/components/checkout/StripePaymentForm.tsx` — Stripe Elements
- `src/app/checkout/[slug]/page.tsx` — entry from tour pages
- Tour CTA: `ExperienceDetailView` → `/checkout/{slug}`

## Dashboard integration

- **Traveller**: bookings list includes `voucherUrl` / `invoiceUrl` after checkout
- **Supplier**: monitor `data/checkout-bookings.json` or `bookings` table
- **Admin**: existing `/admin/bookings` and `/admin/payments` routes

## Commands

```bash
npm run db:generate   # after schema changes
npm run db:push       # apply schema to Postgres
npm run traveller:setup
```

Restart dev server before `prisma generate` if EPERM on Windows.
