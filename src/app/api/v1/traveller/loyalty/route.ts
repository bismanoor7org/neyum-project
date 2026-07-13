import { jsonOk, travellerApiHandler } from "@/server/api/handler";
import { getTravellerLoyalty } from "@/server/services/traveller-dashboard.service";

export const GET = travellerApiHandler(async ({ auth }) => {
  const data = await getTravellerLoyalty(auth.travelerId);
  return jsonOk(data);
}, "payments:read");
