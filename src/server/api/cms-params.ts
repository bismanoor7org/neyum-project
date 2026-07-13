import type { ContentStatus } from "@prisma/client";
import { cmsPaginationSchema } from "@/lib/validations/cms";

export function parseCmsListParams(url: URL) {
  const parsed = cmsPaginationSchema.parse({
    page: url.searchParams.get("page") ?? undefined,
    pageSize: url.searchParams.get("pageSize") ?? undefined,
    search: url.searchParams.get("search") ?? undefined,
    status: url.searchParams.get("status") ?? undefined,
  });
  return {
    ...parsed,
    status: parsed.status as ContentStatus | undefined,
  };
}
