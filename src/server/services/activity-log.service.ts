import type { ActivityModule, Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { isDatabaseConfigured } from "@/server/auth/local-admin-store";
import { appendLocalActivity } from "@/server/services/admin-local-data.service";

type LogInput = {
  userId?: string | null;
  action: string;
  module: ActivityModule;
  entityId?: string;
  metadata?: Prisma.InputJsonValue;
  ipAddress?: string;
  userAgent?: string;
};

export async function logActivity(input: LogInput) {
  if (!isDatabaseConfigured()) {
    return appendLocalActivity({
      userId: input.userId,
      action: input.action,
      module: input.module,
      entityId: input.entityId,
      metadata: input.metadata,
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
    });
  }
  return prisma.activityLog.create({
    data: {
      userId: input.userId ?? null,
      action: input.action,
      module: input.module,
      entityId: input.entityId,
      metadata: input.metadata,
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
    },
  });
}

export async function listActivityLogs(options: {
  module?: ActivityModule;
  userId?: string;
  limit?: number;
  cursor?: string;
}) {
  const { module, userId, limit = 50, cursor } = options;

  return prisma.activityLog.findMany({
    where: {
      ...(module ? { module } : {}),
      ...(userId ? { userId } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
    include: {
      user: {
        select: { id: true, firstName: true, lastName: true, email: true },
      },
    },
  });
}
