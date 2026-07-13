import type { ContentStatus } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import type { CmsDashboardStats, CmsEnterpriseDashboard } from "@/lib/cms/types";
import { isDatabaseConfigured } from "@/server/auth/local-admin-store";
import * as local from "@/server/services/cms/cms-local-store";
import { getCmsDashboardStats } from "@/server/services/cms/cms.service";
import { listActivityLogs } from "@/server/services/activity-log.service";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const PUBLISHED: ContentStatus = "PUBLISHED";
const DRAFT: ContentStatus = "DRAFT";
const SCHEDULED: ContentStatus = "SCHEDULED";

function countEnquiries(): number {
  const path = join(process.cwd(), "data", "enquiries.jsonl");
  if (!existsSync(path)) return 0;
  return readFileSync(path, "utf8").trim().split("\n").filter(Boolean).length;
}

async function seoHealth() {
  if (!isDatabaseConfigured()) {
    const seo = local.listLocal<{ metaTitle?: string; metaDescription?: string }>("seo");
    const withTitle = seo.filter((s) => s.metaTitle?.trim()).length;
    const withDesc = seo.filter((s) => s.metaDescription?.trim()).length;
    return { total: seo.length, withTitle, withDescription: withDesc, missing: Math.max(0, seo.length - withTitle) };
  }
  const [total, withTitle, withDescription] = await Promise.all([
    prisma.seoMeta.count(),
    prisma.seoMeta.count({ where: { metaTitle: { not: null } } }),
    prisma.seoMeta.count({ where: { metaDescription: { not: null } } }),
  ]);
  return { total, withTitle, withDescription, missing: Math.max(0, total - withTitle) };
}

export async function getEnterpriseCmsDashboard(): Promise<CmsEnterpriseDashboard> {
  const base = await getCmsDashboardStats();

  if (!isDatabaseConfigured()) {
    const countStatus = (store: local.StoreFile, status: ContentStatus) =>
      local.listLocal<{ status: ContentStatus }>(store).filter((i) => i.status === status).length;

    return {
      ...base,
      accommodations: local.listLocal("accommodations").length,
      deals: local.listLocal("deals").length,
      tours: local.listLocal("tours").length,
      scheduledContent: countStatus("guides", SCHEDULED) + countStatus("destinations", SCHEDULED),
      publishedDestinations: countStatus("destinations", PUBLISHED),
      draftDestinations: countStatus("destinations", DRAFT),
      newLeads: countEnquiries(),
      pendingBookings: 0,
      seoHealth: await seoHealth(),
      recentActivity: [],
      scheduledQueue: [],
    };
  }

  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [
    accommodations,
    deals,
    tours,
    scheduledDestinations,
    scheduledGuides,
    scheduledHomepage,
    publishedDestinations,
    draftDestinations,
    pendingBookings,
    newLeads,
    seo,
    recentActivity,
    scheduledSections,
    scheduledGuidesList,
    scheduledDestinationsList,
  ] = await Promise.all([
    prisma.accommodation.count(),
    prisma.deal.count(),
    prisma.tour.count({ where: { status: "APPROVED" } }),
    prisma.destination.count({ where: { status: SCHEDULED } }),
    prisma.travelGuide.count({ where: { status: SCHEDULED } }),
    prisma.homepageSection.count({ where: { status: SCHEDULED } }),
    prisma.destination.count({ where: { status: PUBLISHED } }),
    prisma.destination.count({ where: { status: DRAFT } }),
    prisma.booking.count({ where: { bookingStatus: "PENDING" } }),
    Promise.resolve(countEnquiries()),
    seoHealth(),
    listActivityLogs({ module: "CONTENT", limit: 8 }),
    prisma.homepageSection.findMany({
      where: { status: SCHEDULED },
      take: 5,
      orderBy: { sortOrder: "asc" },
      select: { id: true, key: true, title: true, status: true },
    }),
    prisma.travelGuide.findMany({
      where: { status: SCHEDULED },
      take: 5,
      select: { id: true, title: true, slug: true, status: true },
    }),
    prisma.destination.findMany({
      where: { status: SCHEDULED },
      take: 5,
      select: { id: true, name: true, slug: true, status: true },
    }),
  ]);

  const scheduledContent = scheduledDestinations + scheduledGuides + scheduledHomepage;

  const scheduledQueue = [
    ...scheduledSections.map((s) => ({
      id: s.id,
      type: "homepage" as const,
      title: s.title,
      href: `/admin/cms/homepage/${s.id}/edit`,
    })),
    ...scheduledGuidesList.map((g) => ({
      id: g.id,
      type: "guide" as const,
      title: g.title,
      href: `/admin/cms/guides/${g.id}/edit`,
    })),
    ...scheduledDestinationsList.map((d) => ({
      id: d.id,
      type: "destination" as const,
      title: d.name,
      href: `/admin/cms/destinations/${d.id}/edit`,
    })),
  ];

  return {
    ...base,
    accommodations,
    deals,
    tours,
    scheduledContent,
    publishedDestinations,
    draftDestinations,
    newLeads,
    pendingBookings,
    seoHealth: seo,
    recentActivity: recentActivity.map((a) => ({
      id: a.id,
      action: a.action,
      createdAt: a.createdAt.toISOString(),
      userName: a.user ? `${a.user.firstName} ${a.user.lastName}` : null,
    })),
    scheduledQueue,
  };
}
