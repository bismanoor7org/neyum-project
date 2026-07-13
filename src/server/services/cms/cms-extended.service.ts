import type {
  AdminStaffRole,
  CmsEntityType,
  ContentStatus,
  DealCategory,
  NavigationLocation,
  Prisma,
} from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import type { CmsListResult, SeoPayload } from "@/lib/cms/types";
import { isDatabaseConfigured } from "@/server/auth/local-admin-store";
import * as local from "@/server/services/cms/cms-local-store";

type ListOptions = {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: ContentStatus;
  category?: DealCategory;
  location?: NavigationLocation;
  parentKey?: string;
};

function paginate<T>(items: T[], page: number, pageSize: number): CmsListResult<T> {
  const { items: slice, total } = local.paginateLocal(items, page, pageSize);
  return { items: slice, total, page, pageSize };
}

// ── Banners (extended) ──────────────────────────────────────────────────────

export async function getBannerCms(id: string) {
  if (!isDatabaseConfigured()) return local.getLocal("banners", id);
  return prisma.banner.findUnique({ where: { id } });
}

export async function deleteBannerCms(id: string) {
  if (!isDatabaseConfigured()) return local.deleteLocal("banners", id);
  await prisma.banner.delete({ where: { id } });
  return true;
}

// ── Accommodations ──────────────────────────────────────────────────────────

export async function listAccommodationsCms(options: ListOptions = {}) {
  const page = options.page ?? 1;
  const pageSize = options.pageSize ?? 25;
  if (!isDatabaseConfigured()) {
    let items = local.listLocal<{
      id: string;
      title: string;
      slug: string;
      status: ContentStatus;
      featured: boolean;
      updatedAt: string;
    }>("accommodations");
    if (options.status) items = items.filter((i) => i.status === options.status);
    if (options.search) {
      const q = options.search.toLowerCase();
      items = items.filter((i) => i.title.toLowerCase().includes(q) || i.slug.includes(q));
    }
    return paginate(items, page, pageSize);
  }
  const where: Prisma.AccommodationWhereInput = {
    ...(options.status ? { status: options.status } : {}),
    ...(options.search
      ? {
          OR: [
            { title: { contains: options.search, mode: "insensitive" } },
            { slug: { contains: options.search } },
          ],
        }
      : {}),
  };
  const [items, total] = await Promise.all([
    prisma.accommodation.findMany({
      where,
      orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.accommodation.count({ where }),
  ]);
  return { items, total, page, pageSize };
}

export async function getAccommodationCms(id: string) {
  if (!isDatabaseConfigured()) return local.getLocal("accommodations", id);
  return prisma.accommodation.findUnique({ where: { id } });
}

export async function createAccommodationCms(data: Prisma.AccommodationCreateInput) {
  if (!isDatabaseConfigured()) return local.createLocal("accommodations", data);
  return prisma.accommodation.create({ data });
}

export async function updateAccommodationCms(id: string, data: Prisma.AccommodationUpdateInput) {
  if (!isDatabaseConfigured()) return local.updateLocal("accommodations", id, data as object);
  return prisma.accommodation.update({ where: { id }, data });
}

export async function deleteAccommodationCms(id: string) {
  if (!isDatabaseConfigured()) return local.deleteLocal("accommodations", id);
  await prisma.accommodation.delete({ where: { id } });
  return true;
}

// ── Deals ───────────────────────────────────────────────────────────────────

export async function listDealsCms(options: ListOptions = {}) {
  const page = options.page ?? 1;
  const pageSize = options.pageSize ?? 25;
  if (!isDatabaseConfigured()) {
    let items = local.listLocal<{
      id: string;
      title: string;
      slug: string;
      status: ContentStatus;
      featured: boolean;
      category: DealCategory;
      updatedAt: string;
    }>("deals");
    if (options.status) items = items.filter((i) => i.status === options.status);
    if (options.category) items = items.filter((i) => i.category === options.category);
    if (options.search) {
      const q = options.search.toLowerCase();
      items = items.filter((i) => i.title.toLowerCase().includes(q));
    }
    return paginate(items, page, pageSize);
  }
  const where: Prisma.DealWhereInput = {
    ...(options.status ? { status: options.status } : {}),
    ...(options.category ? { category: options.category } : {}),
    ...(options.search ? { title: { contains: options.search, mode: "insensitive" } } : {}),
  };
  const [items, total] = await Promise.all([
    prisma.deal.findMany({
      where,
      orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.deal.count({ where }),
  ]);
  return { items, total, page, pageSize };
}

export async function getDealCms(id: string) {
  if (!isDatabaseConfigured()) return local.getLocal("deals", id);
  return prisma.deal.findUnique({ where: { id } });
}

export async function createDealCms(data: Prisma.DealCreateInput) {
  if (!isDatabaseConfigured()) return local.createLocal("deals", data);
  return prisma.deal.create({ data });
}

export async function updateDealCms(id: string, data: Prisma.DealUpdateInput) {
  if (!isDatabaseConfigured()) return local.updateLocal("deals", id, data as object);
  return prisma.deal.update({ where: { id }, data });
}

export async function deleteDealCms(id: string) {
  if (!isDatabaseConfigured()) return local.deleteLocal("deals", id);
  await prisma.deal.delete({ where: { id } });
  return true;
}

// ── Navigation ──────────────────────────────────────────────────────────────

export async function listNavigationCms(options: ListOptions = {}) {
  const page = options.page ?? 1;
  const pageSize = options.pageSize ?? 100;
  if (!isDatabaseConfigured()) {
    let items = local.listLocal<{
      id: string;
      label: string;
      href: string;
      location: NavigationLocation;
      parentKey: string | null;
      sortOrder: number;
      status: ContentStatus;
      updatedAt: string;
    }>("navigation");
    if (options.status) items = items.filter((i) => i.status === options.status);
    if (options.location) items = items.filter((i) => i.location === options.location);
    if (options.parentKey !== undefined) {
      items = items.filter((i) => (i.parentKey ?? null) === (options.parentKey ?? null));
    }
    return paginate(items, page, pageSize);
  }
  const where: Prisma.NavigationItemWhereInput = {
    ...(options.status ? { status: options.status } : {}),
    ...(options.location ? { location: options.location } : {}),
    ...(options.parentKey !== undefined ? { parentKey: options.parentKey } : {}),
  };
  const [items, total] = await Promise.all([
    prisma.navigationItem.findMany({
      where,
      orderBy: [{ sortOrder: "asc" }, { label: "asc" }],
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.navigationItem.count({ where }),
  ]);
  return { items, total, page, pageSize };
}

export async function getNavigationItemCms(id: string) {
  if (!isDatabaseConfigured()) return local.getLocal("navigation", id);
  return prisma.navigationItem.findUnique({ where: { id } });
}

export async function createNavigationItemCms(data: Prisma.NavigationItemCreateInput) {
  if (!isDatabaseConfigured()) return local.createLocal("navigation", data);
  return prisma.navigationItem.create({ data });
}

export async function updateNavigationItemCms(id: string, data: Prisma.NavigationItemUpdateInput) {
  if (!isDatabaseConfigured()) return local.updateLocal("navigation", id, data as object);
  return prisma.navigationItem.update({ where: { id }, data });
}

export async function deleteNavigationItemCms(id: string) {
  if (!isDatabaseConfigured()) return local.deleteLocal("navigation", id);
  await prisma.navigationItem.delete({ where: { id } });
  return true;
}

export async function reorderNavigationItems(
  updates: { id: string; sortOrder: number }[],
) {
  if (!isDatabaseConfigured()) {
    for (const u of updates) {
      local.updateLocal("navigation", u.id, { sortOrder: u.sortOrder });
    }
    return true;
  }
  await prisma.$transaction(
    updates.map((u) =>
      prisma.navigationItem.update({
        where: { id: u.id },
        data: { sortOrder: u.sortOrder },
      }),
    ),
  );
  return true;
}

// ── Staff roles ─────────────────────────────────────────────────────────────

export type StaffMemberRow = {
  id: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  staffRole: AdminStaffRole;
  profileId: string | null;
};

export async function listAdminStaff(): Promise<StaffMemberRow[]> {
  if (!isDatabaseConfigured()) {
    return local.listLocal<StaffMemberRow>("staff");
  }
  const users = await prisma.user.findMany({
    where: { role: "ADMIN", status: "ACTIVE" },
    include: { adminStaffProfile: true },
    orderBy: { email: "asc" },
  });
  return users.map((u) => ({
    id: u.adminStaffProfile?.id ?? u.id,
    userId: u.id,
    email: u.email,
    firstName: u.firstName,
    lastName: u.lastName,
    staffRole: u.adminStaffProfile?.staffRole ?? "EDITOR",
    profileId: u.adminStaffProfile?.id ?? null,
  }));
}

export async function upsertAdminStaffProfile(
  userId: string,
  staffRole: AdminStaffRole,
) {
  if (!isDatabaseConfigured()) {
    const items = local.listLocal<StaffMemberRow & local.LocalRecord>("staff");
    const existing = items.find((s) => s.userId === userId);
    if (existing) return local.updateLocal("staff", existing.id, { staffRole });
    return local.createLocal("staff", {
      userId,
      email: "admin@local.dev",
      firstName: "Local",
      lastName: "Admin",
      staffRole,
      profileId: null,
    });
  }
  return prisma.adminStaffProfile.upsert({
    where: { userId },
    create: { userId, staffRole },
    update: { staffRole },
  });
}

export async function getSeoMetaExtended(entityType: CmsEntityType, entityId: string) {
  if (!isDatabaseConfigured()) {
    const record = local
      .listLocal<SeoPayload & local.LocalRecord & { entityType: CmsEntityType; entityId: string }>(
        "seo",
      )
      .find((s) => s.entityType === entityType && s.entityId === entityId);
    return record ?? null;
  }
  return prisma.seoMeta.findUnique({
    where: { entityType_entityId: { entityType, entityId } },
  });
}
