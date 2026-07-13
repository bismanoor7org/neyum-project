import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { hashToken } from "@/lib/auth/token-hash";

type AuthTokenType = "EMAIL_VERIFICATION" | "PASSWORD_RESET";

export type LocalAuthTokenRecord = {
  id: string;
  userId: string;
  type: AuthTokenType;
  tokenHash: string;
  expiresAt: string;
  usedAt: string | null;
  createdAt: string;
};

const STORE_DIR = join(process.cwd(), "data");
const STORE_PATH = join(STORE_DIR, "local-auth-tokens.json");

function readAll(): LocalAuthTokenRecord[] {
  try {
    if (!existsSync(STORE_PATH)) return [];
    return JSON.parse(readFileSync(STORE_PATH, "utf8")) as LocalAuthTokenRecord[];
  } catch {
    return [];
  }
}

function writeAll(records: LocalAuthTokenRecord[]) {
  mkdirSync(STORE_DIR, { recursive: true });
  writeFileSync(STORE_PATH, JSON.stringify(records, null, 2), "utf8");
}

export function createLocalAuthToken(input: {
  id: string;
  userId: string;
  type: AuthTokenType;
  token: string;
  expiresAt: Date;
}): void {
  const records = readAll().filter(
    (r) => !(r.userId === input.userId && r.type === input.type && !r.usedAt),
  );
  records.push({
    id: input.id,
    userId: input.userId,
    type: input.type,
    tokenHash: hashToken(input.token),
    expiresAt: input.expiresAt.toISOString(),
    usedAt: null,
    createdAt: new Date().toISOString(),
  });
  writeAll(records);
}

export function consumeLocalAuthToken(
  token: string,
  type: AuthTokenType,
): { userId: string } | null {
  const hashed = hashToken(token);
  const records = readAll();
  const now = Date.now();
  const match = records.find(
    (r) =>
      r.tokenHash === hashed &&
      r.type === type &&
      !r.usedAt &&
      new Date(r.expiresAt).getTime() > now,
  );
  if (!match) return null;

  const updated = records.map((r) =>
    r.id === match.id ? { ...r, usedAt: new Date().toISOString() } : r,
  );
  writeAll(updated);
  return { userId: match.userId };
}

export function findValidLocalAuthToken(
  token: string,
  type: AuthTokenType,
): { userId: string } | null {
  const hashed = hashToken(token);
  const now = Date.now();
  const match = readAll().find(
    (r) =>
      r.tokenHash === hashed &&
      r.type === type &&
      !r.usedAt &&
      new Date(r.expiresAt).getTime() > now,
  );
  return match ? { userId: match.userId } : null;
}
