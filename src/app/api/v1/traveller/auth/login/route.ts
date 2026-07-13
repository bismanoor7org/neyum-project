import { NextResponse } from "next/server";
import {
  TRAVELLER_SESSION_COOKIE,
  createTravellerSessionToken,
  getTravellerSessionCookieOptions,
} from "@/lib/auth/traveller-session";
import { adminLoginRequestSchema } from "@/lib/validations/admin-auth";
import { clientIp } from "@/server/auth/client-ip";
import {
  checkRateLimit,
  clearRateLimit,
  rateLimitKey,
  recordFailedAttempt,
} from "@/server/auth/rate-limit";
import { authenticateTraveller } from "@/server/services/traveller-auth.service";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const parsed = adminLoginRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Validation failed" }, { status: 400 });
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

  const result = await authenticateTraveller(parsed.data, {
    ip,
    userAgent: request.headers.get("user-agent") ?? undefined,
  });

  if (!result.ok) {
    recordFailedAttempt(limitKey);
    return NextResponse.json(
      {
        ok: false,
        error: result.error,
        code: "code" in result ? result.code : undefined,
      },
      { status: 401 },
    );
  }

  clearRateLimit(limitKey);

  let token: string;
  try {
    token = await createTravellerSessionToken(result.userId, result.remember);
  } catch {
    return NextResponse.json({ ok: false, error: "Server session configuration error" }, { status: 503 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(TRAVELLER_SESSION_COOKIE, token, getTravellerSessionCookieOptions(result.remember));
  return response;
}
