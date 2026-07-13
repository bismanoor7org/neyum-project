import { jsonOk, travellerApiHandler } from "@/server/api/handler";
import { getTravellerSecurity } from "@/server/services/traveller-dashboard.service";

export const GET = travellerApiHandler(async ({ auth }) => {
  const data = await getTravellerSecurity(auth.travelerId);
  return jsonOk(data);
}, "settings:read");
