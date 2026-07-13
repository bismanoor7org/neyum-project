import bcrypt from "bcryptjs";
import type { AdminLoginRequest } from "@/lib/validations/admin-auth";
import {
  LOCAL_TRAVELLER_ID,
  readLocalTraveller,
  type LocalTravellerRecord,
} from "@/server/auth/local-traveller-store";

const GENERIC_FAILURE = "Invalid email or password.";
const EMAIL_NOT_VERIFIED =
  "Please verify your email before signing in. Check your inbox or request a new verification link.";

export async function authenticateLocalTraveller(
  input: AdminLoginRequest,
): Promise<
  | { ok: true; userId: string; remember: boolean; user: LocalTravellerRecord }
  | { ok: false; error: string; code?: "EMAIL_NOT_VERIFIED" }
> {
  const record = readLocalTraveller();
  if (!record?.passwordHash) {
    return {
      ok: false,
      error: "Traveller account not configured. Run: npm run traveller:setup -- your@email.com 'YourPassword'",
    };
  }

  const email = input.email.toLowerCase().trim();
  if (email !== record.email) {
    return { ok: false, error: GENERIC_FAILURE };
  }

  const passwordValid = await bcrypt.compare(input.password, record.passwordHash);
  if (!passwordValid) {
    return { ok: false, error: GENERIC_FAILURE };
  }

  if (!record.emailVerifiedAt && !record.googleId) {
    return { ok: false, error: EMAIL_NOT_VERIFIED, code: "EMAIL_NOT_VERIFIED" };
  }

  return {
    ok: true,
    userId: LOCAL_TRAVELLER_ID,
    remember: input.remember ?? false,
    user: record,
  };
}

export function resolveLocalTravellerUser(userId: string): LocalTravellerRecord | null {
  if (userId !== LOCAL_TRAVELLER_ID) return null;
  return readLocalTraveller();
}
