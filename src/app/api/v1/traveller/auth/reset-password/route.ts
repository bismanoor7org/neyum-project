import { NextResponse } from "next/server";
import { resetPasswordSchema } from "@/lib/validations/traveller-auth";
import { clientIp } from "@/server/auth/client-ip";
import { resetTravellerPassword } from "@/server/services/traveller-password.service";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const parsed = resetPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Validation failed" }, { status: 400 });
  }

  const result = await resetTravellerPassword(parsed.data, {
    ip: clientIp(request),
    userAgent: request.headers.get("user-agent") ?? undefined,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
