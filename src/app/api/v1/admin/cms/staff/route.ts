import { apiHandler, jsonOk, withActivity } from "@/server/api/handler";
import { staffRoleSchema } from "@/lib/validations/cms";
import { listAdminStaff, upsertAdminStaffProfile } from "@/server/services/cms-data.service";

export const GET = apiHandler(async () => {
  const items = await listAdminStaff();
  return jsonOk({ items });
}, "settings:read");

export const PATCH = apiHandler(async ({ request, auth }) => {
  const body = staffRoleSchema.parse(await request.json());
  const profile = await upsertAdminStaffProfile(body.userId, body.staffRole);
  await withActivity(auth, "cms.staff_role.updated", "SETTINGS", body.userId);
  return jsonOk(profile);
}, "settings:write");
