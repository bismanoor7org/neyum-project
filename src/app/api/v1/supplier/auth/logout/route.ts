import { NextResponse } from "next/server";
import { SUPPLIER_SESSION_COOKIE } from "@/lib/auth/supplier-session";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SUPPLIER_SESSION_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return response;
}
