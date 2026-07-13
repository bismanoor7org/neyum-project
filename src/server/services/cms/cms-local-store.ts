import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";
import type {
  ApprovalStatus,
  CmsEntityType,
  ContentStatus,
  GuideCategory,
  SupplierContentType,
} from "@prisma/client";

const CMS_DIR = join(process.cwd(), "data", "cms");

export type StoreFile =
  | "homepage-sections"
  | "banners"
  | "destinations"
  | "guides"
  | "faqs"
  | "testimonials"
  | "media"
  | "seo"
  | "supplier-submissions"
  | "tours"
  | "transport"
  | "accommodations"
  | "deals"
  | "navigation"
  | "staff";

function storePath(name: StoreFile): string {
  return join(CMS_DIR, `${name}.json`);
}

function readStore<T>(name: StoreFile): T[] {
  mkdirSync(CMS_DIR, { recursive: true });
  const path = storePath(name);
  if (!existsSync(path)) {
    writeFileSync(path, "[]", "utf8");
    return [];
  }
  try {
    return JSON.parse(readFileSync(path, "utf8")) as T[];
  } catch {
    return [];
  }
}

function writeStore<T>(name: StoreFile, items: T[]): void {
  mkdirSync(CMS_DIR, { recursive: true });
  writeFileSync(storePath(name), JSON.stringify(items, null, 2), "utf8");
}

export type LocalRecord = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export function listLocal<T extends Record<string, unknown>>(name: StoreFile): T[] {
  return readStore<T>(name);
}

export function getLocal<T extends Record<string, unknown>>(name: StoreFile, id: string): T | null {
  return readStore<T>(name).find((item) => item.id === id) ?? null;
}

export function createLocal<T extends Record<string, unknown>>(
  name: StoreFile,
  data: T,
): T & LocalRecord {
  const now = new Date().toISOString();
  const record = { ...data, id: randomUUID(), createdAt: now, updatedAt: now } as T & LocalRecord;
  const items = readStore<T & LocalRecord>(name);
  items.unshift(record);
  writeStore(name, items);
  return record;
}

export function updateLocal<T extends Record<string, unknown>>(
  name: StoreFile,
  id: string,
  patch: Partial<T>,
): (T & LocalRecord) | null {
  const items = readStore<T>(name);
  const index = items.findIndex((item) => item.id === id);
  if (index < 0) return null;
  items[index] = {
    ...items[index],
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  writeStore(name, items);
  return items[index] as T & LocalRecord;
}

export function deleteLocal(name: StoreFile, id: string): boolean {
  const items = readStore<LocalRecord>(name);
  const next = items.filter((item) => item.id !== id);
  if (next.length === items.length) return false;
  writeStore(name, next);
  return true;
}

export function paginateLocal<T>(
  items: T[],
  page: number,
  pageSize: number,
): { items: T[]; total: number } {
  const start = (page - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    total: items.length,
  };
}

export type {
  ContentStatus,
  GuideCategory,
  CmsEntityType,
  ApprovalStatus,
  SupplierContentType,
};
