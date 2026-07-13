import { apiHandler, jsonOk } from "@/server/api/handler";
import {
  getBookingChart,
  getDashboardMetrics,
  getDestinationPerformance,
  getRevenueChart,
  getTourPerformance,
  getVisitorChart,
  listBookings,
  listNotifications,
  getUnreadNotificationCount,
} from "@/server/services/admin-data.service";

export const GET = apiHandler(async ({ auth }) => {
  const [metrics, revenueChart, bookingChart, visitorChart, destinations, tours, recent, notifications, unreadCount] =
    await Promise.all([
      getDashboardMetrics(),
      getRevenueChart(),
      getBookingChart(),
      getVisitorChart(),
      getDestinationPerformance(),
      getTourPerformance(),
      listBookings({ pageSize: 5 }),
      listNotifications(auth.user.id),
      getUnreadNotificationCount(auth.user.id),
    ]);

  return jsonOk({
    metrics,
    charts: {
      revenue: revenueChart,
      bookings: bookingChart,
      visitors: visitorChart,
      destinations,
      tours,
    },
    recentBookings: recent.items,
    notifications: notifications.slice(0, 5),
    unreadCount,
  });
}, "dashboard:read");
