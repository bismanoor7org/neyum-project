import { jsonOk, travellerApiHandler } from "@/server/api/handler";
import { getTravellerNotifications } from "@/server/services/traveller-dashboard.service";

export const GET = travellerApiHandler(async ({ auth }) => {
  const notifications = await getTravellerNotifications(auth.travelerId);
  return jsonOk({ notifications });
}, "notifications:read");
