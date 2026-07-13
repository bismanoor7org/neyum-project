import { jsonOk, travellerApiHandler } from "@/server/api/handler";
import { getTravellerWishlist } from "@/server/services/traveller-dashboard.service";

export const GET = travellerApiHandler(async ({ auth }) => {
  const items = await getTravellerWishlist(auth.travelerId);
  return jsonOk({ items });
}, "bookings:read");
