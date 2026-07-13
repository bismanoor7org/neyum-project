import { apiHandler, jsonOk, withActivity } from "@/server/api/handler";
import {
  platformSettingsSchema,
  commissionRuleSchema,
} from "@/lib/validations/admin";
import {
  getPlatformSettings,
  listCommissionRules,
  updatePlatformSettings,
} from "@/server/services/admin-data.service";
import { prisma } from "@/lib/db/prisma";

export const GET = apiHandler(async ({ request }) => {
  const url = new URL(request.url);
  const section = url.searchParams.get("section") ?? "general";

  if (section === "commission") {
    const rules = await listCommissionRules();
    const settings = await getPlatformSettings();
    return jsonOk({ rules, defaultPercentage: settings.commissionPercentage });
  }

  const settings = await getPlatformSettings();
  return jsonOk(settings);
}, "settings:read");

export const PATCH = apiHandler(async ({ request, auth }) => {
  const url = new URL(request.url);
  const section = url.searchParams.get("section") ?? "general";
  const body = await request.json();

  if (section === "commission") {
    const rule = commissionRuleSchema.parse(body);
    const created = await prisma.commissionRule.create({ data: rule });
    await withActivity(auth, "commission.rule.created", "SETTINGS", created.id);
    return jsonOk(created);
  }

  const data = platformSettingsSchema.parse(body);
  const settings = await updatePlatformSettings(data);
  await withActivity(auth, "settings.updated", "SETTINGS", "default", data);

  return jsonOk(settings);
}, "settings:write");
