import type { BookingTab, EnquiryPayload, EnquirySource } from "./types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BOOKING_TABS = new Set<BookingTab>(["stay", "experiences", "packages"]);
const SOURCES = new Set<EnquirySource>(["contact", "booking", "journey", "newsletter", "visa-checker"]);

export function parseEnquiryBody(body: unknown):
  | { ok: true; data: EnquiryPayload }
  | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body" };
  }

  const raw = body as Record<string, unknown>;
  const firstName = String(raw.firstName ?? "").trim();
  const lastName = String(raw.lastName ?? "").trim();
  const email = String(raw.email ?? "").trim().toLowerCase();
  const message = String(raw.message ?? "").trim();
  const locale = String(raw.locale ?? "en").trim() || "en";
  const source = String(raw.source ?? "contact") as EnquirySource;
  const bookingTab = raw.bookingTab
    ? (String(raw.bookingTab) as BookingTab)
    : undefined;

  if (!firstName || !lastName) {
    return { ok: false, error: "Name is required" };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Valid email is required" };
  }
  if (message.length < 10) {
    return { ok: false, error: "Message must be at least 10 characters" };
  }
  if (!SOURCES.has(source)) {
    return { ok: false, error: "Invalid enquiry source" };
  }
  if (bookingTab && !BOOKING_TABS.has(bookingTab)) {
    return { ok: false, error: "Invalid booking type" };
  }

  return {
    ok: true,
    data: {
      firstName,
      lastName,
      email,
      message,
      locale,
      source,
      bookingTab,
    },
  };
}
