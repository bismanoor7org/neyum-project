/**
 * Seeds local CMS JSON stores (data/cms/*.json) when DATABASE_URL is not set.
 * Run: npx tsx scripts/seed-cms-destinations.ts
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";
import {
  buildDestinationCmsSeedRecords,
  DESTINATIONS_HUB_DEFAULTS,
} from "../src/lib/cms/seed-destinations";

const CMS_DIR = join(process.cwd(), "data", "cms");

function writeJson(name: string, data: unknown) {
  mkdirSync(CMS_DIR, { recursive: true });
  writeFileSync(join(CMS_DIR, `${name}.json`), JSON.stringify(data, null, 2), "utf8");
}

function readJson<T>(name: string): T[] {
  const path = join(CMS_DIR, `${name}.json`);
  if (!existsSync(path)) return [];
  try {
    return JSON.parse(readFileSync(path, "utf8")) as T[];
  } catch {
    return [];
  }
}

const now = new Date().toISOString();

const destinationRecords = buildDestinationCmsSeedRecords().map((dest) => ({
  ...dest,
  id: randomUUID(),
  createdAt: now,
  updatedAt: now,
}));

writeJson("destinations", destinationRecords);

const existingSections = readJson<{ id: string; key: string }>("homepage-sections");
const hubExisting = existingSections.find((s) => s.key === DESTINATIONS_HUB_DEFAULTS.key);

const hubSection = {
  id: hubExisting?.id ?? randomUUID(),
  key: DESTINATIONS_HUB_DEFAULTS.key,
  title: DESTINATIONS_HUB_DEFAULTS.title,
  content: DESTINATIONS_HUB_DEFAULTS.content,
  status: DESTINATIONS_HUB_DEFAULTS.status,
  sortOrder: DESTINATIONS_HUB_DEFAULTS.sortOrder,
  createdAt: now,
  updatedAt: now,
};

const nextSections = [
  hubSection,
  ...existingSections.filter((s) => s.key !== DESTINATIONS_HUB_DEFAULTS.key),
];

writeJson("homepage-sections", nextSections);

console.log(`Seeded ${destinationRecords.length} destinations → data/cms/destinations.json`);
console.log(`Seeded destinations page copy → data/cms/homepage-sections.json`);
