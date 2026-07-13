import bcrypt from "bcryptjs";
import type { AdminLoginRequest } from "@/lib/validations/admin-auth";
import {
  LOCAL_ADMIN_ID,
  readLocalAdmin,
  type LocalAdminRecord,
} from "@/server/auth/local-admin-store";

const GENERIC_FAILURE = "Invalid email or password.";

export async function authenticateLocalAdmin(
  input: AdminLoginRequest,
): Promise<
  | { ok: true; userId: string; remember: boolean; user: LocalAdminRecord }
  | { ok: false; error: string }
> {
  const record = readLocalAdmin();
  if (!record?.passwordHash) {
    return {
      ok: false,
      error: "Admin account not configured. Run: npm run admin:setup -- your@email.com 'YourPassword'",
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

  return {
    ok: true,
    userId: LOCAL_ADMIN_ID,
    remember: input.remember ?? false,
    user: record,
  };
}

export function resolveLocalAdminUser(userId: string): LocalAdminRecord | null {
  if (userId !== LOCAL_ADMIN_ID) return null;
  return readLocalAdmin();
}
