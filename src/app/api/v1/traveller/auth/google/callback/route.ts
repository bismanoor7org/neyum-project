import { NextResponse } from "next/server";
import {
  OAUTH_STATE_COOKIE,
  verifyOAuthStateToken,
} from "@/lib/auth/oauth-state";
import { sanitizeReturnUrl } from "@/lib/auth/return-url";
import {
  TRAVELLER_SESSION_COOKIE,
  createTravellerSessionToken,
  getTravellerSessionCookieOptions,
} from "@/lib/auth/traveller-session";
import { clientIp } from "@/server/auth/client-ip";
import {
  authenticateTravellerWithGoogle,
  exchangeGoogleCode,
} from "@/server/services/traveller-google-auth.service";

function loginRedirect(path: string, error?: string) {
  const url = new URL(path, process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000");
  if (error) url.searchParams.set("error", error);
  return NextResponse.redirect(url);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const oauthError = searchParams.get("error");

  if (oauthError) {
    return loginRedirect("/login", "google_cancelled");
  }

  if (!code || !state) {
    return loginRedirect("/login", "google_failed");
  }

  const cookieHeader = request.headers.get("cookie");
  const stateCookie = cookieHeader
    ?.split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${OAUTH_STATE_COOKIE}=`))
    ?.slice(OAUTH_STATE_COOKIE.length + 1);

  if (!stateCookie) {
    return loginRedirect("/login", "google_failed");
  }

  const payload = verifyOAuthStateToken(decodeURIComponent(stateCookie));
  if (!payload || payload.state !== state) {
    return loginRedirect("/login", "google_failed");
  }

  try {
    const profile = await exchangeGoogleCode(code);
    const result = await authenticateTravellerWithGoogle(profile, {
      ip: clientIp(request),
      userAgent: request.headers.get("user-agent") ?? undefined,
    });

    if (!result.ok) {
      return loginRedirect("/login", "google_account");
    }

    const token = await createTravellerSessionToken(result.userId, payload.remember);
    const response = NextResponse.redirect(
      new URL(sanitizeReturnUrl(payload.returnUrl), process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
    );
    response.cookies.set(
      TRAVELLER_SESSION_COOKIE,
      token,
      getTravellerSessionCookieOptions(payload.remember),
    );
    response.cookies.set(OAUTH_STATE_COOKIE, "", { path: "/", maxAge: 0 });
    return response;
  } catch {
    return loginRedirect("/login", "google_failed");
  }
}
