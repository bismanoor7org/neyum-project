import { apiHandler, jsonOk } from "@/server/api/handler";
import { prisma } from "@/server/db";

export const GET = apiHandler(async ({ request, auth }) => {
  const all = new URL(request.url).searchParams.get("all") === "1";
  const where = all
    ? { revokedAt: null }
    : { userId: auth.user.id, revokedAt: null };

  const sessions = await prisma.loginSession.findMany({
    where,
    orderBy: { lastActive: "desc" },
    take: 50,
    select: {
      id: true,
      userId: true,
      deviceName: true,
      browser: true,
      os: true,
      ipAddress: true,
      location: true,
      isCurrent: true,
      lastActive: true,
      createdAt: true,
    },
  });

  const user = await prisma.user.findUnique({
    where: { id: auth.user.id },
    select: { twoFactorEnabled: true, email: true },
  });

  return jsonOk({
    sessions,
    security: {
      email: user?.email ?? null,
      twoFactorEnabled: user?.twoFactorEnabled ?? false,
      note: "Enable 2FA from account security when available. Revoke sessions below.",
    },
  });
}, "cms:read");

export const DELETE = apiHandler(async ({ request, auth }) => {
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return Response.json({ ok: false, error: "id required" }, { status: 400 });

  const session = await prisma.loginSession.findFirst({
    where: { id, userId: auth.user.id },
  });
  if (!session) {
    return Response.json({ ok: false, error: "Session not found" }, { status: 404 });
  }

  await prisma.loginSession.update({
    where: { id },
    data: { revokedAt: new Date(), isCurrent: false },
  });
  return jsonOk({ revoked: true });
}, "cms:read");
