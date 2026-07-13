import type { BookingStatus } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { readLocalTraveller, isTravellerDatabaseConfigured } from "@/server/auth/local-traveller-store";
import { readTravellerSeed } from "@/server/auth/traveller-seed";

function localDashboard() {
  const seed = readTravellerSeed();
  const t = readLocalTraveller();
  const dash = { ...seed.dashboard } as {
    metrics: Record<string, number | string>;
    upcomingTrips: unknown[];
    recentActivity: unknown[];
    recommendations: unknown[];
    personalizedOffers: unknown[];
    savedSearches: unknown[];
    quickActions: unknown[];
    travelStatus: Record<string, unknown>;
    spendingChart: { label: string; value: number }[];
    tripsChart: { label: string; value: number }[];
  };
  if (t) {
    dash.metrics.loyaltyPoints = t.loyaltyPoints;
    dash.metrics.loyaltyTier = t.loyaltyTier;
    dash.metrics.walletBalance = t.walletBalance;
  }
  return dash;
}

export async function getTravellerDashboard(travelerId: string) {
  if (!isTravellerDatabaseConfigured()) return localDashboard();

  const now = new Date();
  const [
    upcomingTrips,
    activeBookings,
    wishlistCount,
    loyalty,
    wallet,
    unreadMessages,
    unreadNotifications,
    completedTours,
    totalSpent,
    recentBookings,
    recentNotifications,
  ] = await Promise.all([
    prisma.booking.findMany({
      where: {
        travelerId,
        bookingStatus: { in: ["CONFIRMED", "PENDING"] },
        travelDate: { gte: now },
      },
      take: 5,
      orderBy: { travelDate: "asc" },
      include: {
        tour: { select: { title: true, featuredImage: true } },
        supplier: { select: { companyName: true } },
      },
    }),
    prisma.booking.count({
      where: { travelerId, bookingStatus: { in: ["CONFIRMED", "PENDING"] } },
    }),
    prisma.wishlistItem.count({ where: { userId: travelerId } }),
    prisma.loyaltyAccount.findUnique({ where: { userId: travelerId } }),
    prisma.travellerWallet.findUnique({ where: { userId: travelerId } }),
    prisma.travellerMessage.count({ where: { userId: travelerId, isRead: false } }),
    prisma.notification.count({ where: { userId: travelerId, isRead: false } }),
    prisma.booking.count({ where: { travelerId, bookingStatus: "COMPLETED" } }),
    prisma.booking.aggregate({
      where: { travelerId, bookingStatus: { in: ["CONFIRMED", "COMPLETED"] } },
      _sum: { amount: true },
    }),
    prisma.booking.findMany({
      where: { travelerId },
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { tour: { select: { title: true } } },
    }),
    prisma.notification.findMany({
      where: { userId: travelerId },
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return {
    metrics: {
      upcomingTrips: upcomingTrips.length,
      activeBookings,
      wishlistCount,
      loyaltyPoints: loyalty?.points ?? 0,
      loyaltyTier: loyalty?.tier ?? "EXPLORER",
      walletBalance: Number(wallet?.balance ?? 0),
      unreadMessages,
      unreadNotifications,
      countriesVisited: 1,
      toursCompleted: completedTours,
      totalSpent: Number(totalSpent._sum.amount ?? 0),
    },
    upcomingTrips: upcomingTrips.map((b) => ({
      id: b.id,
      bookingNumber: b.bookingNumber,
      tourName: b.tour?.title ?? "Experience",
      supplierName: b.supplier?.companyName ?? "Partner",
      travelDate: b.travelDate?.toISOString() ?? null,
      guestCount: b.guestCount,
      amount: Number(b.amount),
      bookingStatus: b.bookingStatus,
      imageUrl: b.tour?.featuredImage ?? null,
    })),
    recentActivity: recentBookings.map((b) => ({
      id: b.id,
      type: "booking",
      title: `Booking ${b.bookingStatus.toLowerCase()}`,
      detail: `${b.tour?.title ?? "Experience"} · ${b.bookingNumber}`,
      at: b.createdAt.toISOString(),
    })),
    recommendations: [],
    personalizedOffers: [],
    savedSearches: [],
    quickActions: localDashboard().quickActions,
    travelStatus: {
      nextDeparture: upcomingTrips[0]?.travelDate?.toISOString() ?? null,
      documentsExpiring: 0,
      pendingRefunds: 0,
      openSupportTickets: 0,
    },
    spendingChart: [],
    tripsChart: [],
    recentNotifications: recentNotifications.map((n) => ({
      id: n.id,
      title: n.title,
      message: n.message,
      type: n.type,
      isRead: n.isRead,
      at: n.createdAt.toISOString(),
    })),
  };
}

export async function getTravellerBookings(
  travelerId: string,
  filter?: "upcoming" | "completed" | "cancelled" | "all",
) {
  if (!isTravellerDatabaseConfigured()) {
    const all = readTravellerSeed().bookings as Array<{ bookingStatus: string }>;
    if (filter === "upcoming") return all.filter((b) => ["CONFIRMED", "PENDING"].includes(b.bookingStatus));
    if (filter === "completed") return all.filter((b) => b.bookingStatus === "COMPLETED");
    if (filter === "cancelled") return all.filter((b) => ["CANCELLED", "REFUNDED"].includes(b.bookingStatus));
    return all;
  }

  const statusFilter =
    filter === "upcoming"
      ? { in: ["CONFIRMED" as const, "PENDING" as const] }
      : filter === "completed"
        ? "COMPLETED" as const
        : filter === "cancelled"
          ? { in: ["CANCELLED" as const, "REFUNDED" as const] }
          : undefined;

  const bookings = await prisma.booking.findMany({
    where: {
      travelerId,
      ...(statusFilter ? { bookingStatus: statusFilter } : {}),
    },
    orderBy: { createdAt: "desc" },
    include: {
      tour: { select: { title: true, featuredImage: true } },
      supplier: { select: { companyName: true } },
      timelineEvents: { orderBy: { occurredAt: "asc" }, take: 10 },
      refunds: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });

  return bookings.map((b) => ({
    id: b.id,
    bookingNumber: b.bookingNumber,
    tourName: b.tour?.title ?? "Experience",
    supplierName: b.supplier.companyName,
    travelDate: b.travelDate?.toISOString() ?? null,
    guestCount: b.guestCount,
    amount: Number(b.amount),
    bookingStatus: b.bookingStatus,
    paymentStatus: b.paymentStatus,
    imageUrl: b.tour?.featuredImage ?? null,
    timeline: b.timelineEvents.map((e) => ({
      id: e.id,
      type: e.eventType,
      title: e.title,
      description: e.description,
      at: e.occurredAt.toISOString(),
    })),
    refund: b.refunds[0]
      ? {
          id: b.refunds[0].id,
          status: b.refunds[0].status,
          amount: Number(b.refunds[0].amount),
        }
      : null,
  }));
}

export async function getTravellerWishlist(travelerId: string) {
  if (!isTravellerDatabaseConfigured()) return readTravellerSeed().wishlist;
  const items = await prisma.wishlistItem.findMany({
    where: { userId: travelerId },
    orderBy: { createdAt: "desc" },
    include: { collection: { select: { name: true } } },
  });
  return items.map((i) => ({
    id: i.id,
    itemType: i.itemType,
    title: i.title,
    priceSnapshot: i.priceSnapshot ? Number(i.priceSnapshot) : null,
    currency: i.currency,
    imageUrl: i.imageUrl,
    collection: i.collection?.name ?? null,
  }));
}

export async function getTravellerMessages(travelerId: string) {
  if (!isTravellerDatabaseConfigured()) return readTravellerSeed().messages;
  const messages = await prisma.travellerMessage.findMany({
    where: { userId: travelerId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return messages.map((m) => ({
    id: m.id,
    channel: m.channel,
    subject: m.subject,
    body: m.body,
    isRead: m.isRead,
    createdAt: m.createdAt.toISOString(),
  }));
}

export async function getTravellerProfile(travelerId: string) {
  if (!isTravellerDatabaseConfigured()) {
    const t = readLocalTraveller();
    return {
      user: { firstName: t?.firstName, lastName: t?.lastName, email: t?.email, phone: null, avatar: null },
      profile: {
        nationality: "Australia",
        dietaryPreferences: ["Vegetarian"],
        accessibilityNeeds: [],
        languagePreferences: ["en"],
        emergencyName: "Jane Explorer",
        emergencyPhone: "+61 400 000 000",
      },
    };
  }
  const user = await prisma.user.findUnique({
    where: { id: travelerId },
    include: { travellerProfile: true },
  });
  if (!user) return null;
  return {
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
    },
    profile: user.travellerProfile,
  };
}

export async function getTravellerAnalytics(travelerId: string) {
  if (!isTravellerDatabaseConfigured()) {
    return {
      countriesVisited: 3,
      citiesVisited: 8,
      toursCompleted: 8,
      totalSpent: 12450,
      travelFrequency: "3 trips/year",
      timeline: [
        { year: 2023, trips: 2, spent: 3200 },
        { year: 2024, trips: 3, spent: 4100 },
        { year: 2025, trips: 2, spent: 2800 },
        { year: 2026, trips: 1, spent: 2350 },
      ],
    };
  }
  const [completed, spent] = await Promise.all([
    prisma.booking.count({ where: { travelerId, bookingStatus: "COMPLETED" } }),
    prisma.booking.aggregate({
      where: { travelerId, bookingStatus: { in: ["CONFIRMED", "COMPLETED"] } },
      _sum: { amount: true },
    }),
  ]);
  return {
    countriesVisited: 1,
    citiesVisited: 4,
    toursCompleted: completed,
    totalSpent: Number(spent._sum.amount ?? 0),
    travelFrequency: completed > 0 ? `${Math.ceil(completed / 2)} trips/year` : "—",
    timeline: [],
  };
}

export async function getTravellerRecommendations(travelerId: string) {
  const dash = await getTravellerDashboard(travelerId);
  return dash.recommendations;
}

export async function getTravellerLoyalty(_travelerId: string) {
  if (!isTravellerDatabaseConfigured()) return readTravellerSeed().loyalty;
  const account = await prisma.loyaltyAccount.findUnique({
    where: { userId: _travelerId },
    include: { transactions: { orderBy: { createdAt: "desc" }, take: 20 } },
  });
  if (!account) return { points: 0, tier: "EXPLORER", transactions: [] };
  return {
    points: account.points,
    lifetimePoints: account.lifetimePoints,
    tier: account.tier,
    referralCode: account.referralCode,
    transactions: account.transactions.map((t) => ({
      id: t.id,
      type: t.type,
      points: t.points,
      description: t.description,
      at: t.createdAt.toISOString(),
    })),
  };
}

export async function getTravellerNotifications(travelerId: string) {
  if (!isTravellerDatabaseConfigured()) return readTravellerSeed().notifications;
  const rows = await prisma.notification.findMany({
    where: { userId: travelerId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return rows.map((n) => ({
    id: n.id,
    title: n.title,
    message: n.message,
    type: n.type,
    isRead: n.isRead,
    at: n.createdAt.toISOString(),
  }));
}

export async function getTravellerTrips(_travelerId: string) {
  if (!isTravellerDatabaseConfigured()) return readTravellerSeed().trips;
  const rows = await prisma.travellerItinerary.findMany({
    where: { userId: _travelerId },
    include: { days: { orderBy: { dayNumber: "asc" } } },
    orderBy: { updatedAt: "desc" },
  });
  return rows;
}

export async function getTravellerPayments(_travelerId: string) {
  if (!isTravellerDatabaseConfigured()) return readTravellerSeed().payments;
  const [wallet, methods, invoices] = await Promise.all([
    prisma.travellerWallet.findUnique({ where: { userId: _travelerId } }),
    prisma.travellerPaymentMethod.findMany({ where: { userId: _travelerId } }),
    prisma.travellerInvoice.findMany({ where: { userId: _travelerId }, orderBy: { issuedAt: "desc" }, take: 20 }),
  ]);
  return { walletBalance: Number(wallet?.balance ?? 0), currency: wallet?.currency ?? "FJD", methods, invoices };
}

export async function getTravellerDocuments(travelerId: string) {
  if (!isTravellerDatabaseConfigured()) return readTravellerSeed().documents;
  return prisma.travelDocument.findMany({
    where: { userId: travelerId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getTravellerFavourites(travelerId: string) {
  if (!isTravellerDatabaseConfigured()) return readTravellerSeed().favourites;
  return prisma.favourite.findMany({
    where: { userId: travelerId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getTravellerSupport(_travelerId: string) {
  if (!isTravellerDatabaseConfigured()) return readTravellerSeed().support;
  const tickets = await prisma.supportTicket.findMany({
    where: { userId: _travelerId },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  return { tickets, liveChatAvailable: true };
}

export async function getTravellerSecurity(_travelerId: string) {
  if (!isTravellerDatabaseConfigured()) return readTravellerSeed().security;
  const [user, sessions] = await Promise.all([
    prisma.user.findUnique({ where: { id: _travelerId }, select: { twoFactorEnabled: true } }),
    prisma.loginSession.findMany({
      where: { userId: _travelerId, revokedAt: null },
      orderBy: { lastActive: "desc" },
      take: 10,
    }),
  ]);
  return { twoFactorEnabled: user?.twoFactorEnabled ?? false, sessions };
}

export async function getTravellerReviews(travelerId: string) {
  if (!isTravellerDatabaseConfigured()) return readTravellerSeed().reviews;
  const rows = await prisma.review.findMany({
    where: { userId: travelerId },
    include: { tour: { select: { title: true } } },
    orderBy: { createdAt: "desc" },
  });
  return rows.map((r) => ({
    id: r.id,
    tourName: r.tour.title,
    rating: r.rating,
    review: r.review,
    status: r.status,
    createdAt: r.createdAt.toISOString(),
  }));
}

export async function getTravellerCompanions(travelerId: string) {
  if (!isTravellerDatabaseConfigured()) return readTravellerSeed().companions;
  return prisma.travelCompanion.findMany({
    where: { userId: travelerId },
    orderBy: { createdAt: "desc" },
  });
}
