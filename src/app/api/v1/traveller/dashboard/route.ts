import { jsonOk, travellerApiHandler } from "@/server/api/handler";
import { getTravellerDashboard } from "@/server/services/traveller-dashboard.service";

export const GET = travellerApiHandler(async ({ auth }) => {
  const data = await getTravellerDashboard(auth.travelerId);
  return jsonOk(data);
}, "dashboard:read");
