import { apiHandler, jsonOk } from "@/server/api/handler";
import { globalCmsSearch } from "@/server/services/cms/cms-search.service";

export const GET = apiHandler(async ({ request }) => {
  const q = new URL(request.url).searchParams.get("q") ?? "";
  const results = await globalCmsSearch(q);
  return jsonOk({ results });
}, "cms:read");
