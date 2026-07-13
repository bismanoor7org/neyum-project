import { createHash, randomUUID } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import type {
  CheckoutSessionRecord,
  ConfirmedBooking,
  PaymentMode,
} from "@/lib/checkout/types";

const STORE_DIR = join(process.cwd(), "data");
const SESSIONS_PATH = join(STORE_DIR, "checkout-sessions.json");
const BOOKINGS_PATH = join(STORE_DIR, "checkout-bookings.json");
const AVAILABILITY_PATH = join(STORE_DIR, "checkout-availability.json");
const PAYMENT_ATTEMPTS_PATH = join(STORE_DIR, "checkout-payment-attempts.json");
const REFUNDS_PATH = join(STORE_DIR, "checkout-refunds.json");

type AvailabilitySlot = {
  tourSlug: string;
  date: string;
  timeSlotId: string;
  capacity: number;
  booked: number;
};

type PaymentAttemptRecord = {
  id: string;
  sessionId: string;
  idempotencyKey: string;
  amount: number;
  currency: string;
  status: "PENDING" | "PROCESSING" | "SUCCEEDED" | "FAILED" | "CANCELLED";
  stripeIntentId?: string;
  paymentMethod?: string;
  bookingId?: string;
  createdAt: string;
};

type RefundRecord = {
  id: string;
  bookingId: string;
  amount: number;
  reason: string;
  status: "REQUESTED" | "APPROVED" | "REJECTED" | "COMPLETED";
  createdAt: string;
};

function readJson<T>(path: string, fallback: T): T {
  try {
    if (!existsSync(path)) return fallback;
    return JSON.parse(readFileSync(path, "utf8")) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(path: string, data: T) {
  mkdirSync(STORE_DIR, { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2), "utf8");
}

export function isCheckoutDatabaseConfigured(): boolean {
  const url = process.env.DATABASE_URL?.trim();
  return Boolean(url && !url.startsWith("file:"));
}

export function guestTravelerId(email: string): string {
  const hash = createHash("sha256").update(email.toLowerCase()).digest("hex").slice(0, 12);
  return `guest-${hash}`;
}

export function newBookingNumber(): string {
  const year = new Date().getFullYear();
  const seq = Math.floor(1000 + Math.random() * 8999);
  return `MFT-${year}-${seq}`;
}

export function newInvoiceNumber(): string {
  return `INV-${Date.now().toString(36).toUpperCase()}`;
}

export function newVoucherNumber(): string {
  return `VCH-${Date.now().toString(36).toUpperCase()}`;
}

// ── Sessions ─────────────────────────────────────────────────────────────────

export function readSessions(): CheckoutSessionRecord[] {
  return readJson(SESSIONS_PATH, []);
}

export function getSession(id: string): CheckoutSessionRecord | null {
  return readSessions().find((s) => s.id === id) ?? null;
}

export function saveSession(session: CheckoutSessionRecord) {
  const sessions = readSessions().filter((s) => s.id !== session.id);
  sessions.push(session);
  writeJson(SESSIONS_PATH, sessions);
}

export function createLocalSession(input: {
  tourSlug: string;
  tourId: string;
  supplierId: string;
  travelerId: string | null;
}): CheckoutSessionRecord {
  const now = new Date();
  const session: CheckoutSessionRecord = {
    id: randomUUID(),
    tourSlug: input.tourSlug,
    tourId: input.tourId,
    supplierId: input.supplierId,
    travelerId: input.travelerId,
    status: "ACTIVE",
    expiresAt: new Date(now.getTime() + 60 * 60 * 1000).toISOString(),
    selection: null,
    travellers: null,
    pricing: null,
    promoCode: null,
    paymentMode: "FULL",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };
  saveSession(session);
  return session;
}

// ── Availability ─────────────────────────────────────────────────────────────

function readAvailability(): AvailabilitySlot[] {
  return readJson(AVAILABILITY_PATH, []);
}

function slotKey(tourSlug: string, date: string, timeSlotId: string) {
  return `${tourSlug}:${date}:${timeSlotId}`;
}

export function getSlotAvailability(
  tourSlug: string,
  date: string,
  timeSlotId: string,
  defaultCapacity: number,
): { capacity: number; remaining: number; booked: number } {
  const slots = readAvailability();
  const existing = slots.find(
    (s) => s.tourSlug === tourSlug && s.date === date && s.timeSlotId === timeSlotId,
  );
  const booked = existing?.booked ?? 0;
  const capacity = existing?.capacity ?? defaultCapacity;
  return { capacity, booked, remaining: Math.max(0, capacity - booked) };
}

export function reserveSlot(
  tourSlug: string,
  date: string,
  timeSlotId: string,
  defaultCapacity: number,
  guests: number,
): boolean {
  const slots = readAvailability();
  const idx = slots.findIndex(
    (s) => s.tourSlug === tourSlug && s.date === date && s.timeSlotId === timeSlotId,
  );
  const current = idx >= 0 ? slots[idx] : { tourSlug, date, timeSlotId, capacity: defaultCapacity, booked: 0 };
  if (current.booked + guests > current.capacity) return false;
  current.booked += guests;
  if (idx >= 0) slots[idx] = current;
  else slots.push(current);
  writeJson(AVAILABILITY_PATH, slots);
  return true;
}

export function getAvailabilityCalendar(
  tourSlug: string,
  timeSlots: { id: string; capacity: number }[],
  days = 90,
): { date: string; slots: { timeSlotId: string; remaining: number; capacity: number }[] }[] {
  const result: { date: string; slots: { timeSlotId: string; remaining: number; capacity: number }[] }[] = [];
  const today = new Date();
  for (let d = 1; d <= days; d++) {
    const date = new Date(today);
    date.setDate(today.getDate() + d);
    const dateStr = date.toISOString().slice(0, 10);
    result.push({
      date: dateStr,
      slots: timeSlots.map((ts) => {
        const avail = getSlotAvailability(tourSlug, dateStr, ts.id, ts.capacity);
        return { timeSlotId: ts.id, remaining: avail.remaining, capacity: avail.capacity };
      }),
    });
  }
  return result;
}

// ── Bookings ─────────────────────────────────────────────────────────────────

export function readLocalBookings(): ConfirmedBooking[] {
  return readJson(BOOKINGS_PATH, []);
}

export function getLocalBooking(id: string): ConfirmedBooking | null {
  return readLocalBookings().find((b) => b.id === id) ?? null;
}

export function saveLocalBooking(booking: ConfirmedBooking) {
  const bookings = readLocalBookings().filter((b) => b.id !== booking.id);
  bookings.unshift(booking);
  writeJson(BOOKINGS_PATH, bookings);
}

// ── Payment attempts ─────────────────────────────────────────────────────────

export function readPaymentAttempts(): PaymentAttemptRecord[] {
  return readJson(PAYMENT_ATTEMPTS_PATH, []);
}

export function getPaymentAttemptByKey(key: string): PaymentAttemptRecord | null {
  return readPaymentAttempts().find((a) => a.idempotencyKey === key) ?? null;
}

export function getPaymentAttemptByIntent(intentId: string): PaymentAttemptRecord | null {
  return readPaymentAttempts().find((a) => a.stripeIntentId === intentId) ?? null;
}

export function savePaymentAttempt(attempt: PaymentAttemptRecord) {
  const attempts = readPaymentAttempts().filter((a) => a.id !== attempt.id);
  attempts.push(attempt);
  writeJson(PAYMENT_ATTEMPTS_PATH, attempts);
}

export function createPaymentAttempt(input: {
  sessionId: string;
  idempotencyKey: string;
  amount: number;
  currency: string;
  paymentMethod?: string;
  stripeIntentId?: string;
}): PaymentAttemptRecord {
  const attempt: PaymentAttemptRecord = {
    id: randomUUID(),
    sessionId: input.sessionId,
    idempotencyKey: input.idempotencyKey,
    amount: input.amount,
    currency: input.currency,
    status: input.stripeIntentId ? "PROCESSING" : "PENDING",
    stripeIntentId: input.stripeIntentId,
    paymentMethod: input.paymentMethod,
    createdAt: new Date().toISOString(),
  };
  savePaymentAttempt(attempt);
  return attempt;
}

// ── Refunds ──────────────────────────────────────────────────────────────────

export function readRefunds(): RefundRecord[] {
  return readJson(REFUNDS_PATH, []);
}

export function saveRefund(refund: RefundRecord) {
  const refunds = readRefunds();
  refunds.push(refund);
  writeJson(REFUNDS_PATH, refunds);
}

export function createRefundRequest(bookingId: string, reason: string, amount?: number): RefundRecord {
  const booking = getLocalBooking(bookingId);
  const refund: RefundRecord = {
    id: randomUUID(),
    bookingId,
    amount: amount ?? booking?.pricing.grandTotal ?? 0,
    reason,
    status: "REQUESTED",
    createdAt: new Date().toISOString(),
  };
  saveRefund(refund);
  return refund;
}

export function updateRefundStatus(id: string, status: RefundRecord["status"]): RefundRecord {
  const refunds = readRefunds();
  const idx = refunds.findIndex((r) => r.id === id);
  if (idx < 0) throw new Error("Refund not found");
  refunds[idx] = { ...refunds[idx], status };
  writeJson(REFUNDS_PATH, refunds);
  return refunds[idx];
}

export type { PaymentAttemptRecord, RefundRecord };
