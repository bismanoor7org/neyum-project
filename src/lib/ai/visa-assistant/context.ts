import "server-only";

import type { EntryGuide } from "@prisma/client";
import { FIJI_ENTRY_GUIDE_STATIC } from "@/data/visa/entry-guide";
import { detectIntent, detectNationalitySlug, type VisaQuestionIntent } from "@/lib/ai/visa-assistant/intent";
import { FIJI_DESTINATION } from "@/lib/visa/mappers";
import {
  getEntryGuide,
  getTravelDocumentRequirementBySlug,
  getVisaRequirement,
  searchVisaIntelligence,
} from "@/server/services/visa-intelligence.service";
import type { VisaRequirement } from "@/types/visa";
import type { VisaAssistantChatRequest } from "@/types/visa-assistant";

export type TravelDocumentInfo = NonNullable<
  Awaited<ReturnType<typeof getTravelDocumentRequirementBySlug>>
>;

export type VisaChatContext = {
  requirement: VisaRequirement | null;
  entryGuide: EntryGuide | null;
  travelDocuments: TravelDocumentInfo | null;
  mentionedSlug: string | null;
  intent: VisaQuestionIntent;
  destination: string;
  hasData: boolean;
};

const CACHE_MS = 300_000;

type CacheEntry<T> = { value: T; expiresAt: number };

const requirementCache = new Map<string, CacheEntry<VisaRequirement | null>>();
const travelDocCache = new Map<string, CacheEntry<TravelDocumentInfo | null>>();
let entryGuideCache: CacheEntry<EntryGuide | null> | null = null;

function readCache<T>(map: Map<string, CacheEntry<T>>, key: string): T | undefined {
  const hit = map.get(key);
  if (!hit || Date.now() > hit.expiresAt) {
    map.delete(key);
    return undefined;
  }
  return hit.value;
}

function writeCache<T>(map: Map<string, CacheEntry<T>>, key: string, value: T) {
  map.set(key, { value, expiresAt: Date.now() + CACHE_MS });
}

async function loadEntryGuide(): Promise<EntryGuide | null> {
  if (entryGuideCache && Date.now() <= entryGuideCache.expiresAt) {
    return entryGuideCache.value;
  }
  try {
    const guide = await getEntryGuide();
    const value = guide ?? {
      id: "static",
      ...FIJI_ENTRY_GUIDE_STATIC,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    entryGuideCache = { value, expiresAt: Date.now() + CACHE_MS };
    return value;
  } catch {
    const value = {
      id: "static",
      ...FIJI_ENTRY_GUIDE_STATIC,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    entryGuideCache = { value, expiresAt: Date.now() + CACHE_MS };
    return value;
  }
}

async function loadRequirement(slug: string): Promise<VisaRequirement | null> {
  const cached = readCache(requirementCache, slug);
  if (cached !== undefined) return cached;

  const value = await getVisaRequirement(slug);
  writeCache(requirementCache, slug, value);
  return value;
}

async function loadTravelDocuments(slug: string): Promise<TravelDocumentInfo | null> {
  const cached = readCache(travelDocCache, slug);
  if (cached !== undefined) return cached;

  try {
    const value = await getTravelDocumentRequirementBySlug(slug);
    writeCache(travelDocCache, slug, value);
    return value;
  } catch {
    writeCache(travelDocCache, slug, null);
    return null;
  }
}

export async function buildVisaChatContext(
  request: VisaAssistantChatRequest,
): Promise<VisaChatContext> {
  const intent = detectIntent(request.message);
  const search = await searchVisaIntelligence(request.message);

  const mentionedSlug = detectNationalitySlug(
    request.message,
    search.countries,
    request.nationalitySlug ?? request.intake?.nationality?.slug ?? null,
  );

  const [requirement, entryGuide, travelDocuments] = await Promise.all([
    mentionedSlug ? loadRequirement(mentionedSlug) : Promise.resolve(null),
    loadEntryGuide(),
    mentionedSlug ? loadTravelDocuments(mentionedSlug) : Promise.resolve(null),
  ]);

  return {
    requirement,
    entryGuide,
    travelDocuments,
    mentionedSlug,
    intent,
    destination: FIJI_DESTINATION,
    hasData: Boolean(requirement || entryGuide),
  };
}
