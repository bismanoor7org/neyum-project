import { apiHandler, jsonOk, withActivity } from "@/server/api/handler";
import { z } from "zod";
import { getSiteSettings, upsertSiteSetting } from "@/server/services/cms-wp/content.service";

export const GET = apiHandler(async () => jsonOk(await getSiteSettings()), "cms:read");

export const POST = apiHandler(async ({ request, auth }) => {
  const body = z
    .object({ key: z.string().min(1), value: z.unknown() })
    .parse(await request.json());
  const row = await upsertSiteSetting(body.key, body.value, auth.user.id);
  await withActivity(auth, "cms.settings.updated", "CONTENT", body.key);
  return jsonOk(row);
}, "cms:write");
