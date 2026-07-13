import { z } from "zod";
import { prisma } from "@/server/db";
import { slugify } from "@/lib/cms/wp-types";

const documentSchema = z.object({
  title: z.string().min(1),
  slug: z.string().optional(),
  status: z
    .enum([
      "DRAFT",
      "PENDING_REVIEW",
      "NEEDS_CHANGES",
      "APPROVED",
      "PUBLISHED",
      "SCHEDULED",
      "ARCHIVED",
    ])
    .default("DRAFT"),
  sections: z.array(z.unknown()).default([]),
  globalStyles: z.record(z.string(), z.unknown()).optional(),
  seo: z.record(z.string(), z.unknown()).optional(),
  scheduledAt: z.string().datetime().optional().nullable(),
  pageId: z.string().optional().nullable(),
});

export async function listPageDocuments(params?: { q?: string; status?: string }) {
  return prisma.$queryRawUnsafe<
    {
      id: string;
      title: string;
      slug: string;
      status: string;
      updated_at: Date;
    }[]
  >(
    `select id, title, slug, status, updated_at
     from cms_page_documents
     where ($1::text is null or status = $1)
       and ($2::text is null or title ilike '%' || $2 || '%' or slug ilike '%' || $2 || '%')
     order by updated_at desc
     limit 100`,
    params?.status ?? null,
    params?.q ?? null,
  ).catch(async () => {
    // Table may not exist until migration — fall back to CmsPage
    const pages = await prisma.cmsPage.findMany({
      where: {
        ...(params?.status ? { status: params.status as "DRAFT" } : {}),
        ...(params?.q
          ? {
              OR: [
                { title: { contains: params.q, mode: "insensitive" } },
                { slug: { contains: params.q, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      orderBy: { updatedAt: "desc" },
      take: 100,
    });
    return pages.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      status: p.status,
      updated_at: p.updatedAt,
    }));
  });
}

export async function upsertPageDocument(raw: z.infer<typeof documentSchema>, id?: string) {
  const input = documentSchema.parse(raw);
  const slug = slugify(input.slug || input.title);
  const scheduledAt = input.scheduledAt ? new Date(input.scheduledAt) : null;
  const publishedAt = input.status === "PUBLISHED" ? new Date() : null;

  // Prefer Prisma CmsPage as source of truth until raw table is migrated
  if (id) {
    return prisma.cmsPage.update({
      where: { id },
      data: {
        title: input.title,
        slug,
        status: input.status,
        content: { sections: input.sections, globalStyles: input.globalStyles ?? {} },
        seo: (input.seo as object) ?? {},
        scheduledAt,
        publishedAt,
      },
    });
  }

  return prisma.cmsPage.create({
    data: {
      title: input.title,
      slug,
      status: input.status,
      content: { sections: input.sections, globalStyles: input.globalStyles ?? {} },
      seo: (input.seo as object) ?? {},
      scheduledAt,
      publishedAt,
    },
  });
}

export async function getPageDocument(id: string) {
  return prisma.cmsPage.findUnique({ where: { id } });
}
