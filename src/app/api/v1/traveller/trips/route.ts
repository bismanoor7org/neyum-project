import { jsonOk, travellerApiHandler } from "@/server/api/handler";
import { getTravellerTrips } from "@/server/services/traveller-dashboard.service";

export const GET = travellerApiHandler(async ({ auth }) => {
  const trips = await getTravellerTrips(auth.travelerId);
  return jsonOk({ trips });
}, "bookings:read");
