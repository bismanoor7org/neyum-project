import {
  parseSupplierSessionCookie,
  verifySupplierSessionToken,
} from "@/lib/auth/supplier-session";

export async function verifySupplierSession(request: Request): Promise<string | null> {
  const token = parseSupplierSessionCookie(request.headers.get("cookie"));
  if (!token) return null;
  const session = await verifySupplierSessionToken(token);
  return session?.userId ?? null;
}

export async function verifySupplierSessionRequest(request: Request): Promise<boolean> {
  const userId = await verifySupplierSession(request);
  return userId !== null;
}
