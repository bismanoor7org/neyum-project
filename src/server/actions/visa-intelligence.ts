"use server";

import { revalidatePath } from "next/cache";
import type { ActionResult } from "@/lib/cms/action-utils";
import { actionError, toSlug } from "@/lib/cms/action-utils";
import {
  countrySchema,
  entryGuideSchema,
  travelDocumentSchema,
  visaRuleSchema,
} from "@/lib/validations/visa-intelligence";
import { requireCmsAction } from "@/server/auth/cms-action-auth";
import {
  createCountry,
  createVisaRule,
  deleteCountry,
  deleteVisaRule,
  updateCountry,
  updateVisaRule,
  upsertEntryGuide,
  upsertTravelDocumentRequirement,
} from "@/server/services/visa-intelligence.service";

function revalidateVisaPaths(slug?: string) {
  revalidatePath("/fiji-visa-checker");
  revalidatePath("/ai-fiji-visa-assistant");
  revalidatePath("/fiji-travel-requirements");
  revalidatePath("/fiji-entry-guide");
  if (slug) {
    revalidatePath(`/fiji-visa-for-${slug}`);
    revalidatePath(`/fiji-visa-for/${slug}`);
  }
}

export async function saveCountryAction(
  input: unknown,
): Promise<ActionResult<{ id: string; slug: string }>> {
  try {
    await requireCmsAction("cms:write");
    const data = countrySchema.parse(input);
    const slug = data.slug || toSlug(data.name);

    const row = data.id
      ? await updateCountry(data.id, { ...data, slug })
      : await createCountry({ ...data, slug });

    revalidateVisaPaths(row.slug);
    return { ok: true, data: { id: row.id, slug: row.slug } };
  } catch (e) {
    return actionError(e);
  }
}

export async function deleteCountryAction(id: string): Promise<ActionResult> {
  try {
    await requireCmsAction("cms:write");
    await deleteCountry(id);
    revalidateVisaPaths();
    return { ok: true, data: undefined };
  } catch (e) {
    return actionError(e);
  }
}

export async function saveVisaRuleAction(
  input: unknown,
): Promise<ActionResult<{ id: string; slug: string }>> {
  try {
    await requireCmsAction("cms:write");
    const data = visaRuleSchema.parse(input);

    const rec = data.recommendations
      ? (data.recommendations as import("@prisma/client").Prisma.InputJsonValue)
      : undefined;

    const row = data.id
      ? await updateVisaRule(data.id, {
          nationalityId: data.nationalityId,
          destinationCountry: data.destinationCountry,
          visaType: data.visaType,
          stayDuration: data.stayDuration,
          processingTime: data.processingTime,
          entryType: data.entryType,
          entryConditions: data.entryConditions,
          notes: data.notes,
          recommendations: rec,
        })
      : await createVisaRule({
          nationalityId: data.nationalityId,
          destinationCountry: data.destinationCountry,
          visaType: data.visaType,
          stayDuration: data.stayDuration,
          processingTime: data.processingTime,
          entryType: data.entryType,
          entryConditions: data.entryConditions,
          notes: data.notes,
          recommendations: rec,
        });

    revalidateVisaPaths(row.nationality.slug);
    return { ok: true, data: { id: row.id, slug: row.nationality.slug } };
  } catch (e) {
    return actionError(e);
  }
}

export async function deleteVisaRuleAction(id: string): Promise<ActionResult> {
  try {
    await requireCmsAction("cms:write");
    const existing = await import("@/server/services/visa-intelligence.service").then((m) =>
      m.getVisaRuleById(id),
    );
    await deleteVisaRule(id);
    revalidateVisaPaths(existing?.nationality.slug);
    return { ok: true, data: undefined };
  } catch (e) {
    return actionError(e);
  }
}

export async function saveTravelDocumentAction(input: unknown): Promise<ActionResult> {
  try {
    await requireCmsAction("cms:write");
    const data = travelDocumentSchema.parse(input);
    await upsertTravelDocumentRequirement({
      ...data,
      additionalDocuments: data.additionalDocuments ?? undefined,
    });
    revalidateVisaPaths();
    return { ok: true, data: undefined };
  } catch (e) {
    return actionError(e);
  }
}

export async function saveEntryGuideAction(input: unknown): Promise<ActionResult> {
  try {
    await requireCmsAction("cms:write");
    const data = entryGuideSchema.parse(input);
    await upsertEntryGuide(data);
    revalidateVisaPaths();
    return { ok: true, data: undefined };
  } catch (e) {
    return actionError(e);
  }
}
