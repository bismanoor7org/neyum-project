import { NextResponse } from "next/server";
import { parseSupplierSessionCookie, verifySupplierSessionToken } from "@/lib/auth/supplier-session";
import { resolveSupplierUserFromSession } from "@/server/services/supplier-auth.service";

export async function GET(request: Request) {
  const token = parseSupplierSessionCookie(request.headers.get("cookie"));
  if (!token) {
    return NextResponse.json({ ok: false, authenticated: false }, { status: 401 });
  }

  const session = await verifySupplierSessionToken(token);
  if (!session) {
    return NextResponse.json({ ok: false, authenticated: false }, { status: 401 });
  }

  const data = await resolveSupplierUserFromSession(session.userId);
  if (!data) {
    return NextResponse.json({ ok: false, authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ ok: true, authenticated: true, ...data });
}
