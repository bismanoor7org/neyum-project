import { prisma } from "@/lib/db/prisma";
import { isDatabaseConfigured } from "@/server/auth/local-admin-store";

const CMS_SUPPLIER_NAME = "My Fiji Tour Platform";

/** Resolves supplier for CMS-created tours/transport (first supplier, or platform supplier). */
export async function resolveCmsSupplierId(preferredId?: string | null): Promise<string | null> {
  if (!isDatabaseConfigured()) return null;
  if (preferredId) {
    const found = await prisma.supplier.findUnique({ where: { id: preferredId } });
    if (found) return found.id;
  }
  const platform = await prisma.supplier.findFirst({
    where: { companyName: CMS_SUPPLIER_NAME },
  });
  if (platform) return platform.id;
  const any = await prisma.supplier.findFirst({ orderBy: { createdAt: "asc" } });
  return any?.id ?? null;
}

export async function listSuppliersForCms() {
  if (!isDatabaseConfigured()) return [];
  return prisma.supplier.findMany({
    orderBy: { companyName: "asc" },
    select: { id: true, companyName: true },
    take: 100,
  });
}

export async function listDestinationsForCms() {
  if (!isDatabaseConfigured()) return [];
  return prisma.destination.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, slug: true },
    take: 200,
  });
}
