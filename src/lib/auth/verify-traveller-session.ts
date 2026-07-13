import {
  parseTravellerSessionCookie,
  verifyTravellerSessionToken,
} from "@/lib/auth/traveller-session";

export async function verifyTravellerSession(request: Request): Promise<string | null> {
  const cookieHeader = request.headers.get("cookie");
  const token = parseTravellerSessionCookie(cookieHeader);
  if (!token) return null;
  const session = await verifyTravellerSessionToken(token);
  return session?.userId ?? null;
}
