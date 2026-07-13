import { jsonOk, travellerApiHandler } from "@/server/api/handler";
import { getTravellerMessages } from "@/server/services/traveller-dashboard.service";

export const GET = travellerApiHandler(async ({ auth }) => {
  const messages = await getTravellerMessages(auth.travelerId);
  return jsonOk({ messages });
}, "messages:read");
