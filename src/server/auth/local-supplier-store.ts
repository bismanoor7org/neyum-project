import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import bcrypt from "bcryptjs";
import { createTotpSecret, currentTotpCode, totpProvisioningUri } from "@/lib/auth/totp";

export const LOCAL_SUPPLIER_ID = "local-supplier";
export const LOCAL_SUPPLIER_USER_ID = "local-supplier-user";

export type LocalSupplierRecord = {
  id: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  passwordHash: string;
  twoFactorSecret: string;
  twoFactorEnabled: boolean;
  verificationStatus: "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED" | "VERIFIED";
  kycStatus: "NOT_STARTED" | "IN_REVIEW" | "APPROVED" | "REJECTED" | "RESUBMIT_REQUIRED";
  onboardingStep: number;
  rating: number;
  healthScore: number;
};

const STORE_DIR = join(process.cwd(), "data");
const STORE_PATH = join(STORE_DIR, "local-supplier.json");

export function isDatabaseConfigured(): boolean {
  const url = process.env.DATABASE_URL?.trim();
  return Boolean(url && !url.startsWith("file:"));
}

export function readLocalSupplier(): LocalSupplierRecord | null {
  try {
    if (!existsSync(STORE_PATH)) return null;
    return JSON.parse(readFileSync(STORE_PATH, "utf8")) as LocalSupplierRecord;
  } catch {
    return null;
  }
}

export function writeLocalSupplier(input: {
  email: string;
  password: string;
  companyName: string;
  firstName?: string;
  lastName?: string;
}): LocalSupplierRecord {
  mkdirSync(STORE_DIR, { recursive: true });
  const twoFactorSecret = createTotpSecret();
  const record: LocalSupplierRecord = {
    id: LOCAL_SUPPLIER_ID,
    userId: LOCAL_SUPPLIER_USER_ID,
    email: input.email.toLowerCase().trim(),
    firstName: input.firstName ?? "Supplier",
    lastName: input.lastName ?? "Owner",
    companyName: input.companyName,
    passwordHash: bcrypt.hashSync(input.password, 12),
    twoFactorSecret,
    twoFactorEnabled: true,
    verificationStatus: "APPROVED",
    kycStatus: "APPROVED",
    onboardingStep: 5,
    rating: 4.8,
    healthScore: 92,
  };
  writeFileSync(STORE_PATH, JSON.stringify(record, null, 2), "utf8");
  return record;
}

export function getLocalSupplierSetupInfo(record: LocalSupplierRecord) {
  return {
    email: record.email,
    companyName: record.companyName,
    twoFactorSecret: record.twoFactorSecret,
    otpauth: totpProvisioningUri(record.email, record.twoFactorSecret),
    currentCode: currentTotpCode(record.twoFactorSecret),
  };
}
