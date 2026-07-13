import { apiHandler, jsonOk } from "@/server/api/handler";
import { z } from "zod";
import { prisma } from "@/server/db";

const redirectSchema = z.object({
  id: z.string().optional(),
  fromPath: z.string().min(1).max(500),
  toPath: z.string().min(1).max(500),
  statusCode: z.union([z.literal(301), z.literal(302), z.literal(307), z.literal(308)]).default(301),
  isActive: z.boolean().optional(),
});

export const GET = apiHandler(async () => {
  const items = await prisma.cmsRedirect.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });
  return jsonOk({ items });
}, "cms:seo");

export const POST = apiHandler(async ({ request }) => {
  const body = redirectSchema.parse(await request.json());
  const fromPath = body.fromPath.startsWith("/") ? body.fromPath : `/${body.fromPath}`;
  const toPath = body.toPath.startsWith("/") || body.toPath.startsWith("http")
    ? body.toPath
    : `/${body.toPath}`;

  if (body.id) {
    const item = await prisma.cmsRedirect.update({
      where: { id: body.id },
      data: {
        fromPath,
        toPath,
        statusCode: body.statusCode,
        isActive: body.isActive ?? true,
      },
    });
    return jsonOk({ item });
  }

  const item = await prisma.cmsRedirect.upsert({
    where: { fromPath },
    create: {
      fromPath,
      toPath,
      statusCode: body.statusCode,
      isActive: body.isActive ?? true,
    },
    update: {
      toPath,
      statusCode: body.statusCode,
      isActive: body.isActive ?? true,
    },
  });
  return jsonOk({ item });
}, "cms:seo");

export const DELETE = apiHandler(async ({ request }) => {
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return Response.json({ ok: false, error: "id required" }, { status: 400 });
  await prisma.cmsRedirect.delete({ where: { id } });
  return jsonOk({ deleted: true });
}, "cms:seo");
