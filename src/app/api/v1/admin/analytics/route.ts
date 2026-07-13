import { apiHandler, jsonOk } from "@/server/api/handler";
import {
  getBookingChart,
  getDestinationPerformance,
  getRevenueChart,
  getSupplierPerformance,
  getTourPerformance,
  getVisitorChart,
} from "@/server/services/admin-data.service";

export const GET = apiHandler(async () => {
  const [revenue, bookings, visitors, destinations, tours, suppliers] =
    await Promise.all([
      getRevenueChart(12),
      getBookingChart(12),
      getVisitorChart(30),
      getDestinationPerformance(10),
      getTourPerformance(10),
      getSupplierPerformance(10),
    ]);

  return jsonOk({
    revenue,
    bookings,
    visitors,
    destinations,
    tours,
    suppliers,
  });
}, "analytics:read");
