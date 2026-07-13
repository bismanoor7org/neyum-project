import { createHash, randomUUID } from "crypto";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import Stripe from "stripe";
import { getCheckoutTour } from "@/lib/checkout/catalog";
import { calculatePricing, type PromoDefinition } from "@/lib/checkout/pricing";
import type {
  CheckoutSelection,
  CheckoutSessionRecord,
  CheckoutTravellersPayload,
  ConfirmedBooking,
  PaymentMode,
} from "@/lib/checkout/types";
import { prisma } from "@/lib/db/prisma";
import { AppError } from "@/server/errors";
import {
  createLocalSession,
  createPaymentAttempt,
  createRefundRequest,
  getAvailabilityCalendar,
  getLocalBooking,
  getPaymentAttemptByIntent,
  getPaymentAttemptByKey,
  getSession,
  getSlotAvailability,
  guestTravelerId,
  isCheckoutDatabaseConfigured,
  newBookingNumber,
  newInvoiceNumber,
  newVoucherNumber,
  readLocalBookings,
  reserveSlot,
  saveLocalBooking,
  savePaymentAttempt,
  saveSession,
} from "@/server/auth/local-checkout-store";
import { appendTravellerBooking } from "@/server/auth/traveller-seed";
import { readLocalTraveller } from "@/server/auth/local-traveller-store";

const PROMOS_PATH = join(process.cwd(), "data", "checkout-promos.json");

function readPromos(): PromoDefinition[] {
  if (!existsSync(PROMOS_PATH)) return [];
  return JSON.parse(readFileSync(PROMOS_PATH, "utf8")) as PromoDefinition[];
}

function getPromo(code: string): PromoDefinition | null {
  return readPromos().find((p) => p.code.toUpperCase() === code.toUpperCase()) ?? null;
}

function stripeClient(): Stripe | null {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

function ensureActiveSession(session: CheckoutSessionRecord | null): CheckoutSessionRecord {
  if (!session) throw new AppError("Checkout session not found", 404, "SESSION_NOT_FOUND");
  if (session.status !== "ACTIVE") throw new AppError("Checkout session is no longer active", 410, "SESSION_EXPIRED");
  if (new Date(session.expiresAt) < new Date()) {
    session.status = "EXPIRED";
    saveSession(session);
    throw new AppError("Checkout session has expired", 410, "SESSION_EXPIRED");
  }
  return session;
}

function validateTourOperational(slug: string) {
  const tour = getCheckoutTour(slug);
  if (!tour) throw new AppError("Tour not found", 404, "TOUR_NOT_FOUND");
  if (tour.tourStatus !== "ACTIVE") throw new AppError("Tour is not available for booking", 400, "TOUR_INACTIVE");
  if (tour.supplierStatus !== "ACTIVE") throw new AppError("Supplier is not accepting bookings", 400, "SUPPLIER_INACTIVE");
  return tour;
}

function validateSelection(tour: ReturnType<typeof getCheckoutTour>, selection: CheckoutSelection) {
  const slot = tour!.timeSlots.find((s) => s.id === selection.timeSlotId);
  if (!slot) throw new AppError("Invalid time slot", 400, "INVALID_SLOT");

  const travelDate = new Date(selection.travelDate);
  if (Number.isNaN(travelDate.getTime())) throw new AppError("Invalid travel date", 400, "INVALID_DATE");
  if (travelDate <= new Date()) throw new AppError("Travel date must be in the future", 400, "INVALID_DATE");

  const guests = selection.adultCount + selection.childCount;
  if (guests > tour!.maxGuests) throw new AppError(`Maximum ${tour!.maxGuests} guests per booking`, 400, "CAPACITY_EXCEEDED");

  const avail = getSlotAvailability(tour!.slug, selection.travelDate, selection.timeSlotId, slot.capacity);
  if (avail.remaining < guests) throw new AppError("Not enough capacity for selected slot", 409, "SLOT_FULL");

  if (!tour!.pickupLocations.includes(selection.pickupLocation)) {
    throw new AppError("Invalid pickup location", 400, "INVALID_PICKUP");
  }

  for (const id of selection.addOnIds) {
    if (!tour!.addOns.some((a) => a.id === id)) {
      throw new AppError(`Invalid add-on: ${id}`, 400, "INVALID_ADDON");
    }
  }
}

function walletCreditForTraveler(travelerId: string | null, useWallet?: boolean): number {
  if (!useWallet || !travelerId) return 0;
  const local = readLocalTraveller();
  if (local && local.id === travelerId) return local.walletBalance;
  return 0;
}

function buildQrData(booking: ConfirmedBooking): string {
  return JSON.stringify({
    ref: booking.bookingNumber,
    voucher: booking.voucherNumber,
    tour: booking.tourTitle,
    date: booking.travelDate,
    guests: booking.guestCount,
    verify: `https://myfijitour.com/bookings/${booking.id}`,
  });
}

function logBookingEvent(message: string, meta?: Record<string, unknown>) {
  console.info("[checkout]", message, meta ?? "");
}

export async function startCheckout(tourSlug: string, travelerId: string | null) {
  const tour = validateTourOperational(tourSlug);

  const session = createLocalSession({
    tourSlug,
    tourId: tour.tourId,
    supplierId: tour.supplierId,
    travelerId,
  });

  if (isCheckoutDatabaseConfigured()) {
    await prisma.checkoutSession.create({
      data: {
        id: session.id,
        tourSlug,
        tourId: tour.tourId,
        supplierId: tour.supplierId,
        travelerId: travelerId ?? undefined,
        expiresAt: new Date(session.expiresAt),
      },
    }).catch(() => undefined);
  }

  return {
    sessionId: session.id,
    tour,
    availability: getAvailabilityCalendar(tour.slug, tour.timeSlots),
    expiresAt: session.expiresAt,
  };
}

export async function validateCheckoutSelection(sessionId: string, selection: CheckoutSelection) {
  const session = ensureActiveSession(getSession(sessionId));
  const tour = validateTourOperational(session.tourSlug);
  validateSelection(tour, selection);

  const pricing = calculatePricing(tour!, selection, {
    promo: session.promoCode ? getPromo(session.promoCode) : null,
    walletCredit: walletCreditForTraveler(session.travelerId, false),
    paymentMode: session.paymentMode,
    partialAmount: session.partialAmount,
  });

  session.selection = selection;
  session.pricing = pricing;
  session.updatedAt = new Date().toISOString();
  saveSession(session);

  logBookingEvent("validated", { sessionId, travelDate: selection.travelDate });

  return { sessionId, selection, pricing, tour };
}

export async function saveCheckoutTravellers(sessionId: string, travellers: CheckoutTravellersPayload) {
  const session = ensureActiveSession(getSession(sessionId));
  if (!session.selection) throw new AppError("Complete tour selection first", 400, "SELECTION_REQUIRED");

  const guestCount = session.selection.adultCount + session.selection.childCount;
  const totalTravellers = 1 + travellers.additional.length;
  if (totalTravellers !== guestCount) {
    throw new AppError(`Provide details for all ${guestCount} travellers`, 400, "TRAVELLER_COUNT_MISMATCH");
  }

  session.travellers = travellers;
  if (!session.travelerId) {
    session.travelerId = guestTravelerId(travellers.primary.email);
  }
  session.updatedAt = new Date().toISOString();
  saveSession(session);

  return { sessionId, travellers };
}

export async function applyCheckoutCoupon(
  sessionId: string,
  code: string,
  options: { paymentMode?: PaymentMode; partialAmount?: number; useWallet?: boolean } = {},
) {
  const session = ensureActiveSession(getSession(sessionId));
  if (!session.selection) throw new AppError("Complete tour selection first", 400, "SELECTION_REQUIRED");

  const tour = validateTourOperational(session.tourSlug)!;
  const promo = getPromo(code);
  if (!promo) throw new AppError("Invalid promo code", 400, "INVALID_PROMO");

  session.promoCode = promo.code;
  if (options.paymentMode) session.paymentMode = options.paymentMode;
  if (options.partialAmount) session.partialAmount = options.partialAmount;

  const pricing = calculatePricing(tour, session.selection, {
    promo,
    walletCredit: walletCreditForTraveler(session.travelerId, options.useWallet),
    paymentMode: session.paymentMode,
    partialAmount: session.partialAmount,
  });

  session.pricing = pricing;
  session.updatedAt = new Date().toISOString();
  saveSession(session);

  return { sessionId, pricing, promo: { code: promo.code, description: promo.description } };
}

export async function createCheckoutPaymentIntent(
  sessionId: string,
  idempotencyKey: string,
  options: {
    paymentMode?: PaymentMode;
    partialAmount?: number;
    useWallet?: boolean;
    paymentMethod?: string;
  } = {},
) {
  const existing = getPaymentAttemptByKey(idempotencyKey);
  if (existing?.status === "SUCCEEDED" && existing.stripeIntentId) {
    return {
      clientSecret: null,
      paymentIntentId: existing.stripeIntentId,
      amount: existing.amount,
      currency: existing.currency,
      reused: true,
    };
  }

  const session = ensureActiveSession(getSession(sessionId));
  if (!session.selection || !session.travellers) {
    throw new AppError("Complete all checkout steps first", 400, "INCOMPLETE_CHECKOUT");
  }

  const tour = validateTourOperational(session.tourSlug)!;
  validateSelection(tour, session.selection);

  if (options.paymentMode) session.paymentMode = options.paymentMode;
  if (options.partialAmount) session.partialAmount = options.partialAmount;

  const pricing = calculatePricing(tour, session.selection, {
    promo: session.promoCode ? getPromo(session.promoCode) : null,
    walletCredit: walletCreditForTraveler(session.travelerId, options.useWallet),
    paymentMode: session.paymentMode,
    partialAmount: session.partialAmount,
  });
  session.pricing = pricing;
  saveSession(session);

  const stripe = stripeClient();
  const amountCents = Math.round(pricing.amountDue * 100);

  if (!stripe || amountCents <= 0) {
    const attempt = createPaymentAttempt({
      sessionId,
      idempotencyKey,
      amount: pricing.amountDue,
      currency: pricing.currency,
      paymentMethod: options.paymentMethod ?? "dev",
    });
    return {
      clientSecret: null,
      paymentIntentId: attempt.id,
      amount: pricing.amountDue,
      currency: pricing.currency,
      devMode: true,
    };
  }

  const intent = await stripe.paymentIntents.create(
    {
      amount: amountCents,
      currency: pricing.currency.toLowerCase(),
      automatic_payment_methods: { enabled: true },
      metadata: {
        sessionId,
        tourSlug: session.tourSlug,
        paymentMode: session.paymentMode,
      },
    },
    { idempotencyKey },
  );

  createPaymentAttempt({
    sessionId,
    idempotencyKey,
    amount: pricing.amountDue,
    currency: pricing.currency,
    paymentMethod: options.paymentMethod ?? "card",
    stripeIntentId: intent.id,
  });

  logBookingEvent("payment_intent_created", { sessionId, intentId: intent.id });

  return {
    clientSecret: intent.client_secret,
    paymentIntentId: intent.id,
    amount: pricing.amountDue,
    currency: pricing.currency,
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? null,
  };
}

export async function confirmCheckout(
  sessionId: string,
  paymentIntentId?: string,
  devModeConfirm?: boolean,
) {
  const session = ensureActiveSession(getSession(sessionId));
  if (!session.selection || !session.travellers || !session.pricing) {
    throw new AppError("Incomplete checkout session", 400, "INCOMPLETE_CHECKOUT");
  }

  const tour = validateTourOperational(session.tourSlug)!;
  validateSelection(tour, session.selection);

  if (paymentIntentId) {
    const attempt = getPaymentAttemptByIntent(paymentIntentId) ?? getPaymentAttemptByKey(paymentIntentId);
    if (attempt?.status === "SUCCEEDED") {
      const existing = readLocalBookings().find((b) => b.sessionId === sessionId);
      if (existing) return { booking: existing, duplicate: true };
    }

    const stripe = stripeClient();
    if (stripe && attempt?.stripeIntentId) {
      const intent = await stripe.paymentIntents.retrieve(attempt.stripeIntentId);
      if (intent.status !== "succeeded") {
        throw new AppError("Payment not completed", 402, "PAYMENT_INCOMPLETE");
      }
      attempt.status = "SUCCEEDED";
      savePaymentAttempt(attempt);
    } else if (!devModeConfirm && !stripe) {
      throw new AppError("Payment verification required", 402, "PAYMENT_REQUIRED");
    } else if (attempt) {
      attempt.status = "SUCCEEDED";
      savePaymentAttempt(attempt);
    }
  } else if (!devModeConfirm) {
    throw new AppError("Payment intent required", 400, "PAYMENT_REQUIRED");
  }

  const guests = session.selection.adultCount + session.selection.childCount;
  const slot = tour.timeSlots.find((s) => s.id === session.selection!.timeSlotId)!;
  const reserved = reserveSlot(tour.slug, session.selection.travelDate, session.selection.timeSlotId, slot.capacity, guests);
  if (!reserved) throw new AppError("Slot no longer available", 409, "SLOT_FULL");

  const bookingId = randomUUID();
  const bookingNumber = newBookingNumber();
  const invoiceNumber = newInvoiceNumber();
  const voucherNumber = newVoucherNumber();
  const travelerId = session.travelerId ?? guestTravelerId(session.travellers.primary.email);

  const booking: ConfirmedBooking = {
    id: bookingId,
    bookingNumber,
    sessionId,
    tourSlug: tour.slug,
    tourTitle: tour.title,
    supplierId: tour.supplierId,
    supplierName: tour.supplierName,
    travelerId,
    travelDate: session.selection.travelDate,
    timeSlot: slot.label,
    pickupLocation: session.selection.pickupLocation,
    guestCount: guests,
    adultCount: session.selection.adultCount,
    childCount: session.selection.childCount,
    pricing: session.pricing,
    paymentMode: session.paymentMode,
    paymentStatus: session.paymentMode === "FULL" ? "PAID" : session.paymentMode === "DEPOSIT" ? "PARTIAL" : "PARTIAL",
    bookingStatus: "CONFIRMED",
    travellers: session.travellers,
    invoiceNumber,
    voucherNumber,
    qrCodeData: "",
    createdAt: new Date().toISOString(),
  };
  booking.qrCodeData = buildQrData(booking);

  saveLocalBooking(booking);
  session.status = "COMPLETED";
  session.updatedAt = new Date().toISOString();
  saveSession(session);

  appendTravellerBooking({
    id: bookingId,
    bookingNumber,
    tourName: tour.title,
    supplierName: tour.supplierName,
    travelDate: `${session.selection.travelDate}T00:00:00.000Z`,
    guestCount: guests,
    amount: session.pricing.grandTotal,
    bookingStatus: "CONFIRMED",
    paymentStatus: booking.paymentStatus,
    imageUrl: tour.heroImage,
    invoiceNumber,
    voucherNumber,
    voucherUrl: `/api/v1/voucher/${bookingId}`,
    invoiceUrl: `/api/v1/invoice/${bookingId}`,
    timeline: [
      { id: "e1", type: "CREATED", title: "Booking created", at: booking.createdAt },
      { id: "e2", type: "CONFIRMED", title: "Booking confirmed", at: booking.createdAt },
      { id: "e3", type: "VOUCHER_SENT", title: "Voucher issued", at: booking.createdAt },
    ],
    refund: null,
  });

  logBookingEvent("booking_confirmed", {
    bookingNumber,
    tour: tour.slug,
    amount: session.pricing.grandTotal,
    emails: {
      traveller: session.travellers.primary.email,
      supplier: tour.supplierName,
      admin: "bookings@myfijitour.com",
    },
  });

  return { booking, notifications: { traveller: true, supplier: true, admin: true } };
}

export function getBookingById(id: string) {
  const booking = getLocalBooking(id);
  if (!booking) throw new AppError("Booking not found", 404, "BOOKING_NOT_FOUND");
  return booking;
}

export function getInvoicePayload(id: string) {
  const booking = getBookingById(id);
  return {
    invoiceNumber: booking.invoiceNumber,
    issuedAt: booking.createdAt,
    bookingNumber: booking.bookingNumber,
    tourTitle: booking.tourTitle,
    supplierName: booking.supplierName,
    travelDate: booking.travelDate,
    timeSlot: booking.timeSlot,
    pickupLocation: booking.pickupLocation,
    primaryTraveller: booking.travellers.primary,
    pricing: booking.pricing,
    currency: booking.pricing.currency,
  };
}

export function getVoucherPayload(id: string) {
  const booking = getBookingById(id);
  return {
    voucherNumber: booking.voucherNumber,
    bookingNumber: booking.bookingNumber,
    tourTitle: booking.tourTitle,
    supplierName: booking.supplierName,
    travelDate: booking.travelDate,
    timeSlot: booking.timeSlot,
    pickupLocation: booking.pickupLocation,
    guestCount: booking.guestCount,
    travellers: booking.travellers,
    qrCodeData: booking.qrCodeData,
    issuedAt: booking.createdAt,
  };
}

export async function requestRefund(bookingId: string, reason: string, amount?: number) {
  getBookingById(bookingId);
  const refund = createRefundRequest(bookingId, reason, amount);
  logBookingEvent("refund_requested", { bookingId, refundId: refund.id });
  return refund;
}

export function getIdempotencyKey(request: Request): string {
  return request.headers.get("idempotency-key") ?? createHash("sha256").update(randomUUID()).digest("hex");
}
