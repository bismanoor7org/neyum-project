/**
 * Generates public/locales/{locale}.json from merged TS translation packs.
 * Run: npx tsx scripts/generate-locale-json.ts
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { LANGUAGES } from "../src/lib/constants";
import { en } from "../src/lib/i18n/en";
import { deepMerge } from "../src/lib/i18n/merge";
import { localePacks } from "../src/lib/i18n/packs";
import { localeSupplements } from "../src/lib/i18n/packs-supplement";
import { localeExtras } from "../src/lib/i18n/packs-extra";
import { localeNavMega } from "../src/lib/i18n/packs-nav";
import { localeSeo } from "../src/lib/i18n/packs-seo";
import type { Messages } from "../src/lib/i18n/en";

const outDir = join(process.cwd(), "public", "locales");
mkdirSync(outDir, { recursive: true });

writeFileSync(join(outDir, "en.json"), JSON.stringify(en, null, 2), "utf8");
console.log("Wrote en.json");

for (const { locale } of LANGUAGES) {
  if (locale === "en") continue;

  let messages: Messages = en;
  const pack = localePacks[locale];
  const supplement = localeSupplements[locale];
  const extra = localeExtras[locale];
  const navMega = localeNavMega[locale];
  const seo = localeSeo[locale];
  if (pack) messages = deepMerge(messages, pack as Partial<Messages>);
  if (supplement) messages = deepMerge(messages, supplement as Partial<Messages>);
  if (extra) messages = deepMerge(messages, extra as Partial<Messages>);
  if (navMega) messages = deepMerge(messages, navMega as Partial<Messages>);
  if (seo) messages = deepMerge(messages, seo as Partial<Messages>);

  writeFileSync(
    join(outDir, `${locale}.json`),
    JSON.stringify(messages, null, 2),
    "utf8",
  );
  console.log(`Wrote ${locale}.json`);
}

console.log(`Done — ${LANGUAGES.length} locale files in public/locales/`);
