import { jsonOk, travellerApiHandler } from "@/server/api/handler";
import { getTravellerPayments } from "@/server/services/traveller-dashboard.service";

export const GET = travellerApiHandler(async ({ auth }) => {
  const data = await getTravellerPayments(auth.travelerId);
  return jsonOk(data);
}, "payments:read");
