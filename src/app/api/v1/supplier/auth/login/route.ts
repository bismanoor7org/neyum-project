import { NextResponse } from "next/server";
import {
  SUPPLIER_SESSION_COOKIE,
  createSupplierSessionToken,
  getSupplierSessionCookieOptions,
} from "@/lib/auth/supplier-session";
import { supplierLoginRequestSchema } from "@/lib/validations/admin-auth";
import { authenticateSupplier } from "@/server/services/supplier-auth.service";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const parsed = supplierLoginRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Validation failed" }, { status: 400 });
  }

  const result = await authenticateSupplier(parsed.data, {
    ip: request.headers.get("x-forwarded-for") ?? undefined,
    userAgent: request.headers.get("user-agent") ?? undefined,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 401 });
  }

  let token: string;
  try {
    token = await createSupplierSessionToken(result.userId, result.remember);
  } catch {
    return NextResponse.json({ ok: false, error: "Server session configuration error" }, { status: 503 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SUPPLIER_SESSION_COOKIE, token, getSupplierSessionCookieOptions(result.remember));
  return response;
}
