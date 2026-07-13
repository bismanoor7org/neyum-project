import { z } from "zod";
import { prisma } from "@/server/db";
import { estimateReadingTime, slugify, type CmsSeoFields } from "@/lib/cms/wp-types";

const seoSchema = z
  .object({
    metaTitle: z.string().optional().nullable(),
    metaDescription: z.string().optional().nullable(),
    canonicalUrl: z.string().optional().nullable(),
    ogImage: z.string().optional().nullable(),
    twitterCard: z.string().optional().nullable(),
    robots: z.string().optional().nullable(),
    schemaJsonLd: z.record(z.string(), z.unknown()).optional().nullable(),
    breadcrumbs: z
      .array(z.object({ label: z.string(), href: z.string() }))
      .optional()
      .nullable(),
  })
  .default({});

export const pageInputSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(160).optional(),
  excerpt: z.string().max(2000).optional().nullable(),
  content: z.unknown().optional(),
  contentHtml: z.string().optional().nullable(),
  featuredImage: z.string().optional().nullable().or(z.literal("")),
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
  publishedAt: z.string().datetime().optional().nullable(),
  scheduledAt: z.string().datetime().optional().nullable(),
  parentId: z.string().optional().nullable(),
  template: z.string().optional().nullable(),
  seo: seoSchema.optional(),
});

export const postInputSchema = pageInputSchema.extend({
  categoryId: z.string().optional().nullable(),
  tagIds: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  readingTimeMin: z.number().int().min(1).max(120).optional(),
});

function resolvePublishFields(input: {
  status:
    | "DRAFT"
    | "PENDING_REVIEW"
    | "NEEDS_CHANGES"
    | "APPROVED"
    | "PUBLISHED"
    | "SCHEDULED"
    | "ARCHIVED";
  publishedAt?: string | null;
  scheduledAt?: string | null;
}) {
  const publishedAt =
    input.status === "PUBLISHED"
      ? input.publishedAt
        ? new Date(input.publishedAt)
        : new Date()
      : input.publishedAt
        ? new Date(input.publishedAt)
        : null;
  const scheduledAt =
    input.status === "SCHEDULED" && input.scheduledAt ? new Date(input.scheduledAt) : null;
  return { publishedAt, scheduledAt };
}

export async function listCmsPages(params: {
  q?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}) {
  const page = Math.max(1, params.page ?? 1);
  const pageSize = Math.min(100, Math.max(1, params.pageSize ?? 20));
  const where = {
    ...(params.status ? { status: params.status as "DRAFT" } : {}),
    ...(params.q
      ? {
          OR: [
            { title: { contains: params.q, mode: "insensitive" as const } },
            { slug: { contains: params.q, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };
  const [items, total] = await Promise.all([
    prisma.cmsPage.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.cmsPage.count({ where }),
  ]);
  return { items, total, page, pageSize };
}

export async function getCmsPage(id: string) {
  return prisma.cmsPage.findUnique({ where: { id } });
}

export async function createCmsPage(raw: z.infer<typeof pageInputSchema>, authorId?: string) {
  const input = pageInputSchema.parse(raw);
  const slug = slugify(input.slug || input.title);
  const publish = resolvePublishFields(input);
  return prisma.cmsPage.create({
    data: {
      title: input.title,
      slug,
      excerpt: input.excerpt ?? null,
      content: (input.content as object) ?? {},
      contentHtml: input.contentHtml ?? null,
      featuredImage: input.featuredImage || null,
      status: input.status,
      publishedAt: publish.publishedAt,
      scheduledAt: publish.scheduledAt,
      authorId: authorId ?? null,
      parentId: input.parentId ?? null,
      template: input.template ?? "default",
      seo: (input.seo as object) ?? {},
    },
  });
}

export async function updateCmsPage(id: string, raw: z.infer<typeof pageInputSchema>) {
  const input = pageInputSchema.parse(raw);
  const existing = await prisma.cmsPage.findUnique({ where: { id } });
  if (!existing) throw new Error("Page not found");
  const publish = resolvePublishFields(input);
  const updated = await prisma.cmsPage.update({
    where: { id },
    data: {
      title: input.title,
      slug: slugify(input.slug || input.title),
      excerpt: input.excerpt ?? null,
      content: (input.content as object) ?? {},
      contentHtml: input.contentHtml ?? null,
      featuredImage: input.featuredImage || null,
      status: input.status,
      publishedAt: publish.publishedAt,
      scheduledAt: publish.scheduledAt,
      parentId: input.parentId ?? null,
      template: input.template ?? "default",
      seo: (input.seo as object) ?? {},
    },
  });
  await prisma.cmsRevision.create({
    data: {
      entityType: "PAGE",
      entityId: id,
      title: existing.title,
      content: existing.content as object,
      contentHtml: existing.contentHtml,
      authorId: existing.authorId,
    },
  });
  return updated;
}

export async function deleteCmsPage(id: string) {
  return prisma.cmsPage.delete({ where: { id } });
}

export async function duplicateCmsPage(id: string) {
  const page = await prisma.cmsPage.findUnique({ where: { id } });
  if (!page) throw new Error("Page not found");
  return prisma.cmsPage.create({
    data: {
      title: `${page.title} (Copy)`,
      slug: `${page.slug}-copy-${Date.now().toString(36)}`,
      excerpt: page.excerpt,
      content: page.content as object,
      contentHtml: page.contentHtml,
      featuredImage: page.featuredImage,
      status: "DRAFT",
      template: page.template,
      seo: page.seo as object,
      authorId: page.authorId,
      parentId: page.parentId,
    },
  });
}

export async function listCmsPosts(params: {
  q?: string;
  status?: string;
  categoryId?: string;
  page?: number;
  pageSize?: number;
}) {
  const page = Math.max(1, params.page ?? 1);
  const pageSize = Math.min(100, Math.max(1, params.pageSize ?? 20));
  const where = {
    ...(params.status ? { status: params.status as "DRAFT" } : {}),
    ...(params.categoryId ? { categoryId: params.categoryId } : {}),
    ...(params.q
      ? {
          OR: [
            { title: { contains: params.q, mode: "insensitive" as const } },
            { slug: { contains: params.q, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };
  const [items, total] = await Promise.all([
    prisma.cmsPost.findMany({
      where,
      include: { category: true, tags: { include: { tag: true } } },
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.cmsPost.count({ where }),
  ]);
  return { items, total, page, pageSize };
}

export async function getCmsPost(id: string) {
  return prisma.cmsPost.findUnique({
    where: { id },
    include: { category: true, tags: { include: { tag: true } } },
  });
}

export async function createCmsPost(raw: z.infer<typeof postInputSchema>, authorId?: string) {
  const input = postInputSchema.parse(raw);
  const slug = slugify(input.slug || input.title);
  const publish = resolvePublishFields(input);
  const readingTimeMin =
    input.readingTimeMin ?? estimateReadingTime(input.contentHtml ?? input.excerpt ?? input.title);
  const post = await prisma.cmsPost.create({
    data: {
      title: input.title,
      slug,
      excerpt: input.excerpt ?? null,
      content: (input.content as object) ?? {},
      contentHtml: input.contentHtml ?? null,
      featuredImage: input.featuredImage || null,
      categoryId: input.categoryId ?? null,
      authorId: authorId ?? null,
      status: input.status,
      publishedAt: publish.publishedAt,
      scheduledAt: publish.scheduledAt,
      featured: input.featured ?? false,
      readingTimeMin,
      seo: (input.seo as object) ?? {},
    },
  });
  if (input.tagIds?.length) {
    await prisma.cmsPostTag.createMany({
      data: input.tagIds.map((tagId) => ({ postId: post.id, tagId })),
      skipDuplicates: true,
    });
  }
  return getCmsPost(post.id);
}

export async function updateCmsPost(id: string, raw: z.infer<typeof postInputSchema>) {
  const input = postInputSchema.parse(raw);
  const existing = await prisma.cmsPost.findUnique({ where: { id } });
  if (!existing) throw new Error("Post not found");
  const publish = resolvePublishFields(input);
  const readingTimeMin =
    input.readingTimeMin ?? estimateReadingTime(input.contentHtml ?? input.excerpt ?? input.title);
  await prisma.cmsRevision.create({
    data: {
      entityType: "POST",
      entityId: id,
      title: existing.title,
      content: existing.content as object,
      contentHtml: existing.contentHtml,
      authorId: existing.authorId,
    },
  });
  await prisma.cmsPost.update({
    where: { id },
    data: {
      title: input.title,
      slug: slugify(input.slug || input.title),
      excerpt: input.excerpt ?? null,
      content: (input.content as object) ?? {},
      contentHtml: input.contentHtml ?? null,
      featuredImage: input.featuredImage || null,
      categoryId: input.categoryId ?? null,
      status: input.status,
      publishedAt: publish.publishedAt,
      scheduledAt: publish.scheduledAt,
      featured: input.featured ?? false,
      readingTimeMin,
      seo: (input.seo as object) ?? {},
    },
  });
  if (input.tagIds) {
    await prisma.cmsPostTag.deleteMany({ where: { postId: id } });
    if (input.tagIds.length) {
      await prisma.cmsPostTag.createMany({
        data: input.tagIds.map((tagId) => ({ postId: id, tagId })),
        skipDuplicates: true,
      });
    }
  }
  return getCmsPost(id);
}

export async function deleteCmsPost(id: string) {
  return prisma.cmsPost.delete({ where: { id } });
}

export async function duplicateCmsPost(id: string) {
  const post = await getCmsPost(id);
  if (!post) throw new Error("Post not found");
  return createCmsPost(
    {
      title: `${post.title} (Copy)`,
      slug: `${post.slug}-copy-${Date.now().toString(36)}`,
      excerpt: post.excerpt,
      content: post.content,
      contentHtml: post.contentHtml,
      featuredImage: post.featuredImage,
      status: "DRAFT",
      categoryId: post.categoryId,
      tagIds: post.tags.map((t) => t.tagId),
      featured: false,
      seo: post.seo as CmsSeoFields,
    },
    post.authorId ?? undefined,
  );
}

export async function listCategories() {
  return prisma.cmsCategory.findMany({ orderBy: { name: "asc" } });
}

export async function upsertCategory(input: { id?: string; name: string; slug?: string; description?: string }) {
  const slug = slugify(input.slug || input.name);
  if (input.id) {
    return prisma.cmsCategory.update({
      where: { id: input.id },
      data: { name: input.name, slug, description: input.description },
    });
  }
  return prisma.cmsCategory.create({
    data: { name: input.name, slug, description: input.description },
  });
}

export async function deleteCategory(id: string) {
  return prisma.cmsCategory.delete({ where: { id } });
}

export async function listTags() {
  return prisma.cmsTag.findMany({ orderBy: { name: "asc" } });
}

export async function upsertTag(input: { id?: string; name: string; slug?: string }) {
  const slug = slugify(input.slug || input.name);
  if (input.id) {
    return prisma.cmsTag.update({ where: { id: input.id }, data: { name: input.name, slug } });
  }
  return prisma.cmsTag.create({ data: { name: input.name, slug } });
}

export async function deleteTag(id: string) {
  return prisma.cmsTag.delete({ where: { id } });
}

export async function getSiteSettings() {
  const rows = await prisma.cmsSiteSetting.findMany();
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

export async function upsertSiteSetting(key: string, value: unknown, updatedBy?: string) {
  return prisma.cmsSiteSetting.upsert({
    where: { key },
    create: { key, value: value as object, updatedBy },
    update: { value: value as object, updatedBy },
  });
}

export async function listRevisions(entityType: string, entityId: string) {
  return prisma.cmsRevision.findMany({
    where: { entityType, entityId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
}

export async function bulkUpdateStatus(
  entity: "page" | "post",
  ids: string[],
  status:
    | "DRAFT"
    | "PENDING_REVIEW"
    | "NEEDS_CHANGES"
    | "APPROVED"
    | "PUBLISHED"
    | "SCHEDULED"
    | "ARCHIVED",
) {
  if (!ids.length) return { count: 0 };
  const data = {
    status,
    ...(status === "PUBLISHED" ? { publishedAt: new Date() } : {}),
  };
  if (entity === "page") {
    return prisma.cmsPage.updateMany({ where: { id: { in: ids } }, data });
  }
  return prisma.cmsPost.updateMany({ where: { id: { in: ids } }, data });
}

export async function getPublishedPosts(limit = 12) {
  return prisma.cmsPost.findMany({
    where: { status: "PUBLISHED" },
    include: { category: true, tags: { include: { tag: true } } },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export async function getPublishedPostBySlug(slug: string) {
  return prisma.cmsPost.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: { category: true, tags: { include: { tag: true } } },
  });
}

export async function getPublishedPageBySlug(slug: string) {
  return prisma.cmsPage.findFirst({
    where: { slug, status: "PUBLISHED" },
  });
}
