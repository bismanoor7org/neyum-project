import { NextResponse } from "next/server";
import { parseTravellerSessionCookie, verifyTravellerSessionToken } from "@/lib/auth/traveller-session";
import { resolveTravellerUserFromSession } from "@/server/services/traveller-auth.service";

export async function GET(request: Request) {
  const token = parseTravellerSessionCookie(request.headers.get("cookie"));
  if (!token) {
    return NextResponse.json({ ok: false, authenticated: false }, { status: 401 });
  }

  const session = await verifyTravellerSessionToken(token);
  if (!session) {
    return NextResponse.json({ ok: false, authenticated: false }, { status: 401 });
  }

  const data = await resolveTravellerUserFromSession(session.userId);
  if (!data) {
    return NextResponse.json({ ok: false, authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ ok: true, authenticated: true, ...data });
}
