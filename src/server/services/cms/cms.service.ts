import type { CmsEntityType, ContentStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import type { CmsDashboardStats, CmsListResult, SeoPayload } from "@/lib/cms/types";
import { isDatabaseConfigured } from "@/server/auth/local-admin-store";
import * as local from "@/server/services/cms/cms-local-store";

type ListOptions = {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: ContentStatus;
};

function paginate<T>(items: T[], page: number, pageSize: number): CmsListResult<T> {
  const { items: slice, total } = local.paginateLocal(items, page, pageSize);
  return { items: slice, total, page, pageSize };
}

// ── SEO ─────────────────────────────────────────────────────────────────────

export async function getSeoMeta(entityType: CmsEntityType, entityId: string) {
  if (!isDatabaseConfigured()) {
    const record = local
      .listLocal<SeoPayload & local.LocalRecord & { entityType: CmsEntityType; entityId: string }>("seo")
      .find((s) => s.entityType === entityType && s.entityId === entityId);
    return record ?? null;
  }
  return prisma.seoMeta.findUnique({
    where: { entityType_entityId: { entityType, entityId } },
  });
}

export async function upsertSeoMeta(
  entityType: CmsEntityType,
  entityId: string,
  data: SeoPayload,
) {
  if (!isDatabaseConfigured()) {
    const items = local.listLocal<
      SeoPayload & local.LocalRecord & { entityType: CmsEntityType; entityId: string }
    >("seo");
    const existing = items.find((s) => s.entityType === entityType && s.entityId === entityId);
    if (existing) {
      return local.updateLocal("seo", existing.id, data);
    }
    return local.createLocal("seo", { ...data, entityType, entityId });
  }
  return prisma.seoMeta.upsert({
    where: { entityType_entityId: { entityType, entityId } },
    create: { entityType, entityId, ...data, schemaMarkup: data.schemaMarkup as Prisma.InputJsonValue },
    update: { ...data, schemaMarkup: data.schemaMarkup as Prisma.InputJsonValue },
  });
}

export async function listSeoMeta(options: ListOptions = {}) {
  const page = options.page ?? 1;
  const pageSize = options.pageSize ?? 25;
  if (!isDatabaseConfigured()) {
    let items = local.listLocal<
      SeoPayload & local.LocalRecord & { entityType: CmsEntityType; entityId: string }
    >("seo");
    if (options.search) {
      const q = options.search.toLowerCase();
      items = items.filter(
        (s) =>
          s.metaTitle?.toLowerCase().includes(q) ||
          s.entityId.toLowerCase().includes(q) ||
          s.entityType.toLowerCase().includes(q),
      );
    }
    return paginate(items, page, pageSize);
  }
  const where: Prisma.SeoMetaWhereInput = options.search
    ? {
        OR: [
          { metaTitle: { contains: options.search, mode: "insensitive" } },
          { entityId: { contains: options.search, mode: "insensitive" } },
        ],
      }
    : {};
  const [items, total] = await Promise.all([
    prisma.seoMeta.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.seoMeta.count({ where }),
  ]);
  return { items, total, page, pageSize };
}

// ── Homepage ────────────────────────────────────────────────────────────────

export async function listHomepageSections(options: ListOptions = {}) {
  const page = options.page ?? 1;
  const pageSize = options.pageSize ?? 25;
  if (!isDatabaseConfigured()) {
    let items = local.listLocal<{
      id: string;
      key: string;
      title: string;
      content: Record<string, unknown>;
      status: ContentStatus;
      sortOrder: number;
      updatedAt: string;
    }>("homepage-sections");
    if (options.status) items = items.filter((i) => i.status === options.status);
    if (options.search) {
      const q = options.search.toLowerCase();
      items = items.filter((i) => i.title.toLowerCase().includes(q) || i.key.includes(q));
    }
    return paginate(items, page, pageSize);
  }
  const where: Prisma.HomepageSectionWhereInput = {
    ...(options.status ? { status: options.status } : {}),
    ...(options.search
      ? { OR: [{ title: { contains: options.search, mode: "insensitive" } }, { key: { contains: options.search } }] }
      : {}),
  };
  const [items, total] = await Promise.all([
    prisma.homepageSection.findMany({
      where,
      orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.homepageSection.count({ where }),
  ]);
  return { items, total, page, pageSize };
}

export async function upsertHomepageSection(
  id: string | null,
  data: {
    key: string;
    title: string;
    content: Record<string, unknown>;
    status: ContentStatus;
    sortOrder?: number;
  },
) {
  if (!isDatabaseConfigured()) {
    if (id) return local.updateLocal("homepage-sections", id, data);
    return local.createLocal("homepage-sections", { ...data, sortOrder: data.sortOrder ?? 0 });
  }
  if (id) {
    return prisma.homepageSection.update({
      where: { id },
      data: { ...data, content: data.content as Prisma.InputJsonValue },
    });
  }
  return prisma.homepageSection.upsert({
    where: { key: data.key },
    create: { ...data, content: data.content as Prisma.InputJsonValue, sortOrder: data.sortOrder ?? 0 },
    update: { ...data, content: data.content as Prisma.InputJsonValue },
  });
}

export async function listBanners(options: ListOptions = {}) {
  const page = options.page ?? 1;
  const pageSize = options.pageSize ?? 25;
  if (!isDatabaseConfigured()) {
    let items = local.listLocal<{
      id: string;
      title: string;
      subtitle: string | null;
      imageUrl: string;
      linkUrl: string | null;
      position: string;
      status: ContentStatus;
      sortOrder: number;
      updatedAt: string;
    }>("banners");
    if (options.status) items = items.filter((i) => i.status === options.status);
    return paginate(items, page, pageSize);
  }
  const where: Prisma.BannerWhereInput = options.status ? { status: options.status } : {};
  const [items, total] = await Promise.all([
    prisma.banner.findMany({
      where,
      orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.banner.count({ where }),
  ]);
  return { items, total, page, pageSize };
}

export async function createBanner(data: {
  title: string;
  subtitle?: string | null;
  imageUrl: string;
  linkUrl?: string | null;
  position?: string;
  status: ContentStatus;
  sortOrder?: number;
  startsAt?: Date | null;
  endsAt?: Date | null;
}) {
  if (!isDatabaseConfigured()) {
    return local.createLocal("banners", {
      ...data,
      subtitle: data.subtitle ?? null,
      linkUrl: data.linkUrl ?? null,
      position: data.position ?? "homepage",
      sortOrder: data.sortOrder ?? 0,
    });
  }
  return prisma.banner.create({ data });
}

export async function updateBanner(id: string, data: Partial<Parameters<typeof createBanner>[0]>) {
  if (!isDatabaseConfigured()) return local.updateLocal("banners", id, data);
  return prisma.banner.update({ where: { id }, data });
}

// ── Destinations ────────────────────────────────────────────────────────────

export async function listDestinationsCms(options: ListOptions = {}) {
  const page = options.page ?? 1;
  const pageSize = options.pageSize ?? 25;
  if (!isDatabaseConfigured()) {
    let items = local.listLocal<{
      id: string;
      name: string;
      slug: string;
      status: ContentStatus;
      featured: boolean;
      updatedAt: string;
    }>("destinations");
    if (options.status) items = items.filter((i) => i.status === options.status);
    if (options.search) {
      const q = options.search.toLowerCase();
      items = items.filter((i) => i.name.toLowerCase().includes(q) || i.slug.includes(q));
    }
    return paginate(items, page, pageSize);
  }
  const where: Prisma.DestinationWhereInput = {
    ...(options.status ? { status: options.status } : {}),
    ...(options.search
      ? { OR: [{ name: { contains: options.search, mode: "insensitive" } }, { slug: { contains: options.search } }] }
      : {}),
  };
  const [items, total] = await Promise.all([
    prisma.destination.findMany({
      where,
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.destination.count({ where }),
  ]);
  return { items, total, page, pageSize };
}

export async function getDestinationCms(id: string) {
  if (!isDatabaseConfigured()) return local.getLocal("destinations", id);
  return prisma.destination.findUnique({ where: { id } });
}

export async function createDestinationCms(data: Prisma.DestinationCreateInput) {
  if (!isDatabaseConfigured()) return local.createLocal("destinations", data);
  return prisma.destination.create({ data });
}

export async function updateDestinationCms(id: string, data: Prisma.DestinationUpdateInput) {
  if (!isDatabaseConfigured()) return local.updateLocal("destinations", id, data as object);
  return prisma.destination.update({ where: { id }, data });
}

export async function deleteDestinationCms(id: string) {
  if (!isDatabaseConfigured()) return local.deleteLocal("destinations", id);
  await prisma.destination.delete({ where: { id } });
  return true;
}

export async function getFaqCms(id: string) {
  if (!isDatabaseConfigured()) return local.getLocal("faqs", id);
  return prisma.faq.findUnique({ where: { id } });
}

export async function getHomepageSectionCms(id: string) {
  if (!isDatabaseConfigured()) return local.getLocal("homepage-sections", id);
  return prisma.homepageSection.findUnique({ where: { id } });
}

export async function getHomepageSectionCmsByKey(key: string) {
  if (!isDatabaseConfigured()) {
    return (
      local
        .listLocal<{ id: string; key: string; title: string; content: Record<string, unknown>; status: ContentStatus }>(
          "homepage-sections",
        )
        .find((item) => item.key === key) ?? null
    );
  }
  return prisma.homepageSection.findUnique({ where: { key } });
}

export async function deleteHomepageSectionCms(id: string) {
  if (!isDatabaseConfigured()) return local.deleteLocal("homepage-sections", id);
  await prisma.homepageSection.delete({ where: { id } });
  return true;
}


export async function listGuidesCms(options: ListOptions = {}) {
  const page = options.page ?? 1;
  const pageSize = options.pageSize ?? 25;
  if (!isDatabaseConfigured()) {
    let items = local.listLocal<{
      id: string;
      title: string;
      slug: string;
      status: ContentStatus;
      category: string;
      updatedAt: string;
    }>("guides");
    if (options.status) items = items.filter((i) => i.status === options.status);
    if (options.search) {
      const q = options.search.toLowerCase();
      items = items.filter((i) => i.title.toLowerCase().includes(q));
    }
    return paginate(items, page, pageSize);
  }
  const where: Prisma.TravelGuideWhereInput = {
    ...(options.status ? { status: options.status } : {}),
    ...(options.search ? { title: { contains: options.search, mode: "insensitive" } } : {}),
  };
  const [items, total] = await Promise.all([
    prisma.travelGuide.findMany({
      where,
      orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.travelGuide.count({ where }),
  ]);
  return { items, total, page, pageSize };
}

export async function getGuideCms(id: string) {
  if (!isDatabaseConfigured()) return local.getLocal("guides", id);
  return prisma.travelGuide.findUnique({ where: { id } });
}

export async function createGuideCms(data: Prisma.TravelGuideCreateInput) {
  if (!isDatabaseConfigured()) return local.createLocal("guides", data);
  return prisma.travelGuide.create({ data });
}

export async function updateGuideCms(id: string, data: Prisma.TravelGuideUpdateInput) {
  if (!isDatabaseConfigured()) return local.updateLocal("guides", id, data as object);
  return prisma.travelGuide.update({ where: { id }, data });
}

export async function deleteGuideCms(id: string) {
  if (!isDatabaseConfigured()) return deleteLocal("guides", id);
  await prisma.travelGuide.delete({ where: { id } });
  return true;
}

function deleteLocal(name: local.StoreFile, id: string) {
  return local.deleteLocal(name, id);
}

// ── FAQs ────────────────────────────────────────────────────────────────────

export async function listFaqsCms(options: ListOptions = {}) {
  const page = options.page ?? 1;
  const pageSize = options.pageSize ?? 25;
  if (!isDatabaseConfigured()) {
    let items = local.listLocal<{
      id: string;
      question: string;
      category: string | null;
      status: ContentStatus;
      sortOrder: number;
      updatedAt: string;
    }>("faqs");
    if (options.status) items = items.filter((i) => i.status === options.status);
    if (options.search) {
      const q = options.search.toLowerCase();
      items = items.filter((i) => i.question.toLowerCase().includes(q));
    }
    return paginate(items, page, pageSize);
  }
  const where: Prisma.FaqWhereInput = {
    ...(options.status ? { status: options.status } : {}),
    ...(options.search ? { question: { contains: options.search, mode: "insensitive" } } : {}),
  };
  const [items, total] = await Promise.all([
    prisma.faq.findMany({
      where,
      orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.faq.count({ where }),
  ]);
  return { items, total, page, pageSize };
}

export async function createFaqCms(data: Prisma.FaqCreateInput) {
  if (!isDatabaseConfigured()) return local.createLocal("faqs", data);
  return prisma.faq.create({ data });
}

export async function updateFaqCms(id: string, data: Prisma.FaqUpdateInput) {
  if (!isDatabaseConfigured()) return local.updateLocal("faqs", id, data as object);
  return prisma.faq.update({ where: { id }, data });
}

export async function deleteFaqCms(id: string) {
  if (!isDatabaseConfigured()) return local.deleteLocal("faqs", id);
  await prisma.faq.delete({ where: { id } });
  return true;
}

// ── Testimonials ────────────────────────────────────────────────────────────

export async function listTestimonialsCms(options: ListOptions = {}) {
  const page = options.page ?? 1;
  const pageSize = options.pageSize ?? 25;
  if (!isDatabaseConfigured()) {
    let items = local.listLocal<{
      id: string;
      authorName: string;
      status: ContentStatus;
      featured: boolean;
      updatedAt: string;
    }>("testimonials");
    if (options.status) items = items.filter((i) => i.status === options.status);
    return paginate(items, page, pageSize);
  }
  const where: Prisma.TestimonialWhereInput = options.status ? { status: options.status } : {};
  const [items, total] = await Promise.all([
    prisma.testimonial.findMany({
      where,
      orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.testimonial.count({ where }),
  ]);
  return { items, total, page, pageSize };
}

export async function createTestimonialCms(data: Prisma.TestimonialCreateInput) {
  if (!isDatabaseConfigured()) return local.createLocal("testimonials", data);
  return prisma.testimonial.create({ data });
}

export async function updateTestimonialCms(id: string, data: Prisma.TestimonialUpdateInput) {
  if (!isDatabaseConfigured()) return local.updateLocal("testimonials", id, data as object);
  return prisma.testimonial.update({ where: { id }, data });
}

export async function getTestimonialCms(id: string) {
  if (!isDatabaseConfigured()) return local.getLocal("testimonials", id);
  return prisma.testimonial.findUnique({ where: { id } });
}

export async function deleteTestimonialCms(id: string) {
  if (!isDatabaseConfigured()) return local.deleteLocal("testimonials", id);
  await prisma.testimonial.delete({ where: { id } });
  return true;
}

// ── Tours (CMS) ─────────────────────────────────────────────────────────────

export async function listToursCms(options: ListOptions = {}) {
  const page = options.page ?? 1;
  const pageSize = options.pageSize ?? 25;
  if (!isDatabaseConfigured()) {
    let items = local.listLocal<{
      id: string;
      title: string;
      slug: string;
      status: string;
      featured: boolean;
      updatedAt: string;
      supplierName?: string;
    }>("tours");
    if (options.search) {
      const q = options.search.toLowerCase();
      items = items.filter((i) => i.title.toLowerCase().includes(q) || i.slug.includes(q));
    }
    return paginate(items, page, pageSize);
  }
  const where: Prisma.TourWhereInput = options.search
    ? { OR: [{ title: { contains: options.search, mode: "insensitive" } }, { slug: { contains: options.search } }] }
    : {};
  const [rows, total] = await Promise.all([
    prisma.tour.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { supplier: { select: { companyName: true } } },
    }),
    prisma.tour.count({ where }),
  ]);
  const items = rows.map((r) => ({
    ...r,
    supplier: r.supplier,
    supplierName: r.supplier.companyName,
  }));
  return { items, total, page, pageSize };
}

export async function getTourCms(id: string) {
  if (!isDatabaseConfigured()) return local.getLocal("tours", id);
  return prisma.tour.findUnique({
    where: { id },
    include: {
      supplier: { select: { id: true, companyName: true } },
      destination: { select: { id: true, name: true, slug: true } },
    },
  });
}

export async function createTourCms(data: Prisma.TourCreateInput) {
  if (!isDatabaseConfigured()) return local.createLocal("tours", data);
  return prisma.tour.create({ data });
}

export async function updateTourCms(id: string, data: Prisma.TourUpdateInput) {
  if (!isDatabaseConfigured()) return local.updateLocal("tours", id, data as object);
  return prisma.tour.update({ where: { id }, data });
}

export async function deleteTourCms(id: string) {
  if (!isDatabaseConfigured()) return local.deleteLocal("tours", id);
  await prisma.tour.update({ where: { id }, data: { status: "ARCHIVED" } });
  return true;
}

// ── Transport (CMS) ─────────────────────────────────────────────────────────

export async function listTransportCms(options: ListOptions = {}) {
  const page = options.page ?? 1;
  const pageSize = options.pageSize ?? 25;
  if (!isDatabaseConfigured()) {
    let items = local.listLocal<{
      id: string;
      title: string;
      type: string;
      status: string;
      updatedAt: string;
      supplierName?: string;
    }>("transport");
    if (options.search) {
      const q = options.search.toLowerCase();
      items = items.filter((i) => i.title.toLowerCase().includes(q));
    }
    return paginate(items, page, pageSize);
  }
  const where: Prisma.TransportationServiceWhereInput = options.search
    ? { title: { contains: options.search, mode: "insensitive" } }
    : {};
  const [rows, total] = await Promise.all([
    prisma.transportationService.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { supplier: { select: { companyName: true } } },
    }),
    prisma.transportationService.count({ where }),
  ]);
  const items = rows.map((r) => ({
    ...r,
    supplier: r.supplier,
    supplierName: r.supplier.companyName,
  }));
  return { items, total, page, pageSize };
}

export async function getTransportCms(id: string) {
  if (!isDatabaseConfigured()) return local.getLocal("transport", id);
  return prisma.transportationService.findUnique({
    where: { id },
    include: { supplier: { select: { id: true, companyName: true } } },
  });
}

export async function createTransportCms(data: Prisma.TransportationServiceCreateInput) {
  if (!isDatabaseConfigured()) return local.createLocal("transport", data);
  return prisma.transportationService.create({ data });
}

export async function updateTransportCms(id: string, data: Prisma.TransportationServiceUpdateInput) {
  if (!isDatabaseConfigured()) return local.updateLocal("transport", id, data as object);
  return prisma.transportationService.update({ where: { id }, data });
}

export async function deleteTransportCms(id: string) {
  if (!isDatabaseConfigured()) return local.deleteLocal("transport", id);
  await prisma.transportationService.update({ where: { id }, data: { status: "SUSPENDED" } });
  return true;
}

// ── Media ───────────────────────────────────────────────────────────────────

export async function listMediaAssets(
  options: ListOptions & {
    folder?: string;
    favoritesOnly?: boolean;
    sort?: "newest" | "oldest" | "name" | "size";
  } = {},
) {
  const page = options.page ?? 1;
  const pageSize = options.pageSize ?? 25;
  if (!isDatabaseConfigured()) {
    let items = local.listLocal<{
      id: string;
      publicId: string;
      secureUrl: string;
      folder: string;
      altText: string | null;
      bytes?: number | null;
      isFavorite?: boolean;
      createdAt: string;
    }>("media");
    if (options.folder) items = items.filter((i) => i.folder === options.folder || i.folder.startsWith(`${options.folder}/`));
    if (options.favoritesOnly) items = items.filter((i) => i.isFavorite);
    if (options.search) {
      const q = options.search.toLowerCase();
      items = items.filter(
        (i) => i.publicId.toLowerCase().includes(q) || i.altText?.toLowerCase().includes(q),
      );
    }
    return paginate(items, page, pageSize);
  }
  const where: Prisma.MediaAssetWhereInput = {
    ...(options.folder
      ? {
          OR: [
            { folder: options.folder },
            { folder: { startsWith: `${options.folder}/` } },
          ],
        }
      : {}),
    ...(options.favoritesOnly ? { isFavorite: true } : {}),
    ...(options.search
      ? {
          OR: [
            { publicId: { contains: options.search, mode: "insensitive" } },
            { altText: { contains: options.search, mode: "insensitive" } },
            { caption: { contains: options.search, mode: "insensitive" } },
            { folder: { contains: options.search, mode: "insensitive" } },
          ],
        }
      : {}),
  };
  const orderBy: Prisma.MediaAssetOrderByWithRelationInput =
    options.sort === "oldest"
      ? { createdAt: "asc" }
      : options.sort === "name"
        ? { publicId: "asc" }
        : options.sort === "size"
          ? { bytes: "desc" }
          : { createdAt: "desc" };
  const [items, total] = await Promise.all([
    prisma.mediaAsset.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.mediaAsset.count({ where }),
  ]);
  return { items, total, page, pageSize };
}

export async function listMediaFolders() {
  if (!isDatabaseConfigured()) {
    const items = local.listLocal<{ folder: string }>("media");
    return Array.from(new Set(items.map((i) => i.folder))).sort();
  }
  const rows = await prisma.mediaAsset.findMany({
    select: { folder: true },
    distinct: ["folder"],
    orderBy: { folder: "asc" },
  });
  return rows.map((r) => r.folder);
}

export async function getMediaStorageStats() {
  if (!isDatabaseConfigured()) {
    const items = local.listLocal<{ bytes?: number | null }>("media");
    const bytes = items.reduce((s, i) => s + (i.bytes ?? 0), 0);
    return { count: items.length, bytes, favorites: 0 };
  }
  const [agg, favorites] = await Promise.all([
    prisma.mediaAsset.aggregate({ _count: true, _sum: { bytes: true } }),
    prisma.mediaAsset.count({ where: { isFavorite: true } }),
  ]);
  return {
    count: agg._count,
    bytes: agg._sum.bytes ?? 0,
    favorites,
  };
}

export async function findMediaUsage(secureUrl: string, publicId: string) {
  if (!isDatabaseConfigured()) return [] as { type: string; id: string; title: string; href: string }[];
  const usages: { type: string; id: string; title: string; href: string }[] = [];
  const likeUrl = secureUrl;
  const [destinations, tours, accommodations, deals, pages, posts] = await Promise.all([
    prisma.destination.findMany({
      where: {
        OR: [{ heroImage: likeUrl }, { gallery: { has: likeUrl } }],
      },
      select: { id: true, name: true, slug: true },
      take: 20,
    }).catch(() => []),
    prisma.tour.findMany({
      where: {
        OR: [{ featuredImage: likeUrl }, { gallery: { has: likeUrl } }],
      },
      select: { id: true, title: true, slug: true },
      take: 20,
    }).catch(() => []),
    prisma.accommodation.findMany({
      where: {
        OR: [{ heroImage: likeUrl }, { gallery: { has: likeUrl } }],
      },
      select: { id: true, title: true, slug: true },
      take: 20,
    }).catch(() => []),
    prisma.deal.findMany({
      where: { image: likeUrl },
      select: { id: true, title: true },
      take: 20,
    }).catch(() => []),
    prisma.cmsPage.findMany({
      where: {
        OR: [
          { featuredImage: likeUrl },
          { contentHtml: { contains: publicId } },
          { contentHtml: { contains: likeUrl } },
        ],
      },
      select: { id: true, title: true },
      take: 20,
    }).catch(() => []),
    prisma.cmsPost.findMany({
      where: {
        OR: [
          { featuredImage: likeUrl },
          { contentHtml: { contains: publicId } },
          { contentHtml: { contains: likeUrl } },
        ],
      },
      select: { id: true, title: true },
      take: 20,
    }).catch(() => []),
  ]);

  for (const d of destinations) {
    usages.push({
      type: "Destination",
      id: d.id,
      title: d.name,
      href: `/admin/cms/destinations/${d.id}/edit`,
    });
  }
  for (const t of tours) {
    usages.push({
      type: "Experience",
      id: t.id,
      title: t.title,
      href: `/admin/cms/tours/${t.id}/edit`,
    });
  }
  for (const a of accommodations) {
    usages.push({
      type: "Stay",
      id: a.id,
      title: a.title,
      href: `/admin/cms/accommodations/${a.id}/edit`,
    });
  }
  for (const d of deals) {
    usages.push({
      type: "Deal",
      id: d.id,
      title: d.title,
      href: `/admin/cms/deals/${d.id}/edit`,
    });
  }
  for (const p of pages) {
    usages.push({
      type: "Page",
      id: p.id,
      title: p.title,
      href: `/admin/cms/pages/${p.id}/edit`,
    });
  }
  for (const p of posts) {
    usages.push({
      type: "Post",
      id: p.id,
      title: p.title,
      href: `/admin/cms/posts/${p.id}/edit`,
    });
  }
  return usages;
}

export async function createMediaAsset(data: {
  cloudinaryId: string;
  publicId: string;
  url: string;
  secureUrl: string;
  format?: string | null;
  resourceType?: string;
  width?: number | null;
  height?: number | null;
  bytes?: number | null;
  folder?: string;
  altText?: string | null;
  caption?: string | null;
  tags?: string[];
  uploadedById?: string | null;
}) {
  if (!isDatabaseConfigured()) {
    return local.createLocal("media", {
      ...data,
      folder: data.folder ?? "mft",
      tags: data.tags ?? [],
      isFavorite: false,
    });
  }
  return prisma.mediaAsset.create({ data });
}

export async function updateMediaAsset(
  id: string,
  data: {
    altText?: string | null;
    caption?: string | null;
    tags?: string[];
    folder?: string;
    isFavorite?: boolean;
    url?: string;
    secureUrl?: string;
    format?: string | null;
    width?: number | null;
    height?: number | null;
    bytes?: number | null;
  },
) {
  if (!isDatabaseConfigured()) return local.updateLocal("media", id, data);
  return prisma.mediaAsset.update({ where: { id }, data });
}

export async function deleteMediaAsset(id: string) {
  if (!isDatabaseConfigured()) return local.deleteLocal("media", id);
  await prisma.mediaAsset.delete({ where: { id } });
  return true;
}

export async function bulkMediaAction(input: {
  ids: string[];
  action: "delete" | "move" | "favorite" | "unfavorite";
  folder?: string;
}) {
  if (!input.ids.length) return { count: 0 };
  if (!isDatabaseConfigured()) {
    if (input.action === "delete") {
      for (const id of input.ids) local.deleteLocal("media", id);
      return { count: input.ids.length };
    }
    for (const id of input.ids) {
      local.updateLocal("media", id, {
        ...(input.action === "move" ? { folder: input.folder ?? "mft" } : {}),
        ...(input.action === "favorite" ? { isFavorite: true } : {}),
        ...(input.action === "unfavorite" ? { isFavorite: false } : {}),
      });
    }
    return { count: input.ids.length };
  }

  if (input.action === "delete") {
    const assets = await prisma.mediaAsset.findMany({ where: { id: { in: input.ids } } });
    const { deleteFromCloudinary } = await import("@/server/lib/cloudinary");
    await Promise.allSettled(assets.map((a) => deleteFromCloudinary(a.publicId)));
    const result = await prisma.mediaAsset.deleteMany({ where: { id: { in: input.ids } } });
    return { count: result.count };
  }
  if (input.action === "move") {
    const result = await prisma.mediaAsset.updateMany({
      where: { id: { in: input.ids } },
      data: { folder: input.folder ?? "mft" },
    });
    return { count: result.count };
  }
  const result = await prisma.mediaAsset.updateMany({
    where: { id: { in: input.ids } },
    data: { isFavorite: input.action === "favorite" },
  });
  return { count: result.count };
}

// ── Supplier content approval ───────────────────────────────────────────────

export async function listSupplierSubmissions(
  options: ListOptions & { approvalStatus?: string } = {},
) {
  const page = options.page ?? 1;
  const pageSize = options.pageSize ?? 25;
  if (!isDatabaseConfigured()) {
    let items = local.listLocal<{
      id: string;
      supplierId: string;
      supplierName: string;
      title: string;
      status: string;
      contentType: string;
      submittedAt: string;
    }>("supplier-submissions");
    if (options.approvalStatus) {
      items = items.filter((i) => i.status === options.approvalStatus);
    }
    return paginate(items, page, pageSize);
  }
  const where: Prisma.SupplierContentSubmissionWhereInput = options.approvalStatus
    ? { status: options.approvalStatus as never }
    : {};
  const [rows, total] = await Promise.all([
    prisma.supplierContentSubmission.findMany({
      where,
      include: { supplier: { select: { companyName: true } } },
      orderBy: { submittedAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.supplierContentSubmission.count({ where }),
  ]);
  const items = rows.map((r) => ({
    ...r,
    supplierName: r.supplier.companyName,
  }));
  return { items, total, page, pageSize };
}

export async function reviewSupplierSubmission(
  id: string,
  data: { status: "APPROVED" | "REJECTED" | "REVISION_REQUESTED"; reviewNote?: string | null },
  reviewerId: string,
) {
  const patch = {
    status: data.status,
    reviewNote: data.reviewNote ?? null,
    reviewedById: reviewerId,
    reviewedAt: new Date().toISOString(),
  };
  if (!isDatabaseConfigured()) return local.updateLocal("supplier-submissions", id, patch);
  return prisma.supplierContentSubmission.update({
    where: { id },
    data: {
      status: data.status,
      reviewNote: data.reviewNote,
      reviewedById: reviewerId,
      reviewedAt: new Date(),
    },
  });
}

// ── Dashboard stats ─────────────────────────────────────────────────────────

export async function getCmsDashboardStats(): Promise<CmsDashboardStats> {
  if (!isDatabaseConfigured()) {
    return {
      homepageSections: local.listLocal("homepage-sections").length,
      destinations: local.listLocal("destinations").length,
      guides: local.listLocal("guides").length,
      faqs: local.listLocal("faqs").length,
      testimonials: local.listLocal("testimonials").length,
      mediaAssets: local.listLocal("media").length,
      pendingSubmissions: local
        .listLocal<{ status: string }>("supplier-submissions")
        .filter((s) => s.status === "PENDING").length,
      draftContent:
        local.listLocal<{ status: ContentStatus }>("guides").filter((g) => g.status === "DRAFT")
          .length +
        local.listLocal<{ status: ContentStatus }>("faqs").filter((f) => f.status === "DRAFT").length,
    };
  }
  const [
    homepageSections,
    destinations,
    guides,
    faqs,
    testimonials,
    mediaAssets,
    pendingSubmissions,
    draftGuides,
    draftFaqs,
    draftBanners,
  ] = await Promise.all([
    prisma.homepageSection.count(),
    prisma.destination.count(),
    prisma.travelGuide.count(),
    prisma.faq.count(),
    prisma.testimonial.count(),
    prisma.mediaAsset.count(),
    prisma.supplierContentSubmission.count({ where: { status: "PENDING" } }),
    prisma.travelGuide.count({ where: { status: "DRAFT" } }),
    prisma.faq.count({ where: { status: "DRAFT" } }),
    prisma.banner.count({ where: { status: "DRAFT" } }),
  ]);
  return {
    homepageSections,
    destinations,
    guides,
    faqs,
    testimonials,
    mediaAssets,
    pendingSubmissions,
    draftContent: draftGuides + draftFaqs + draftBanners,
  };
}
