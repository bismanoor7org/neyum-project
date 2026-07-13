import type { BookingStatus, Prisma, TourStatus } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { NotFoundError } from "@/server/errors";
import { isDatabaseConfigured, readLocalSupplier } from "@/server/auth/local-supplier-store";

function localDashboard() {
  const s = readLocalSupplier();
  return {
    metrics: {
      totalRevenue: 284500,
      monthlyRevenue: 42800,
      revenueChange: 12.4,
      totalBookings: 186,
      bookingsChange: 8.2,
      todayBookings: 4,
      pendingBookings: 7,
      activeTours: 12,
      avgRating: s?.rating ?? 4.8,
      healthScore: s?.healthScore ?? 92,
      responseRate: 96,
      cancellationRate: 2.1,
      conversionRate: 4.8,
    },
    revenueChart: [
      { label: "Jan", value: 22000 },
      { label: "Feb", value: 26500 },
      { label: "Mar", value: 31200 },
      { label: "Apr", value: 29800 },
      { label: "May", value: 35600 },
      { label: "Jun", value: 42800 },
    ],
    bookingsChart: [
      { label: "Mon", value: 3 },
      { label: "Tue", value: 5 },
      { label: "Wed", value: 4 },
      { label: "Thu", value: 8 },
      { label: "Fri", value: 12 },
      { label: "Sat", value: 18 },
      { label: "Sun", value: 14 },
    ],
    recentBookings: [
      {
        id: "bk-1",
        bookingNumber: "MFT-2026-1042",
        travelerName: "Sarah Mitchell",
        tourName: "Sunset Lagoon Cruise",
        amount: 890,
        bookingStatus: "CONFIRMED" as BookingStatus,
        travelDate: new Date().toISOString(),
      },
      {
        id: "bk-2",
        bookingNumber: "MFT-2026-1041",
        travelerName: "James Chen",
        tourName: "Village Cultural Experience",
        amount: 420,
        bookingStatus: "PENDING" as BookingStatus,
        travelDate: new Date().toISOString(),
      },
    ],
    topTours: [
      { label: "Sunset Lagoon Cruise", value: 48 },
      { label: "Island Snorkel Safari", value: 36 },
      { label: "Village Cultural Experience", value: 28 },
    ],
    performance: {
      responseRate: 96,
      cancellationRate: 2.1,
      reviewScore: 4.8,
      revenueGrowth: 12.4,
      customerSatisfaction: 94,
    },
  };
}

export async function getSupplierDashboard(supplierId: string) {
  if (!isDatabaseConfigured()) return localDashboard();

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [
    totalRevenue,
    monthlyRevenue,
    totalBookings,
    todayBookings,
    pendingBookings,
    activeTours,
    supplier,
    recentBookings,
    tourStats,
  ] = await Promise.all([
    prisma.booking.aggregate({
      where: { supplierId, bookingStatus: { in: ["CONFIRMED", "COMPLETED"] } },
      _sum: { supplierAmount: true },
    }),
    prisma.booking.aggregate({
      where: {
        supplierId,
        bookingStatus: { in: ["CONFIRMED", "COMPLETED"] },
        bookingDate: { gte: monthStart },
      },
      _sum: { supplierAmount: true },
    }),
    prisma.booking.count({ where: { supplierId } }),
    prisma.booking.count({
      where: { supplierId, bookingDate: { gte: todayStart } },
    }),
    prisma.booking.count({
      where: { supplierId, bookingStatus: "PENDING" },
    }),
    prisma.tour.count({
      where: { supplierId, status: { in: ["APPROVED", "PENDING"] } },
    }),
    prisma.supplier.findUnique({
      where: { id: supplierId },
      select: { rating: true, healthScore: true, responseRate: true, cancellationRate: true },
    }),
    prisma.booking.findMany({
      where: { supplierId },
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        traveler: { select: { firstName: true, lastName: true } },
        tour: { select: { title: true } },
      },
    }),
    prisma.tour.findMany({
      where: { supplierId },
      select: { title: true, _count: { select: { bookings: true } } },
      orderBy: { bookings: { _count: "desc" } },
      take: 5,
    }),
  ]);

  const revenueVal = Number(totalRevenue._sum.supplierAmount ?? 0);
  const monthlyVal = Number(monthlyRevenue._sum.supplierAmount ?? 0);

  return {
    metrics: {
      totalRevenue: revenueVal,
      monthlyRevenue: monthlyVal,
      revenueChange: 0,
      totalBookings,
      bookingsChange: 0,
      todayBookings,
      pendingBookings,
      activeTours,
      avgRating: Number(supplier?.rating ?? 0),
      healthScore: Number(supplier?.healthScore ?? 0),
      responseRate: Number(supplier?.responseRate ?? 0),
      cancellationRate: Number(supplier?.cancellationRate ?? 0),
      conversionRate: 0,
    },
    revenueChart: [],
    bookingsChart: [],
    recentBookings: recentBookings.map((b) => ({
      id: b.id,
      bookingNumber: b.bookingNumber,
      travelerName: `${b.traveler.firstName} ${b.traveler.lastName}`,
      tourName: b.tour?.title ?? "Transport",
      amount: Number(b.supplierAmount),
      bookingStatus: b.bookingStatus,
      travelDate: b.travelDate?.toISOString() ?? null,
    })),
    topTours: tourStats.map((t) => ({
      label: t.title,
      value: t._count.bookings,
    })),
    performance: {
      responseRate: Number(supplier?.responseRate ?? 0),
      cancellationRate: Number(supplier?.cancellationRate ?? 0),
      reviewScore: Number(supplier?.rating ?? 0),
      revenueGrowth: 0,
      customerSatisfaction: 0,
    },
  };
}

export async function listSupplierBookings(
  supplierId: string,
  filters: { status?: BookingStatus; search?: string; page?: number; pageSize?: number } = {},
) {
  if (!isDatabaseConfigured()) {
    const data = localDashboard();
    return { items: data.recentBookings, total: data.recentBookings.length, page: 1, pageSize: 25 };
  }

  const page = filters.page ?? 1;
  const pageSize = Math.min(filters.pageSize ?? 25, 100);
  const skip = (page - 1) * pageSize;

  const where: Prisma.BookingWhereInput = {
    supplierId,
    ...(filters.status ? { bookingStatus: filters.status } : {}),
    ...(filters.search
      ? {
          OR: [
            { bookingNumber: { contains: filters.search, mode: "insensitive" } },
            { traveler: { email: { contains: filters.search, mode: "insensitive" } } },
          ],
        }
      : {}),
  };

  const [items, total] = await Promise.all([
    prisma.booking.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" },
      include: {
        traveler: { select: { firstName: true, lastName: true, email: true } },
        tour: { select: { title: true } },
      },
    }),
    prisma.booking.count({ where }),
  ]);

  return { items, total, page, pageSize };
}

export async function listSupplierTours(
  supplierId: string,
  filters: { status?: TourStatus; search?: string; page?: number; pageSize?: number } = {},
) {
  if (!isDatabaseConfigured()) {
    return {
      items: [
        { id: "t1", title: "Sunset Lagoon Cruise", status: "APPROVED", price: 890, reviewCount: 42 },
        { id: "t2", title: "Island Snorkel Safari", status: "APPROVED", price: 650, reviewCount: 28 },
        { id: "t3", title: "Village Cultural Experience", status: "DRAFT", price: 420, reviewCount: 0 },
      ],
      total: 3,
      page: 1,
      pageSize: 25,
    };
  }

  const page = filters.page ?? 1;
  const pageSize = Math.min(filters.pageSize ?? 25, 100);
  const skip = (page - 1) * pageSize;

  const where: Prisma.TourWhereInput = {
    supplierId,
    ...(filters.status ? { status: filters.status } : {}),
    ...(filters.search
      ? { title: { contains: filters.search, mode: "insensitive" } }
      : {}),
  };

  const [items, total] = await Promise.all([
    prisma.tour.findMany({ where, skip, take: pageSize, orderBy: { updatedAt: "desc" } }),
    prisma.tour.count({ where }),
  ]);

  return { items, total, page, pageSize };
}

export async function getSupplierBooking(supplierId: string, bookingId: string) {
  const booking = await prisma.booking.findFirst({
    where: { id: bookingId, supplierId },
    include: {
      traveler: true,
      tour: true,
      transport: true,
      payments: true,
    },
  });
  if (!booking) throw new NotFoundError("Booking not found");
  return booking;
}

export async function listSupplierSettlements(supplierId: string) {
  if (!isDatabaseConfigured()) {
    return {
      items: [
        {
          id: "set-1",
          invoiceNumber: "INV-2026-03",
          amount: 12400,
          status: "PAID",
          periodStart: new Date("2026-03-01"),
          periodEnd: new Date("2026-03-31"),
        },
      ],
      total: 1,
    };
  }

  const items = await prisma.settlement.findMany({
    where: { supplierId },
    orderBy: { periodEnd: "desc" },
    take: 50,
  });
  return { items, total: items.length };
}

export async function listSupplierReviews(supplierId: string) {
  if (!isDatabaseConfigured()) {
    return {
      items: [
        { id: "r1", rating: 5, review: "Exceptional experience!", tourTitle: "Sunset Lagoon Cruise", status: "APPROVED" },
      ],
      total: 1,
    };
  }

  const items = await prisma.review.findMany({
    where: { tour: { supplierId } },
    include: { tour: { select: { title: true } }, user: { select: { firstName: true, lastName: true } } },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return { items, total: items.length };
}

export async function getSupplierProfile(supplierId: string) {
  if (!isDatabaseConfigured()) {
    const s = readLocalSupplier();
    if (!s) throw new NotFoundError("Supplier not found");
    return s;
  }

  const supplier = await prisma.supplier.findUnique({
    where: { id: supplierId },
    include: {
      user: { select: { email: true, firstName: true, lastName: true, phone: true } },
      notificationPreference: true,
      _count: { select: { tours: true, bookings: true, teamMembers: true, documents: true } },
    },
  });
  if (!supplier) throw new NotFoundError("Supplier not found");
  return supplier;
}
