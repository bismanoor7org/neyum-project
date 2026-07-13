import { randomBytes, randomUUID } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import bcrypt from "bcryptjs";

export const LOCAL_ADMIN_ID = "local-admin";

export type LocalAdminRecord = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
};

const STORE_DIR = join(process.cwd(), "data");
const STORE_PATH = join(STORE_DIR, "local-admin.json");

export function localAdminStorePath(): string {
  return STORE_PATH;
}

export function readLocalAdmin(): LocalAdminRecord | null {
  try {
    if (!existsSync(STORE_PATH)) return null;
    const raw = readFileSync(STORE_PATH, "utf8");
    return JSON.parse(raw) as LocalAdminRecord;
  } catch {
    return null;
  }
}

export function writeLocalAdmin(input: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}): LocalAdminRecord {
  mkdirSync(STORE_DIR, { recursive: true });

  const record: LocalAdminRecord = {
    id: LOCAL_ADMIN_ID,
    email: input.email.toLowerCase().trim(),
    firstName: input.firstName ?? "Platform",
    lastName: input.lastName ?? "Admin",
    passwordHash: bcrypt.hashSync(input.password, 12),
  };

  writeFileSync(STORE_PATH, JSON.stringify(record, null, 2), "utf8");
  return record;
}

export function isDatabaseConfigured(): boolean {
  const url = process.env.DATABASE_URL?.trim();
  return Boolean(url && !url.startsWith("file:"));
}

export function getLocalAdminSetupInfo(record: LocalAdminRecord) {
  return {
    email: record.email,
  };
}

export function ensureSessionSecret(): string {
  const existing = process.env.ADMIN_SESSION_SECRET?.trim();
  if (existing && existing.length >= 32) return existing;
  return randomBytes(32).toString("hex");
}

export function newLocalAdminId(): string {
  return randomUUID();
}
