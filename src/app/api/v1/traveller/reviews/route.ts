import { jsonOk, travellerApiHandler } from "@/server/api/handler";
import { getTravellerReviews } from "@/server/services/traveller-dashboard.service";

export const GET = travellerApiHandler(async ({ auth }) => {
  const reviews = await getTravellerReviews(auth.travelerId);
  return jsonOk({ reviews });
}, "reviews:read");
