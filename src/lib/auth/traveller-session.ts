import { hmacSha256Base64Url, timingSafeEqualStrings } from "@/lib/auth/session-hmac";

export const TRAVELLER_SESSION_COOKIE = "mft_traveller_session";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;
const REMEMBER_TTL_MS = 30 * 24 * 60 * 60 * 1000;

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET ?? process.env.TRAVELLER_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must be set (min 32 characters)");
  }
  return secret;
}

export async function createTravellerSessionToken(userId: string, remember: boolean): Promise<string> {
  const expiresAt = Date.now() + (remember ? REMEMBER_TTL_MS : SESSION_TTL_MS);
  const payload = `traveller.${userId}.${expiresAt}`;
  const sig = await hmacSha256Base64Url(getSecret(), payload);
  return `${payload}.${sig}`;
}

export async function verifyTravellerSessionToken(token: string): Promise<{ userId: string } | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 4) return null;

    const [, userId, expiresRaw, sig] = parts;
    const expiresAt = Number(expiresRaw);
    if (!userId || !Number.isFinite(expiresAt) || !sig) return null;
    if (Date.now() > expiresAt) return null;

    const payload = `traveller.${userId}.${expiresAt}`;
    const expected = await hmacSha256Base64Url(getSecret(), payload);
    if (!timingSafeEqualStrings(sig, expected)) return null;

    return { userId };
  } catch {
    return null;
  }
}

export function getTravellerSessionCookieOptions(remember: boolean) {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax" as const,
    path: "/",
    ...(remember ? { maxAge: REMEMBER_TTL_MS / 1000 } : {}),
  };
}

export function parseTravellerSessionCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${TRAVELLER_SESSION_COOKIE}=`));
  if (!match) return null;
  return decodeURIComponent(match.slice(TRAVELLER_SESSION_COOKIE.length + 1));
}
