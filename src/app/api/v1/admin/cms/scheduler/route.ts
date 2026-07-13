import { apiHandler, jsonOk, withActivity } from "@/server/api/handler";
import { runContentScheduler } from "@/server/services/cms/cms-scheduler.service";

export const POST = apiHandler(async ({ auth }) => {
  const result = await runContentScheduler();
  await withActivity(auth, "cms.scheduler.run", "CONTENT", undefined, result);
  return jsonOk(result);
}, "cms:publish");
