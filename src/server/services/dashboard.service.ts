import { prisma } from "@/lib/db/prisma";
import type { Prisma } from "@prisma/client";

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export async function getDashboardMetrics() {
  const now = new Date();
  const today = startOfDay(now);
  const monthStart = startOfMonth(now);
  const prevMonthStart = startOfMonth(new Date(now.getFullYear(), now.getMonth() - 1, 1));
  const prevMonthEnd = monthStart;

  const [
    totalRevenueAgg,
    monthlyRevenueAgg,
    prevMonthlyRevenueAgg,
    totalBookings,
    todayBookings,
    totalUsers,
    totalSuppliers,
    activeSuppliers,
    analyticsAgg,
    prevAnalyticsAgg,
    paidBookings,
    totalVisitors,
  ] = await Promise.all([
    prisma.booking.aggregate({
      where: { paymentStatus: "PAID" },
      _sum: { amount: true },
    }),
    prisma.booking.aggregate({
      where: {
        paymentStatus: "PAID",
        bookingDate: { gte: monthStart },
      },
      _sum: { amount: true },
    }),
    prisma.booking.aggregate({
      where: {
        paymentStatus: "PAID",
        bookingDate: { gte: prevMonthStart, lt: prevMonthEnd },
      },
      _sum: { amount: true },
    }),
    prisma.booking.count(),
    prisma.booking.count({
      where: { bookingDate: { gte: today } },
    }),
    prisma.user.count({ where: { role: "TRAVELER" } }),
    prisma.supplier.count(),
    prisma.supplier.count({
      where: { verificationStatus: { in: ["APPROVED", "VERIFIED"] } },
    }),
    prisma.analyticsSnapshot.aggregate({
      where: {
        date: { gte: monthStart },
        source: "INTERNAL",
      },
      _sum: { visitors: true },
      _avg: { conversionRate: true },
    }),
    prisma.analyticsSnapshot.aggregate({
      where: {
        date: { gte: prevMonthStart, lt: prevMonthEnd },
        source: "INTERNAL",
      },
      _sum: { visitors: true },
      _avg: { conversionRate: true },
    }),
    prisma.booking.count({ where: { paymentStatus: "PAID" } }),
    prisma.analyticsSnapshot.aggregate({
      _sum: { visitors: true },
    }),
  ]);

  const totalRevenue = Number(totalRevenueAgg._sum.amount ?? 0);
  const monthlyRevenue = Number(monthlyRevenueAgg._sum.amount ?? 0);
  const prevMonthlyRevenue = Number(prevMonthlyRevenueAgg._sum.amount ?? 0);
  const websiteVisitors = Number(analyticsAgg._sum.visitors ?? totalVisitors._sum.visitors ?? 0);
  const prevVisitors = Number(prevAnalyticsAgg._sum.visitors ?? 0);
  const conversionRate = Number(analyticsAgg._avg.conversionRate ?? 0);

  const revenueChange = pctChange(monthlyRevenue, prevMonthlyRevenue);
  const visitorsChange = pctChange(websiteVisitors, prevVisitors);
  const conversionChange = 0;

  return {
    totalRevenue,
    monthlyRevenue,
    revenueChange,
    totalBookings,
    todayBookings,
    bookingsChange: 0,
    totalUsers,
    totalSuppliers,
    activeSuppliers,
    travelersChange: 0,
    websiteVisitors,
    visitorsChange,
    conversionRate,
    conversionChange,
    paidBookings,
  };
}

export async function getRevenueChart(months = 8) {
  const points: { label: string; value: number }[] = [];
  const now = new Date();

  for (let i = months - 1; i >= 0; i--) {
    const start = startOfMonth(new Date(now.getFullYear(), now.getMonth() - i, 1));
    const end = startOfMonth(new Date(now.getFullYear(), now.getMonth() - i + 1, 1));
    const agg = await prisma.booking.aggregate({
      where: {
        paymentStatus: "PAID",
        bookingDate: { gte: start, lt: end },
      },
      _sum: { amount: true },
    });
    points.push({
      label: start.toLocaleString("en", { month: "short" }),
      value: Number(agg._sum.amount ?? 0),
    });
  }

  return points;
}

export async function getBookingChart(months = 8) {
  const points: { label: string; value: number }[] = [];
  const now = new Date();

  for (let i = months - 1; i >= 0; i--) {
    const start = startOfMonth(new Date(now.getFullYear(), now.getMonth() - i, 1));
    const end = startOfMonth(new Date(now.getFullYear(), now.getMonth() - i + 1, 1));
    const count = await prisma.booking.count({
      where: { bookingDate: { gte: start, lt: end } },
    });
    points.push({
      label: start.toLocaleString("en", { month: "short" }),
      value: count,
    });
  }

  return points;
}

export async function getDestinationPerformance(limit = 6) {
  const rows = await prisma.booking.groupBy({
    by: ["tourId"],
    where: { tourId: { not: null }, paymentStatus: "PAID" },
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
    take: limit,
  });

  const tourIds = rows.map((r) => r.tourId!).filter(Boolean);
  const tours = await prisma.tour.findMany({
    where: { id: { in: tourIds } },
    include: { destination: { select: { name: true } } },
  });

  const destMap = new Map<string, number>();
  for (const row of rows) {
    const tour = tours.find((t) => t.id === row.tourId);
    if (!tour) continue;
    const name = tour.destination.name;
    destMap.set(name, (destMap.get(name) ?? 0) + row._count.id);
  }

  return [...destMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([label, value]) => ({ label, value }));
}

export async function getTourPerformance(limit = 6) {
  const rows = await prisma.booking.groupBy({
    by: ["tourId"],
    where: { tourId: { not: null } },
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
    take: limit,
  });

  const tourIds = rows.map((r) => r.tourId!).filter(Boolean);
  const tours = await prisma.tour.findMany({
    where: { id: { in: tourIds } },
    select: { id: true, title: true },
  });

  return rows.map((row) => ({
    label: tours.find((t) => t.id === row.tourId)?.title ?? "Unknown",
    value: row._count.id,
  }));
}

export async function getSupplierPerformance(limit = 6) {
  const rows = await prisma.booking.groupBy({
    by: ["supplierId"],
    where: { paymentStatus: "PAID" },
    _sum: { supplierAmount: true },
    orderBy: { _sum: { supplierAmount: "desc" } },
    take: limit,
  });

  const suppliers = await prisma.supplier.findMany({
    where: { id: { in: rows.map((r) => r.supplierId) } },
    select: { id: true, companyName: true },
  });

  return rows.map((row) => ({
    label: suppliers.find((s) => s.id === row.supplierId)?.companyName ?? "Unknown",
    value: Number(row._sum.supplierAmount ?? 0),
  }));
}

export async function getVisitorChart(days = 7) {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const snapshots = await prisma.analyticsSnapshot.findMany({
    where: { date: { gte: since }, source: "INTERNAL" },
    orderBy: { date: "asc" },
  });

  return snapshots.map((s) => ({
    label: s.date.toLocaleString("en", { weekday: "short" }),
    value: s.visitors,
  }));
}

function pctChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Number((((current - previous) / previous) * 100).toFixed(1));
}

export type BookingListFilters = {
  status?: Prisma.EnumBookingStatusFilter;
  paymentStatus?: Prisma.EnumPaymentStatusFilter;
  search?: string;
  page?: number;
  pageSize?: number;
};

export async function listBookings(filters: BookingListFilters = {}) {
  const page = filters.page ?? 1;
  const pageSize = Math.min(filters.pageSize ?? 25, 100);
  const skip = (page - 1) * pageSize;

  const where: Prisma.BookingWhereInput = {
    ...(filters.status ? { bookingStatus: filters.status } : {}),
    ...(filters.paymentStatus ? { paymentStatus: filters.paymentStatus } : {}),
    ...(filters.search
      ? {
          OR: [
            { bookingNumber: { contains: filters.search, mode: "insensitive" } },
            { traveler: { email: { contains: filters.search, mode: "insensitive" } } },
            { traveler: { firstName: { contains: filters.search, mode: "insensitive" } } },
            { traveler: { lastName: { contains: filters.search, mode: "insensitive" } } },
          ],
        }
      : {}),
  };

  const [items, total] = await Promise.all([
    prisma.booking.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { bookingDate: "desc" },
      include: {
        traveler: { select: { id: true, firstName: true, lastName: true, email: true } },
        supplier: { select: { id: true, companyName: true } },
        tour: { select: { id: true, title: true, slug: true } },
        transport: { select: { id: true, title: true, type: true } },
      },
    }),
    prisma.booking.count({ where }),
  ]);

  return { items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
}
