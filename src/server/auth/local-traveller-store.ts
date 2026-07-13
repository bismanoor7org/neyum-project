import { randomBytes, randomUUID } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import bcrypt from "bcryptjs";

export const LOCAL_TRAVELLER_ID = "local-traveller";

export type LocalTravellerRecord = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  avatar?: string;
  loyaltyPoints: number;
  loyaltyTier: string;
  walletBalance: number;
  emailVerifiedAt?: string | null;
  googleId?: string | null;
};

const STORE_DIR = join(process.cwd(), "data");
const STORE_PATH = join(STORE_DIR, "local-traveller.json");

export function localTravellerStorePath(): string {
  return STORE_PATH;
}

export function readLocalTraveller(): LocalTravellerRecord | null {
  try {
    if (!existsSync(STORE_PATH)) return null;
    const raw = readFileSync(STORE_PATH, "utf8");
    return JSON.parse(raw) as LocalTravellerRecord;
  } catch {
    return null;
  }
}

export function writeLocalTraveller(input: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  emailVerifiedAt?: string | null;
  googleId?: string | null;
}): LocalTravellerRecord {
  mkdirSync(STORE_DIR, { recursive: true });

  const record: LocalTravellerRecord = {
    id: LOCAL_TRAVELLER_ID,
    email: input.email.toLowerCase().trim(),
    firstName: input.firstName ?? "Fiji",
    lastName: input.lastName ?? "Explorer",
    passwordHash: bcrypt.hashSync(input.password, 12),
    loyaltyPoints: 2840,
    loyaltyTier: "VOYAGER",
    walletBalance: 150,
    emailVerifiedAt: input.emailVerifiedAt ?? null,
    googleId: input.googleId ?? null,
  };

  writeFileSync(STORE_PATH, JSON.stringify(record, null, 2), "utf8");
  return record;
}

export function updateLocalTraveller(
  patch: Partial<Pick<LocalTravellerRecord, "emailVerifiedAt" | "googleId" | "passwordHash" | "firstName" | "lastName">>,
): LocalTravellerRecord | null {
  const current = readLocalTraveller();
  if (!current) return null;
  const updated = { ...current, ...patch };
  writeFileSync(STORE_PATH, JSON.stringify(updated, null, 2), "utf8");
  return updated;
}

export function isTravellerDatabaseConfigured(): boolean {
  const url = process.env.DATABASE_URL?.trim();
  return Boolean(url && !url.startsWith("file:"));
}

export function getLocalTravellerSetupInfo(record: LocalTravellerRecord) {
  return { email: record.email };
}

export function ensureTravellerSessionSecret(): string {
  const existing = process.env.ADMIN_SESSION_SECRET?.trim();
  if (existing && existing.length >= 32) return existing;
  return randomBytes(32).toString("hex");
}

export function newLocalTravellerId(): string {
  return randomUUID();
}
