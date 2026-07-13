import { jsonOk, travellerApiHandler } from "@/server/api/handler";
import { getTravellerCompanions } from "@/server/services/traveller-dashboard.service";

export const GET = travellerApiHandler(async ({ auth }) => {
  const companions = await getTravellerCompanions(auth.travelerId);
  return jsonOk({ companions });
}, "settings:read");
