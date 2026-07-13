import { getAdminUserIdFromCookies } from "@/server/auth/cms-action-auth";

export async function resolveCmsPreview(searchParams?: { preview?: string }) {
  const isAdmin = !!(await getAdminUserIdFromCookies());
  const allowDraft = searchParams?.preview === "1" && isAdmin;
  return { isAdmin, allowDraft };
}
