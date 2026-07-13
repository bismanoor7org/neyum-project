import type { BookingStatus, PaymentStatus, Prisma, VerificationStatus } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { NotFoundError } from "@/server/errors";

export async function getBookingById(id: string) {
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      traveler: true,
      supplier: true,
      tour: true,
      transport: true,
      payments: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!booking) throw new NotFoundError("Booking not found");
  return booking;
}

export async function updateBooking(
  id: string,
  data: Prisma.BookingUpdateInput,
) {
  await getBookingById(id);
  return prisma.booking.update({ where: { id }, data });
}

export async function cancelBooking(id: string, reason?: string) {
  return updateBooking(id, {
    bookingStatus: "CANCELLED",
    cancelledAt: new Date(),
    cancelReason: reason,
  });
}

export async function refundBooking(id: string, amount?: number) {
  const booking = await getBookingById(id);
  return updateBooking(id, {
    bookingStatus: "REFUNDED",
    paymentStatus: "REFUNDED",
    refundedAt: new Date(),
    refundAmount: amount ?? booking.amount,
  });
}

export async function listSuppliers(filters: {
  status?: VerificationStatus;
  search?: string;
  page?: number;
  pageSize?: number;
} = {}) {
  const page = filters.page ?? 1;
  const pageSize = Math.min(filters.pageSize ?? 25, 100);
  const skip = (page - 1) * pageSize;

  const where: Prisma.SupplierWhereInput = {
    ...(filters.status ? { verificationStatus: filters.status } : {}),
    ...(filters.search
      ? {
          OR: [
            { companyName: { contains: filters.search, mode: "insensitive" } },
            { user: { email: { contains: filters.search, mode: "insensitive" } } },
          ],
        }
      : {}),
  };

  const [items, total] = await Promise.all([
    prisma.supplier.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { id: true, email: true, firstName: true, lastName: true, status: true } },
        _count: { select: { tours: true, bookings: true } },
      },
    }),
    prisma.supplier.count({ where }),
  ]);

  return { items, total, page, pageSize };
}

export async function updateSupplierStatus(
  id: string,
  status: VerificationStatus,
) {
  const supplier = await prisma.supplier.findUnique({ where: { id } });
  if (!supplier) throw new NotFoundError("Supplier not found");
  return prisma.supplier.update({
    where: { id },
    data: { verificationStatus: status },
  });
}

export async function listTours(filters: {
  status?: Prisma.EnumTourStatusFilter;
  featured?: boolean;
  search?: string;
  page?: number;
  pageSize?: number;
} = {}) {
  const page = filters.page ?? 1;
  const pageSize = Math.min(filters.pageSize ?? 25, 100);
  const skip = (page - 1) * pageSize;

  const where: Prisma.TourWhereInput = {
    ...(filters.status ? { status: filters.status } : {}),
    ...(filters.featured !== undefined ? { featured: filters.featured } : {}),
    ...(filters.search
      ? {
          OR: [
            { title: { contains: filters.search, mode: "insensitive" } },
            { supplier: { companyName: { contains: filters.search, mode: "insensitive" } } },
          ],
        }
      : {}),
  };

  const [items, total] = await Promise.all([
    prisma.tour.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { updatedAt: "desc" },
      include: {
        supplier: { select: { companyName: true } },
        destination: { select: { name: true, slug: true } },
      },
    }),
    prisma.tour.count({ where }),
  ]);

  return { items, total, page, pageSize };
}

export async function updateTourStatus(
  id: string,
  data: { status?: Prisma.TourUpdateInput["status"]; featured?: boolean },
) {
  const tour = await prisma.tour.findUnique({ where: { id } });
  if (!tour) throw new NotFoundError("Tour not found");
  return prisma.tour.update({ where: { id }, data });
}

export async function deleteTour(id: string) {
  const tour = await prisma.tour.findUnique({ where: { id } });
  if (!tour) throw new NotFoundError("Tour not found");
  return prisma.tour.update({
    where: { id },
    data: { status: "ARCHIVED" },
  });
}

export async function listUsers(filters: {
  role?: Prisma.EnumUserRoleFilter;
  status?: Prisma.EnumUserStatusFilter;
  search?: string;
  page?: number;
  pageSize?: number;
} = {}) {
  const page = filters.page ?? 1;
  const pageSize = Math.min(filters.pageSize ?? 25, 100);
  const skip = (page - 1) * pageSize;

  const where: Prisma.UserWhereInput = {
    ...(filters.role ? { role: filters.role } : {}),
    ...(filters.status ? { status: filters.status } : {}),
    ...(filters.search
      ? {
          OR: [
            { email: { contains: filters.search, mode: "insensitive" } },
            { firstName: { contains: filters.search, mode: "insensitive" } },
            { lastName: { contains: filters.search, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const [items, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" },
      include: {
        supplier: { select: { id: true, companyName: true } },
        _count: { select: { bookings: true } },
      },
    }),
    prisma.user.count({ where }),
  ]);

  return { items, total, page, pageSize };
}

export async function updateUserStatus(id: string, status: Prisma.UserUpdateInput["status"]) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new NotFoundError("User not found");
  return prisma.user.update({ where: { id }, data: { status } });
}

export async function listPayments(filters: {
  status?: string;
  page?: number;
  pageSize?: number;
} = {}) {
  const page = filters.page ?? 1;
  const pageSize = Math.min(filters.pageSize ?? 25, 100);
  const skip = (page - 1) * pageSize;

  const where: Prisma.PaymentWhereInput = filters.status
    ? { status: filters.status as never }
    : {};

  const [items, total] = await Promise.all([
    prisma.payment.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" },
      include: {
        booking: {
          select: {
            bookingNumber: true,
            traveler: { select: { email: true, firstName: true, lastName: true } },
          },
        },
      },
    }),
    prisma.payment.count({ where }),
  ]);

  return { items, total, page, pageSize };
}

export async function listSettlements(supplierId?: string) {
  return prisma.settlement.findMany({
    where: supplierId ? { supplierId } : undefined,
    orderBy: { createdAt: "desc" },
    include: { supplier: { select: { companyName: true } } },
  });
}

export async function markSettlementPaid(id: string) {
  const settlement = await prisma.settlement.findUnique({ where: { id } });
  if (!settlement) throw new NotFoundError("Settlement not found");
  return prisma.settlement.update({
    where: { id },
    data: { status: "PAID", paidAt: new Date() },
  });
}

export async function getPlatformSettings() {
  return prisma.platformSettings.upsert({
    where: { id: "default" },
    create: {},
    update: {},
  });
}

export async function updatePlatformSettings(
  data: Prisma.PlatformSettingsUpdateInput,
) {
  return prisma.platformSettings.upsert({
    where: { id: "default" },
    create: {
      platformName: (data.platformName as string) ?? "My Fiji Tour",
      supportEmail: (data.supportEmail as string) ?? "concierge@myfijitour.com",
    },
    update: data,
  });
}

export async function listCommissionRules() {
  return prisma.commissionRule.findMany({
    where: { active: true },
    include: { supplier: { select: { companyName: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function listReviews(status?: Prisma.EnumReviewStatusFilter) {
  return prisma.review.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { firstName: true, lastName: true, email: true } },
      tour: { select: { title: true, slug: true } },
    },
  });
}

export async function moderateReview(
  id: string,
  status: Prisma.ReviewUpdateInput["status"],
) {
  const review = await prisma.review.findUnique({ where: { id } });
  if (!review) throw new NotFoundError("Review not found");
  return prisma.review.update({ where: { id }, data: { status } });
}

export async function listSupportTickets(status?: Prisma.EnumTicketStatusFilter) {
  return prisma.supportTicket.findMany({
    where: status ? { status } : undefined,
    orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
    include: {
      user: { select: { firstName: true, lastName: true, email: true } },
      supplier: { select: { companyName: true } },
    },
  });
}

export async function listTransportServices(filters: {
  status?: Prisma.EnumServiceStatusFilter;
  page?: number;
  pageSize?: number;
} = {}) {
  const page = filters.page ?? 1;
  const pageSize = Math.min(filters.pageSize ?? 25, 100);
  const skip = (page - 1) * pageSize;

  const where: Prisma.TransportationServiceWhereInput = filters.status
    ? { status: filters.status }
    : {};

  const [items, total] = await Promise.all([
    prisma.transportationService.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { updatedAt: "desc" },
      include: { supplier: { select: { companyName: true } } },
    }),
    prisma.transportationService.count({ where }),
  ]);

  return { items, total, page, pageSize };
}

export async function updateTransportStatus(
  id: string,
  data: { status?: Prisma.TransportationServiceUpdateInput["status"]; featured?: boolean },
) {
  const service = await prisma.transportationService.findUnique({ where: { id } });
  if (!service) throw new NotFoundError("Transport service not found");
  return prisma.transportationService.update({ where: { id }, data });
}

export async function getUnreadNotificationCount(userId: string) {
  return prisma.notification.count({ where: { userId, isRead: false } });
}

export async function listNotifications(userId: string, limit = 50) {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export type { BookingStatus, PaymentStatus, VerificationStatus };
