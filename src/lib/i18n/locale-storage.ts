import { LANGUAGES } from "@/lib/constants";

export const LOCALE_STORAGE_KEY = "fiji-locale";
export const LOCALE_COOKIE_KEY = "fiji-locale";
/** 1 year */
export const LOCALE_COOKIE_MAX_AGE = 31_536_000;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

const CODE_TO_LOCALE: Record<string, string> = Object.fromEntries(
  LANGUAGES.map((lang) => [lang.code, lang.locale]),
);

export function localeFromCode(code: string | null | undefined): string {
  if (!code) return "en";
  return CODE_TO_LOCALE[code] ?? "en";
}

export function readCookieLocaleCode(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${LOCALE_COOKIE_KEY}=([^;]*)`),
  );
  if (!match?.[1]) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

export function readStoredLocaleCode(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const fromStorage = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (fromStorage) return fromStorage;
  } catch {
    /* private browsing */
  }
  return readCookieLocaleCode();
}

export function persistLocaleCode(code: LanguageCode): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, code);
  } catch {
    /* private browsing */
  }
  document.cookie = `${LOCALE_COOKIE_KEY}=${encodeURIComponent(code)};path=/;max-age=${LOCALE_COOKIE_MAX_AGE};SameSite=Lax`;
}

/** Inline bootstrap — runs before React hydration (mirrors theme script) */
export function localeBootstrapScript(): string {
  const codeMap = JSON.stringify(CODE_TO_LOCALE);
  return `(function(){try{var k="${LOCALE_STORAGE_KEY}",m=${codeMap},code=localStorage.getItem(k);if(!code){var c=document.cookie.match(/(?:^|; )${LOCALE_COOKIE_KEY}=([^;]*)/);if(c)code=decodeURIComponent(c[1])}if(code){document.documentElement.dataset.locale=code;var loc=m[code]||"en";document.documentElement.lang=loc;document.documentElement.dir=loc==="ar"?"rtl":"ltr"}}catch(e){}})();`;
}
