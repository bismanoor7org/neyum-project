import { NextResponse } from "next/server";
import { travellerRegisterSchema } from "@/lib/validations/traveller-auth";
import { clientIp } from "@/server/auth/client-ip";
import { checkRateLimit, recordFailedAttempt } from "@/server/auth/rate-limit";
import { registerTraveller } from "@/server/services/traveller-register.service";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const parsed = travellerRegisterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const ip = clientIp(request);
  const limitKey = `register:${ip}`;
  const limit = checkRateLimit(limitKey);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: `Too many registration attempts. Try again in ${limit.retryAfterSec} seconds.`,
        code: "RATE_LIMITED",
      },
      { status: 429 },
    );
  }

  const result = await registerTraveller(parsed.data, {
    ip,
    userAgent: request.headers.get("user-agent") ?? undefined,
  });

  if (!result.ok) {
    recordFailedAttempt(limitKey);
    return NextResponse.json({ ok: false, error: result.error }, { status: 409 });
  }

  return NextResponse.json({ ok: true, message: result.message });
}
