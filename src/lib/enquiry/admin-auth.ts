import { verifyAdminSessionRequest } from "@/lib/auth/verify-admin-session";

/** Admin API access requires a valid httpOnly session cookie (database-verified login). */
export async function verifyAdminAccess(request: Request): Promise<boolean> {
  return verifyAdminSessionRequest(request);
}

export function getConciergeAdminHint(): string | null {
  return null;
}
