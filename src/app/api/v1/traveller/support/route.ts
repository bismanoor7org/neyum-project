import { jsonOk, travellerApiHandler } from "@/server/api/handler";
import { getTravellerSupport } from "@/server/services/traveller-dashboard.service";

export const GET = travellerApiHandler(async ({ auth }) => {
  const data = await getTravellerSupport(auth.travelerId);
  return jsonOk(data);
}, "support:read");
