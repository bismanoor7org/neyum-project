/** Public contact / concierge channels — used by sticky CTA & WhatsApp FAB. */

export const CONCIERGE_EMAIL =
  process.env.NEXT_PUBLIC_CONCIERGE_EMAIL?.trim() ||
  "concierge@fijiluxuryexperiences.com";

/** Display phone (with formatting). */
export const CONCIERGE_PHONE_DISPLAY =
  process.env.NEXT_PUBLIC_CONCIERGE_PHONE?.trim() || "+679 000 0000";

/** Digits only for tel: links. */
export const CONCIERGE_PHONE_TEL = CONCIERGE_PHONE_DISPLAY.replace(/[^\d+]/g, "");

/**
 * WhatsApp number in international format without + (e.g. 6799999999).
 * Falls back to phone digits if NEXT_PUBLIC_WHATSAPP_NUMBER unset.
 */
export function getWhatsAppNumber(): string {
  const explicit = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
  if (explicit) return explicit;
  return CONCIERGE_PHONE_TEL.replace(/\D/g, "");
}

export function buildWhatsAppUrl(prefill?: string): string {
  const num = getWhatsAppNumber();
  const text = encodeURIComponent(
    prefill ||
      "Bula — I'd like to speak with the My Fiji Tour concierge about a luxury journey.",
  );
  return `https://wa.me/${num}?text=${text}`;
}
