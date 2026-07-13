import { z } from "zod";
import { prisma } from "@/server/db";

export const CMS_WORKFLOW_STATUSES = [
  "DRAFT",
  "PENDING_REVIEW",
  "NEEDS_CHANGES",
  "APPROVED",
  "PUBLISHED",
  "SCHEDULED",
  "ARCHIVED",
] as const;

export type CmsWorkflowStatus = (typeof CMS_WORKFLOW_STATUSES)[number];

export const workflowTransitionSchema = z.object({
  entity: z.enum(["page", "post"]),
  id: z.string().min(1),
  status: z.enum(CMS_WORKFLOW_STATUSES),
  comment: z.string().max(2000).optional(),
});

export async function listWorkflowQueue(status?: string) {
  const statuses = status
    ? [status as CmsWorkflowStatus]
    : (["PENDING_REVIEW", "NEEDS_CHANGES", "APPROVED"] as CmsWorkflowStatus[]);

  const [pages, posts] = await Promise.all([
    prisma.cmsPage.findMany({
      where: { status: { in: statuses } },
      orderBy: { updatedAt: "desc" },
      take: 100,
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        authorId: true,
        updatedAt: true,
      },
    }),
    prisma.cmsPost.findMany({
      where: { status: { in: statuses } },
      orderBy: { updatedAt: "desc" },
      take: 100,
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        authorId: true,
        updatedAt: true,
      },
    }),
  ]);

  return {
    items: [
      ...pages.map((p) => ({ ...p, entity: "page" as const })),
      ...posts.map((p) => ({ ...p, entity: "post" as const })),
    ].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()),
  };
}

export async function transitionWorkflow(
  input: z.infer<typeof workflowTransitionSchema>,
  actorId?: string,
) {
  const data = workflowTransitionSchema.parse(input);
  const publishPatch =
    data.status === "PUBLISHED" ? { publishedAt: new Date() } : {};

  const updated =
    data.entity === "page"
      ? await prisma.cmsPage.update({
          where: { id: data.id },
          data: { status: data.status, ...publishPatch },
        })
      : await prisma.cmsPost.update({
          where: { id: data.id },
          data: { status: data.status, ...publishPatch },
        });

  if (data.comment?.trim()) {
    await prisma.cmsRevision.create({
      data: {
        entityType: data.entity === "page" ? "PAGE" : "POST",
        entityId: data.id,
        title: `Workflow → ${data.status}`,
        content: { comment: data.comment, status: data.status },
        authorId: actorId,
      },
    });
  }

  return updated;
}
