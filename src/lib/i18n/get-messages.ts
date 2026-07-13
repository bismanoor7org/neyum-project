import type { Locale } from "@/lib/i18n/messages";
import { en, type Messages } from "@/lib/i18n/en";
import { deepMerge } from "@/lib/i18n/merge";

const messageCache = new Map<Locale, Messages>();
messageCache.set("en", en);

/** Sync access — English only unless locale pack already loaded */
export function getMessages(locale: Locale): Messages {
  return messageCache.get(locale) ?? en;
}

async function loadJsonPack(locale: Locale): Promise<Partial<Messages> | null> {
  try {
    const res = await fetch(`/locales/${locale}.json`, { cache: "force-cache" });
    if (!res.ok) return null;
    return (await res.json()) as Partial<Messages>;
  } catch {
    return null;
  }
}

async function loadTsPacks(locale: Locale): Promise<Messages> {
  const [{ localePacks }, { localeSupplements }, { localeExtras }, { localeNavMega }, { localeSeo }] =
    await Promise.all([
      import("@/lib/i18n/packs"),
      import("@/lib/i18n/packs-supplement"),
      import("@/lib/i18n/packs-extra"),
      import("@/lib/i18n/packs-nav"),
      import("@/lib/i18n/packs-seo"),
    ]);

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
  return messages;
}

/** Load translation packs on demand (skips ~600KB for default English visitors) */
export async function loadMessages(locale: Locale): Promise<Messages> {
  if (locale === "en") return en;

  const cached = messageCache.get(locale);
  if (cached) return cached;

  const jsonPack = await loadJsonPack(locale);
  let messages = await loadTsPacks(locale);
  if (jsonPack) messages = deepMerge(messages, jsonPack as Partial<Messages>);

  messageCache.set(locale, messages);
  return messages;
}

export type { Messages };
export { en } from "@/lib/i18n/en";
