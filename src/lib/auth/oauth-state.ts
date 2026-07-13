import { createHmac, randomBytes, timingSafeEqual } from "crypto";

export const OAUTH_STATE_COOKIE = "mft_oauth_state";
const STATE_TTL_MS = 10 * 60 * 1000;

export type OAuthStatePayload = {
  state: string;
  returnUrl: string;
  remember: boolean;
  expiresAt: number;
};

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET ?? process.env.TRAVELLER_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must be set (min 32 characters)");
  }
  return secret;
}

export function createOAuthStateToken(payload: Omit<OAuthStatePayload, "expiresAt">): string {
  const expiresAt = Date.now() + STATE_TTL_MS;
  const data = JSON.stringify({ ...payload, expiresAt });
  const encoded = Buffer.from(data).toString("base64url");
  const sig = createHmac("sha256", getSecret()).update(encoded).digest("base64url");
  return `${encoded}.${sig}`;
}

export function verifyOAuthStateToken(token: string): OAuthStatePayload | null {
  try {
    const [encoded, sig] = token.split(".");
    if (!encoded || !sig) return null;

    const expected = createHmac("sha256", getSecret()).update(encoded).digest("base64url");
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as OAuthStatePayload;
    if (!payload.state || !payload.returnUrl || Date.now() > payload.expiresAt) return null;
    return payload;
  } catch {
    return null;
  }
}

export function generateOAuthState(): string {
  return randomBytes(24).toString("base64url");
}

export function getOAuthStateCookieOptions() {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax" as const,
    path: "/",
    maxAge: STATE_TTL_MS / 1000,
  };
}
