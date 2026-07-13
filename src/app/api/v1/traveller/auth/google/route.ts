import { NextResponse } from "next/server";
import {
  OAUTH_STATE_COOKIE,
  createOAuthStateToken,
  generateOAuthState,
  getOAuthStateCookieOptions,
} from "@/lib/auth/oauth-state";
import { sanitizeReturnUrl } from "@/lib/auth/return-url";
import { getGoogleAuthUrl } from "@/server/services/traveller-google-auth.service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const returnUrl = sanitizeReturnUrl(searchParams.get("returnUrl"));
  const remember = searchParams.get("remember") === "true";

  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    return NextResponse.json({ ok: false, error: "Google sign-in is not configured" }, { status: 503 });
  }

  const state = generateOAuthState();
  let stateToken: string;
  try {
    stateToken = createOAuthStateToken({ state, returnUrl, remember });
  } catch {
    return NextResponse.json({ ok: false, error: "Server session configuration error" }, { status: 503 });
  }

  const response = NextResponse.redirect(getGoogleAuthUrl(state));
  response.cookies.set(OAUTH_STATE_COOKIE, stateToken, getOAuthStateCookieOptions());
  return response;
}
