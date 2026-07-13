import type { CmsEntityType } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { isDatabaseConfigured } from "@/server/auth/local-admin-store";
import type { SeoPayload } from "@/lib/cms/types";

function isDbConnectionError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return (
    error.name === "PrismaClientInitializationError" ||
    error.name === "PrismaClientKnownRequestError" ||
    error.message.includes("Can't reach database server") ||
    error.message.includes("Connection refused") ||
    error.message.includes("ECONNREFUSED")
  );
}

export async function getPublicSeoMeta(
  entityType: CmsEntityType,
  entityId: string,
): Promise<SeoPayload | null> {
  if (!isDatabaseConfigured()) return null;
  try {
    const row = await prisma.seoMeta.findUnique({
      where: { entityType_entityId: { entityType, entityId } },
    });
    if (!row) return null;
    return {
      metaTitle: row.metaTitle,
      metaDescription: row.metaDescription,
      ogTitle: row.ogTitle,
      ogDescription: row.ogDescription,
      ogImage: row.ogImage,
      canonicalUrl: row.canonicalUrl,
      schemaMarkup: row.schemaMarkup as Record<string, unknown> | null,
      noIndex: row.noIndex,
    };
  } catch (error) {
    if (isDbConnectionError(error)) {
      console.warn("[public-seo] Database unreachable — using fallback metadata");
      return null;
    }
    throw error;
  }
}
