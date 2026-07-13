/**
 * Unified admin data facade — PostgreSQL when configured, local JSON stores otherwise.
 */
import { isDatabaseConfigured } from "@/server/auth/local-admin-store";
import * as local from "@/server/services/admin-local-data.service";
import * as dashboard from "@/server/services/dashboard.service";
import * as marketplace from "@/server/services/marketplace.service";

const isDbConfigured = () => isDatabaseConfigured();

export const getDashboardMetrics = (...args: Parameters<typeof dashboard.getDashboardMetrics>) =>
  isDbConfigured() ? dashboard.getDashboardMetrics(...args) : local.getDashboardMetrics();

export const getRevenueChart = (...args: Parameters<typeof dashboard.getRevenueChart>) =>
  isDbConfigured() ? dashboard.getRevenueChart(...args) : local.getRevenueChart(...args);

export const getBookingChart = (...args: Parameters<typeof dashboard.getBookingChart>) =>
  isDbConfigured() ? dashboard.getBookingChart(...args) : local.getBookingChart(...args);

export const getDestinationPerformance = (...args: Parameters<typeof dashboard.getDestinationPerformance>) =>
  isDbConfigured() ? dashboard.getDestinationPerformance(...args) : local.getDestinationPerformance(...args);

export const getTourPerformance = (...args: Parameters<typeof dashboard.getTourPerformance>) =>
  isDbConfigured() ? dashboard.getTourPerformance(...args) : local.getTourPerformance(...args);

export const getSupplierPerformance = (...args: Parameters<typeof dashboard.getSupplierPerformance>) =>
  isDbConfigured() ? dashboard.getSupplierPerformance(...args) : local.getSupplierPerformance(...args);

export const getVisitorChart = (...args: Parameters<typeof dashboard.getVisitorChart>) =>
  isDbConfigured() ? dashboard.getVisitorChart(...args) : local.getVisitorChart(...args);

export const listBookings = (...args: Parameters<typeof dashboard.listBookings>) =>
  isDbConfigured() ? dashboard.listBookings(...args) : local.listBookings(...args);

export const getBookingById = (...args: Parameters<typeof marketplace.getBookingById>) =>
  isDbConfigured() ? marketplace.getBookingById(...args) : local.getBookingById(...args);

export const updateBooking = marketplace.updateBooking;
export const cancelBooking = marketplace.cancelBooking;
export const refundBooking = marketplace.refundBooking;

export const listSuppliers = (...args: Parameters<typeof marketplace.listSuppliers>) =>
  isDbConfigured() ? marketplace.listSuppliers(...args) : local.listSuppliers();

export const updateSupplierStatus = (...args: Parameters<typeof marketplace.updateSupplierStatus>) =>
  isDbConfigured() ? marketplace.updateSupplierStatus(...args) : local.updateSupplierStatus(...args);

export const listTours = (...args: Parameters<typeof marketplace.listTours>) =>
  isDbConfigured() ? marketplace.listTours(...args) : local.listTours();

export const updateTourStatus = marketplace.updateTourStatus;
export const deleteTour = marketplace.deleteTour;

export const listUsers = (...args: Parameters<typeof marketplace.listUsers>) =>
  isDbConfigured() ? marketplace.listUsers(...args) : local.listUsers();

export const updateUserStatus = marketplace.updateUserStatus;

export const listPayments = (...args: Parameters<typeof marketplace.listPayments>) =>
  isDbConfigured() ? marketplace.listPayments(...args) : local.listPayments();

export const listSettlements = (...args: Parameters<typeof marketplace.listSettlements>) =>
  isDbConfigured() ? marketplace.listSettlements(...args) : local.listSettlements();

export const markSettlementPaid = marketplace.markSettlementPaid;

export const getPlatformSettings = () =>
  isDbConfigured() ? marketplace.getPlatformSettings() : local.getPlatformSettings();

export const updatePlatformSettings = marketplace.updatePlatformSettings;

export const listCommissionRules = () =>
  isDbConfigured() ? marketplace.listCommissionRules() : local.listCommissionRules();

export const listReviews = (...args: Parameters<typeof marketplace.listReviews>) =>
  isDbConfigured() ? marketplace.listReviews(...args) : local.listReviews();

export const moderateReview = marketplace.moderateReview;

export const listSupportTickets = (...args: Parameters<typeof marketplace.listSupportTickets>) =>
  isDbConfigured() ? marketplace.listSupportTickets(...args) : local.listSupportTickets();

export const listTransportServices = (...args: Parameters<typeof marketplace.listTransportServices>) =>
  isDbConfigured() ? marketplace.listTransportServices(...args) : local.listTransportServices();

export const updateTransportStatus = marketplace.updateTransportStatus;

export const listNotifications = async (userId: string, limit = 50) =>
  isDbConfigured() ? marketplace.listNotifications(userId, limit) : local.listNotifications();

export const getUnreadNotificationCount = async (userId: string) =>
  isDbConfigured() ? marketplace.getUnreadNotificationCount(userId) : local.getUnreadNotificationCount();

export const listRefunds = () => local.listRefunds();

export const updateRefundStatus = local.updateRefundStatus;

export const listActivityLogs = async (options: { limit?: number; module?: import("@prisma/client").ActivityModule } = {}) => {
  if (isDbConfigured()) {
    const { listActivityLogs: dbList } = await import("@/server/services/activity-log.service");
    return dbList({ limit: options.limit ?? 50, module: options.module });
  }
  return local.readLocalActivityLogs(options.limit ?? 50);
};
