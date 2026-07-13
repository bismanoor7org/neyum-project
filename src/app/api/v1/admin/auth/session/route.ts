import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  parseSessionCookie,
  verifyAdminSessionToken,
} from "@/lib/auth/admin-session";
import { resolveAdminUserFromSession } from "@/server/services/admin-auth.service";

export async function GET(request: Request) {
  const token = parseSessionCookie(request.headers.get("cookie"));
  if (!token) {
    return NextResponse.json({ ok: false, authenticated: false }, { status: 401 });
  }

  const session = await verifyAdminSessionToken(token);
  if (!session) {
    return NextResponse.json({ ok: false, authenticated: false }, { status: 401 });
  }

  const user = await resolveAdminUserFromSession(session.userId);
  if (!user) {
    return NextResponse.json({ ok: false, authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ ok: true, authenticated: true, user });
}
