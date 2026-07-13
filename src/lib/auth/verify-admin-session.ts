import {
  parseSessionCookie,
  verifyAdminSessionToken,
} from "@/lib/auth/admin-session";
import { resolveAdminUserFromSession } from "@/server/services/admin-auth.service";

/** Returns admin user id if request has a valid httpOnly session cookie */
export async function verifyAdminSession(request: Request): Promise<string | null> {
  const token = parseSessionCookie(request.headers.get("cookie"));
  if (!token) return null;

  const session = await verifyAdminSessionToken(token);
  if (!session) return null;

  const user = await resolveAdminUserFromSession(session.userId);
  return user?.id ?? null;
}

export async function verifyAdminSessionRequest(request: Request): Promise<boolean> {
  const userId = await verifyAdminSession(request);
  return userId !== null;
}
