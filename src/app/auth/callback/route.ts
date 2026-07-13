import { NextResponse } from "next/server";
import { sanitizeReturnUrl } from "@/lib/auth/return-url";
import {
  TRAVELLER_SESSION_COOKIE,
  createTravellerSessionToken,
  getTravellerSessionCookieOptions,
} from "@/lib/auth/traveller-session";
import { createClient } from "@/lib/supabase/server";
import { clientIp } from "@/server/auth/client-ip";
import { authenticateTravellerWithSupabase } from "@/server/services/traveller-supabase-auth.service";

function appOrigin(request: Request): string {
  return (
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ??
    new URL(request.url).origin
  );
}

function loginRedirect(origin: string, error?: string) {
  const url = new URL("/login", origin);
  if (error) url.searchParams.set("error", error);
  return NextResponse.redirect(url);
}

export async function GET(request: Request) {
  const origin = appOrigin(request);
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const oauthError = searchParams.get("error");
  const returnUrl = sanitizeReturnUrl(searchParams.get("returnUrl"));
  const remember = searchParams.get("remember") === "true";

  if (oauthError) {
    return loginRedirect(origin, "google_cancelled");
  }

  if (!code) {
    return loginRedirect(origin, "google_failed");
  }

  const supabase = await createClient();
  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
  if (exchangeError) {
    return loginRedirect(origin, "google_failed");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    await supabase.auth.signOut();
    return loginRedirect(origin, "google_failed");
  }

  const result = await authenticateTravellerWithSupabase(user, {
    ip: clientIp(request),
    userAgent: request.headers.get("user-agent") ?? undefined,
  });

  if (!result.ok) {
    await supabase.auth.signOut();
    return loginRedirect(origin, "google_account");
  }

  const token = await createTravellerSessionToken(result.userId, remember);
  const response = NextResponse.redirect(new URL(returnUrl, origin));
  response.cookies.set(
    TRAVELLER_SESSION_COOKIE,
    token,
    getTravellerSessionCookieOptions(remember),
  );
  return response;
}
