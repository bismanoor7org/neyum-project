import bcrypt from "bcryptjs";
import { verifyTotpCode } from "@/lib/auth/totp";
import type { SupplierLoginRequest } from "@/lib/validations/admin-auth";
import {
  LOCAL_SUPPLIER_USER_ID,
  readLocalSupplier,
  type LocalSupplierRecord,
} from "@/server/auth/local-supplier-store";
import type { User, UserRole, UserStatus } from "@prisma/client";

const GENERIC_FAILURE = "Invalid email, password, or two-factor code.";

export async function authenticateLocalSupplier(
  input: SupplierLoginRequest,
): Promise<
  | { ok: true; userId: string; remember: boolean; supplier: LocalSupplierRecord }
  | { ok: false; error: string }
> {
  const record = readLocalSupplier();
  if (!record?.twoFactorEnabled || !record.twoFactorSecret) {
    return {
      ok: false,
      error: "Supplier account not configured. Run: npm run supplier:setup",
    };
  }

  const email = input.email.toLowerCase().trim();
  if (email !== record.email) return { ok: false, error: GENERIC_FAILURE };

  const passwordValid = await bcrypt.compare(input.password, record.passwordHash);
  if (!passwordValid) return { ok: false, error: GENERIC_FAILURE };

  const totpValid = verifyTotpCode(input.twoFactor, record.twoFactorSecret);
  if (!totpValid) return { ok: false, error: GENERIC_FAILURE };

  return {
    ok: true,
    userId: record.userId,
    remember: input.remember ?? false,
    supplier: record,
  };
}

export function resolveLocalSupplierUser(userId: string): User | null {
  if (userId !== LOCAL_SUPPLIER_USER_ID) return null;
  const record = readLocalSupplier();
  if (!record) return null;

  return {
    id: record.userId,
    clerkId: null,
    googleId: null,
    emailVerifiedAt: null,
    firstName: record.firstName,
    lastName: record.lastName,
    email: record.email,
    passwordHash: record.passwordHash,
    twoFactorSecret: record.twoFactorSecret,
    twoFactorEnabled: record.twoFactorEnabled,
    phone: null,
    avatar: null,
    role: "SUPPLIER" as UserRole,
    status: "ACTIVE" as UserStatus,
    lastLoginAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function resolveLocalSupplierProfile(userId: string): LocalSupplierRecord | null {
  if (userId !== LOCAL_SUPPLIER_USER_ID) return null;
  return readLocalSupplier();
}
