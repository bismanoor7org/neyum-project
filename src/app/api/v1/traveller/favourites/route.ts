import { jsonOk, travellerApiHandler } from "@/server/api/handler";
import { getTravellerFavourites } from "@/server/services/traveller-dashboard.service";

export const GET = travellerApiHandler(async ({ auth }) => {
  const favourites = await getTravellerFavourites(auth.travelerId);
  return jsonOk({ favourites });
}, "bookings:read");
