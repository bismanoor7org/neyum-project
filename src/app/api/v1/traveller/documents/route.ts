import { jsonOk, travellerApiHandler } from "@/server/api/handler";
import { getTravellerDocuments } from "@/server/services/traveller-dashboard.service";

export const GET = travellerApiHandler(async ({ auth }) => {
  const documents = await getTravellerDocuments(auth.travelerId);
  return jsonOk({ documents });
}, "documents:read");
