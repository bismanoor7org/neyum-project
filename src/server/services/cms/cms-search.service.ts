import { prisma } from "@/lib/db/prisma";
import { isDatabaseConfigured } from "@/server/auth/local-admin-store";
import * as local from "@/server/services/cms/cms-local-store";

export type CmsSearchResult = {
  id: string;
  type: string;
  title: string;
  subtitle?: string;
  href: string;
  status?: string;
};

export async function globalCmsSearch(query: string, limit = 20): Promise<CmsSearchResult[]> {
  const q = query.trim().toLowerCase();
  if (!q || q.length < 2) return [];

  const results: CmsSearchResult[] = [];

  if (!isDatabaseConfigured()) {
    const push = (
      store: local.StoreFile,
      type: string,
      base: string,
      titleKey: string,
      subKey?: string,
    ) => {
      for (const row of local.listLocal<Record<string, string>>(store)) {
        const title = row[titleKey] ?? row.name ?? "";
        if (title.toLowerCase().includes(q) || row.slug?.toLowerCase().includes(q)) {
          results.push({
            id: row.id as string,
            type,
            title,
            subtitle: subKey ? row[subKey] : row.slug,
            href: `${base}/${row.id}/edit`,
            status: row.status,
          });
        }
      }
    };
    push("destinations", "destination", "/admin/cms/destinations", "name", "slug");
    push("guides", "guide", "/admin/cms/guides", "title", "slug");
    push("deals", "deal", "/admin/cms/deals", "title", "slug");
    push("accommodations", "accommodation", "/admin/cms/accommodations", "title", "slug");
    push("faqs", "faq", "/admin/cms/faqs", "question");
    return results.slice(0, limit);
  }

  const [destinations, guides, deals, accommodations, tours, seo] = await Promise.all([
    prisma.destination.findMany({
      where: { OR: [{ name: { contains: q, mode: "insensitive" } }, { slug: { contains: q } }] },
      take: 5,
      select: { id: true, name: true, slug: true, status: true },
    }),
    prisma.travelGuide.findMany({
      where: { title: { contains: q, mode: "insensitive" } },
      take: 5,
      select: { id: true, title: true, slug: true, status: true },
    }),
    prisma.deal.findMany({
      where: { title: { contains: q, mode: "insensitive" } },
      take: 5,
      select: { id: true, title: true, slug: true, status: true },
    }),
    prisma.accommodation.findMany({
      where: { title: { contains: q, mode: "insensitive" } },
      take: 5,
      select: { id: true, title: true, slug: true, status: true },
    }),
    prisma.tour.findMany({
      where: { title: { contains: q, mode: "insensitive" } },
      take: 5,
      select: { id: true, title: true, slug: true, status: true },
    }),
    prisma.seoMeta.findMany({
      where: {
        OR: [
          { metaTitle: { contains: q, mode: "insensitive" } },
          { entityId: { contains: q, mode: "insensitive" } },
        ],
      },
      take: 5,
      select: { id: true, entityType: true, entityId: true, metaTitle: true },
    }),
  ]);

  for (const d of destinations) {
    results.push({
      id: d.id,
      type: "destination",
      title: d.name,
      subtitle: d.slug,
      href: `/admin/cms/destinations/${d.id}/edit`,
      status: d.status,
    });
  }
  for (const g of guides) {
    results.push({
      id: g.id,
      type: "guide",
      title: g.title,
      subtitle: g.slug,
      href: `/admin/cms/guides/${g.id}/edit`,
      status: g.status,
    });
  }
  for (const d of deals) {
    results.push({
      id: d.id,
      type: "deal",
      title: d.title,
      subtitle: d.slug,
      href: `/admin/cms/deals/${d.id}/edit`,
      status: d.status,
    });
  }
  for (const a of accommodations) {
    results.push({
      id: a.id,
      type: "accommodation",
      title: a.title,
      subtitle: a.slug,
      href: `/admin/cms/accommodations/${a.id}/edit`,
      status: a.status,
    });
  }
  for (const t of tours) {
    results.push({
      id: t.id,
      type: "experience",
      title: t.title,
      subtitle: t.slug,
      href: `/admin/cms/tours/${t.id}/edit`,
      status: t.status,
    });
  }
  for (const s of seo) {
    results.push({
      id: s.id,
      type: "seo",
      title: s.metaTitle ?? `${s.entityType} SEO`,
      subtitle: s.entityId,
      href: `/admin/cms/seo`,
    });
  }

  // Bookings search
  const bookings = await prisma.booking.findMany({
    where: {
      OR: [
        { bookingNumber: { contains: q, mode: "insensitive" } },
        { traveler: { email: { contains: q, mode: "insensitive" } } },
        { traveler: { firstName: { contains: q, mode: "insensitive" } } },
      ],
    },
    take: 5,
    select: {
      id: true,
      bookingNumber: true,
      bookingStatus: true,
      traveler: { select: { firstName: true, lastName: true } },
    },
  });
  for (const b of bookings) {
    results.push({
      id: b.id,
      type: "booking",
      title: b.bookingNumber,
      subtitle: `${b.traveler.firstName} ${b.traveler.lastName}`,
      href: `/admin/bookings/${b.id}`,
      status: b.bookingStatus,
    });
  }

  return results.slice(0, limit);
}
