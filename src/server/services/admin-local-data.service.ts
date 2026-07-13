import { existsSync, readFileSync, appendFileSync, mkdirSync } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";
import { listCheckoutTours } from "@/lib/checkout/catalog";
import { readLocalBookings, readPaymentAttempts, readRefunds } from "@/server/auth/local-checkout-store";
import { readLocalSupplier } from "@/server/auth/local-supplier-store";
import { readLocalTraveller } from "@/server/auth/local-traveller-store";
import { readTravellerSeed } from "@/server/auth/traveller-seed";
import type { BookingListFilters } from "@/server/services/dashboard.service";

const DATA_DIR = join(process.cwd(), "data");
const ACTIVITY_PATH = join(DATA_DIR, "admin-activity.jsonl");
const ENQUIRIES_PATH = join(DATA_DIR, "enquiries.jsonl");

type UnifiedBooking = {
  id: string;
  bookingNumber: string;
  travelerId: string;
  travelerName: string;
  travelerEmail: string;
  supplierId: string;
  supplierName: string;
  tourId: string | null;
  tourName: string;
  amount: number;
  bookingStatus: string;
  paymentStatus: string;
  bookingDate: string;
  travelDate: string | null;
  guestCount: number;
};

function startOfDay(d = new Date()) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function startOfWeek(d = new Date()) {
  const x = startOfDay(d);
  const day = x.getDay();
  x.setDate(x.getDate() - day);
  return x;
}

function startOfMonth(d = new Date()) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function pctChange(current: number, previous: number) {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Number((((current - previous) / previous) * 100).toFixed(1));
}

function readEnquiries(): { id: string; status: string; createdAt: string }[] {
  if (!existsSync(ENQUIRIES_PATH)) return [];
  return readFileSync(ENQUIRIES_PATH, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line) as { id: string; status: string; createdAt: string });
}

function collectBookings(): UnifiedBooking[] {
  const checkout = readLocalBookings().map((b) => ({
    id: b.id,
    bookingNumber: b.bookingNumber,
    travelerId: b.travelerId,
    travelerName: `${b.travellers.primary.firstName} ${b.travellers.primary.lastName}`,
    travelerEmail: b.travellers.primary.email,
    supplierId: b.supplierId,
    supplierName: b.supplierName,
    tourId: b.tourSlug,
    tourName: b.tourTitle,
    amount: b.pricing.grandTotal,
    bookingStatus: b.bookingStatus,
    paymentStatus: b.paymentStatus,
    bookingDate: b.createdAt,
    travelDate: b.travelDate,
    guestCount: b.guestCount,
  }));

  const seed = readTravellerSeed().bookings as {
    id: string;
    bookingNumber: string;
    tourName: string;
    supplierName: string;
    travelDate: string;
    guestCount: number;
    amount: number;
    bookingStatus: string;
    paymentStatus?: string;
  }[];

  const seedMapped = seed.map((b) => ({
    id: b.id,
    bookingNumber: b.bookingNumber,
    travelerId: "local-traveller",
    travelerName: "Demo Traveller",
    travelerEmail: readLocalTraveller()?.email ?? "demo@myfijitour.com",
    supplierId: "seed-supplier",
    supplierName: b.supplierName,
    tourId: null,
    tourName: b.tourName,
    amount: b.amount,
    bookingStatus: b.bookingStatus,
    paymentStatus: b.paymentStatus ?? "PAID",
    bookingDate: b.travelDate,
    travelDate: b.travelDate,
    guestCount: b.guestCount,
  }));

  const seen = new Set<string>();
  return [...checkout, ...seedMapped].filter((b) => {
    if (seen.has(b.bookingNumber)) return false;
    seen.add(b.bookingNumber);
    return true;
  });
}

function paidAmount(b: UnifiedBooking) {
  return b.paymentStatus === "PAID" || b.paymentStatus === "PARTIAL" ? b.amount : 0;
}

export function appendLocalActivity(entry: {
  userId?: string | null;
  action: string;
  module: string;
  entityId?: string;
  metadata?: unknown;
  ipAddress?: string;
  userAgent?: string;
}) {
  mkdirSync(DATA_DIR, { recursive: true });
  const row = { id: randomUUID(), createdAt: new Date().toISOString(), ...entry };
  appendFileSync(ACTIVITY_PATH, `${JSON.stringify(row)}\n`, "utf8");
  return row;
}

export function readLocalActivityLogs(limit = 50) {
  if (!existsSync(ACTIVITY_PATH)) return [];
  const lines = readFileSync(ACTIVITY_PATH, "utf8").split("\n").filter(Boolean);
  return lines
    .slice(-limit)
    .reverse()
    .map((line) => JSON.parse(line) as Record<string, unknown>);
}

export async function getDashboardMetrics() {
  const bookings = collectBookings();
  const now = new Date();
  const today = startOfDay(now);
  const weekStart = startOfWeek(now);
  const monthStart = startOfMonth(now);
  const prevMonthStart = startOfMonth(new Date(now.getFullYear(), now.getMonth() - 1, 1));

  const paid = bookings.filter((b) => b.paymentStatus === "PAID" || b.paymentStatus === "PARTIAL");
  const totalRevenue = paid.reduce((s, b) => s + paidAmount(b), 0);
  const revenueToday = paid
    .filter((b) => new Date(b.bookingDate) >= today)
    .reduce((s, b) => s + paidAmount(b), 0);
  const revenueWeek = paid
    .filter((b) => new Date(b.bookingDate) >= weekStart)
    .reduce((s, b) => s + paidAmount(b), 0);
  const monthlyRevenue = paid
    .filter((b) => new Date(b.bookingDate) >= monthStart)
    .reduce((s, b) => s + paidAmount(b), 0);
  const prevMonthlyRevenue = paid
    .filter((b) => {
      const d = new Date(b.bookingDate);
      return d >= prevMonthStart && d < monthStart;
    })
    .reduce((s, b) => s + paidAmount(b), 0);

  const supplier = readLocalSupplier();
  const traveller = readLocalTraveller();
  const tours = listCheckoutTours();
  const refunds = readRefunds();
  const enquiries = readEnquiries();
  const openTickets = enquiries.filter((e) => e.status === "new" || e.status === "open").length;

  return {
    totalRevenue,
    revenueToday,
    revenueWeek,
    monthlyRevenue,
    revenueChange: pctChange(monthlyRevenue, prevMonthlyRevenue),
    totalBookings: bookings.length,
    todayBookings: bookings.filter((b) => new Date(b.bookingDate) >= today).length,
    activeBookings: bookings.filter((b) => b.bookingStatus === "CONFIRMED" || b.bookingStatus === "PENDING").length,
    completedBookings: bookings.filter((b) => b.bookingStatus === "COMPLETED").length,
    cancelledBookings: bookings.filter((b) => b.bookingStatus === "CANCELLED").length,
    refundRequests: refunds.filter((r) => r.status === "REQUESTED").length,
    bookingsChange: 0,
    totalUsers: traveller ? 1 : 0,
    totalTravelers: traveller ? 1 : 0,
    totalSuppliers: supplier ? 1 : 0,
    activeSuppliers: supplier && ["APPROVED", "VERIFIED"].includes(supplier.verificationStatus) ? 1 : 0,
    pendingSuppliers: supplier?.verificationStatus === "PENDING" ? 1 : 0,
    totalTours: tours.length,
    activeTours: tours.length,
    draftTours: 0,
    supportTickets: openTickets + refunds.filter((r) => r.status === "REQUESTED").length,
    travelersChange: 0,
    websiteVisitors: enquiries.length * 12 + bookings.length * 8,
    visitorsChange: 0,
    conversionRate: bookings.length > 0 ? Number(((bookings.length / Math.max(enquiries.length, 1)) * 100).toFixed(1)) : 0,
    conversionChange: 0,
    paidBookings: paid.length,
  };
}

export async function getRevenueChart(months = 8) {
  const bookings = collectBookings().filter((b) => b.paymentStatus === "PAID" || b.paymentStatus === "PARTIAL");
  const now = new Date();
  const points: { label: string; value: number }[] = [];
  for (let i = months - 1; i >= 0; i--) {
    const start = startOfMonth(new Date(now.getFullYear(), now.getMonth() - i, 1));
    const end = startOfMonth(new Date(now.getFullYear(), now.getMonth() - i + 1, 1));
    const value = bookings
      .filter((b) => {
        const d = new Date(b.bookingDate);
        return d >= start && d < end;
      })
      .reduce((s, b) => s + paidAmount(b), 0);
    points.push({ label: start.toLocaleString("en", { month: "short" }), value });
  }
  return points;
}

export async function getBookingChart(months = 8) {
  const bookings = collectBookings();
  const now = new Date();
  const points: { label: string; value: number }[] = [];
  for (let i = months - 1; i >= 0; i--) {
    const start = startOfMonth(new Date(now.getFullYear(), now.getMonth() - i, 1));
    const end = startOfMonth(new Date(now.getFullYear(), now.getMonth() - i + 1, 1));
    const value = bookings.filter((b) => {
      const d = new Date(b.bookingDate);
      return d >= start && d < end;
    }).length;
    points.push({ label: start.toLocaleString("en", { month: "short" }), value });
  }
  return points;
}

export async function getDestinationPerformance(limit = 6) {
  const bookings = collectBookings();
  const map = new Map<string, number>();
  for (const b of bookings) {
    const loc = b.tourName.split(" ").slice(-2).join(" ") || b.tourName;
    map.set(loc, (map.get(loc) ?? 0) + 1);
  }
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([label, value]) => ({ label, value }));
}

export async function getTourPerformance(limit = 6) {
  const bookings = collectBookings();
  const map = new Map<string, number>();
  for (const b of bookings) map.set(b.tourName, (map.get(b.tourName) ?? 0) + 1);
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([label, value]) => ({ label, value }));
}

export async function getSupplierPerformance(limit = 6) {
  const bookings = collectBookings().filter((b) => b.paymentStatus === "PAID" || b.paymentStatus === "PARTIAL");
  const map = new Map<string, number>();
  for (const b of bookings) map.set(b.supplierName, (map.get(b.supplierName) ?? 0) + paidAmount(b));
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([label, value]) => ({ label, value }));
}

export async function getVisitorChart(days = 7) {
  const enquiries = readEnquiries();
  const bookings = collectBookings();
  const points: { label: string; value: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const day = startOfDay(d);
    const next = new Date(day);
    next.setDate(next.getDate() + 1);
    const eCount = enquiries.filter((e) => {
      const t = new Date(e.createdAt);
      return t >= day && t < next;
    }).length;
    const bCount = bookings.filter((b) => {
      const t = new Date(b.bookingDate);
      return t >= day && t < next;
    }).length;
    points.push({
      label: day.toLocaleString("en", { weekday: "short" }),
      value: eCount * 15 + bCount * 25,
    });
  }
  return points;
}

export async function listBookings(filters: BookingListFilters = {}) {
  let items = collectBookings();
  const q = filters.search?.toLowerCase();
  if (q) {
    items = items.filter(
      (b) =>
        b.bookingNumber.toLowerCase().includes(q) ||
        b.travelerName.toLowerCase().includes(q) ||
        b.tourName.toLowerCase().includes(q) ||
        b.supplierName.toLowerCase().includes(q),
    );
  }
  if (filters.status) {
    const status = String(filters.status).toUpperCase();
    items = items.filter((b) => b.bookingStatus === status);
  }
  if (filters.paymentStatus) {
    const ps = String(filters.paymentStatus).toUpperCase();
    items = items.filter((b) => b.paymentStatus === ps);
  }

  const page = filters.page ?? 1;
  const pageSize = Math.min(filters.pageSize ?? 25, 100);
  const total = items.length;
  const slice = items.slice((page - 1) * pageSize, page * pageSize);

  return {
    items: slice.map((b) => ({
      id: b.id,
      bookingNumber: b.bookingNumber,
      amount: b.amount,
      bookingStatus: b.bookingStatus,
      paymentStatus: b.paymentStatus,
      bookingDate: b.bookingDate,
      travelDate: b.travelDate,
      guestCount: b.guestCount,
      traveler: { id: b.travelerId, firstName: b.travelerName.split(" ")[0], lastName: b.travelerName.split(" ").slice(1).join(" "), email: b.travelerEmail },
      supplier: { id: b.supplierId, companyName: b.supplierName },
      tour: b.tourId ? { id: b.tourId, title: b.tourName, slug: b.tourId } : null,
      transport: null,
    })),
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

export async function getBookingById(id: string) {
  const b = collectBookings().find((x) => x.id === id);
  if (!b) {
    const { NotFoundError } = await import("@/server/errors");
    throw new NotFoundError("Booking not found");
  }
  const [firstName, ...rest] = b.travelerName.split(" ");
  return {
    id: b.id,
    bookingNumber: b.bookingNumber,
    amount: b.amount,
    bookingStatus: b.bookingStatus,
    paymentStatus: b.paymentStatus,
    bookingDate: b.bookingDate,
    travelDate: b.travelDate,
    guestCount: b.guestCount,
    traveler: {
      id: b.travelerId,
      firstName: firstName ?? b.travelerName,
      lastName: rest.join(" "),
      email: b.travelerEmail,
    },
    supplier: { id: b.supplierId, companyName: b.supplierName },
    tour: b.tourId ? { id: b.tourId, title: b.tourName, slug: b.tourId } : null,
    transport: null,
    payments: [],
  };
}

export async function listSuppliers() {
  const s = readLocalSupplier();
  if (!s) return { items: [], total: 0, page: 1, pageSize: 25 };
  return {
    items: [
      {
        id: s.id,
        companyName: s.companyName,
        verificationStatus: s.verificationStatus,
        kycStatus: s.kycStatus,
        rating: s.rating,
        healthScore: s.healthScore,
        createdAt: new Date().toISOString(),
        user: { id: s.userId, email: s.email, firstName: s.firstName, lastName: s.lastName, status: "ACTIVE" },
        _count: { tours: listCheckoutTours().length, bookings: collectBookings().length },
      },
    ],
    total: 1,
    page: 1,
    pageSize: 25,
  };
}

export async function listTours() {
  const tours = listCheckoutTours();
  const bookings = collectBookings();
  return {
    items: tours.map((t) => ({
      id: t.tourId,
      slug: t.slug,
      title: t.title,
      status: "ACTIVE",
      featured: false,
      basePrice: t.adultPrice,
      supplier: { id: t.supplierId, companyName: t.supplierName },
      destination: { name: t.location },
      _count: { bookings: bookings.filter((b) => b.tourName === t.title).length },
    })),
    total: tours.length,
    page: 1,
    pageSize: 25,
  };
}

export async function listUsers() {
  const t = readLocalTraveller();
  const bookings = collectBookings();
  if (!t) return { items: [], total: 0, page: 1, pageSize: 25 };
  return {
    items: [
      {
        id: t.id,
        email: t.email,
        firstName: t.firstName,
        lastName: t.lastName,
        role: "TRAVELER",
        status: "ACTIVE",
        createdAt: new Date().toISOString(),
        _count: { bookings: bookings.filter((b) => b.travelerId === t.id).length },
      },
    ],
    total: 1,
    page: 1,
    pageSize: 25,
  };
}

export async function listPayments() {
  const attempts = readPaymentAttempts();
  const bookings = collectBookings();
  return {
    items: attempts.map((a) => {
      const booking = bookings[0];
      return {
        id: a.id,
        amount: String(a.amount),
        status: a.status === "SUCCEEDED" ? "SUCCEEDED" : a.status,
        stripePaymentId: a.stripeIntentId ?? null,
        createdAt: a.createdAt,
        booking: {
          bookingNumber: booking?.bookingNumber ?? "—",
          traveler: { email: booking?.travelerEmail ?? "—" },
        },
      };
    }),
    total: attempts.length,
    page: 1,
    pageSize: 25,
  };
}

export async function listRefunds() {
  const refunds = readRefunds();
  const bookings = collectBookings();
  return refunds.map((r) => {
    const b = bookings.find((x) => x.id === r.bookingId);
    return {
      id: r.id,
      bookingId: r.bookingId,
      bookingNumber: b?.bookingNumber ?? r.bookingId,
      tourName: b?.tourName ?? "—",
      travelerName: b?.travelerName ?? "—",
      amount: r.amount,
      reason: r.reason,
      status: r.status,
      createdAt: r.createdAt,
    };
  });
}

export async function updateRefundStatus(id: string, status: "APPROVED" | "REJECTED" | "COMPLETED") {
  const { updateRefundStatus: update } = await import("@/server/auth/local-checkout-store");
  return update(id, status);
}

export async function listSupportTickets() {
  const enquiries = readEnquiries();
  return enquiries.map((e) => ({
    id: e.id,
    subject: `Enquiry ${e.id.slice(0, 8)}`,
    status: e.status === "new" ? "OPEN" : e.status.toUpperCase(),
    priority: "MEDIUM",
    type: "GENERAL",
    createdAt: e.createdAt,
  }));
}

export async function listNotifications() {
  const bookings = collectBookings().slice(0, 5);
  const refunds = readRefunds().filter((r) => r.status === "REQUESTED");
  const items = [
    ...bookings.map((b) => ({
      id: `n-bk-${b.id}`,
      title: `New booking ${b.bookingNumber}`,
      body: `${b.tourName} · ${b.travelerName}`,
      read: false,
      createdAt: b.bookingDate,
    })),
    ...refunds.map((r) => ({
      id: `n-rf-${r.id}`,
      title: "Refund request",
      body: r.reason.slice(0, 80),
      read: false,
      createdAt: r.createdAt,
    })),
  ];
  return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getUnreadNotificationCount() {
  const notes = await listNotifications();
  return notes.filter((n) => !n.read).length;
}

export async function listReviews() {
  return [];
}

export async function listSettlements() {
  const supplier = readLocalSupplier();
  if (!supplier) return [];
  const revenue = collectBookings()
    .filter((b) => b.supplierName === supplier.companyName)
    .reduce((s, b) => s + paidAmount(b) * 0.85, 0);
  return [
    {
      id: "settlement-local-1",
      supplierId: supplier.id,
      amount: revenue,
      status: "PENDING",
      periodStart: startOfMonth().toISOString(),
      periodEnd: new Date().toISOString(),
      supplier: { companyName: supplier.companyName },
    },
  ];
}

export async function getPlatformSettings() {
  return {
    commissionPercentage: 15,
    currency: "FJD",
    supportEmail: "concierge@myfijitour.com",
  };
}

export async function listCommissionRules() {
  return [{ id: "default", name: "Standard", percentage: 15, active: true }];
}

export async function updateSupplierStatus(id: string, status: string) {
  const s = readLocalSupplier();
  if (!s || s.id !== id) throw new Error("Supplier not found");
  const { writeFileSync, mkdirSync } = await import("fs");
  const updated = { ...s, verificationStatus: status as typeof s.verificationStatus };
  mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(join(DATA_DIR, "local-supplier.json"), JSON.stringify(updated, null, 2), "utf8");
  return updated;
}

export async function listTransportServices() {
  return { items: [], total: 0, page: 1, pageSize: 25 };
}
