import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  getSessionCookieOptions,
} from "@/lib/auth/admin-session";
import { adminLoginRequestSchema } from "@/lib/validations/admin-auth";
import {
  checkRateLimit,
  clearRateLimit,
  rateLimitKey,
  recordFailedAttempt,
} from "@/server/auth/rate-limit";
import { authenticateAdmin } from "@/server/services/admin-auth.service";

function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const parsed = adminLoginRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const ip = clientIp(request);
  const limitKey = rateLimitKey(ip, parsed.data.email);
  const limit = checkRateLimit(limitKey);

  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: `Too many failed attempts. Try again in ${limit.retryAfterSec} seconds.`,
        code: "RATE_LIMITED",
      },
      { status: 429 },
    );
  }

  const result = await authenticateAdmin(parsed.data, {
    ip,
    userAgent: request.headers.get("user-agent") ?? undefined,
  });

  if (!result.ok) {
    recordFailedAttempt(limitKey);
    return NextResponse.json({ ok: false, error: result.error }, { status: 401 });
  }

  clearRateLimit(limitKey);

  let token: string;
  try {
    token = await createAdminSessionToken(result.userId, result.remember);
  } catch {
    return NextResponse.json(
      { ok: false, error: "Server session configuration error" },
      { status: 503 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(
    ADMIN_SESSION_COOKIE,
    token,
    getSessionCookieOptions(result.remember),
  );
  return response;
}
