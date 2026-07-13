import { apiHandler, jsonOk } from "@/server/api/handler";
import { listRefunds } from "@/server/services/admin-data.service";

export const GET = apiHandler(async () => {
  const items = await listRefunds();
  return jsonOk({ items, total: items.length });
}, "bookings:refund");
