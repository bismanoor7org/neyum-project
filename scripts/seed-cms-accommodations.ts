/**
 * Seeds local CMS JSON stores (data/cms/accommodations.json) when DATABASE_URL is not set.
 * Run: npx tsx scripts/seed-cms-accommodations.ts
 */
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";
import { buildAccommodationCmsSeedRecords } from "../src/lib/cms/seed-accommodations";

const CMS_DIR = join(process.cwd(), "data", "cms");

function writeJson(name: string, data: unknown) {
  mkdirSync(CMS_DIR, { recursive: true });
  writeFileSync(join(CMS_DIR, `${name}.json`), JSON.stringify(data, null, 2), "utf8");
}

const now = new Date().toISOString();

const records = buildAccommodationCmsSeedRecords().map((row) => ({
  ...row,
  id: randomUUID(),
  createdAt: now,
  updatedAt: now,
}));

writeJson("accommodations", records);

console.log(`Seeded ${records.length} accommodations → data/cms/accommodations.json`);
