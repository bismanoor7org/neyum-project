import { jsonOk, travellerApiHandler } from "@/server/api/handler";
import { getTravellerBookings } from "@/server/services/traveller-dashboard.service";

export const GET = travellerApiHandler(async ({ request, auth }) => {
  const url = new URL(request.url);
  const filter = url.searchParams.get("filter") as "upcoming" | "completed" | "cancelled" | "all" | null;
  const data = await getTravellerBookings(auth.travelerId, filter ?? "all");
  return jsonOk({ bookings: data });
}, "bookings:read");
