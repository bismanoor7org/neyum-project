import { hmacSha256Base64Url, timingSafeEqualStrings } from "@/lib/auth/session-hmac";

export const ADMIN_SESSION_COOKIE = "mft_admin_session";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours
const REMEMBER_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must be set (min 32 characters)");
  }
  return secret;
}

export async function createAdminSessionToken(userId: string, remember: boolean): Promise<string> {
  const expiresAt = Date.now() + (remember ? REMEMBER_TTL_MS : SESSION_TTL_MS);
  const payload = `${userId}.${expiresAt}`;
  const sig = await hmacSha256Base64Url(getSecret(), payload);
  return `${payload}.${sig}`;
}

export async function verifyAdminSessionToken(token: string): Promise<{ userId: string } | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [userId, expiresRaw, sig] = parts;
    const expiresAt = Number(expiresRaw);
    if (!userId || !Number.isFinite(expiresAt) || !sig) return null;
    if (Date.now() > expiresAt) return null;

    const payload = `${userId}.${expiresAt}`;
    const expected = await hmacSha256Base64Url(getSecret(), payload);
    if (!timingSafeEqualStrings(sig, expected)) return null;

    return { userId };
  } catch {
    return null;
  }
}

export function getSessionCookieOptions(remember: boolean) {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax" as const,
    path: "/",
    ...(remember ? { maxAge: REMEMBER_TTL_MS / 1000 } : {}),
  };
}

export function parseSessionCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${ADMIN_SESSION_COOKIE}=`));
  if (!match) return null;
  return decodeURIComponent(match.slice(ADMIN_SESSION_COOKIE.length + 1));
}
