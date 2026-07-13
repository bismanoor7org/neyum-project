import { jsonOk, travellerApiHandler } from "@/server/api/handler";
import { getTravellerRecommendations } from "@/server/services/traveller-dashboard.service";

export const GET = travellerApiHandler(async ({ auth }) => {
  const recommendations = await getTravellerRecommendations(auth.travelerId);
  return jsonOk({ recommendations });
}, "dashboard:read");
