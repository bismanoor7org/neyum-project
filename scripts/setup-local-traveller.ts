/**
 * Local traveller bootstrap (no PostgreSQL required).
 *
 * Usage:
 *   npm run traveller:setup -- you@email.com 'YourPassword123!'
 */
import { randomBytes } from "crypto";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { getLocalTravellerSetupInfo, writeLocalTraveller } from "../src/server/auth/local-traveller-store";

const root = resolve(__dirname, "..");
const envPath = resolve(root, ".env.local");

function readEnvValue(key: string): string | null {
  if (!existsSync(envPath)) return null;
  const match = readFileSync(envPath, "utf8").match(new RegExp(`^${key}="([^"]*)"`));
  return match?.[1] ?? null;
}

function upsertEnv(key: string, value: string) {
  let content = existsSync(envPath) ? readFileSync(envPath, "utf8") : "";
  const line = `${key}="${value}"`;
  const pattern = new RegExp(`^${key}=.*$`, "m");
  if (pattern.test(content)) {
    content = content.replace(pattern, line);
  } else {
    content = content.trimEnd() + (content.endsWith("\n") || content.length === 0 ? "" : "\n") + line + "\n";
  }
  writeFileSync(envPath, content, "utf8");
}

async function main() {
  const email = process.argv[2]?.toLowerCase().trim();
  const password = process.argv[3];

  if (!email || !password) {
    console.error("Usage: npm run traveller:setup -- email@example.com 'YourPassword123!'");
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("Password must be at least 8 characters.");
    process.exit(1);
  }

  const existingSecret = readEnvValue("ADMIN_SESSION_SECRET");
  const sessionSecret =
    existingSecret && existingSecret.length >= 32 ? existingSecret : randomBytes(32).toString("hex");
  upsertEnv("ADMIN_SESSION_SECRET", sessionSecret);

  const record = writeLocalTraveller({
    email,
    password,
    emailVerifiedAt: new Date().toISOString(),
  });
  const info = getLocalTravellerSetupInfo(record);

  console.log("\n✓ Local traveller account ready (no database required)\n");
  console.log(`  Email      : ${info.email}`);
  console.log(`  Store file : data/local-traveller.json`);
  console.log("\nRestart `npm run dev`, then sign in at /traveller/login with your email and password.\n");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
