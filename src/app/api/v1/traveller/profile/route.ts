import { jsonOk, travellerApiHandler } from "@/server/api/handler";
import { getTravellerProfile } from "@/server/services/traveller-dashboard.service";

export const GET = travellerApiHandler(async ({ auth }) => {
  const profile = await getTravellerProfile(auth.travelerId);
  return jsonOk(profile);
}, "settings:read");
