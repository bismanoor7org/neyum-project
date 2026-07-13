import { jsonOk, travellerApiHandler } from "@/server/api/handler";
import { getTravellerAnalytics } from "@/server/services/traveller-dashboard.service";

export const GET = travellerApiHandler(async ({ auth }) => {
  const data = await getTravellerAnalytics(auth.travelerId);
  return jsonOk(data);
}, "analytics:read");
