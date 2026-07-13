import type { ContentStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { isDatabaseConfigured } from "@/server/auth/local-admin-store";
import * as local from "@/server/services/cms/cms-local-store";

const PUBLISHED: ContentStatus = "PUBLISHED";
const SCHEDULED: ContentStatus = "SCHEDULED";

export type SchedulerRunResult = {
  promoted: number;
  entities: { type: string; id: string; title: string }[];
};

/** Promote SCHEDULED content whose publishAt <= now (or all SCHEDULED when no date field). */
export async function runContentScheduler(): Promise<SchedulerRunResult> {
  const entities: SchedulerRunResult["entities"] = [];
  const now = new Date();

  if (!isDatabaseConfigured()) {
    const stores: { file: local.StoreFile; type: string; titleKey: string }[] = [
      { file: "destinations", type: "destination", titleKey: "name" },
      { file: "guides", type: "guide", titleKey: "title" },
      { file: "homepage-sections", type: "homepage", titleKey: "title" },
      { file: "deals", type: "deal", titleKey: "title" },
      { file: "accommodations", type: "accommodation", titleKey: "title" },
    ];
    let promoted = 0;
    for (const { file, type, titleKey } of stores) {
      const items = local.listLocal<{
        id: string;
        status: ContentStatus;
        publishAt?: string;
        [key: string]: unknown;
      }>(file);
      for (const item of items) {
        if (item.status !== SCHEDULED) continue;
        const publishAt = item.publishAt ? new Date(item.publishAt) : now;
        if (publishAt <= now) {
          local.updateLocal(file, item.id, { status: PUBLISHED });
          entities.push({ type, id: item.id, title: String(item[titleKey] ?? item.id) });
          promoted++;
        }
      }
    }
    if (promoted > 0) {
      revalidatePath("/");
      revalidatePath("/destinations");
      revalidatePath("/guides");
      revalidatePath("/deals-and-offers");
      revalidatePath("/places-to-stay");
    }
    return { promoted, entities };
  }

  const tables = [
    { model: "destination" as const, type: "destination", title: "name" },
    { model: "travelGuide" as const, type: "guide", title: "title" },
    { model: "homepageSection" as const, type: "homepage", title: "title" },
    { model: "deal" as const, type: "deal", title: "title" },
    { model: "accommodation" as const, type: "accommodation", title: "title" },
    { model: "faq" as const, type: "faq", title: "question" },
    { model: "testimonial" as const, type: "testimonial", title: "authorName" },
  ];

  let promoted = 0;

  for (const t of tables) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const delegate = (prisma as any)[t.model];
    const rows = await delegate.findMany({
      where: { status: SCHEDULED },
      select: { id: true, [t.title]: true, publishedAt: true },
    });
    for (const row of rows) {
      const publishAt = row.publishedAt ? new Date(row.publishedAt) : now;
      if (publishAt <= now) {
        await delegate.update({
          where: { id: row.id },
          data: { status: PUBLISHED },
        });
        entities.push({ type: t.type, id: row.id, title: row[t.title] });
        promoted++;
      }
    }
  }

  // Banner window: auto-publish if startsAt passed, archive if endsAt passed
  const banners = await prisma.banner.findMany({
    where: { OR: [{ status: SCHEDULED }, { status: PUBLISHED }] },
  });
  for (const b of banners) {
    if (b.startsAt && b.startsAt <= now && b.status === SCHEDULED) {
      await prisma.banner.update({ where: { id: b.id }, data: { status: PUBLISHED } });
      entities.push({ type: "banner", id: b.id, title: b.title });
      promoted++;
    }
    if (b.endsAt && b.endsAt <= now && b.status === PUBLISHED) {
      await prisma.banner.update({ where: { id: b.id }, data: { status: "ARCHIVED" } });
    }
  }

  if (promoted > 0) {
    revalidatePath("/");
    revalidatePath("/destinations", "layout");
    revalidatePath("/guides", "layout");
  }

  return { promoted, entities };
}
