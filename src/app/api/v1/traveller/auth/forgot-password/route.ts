import { NextResponse } from "next/server";
import { forgotPasswordSchema } from "@/lib/validations/traveller-auth";
import { clientIp } from "@/server/auth/client-ip";
import { checkRateLimit, recordFailedAttempt } from "@/server/auth/rate-limit";
import { requestTravellerPasswordReset } from "@/server/services/traveller-password.service";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const parsed = forgotPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Validation failed" }, { status: 400 });
  }

  const ip = clientIp(request);
  const limitKey = `forgot:${ip}:${parsed.data.email.toLowerCase()}`;
  const limit = checkRateLimit(limitKey);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: `Too many requests. Try again in ${limit.retryAfterSec} seconds.`,
        code: "RATE_LIMITED",
      },
      { status: 429 },
    );
  }

  recordFailedAttempt(limitKey);

  const result = await requestTravellerPasswordReset(parsed.data, {
    ip,
    userAgent: request.headers.get("user-agent") ?? undefined,
  });

  return NextResponse.json({ ok: true, message: result.message });
}
