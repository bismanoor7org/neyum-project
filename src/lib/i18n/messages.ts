import type { LANGUAGES } from "@/lib/constants";

export type Locale = (typeof LANGUAGES)[number]["locale"];

export type NavMessageKey = keyof import("@/lib/i18n/en").Messages["nav"];

export const NAV_LABEL_KEYS: Record<string, NavMessageKey> = {
  "/destinations": "destinations",
  "/tours": "experiences",
  "/places-to-go": "destinations",
  "/things-to-do": "experiences",
  "/places-to-stay": "placesToStay",
  "/guides": "guides",
  "/deals-and-offers": "deals",
  "/tools": "tools",
};

export { getMessages, type Messages } from "@/lib/i18n/get-messages";
