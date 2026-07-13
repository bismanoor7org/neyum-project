/**
 * Local supplier bootstrap (no PostgreSQL required).
 * Usage: npm run supplier:setup -- email@company.com 'Password123!' 'Company Name'
 */
import { randomBytes } from "crypto";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { getLocalSupplierSetupInfo, writeLocalSupplier } from "../src/server/auth/local-supplier-store";

const envPath = resolve(__dirname, "..", ".env.local");

function readEnvValue(key: string): string | null {
  if (!existsSync(envPath)) return null;
  const match = readFileSync(envPath, "utf8").match(new RegExp(`^${key}="([^"]*)"`));
  return match?.[1] ?? null;
}

function upsertEnv(key: string, value: string) {
  let content = existsSync(envPath) ? readFileSync(envPath, "utf8") : "";
  const line = `${key}="${value}"`;
  const pattern = new RegExp(`^${key}=.*$`, "m");
  content = pattern.test(content) ? content.replace(pattern, line) : `${content.trimEnd()}\n${line}\n`;
  writeFileSync(envPath, content, "utf8");
}

async function main() {
  const email = process.argv[2]?.toLowerCase().trim();
  const password = process.argv[3];
  const companyName = process.argv[4] ?? "Fiji Experiences Ltd";

  if (!email || !password) {
    console.error("Usage: npm run supplier:setup -- email@company.com 'Password123!' 'Company Name'");
    process.exit(1);
  }

  const secret = readEnvValue("ADMIN_SESSION_SECRET") ?? randomBytes(32).toString("hex");
  upsertEnv("ADMIN_SESSION_SECRET", secret);

  const record = writeLocalSupplier({ email, password, companyName });
  const info = getLocalSupplierSetupInfo(record);

  console.log("\n✓ Supplier partner account ready\n");
  console.log(`  Email       : ${info.email}`);
  console.log(`  Company     : ${info.companyName}`);
  console.log(`  2FA Key     : ${info.twoFactorSecret}`);
  console.log(`  Code now    : ${info.currentCode}`);
  console.log("\nSign in at /supplier/login\n");
}

main().catch((e) => { console.error(e); process.exit(1); });
