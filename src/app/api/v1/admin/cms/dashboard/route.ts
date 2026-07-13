import { apiHandler, jsonOk } from "@/server/api/handler";
import { getEnterpriseCmsDashboard } from "@/server/services/cms/cms-dashboard.service";

export const GET = apiHandler(async () => {
  const stats = await getEnterpriseCmsDashboard();
  return jsonOk({ stats });
}, "cms:read");
