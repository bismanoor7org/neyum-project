import type { BookingDraft, BookingSearchParams, BookingTab, RecentSearch } from "@/lib/booking/types";
import { DEFAULT_BOOKING_DRAFT } from "@/lib/booking/types";

const DRAFT_KEY = "neyum-booking-draft";
const RECENT_KEY = "neyum-booking-recent";
const MAX_RECENT = 5;

function canUseStorage() {
  return typeof window !== "undefined" && !!window.localStorage;
}

export function loadBookingDraft(): BookingDraft {
  if (!canUseStorage()) return DEFAULT_BOOKING_DRAFT;
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return DEFAULT_BOOKING_DRAFT;
    const parsed = JSON.parse(raw) as Partial<BookingDraft>;
    return {
      ...DEFAULT_BOOKING_DRAFT,
      ...parsed,
      travellers: {
        ...DEFAULT_BOOKING_DRAFT.travellers,
        ...parsed.travellers,
      },
    };
  } catch {
    return DEFAULT_BOOKING_DRAFT;
  }
}

export function saveBookingDraft(draft: BookingDraft) {
  if (!canUseStorage()) return;
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    /* quota exceeded — ignore */
  }
}

export function loadRecentSearches(): RecentSearch[] {
  if (!canUseStorage()) return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as RecentSearch[];
  } catch {
    return [];
  }
}

export function addRecentSearch(entry: Omit<RecentSearch, "id" | "searchedAt">) {
  if (!canUseStorage()) return;
  const existing = loadRecentSearches().filter(
    (r) => !(r.destinationSlug === entry.destinationSlug && r.tab === entry.tab),
  );
  const next: RecentSearch[] = [
    {
      ...entry,
      id: `${entry.tab}-${entry.destinationSlug}`,
      searchedAt: Date.now(),
    },
    ...existing,
  ].slice(0, MAX_RECENT);
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

export function parseSearchParams(
  params: URLSearchParams,
): Partial<BookingSearchParams> | null {
  const tab = params.get("tab") as BookingTab | null;
  const destination = params.get("destination");
  const checkin = params.get("checkin");
  const checkout = params.get("checkout");
  const adults = params.get("adults");
  const children = params.get("children");
  const infants = params.get("infants");
  const rooms = params.get("rooms");

  if (!destination && !checkin) return null;

  return {
    tab: tab === "experiences" || tab === "packages" ? tab : "stay",
    destination: destination ?? "",
    checkin: checkin ?? "",
    checkout: checkout ?? "",
    adults: adults ? Number(adults) : 2,
    children: children ? Number(children) : 0,
    infants: infants ? Number(infants) : 0,
    rooms: rooms ? Number(rooms) : 1,
    experience: params.get("experience") ?? undefined,
    package: params.get("package") ?? undefined,
  };
}

export function draftFromSearchParams(
  params: Partial<BookingSearchParams>,
): Partial<BookingDraft> {
  return {
    tab: params.tab ?? "stay",
    destinationSlug: params.destination || null,
    destinationTitle: null,
    checkIn: params.checkin || null,
    checkOut: params.checkout || null,
    travellers: {
      adults: params.adults ?? 2,
      children: params.children ?? 0,
      infants: params.infants ?? 0,
      rooms: params.rooms ?? 1,
    },
    experienceType: params.experience ?? null,
    packageStyle: params.package ?? null,
  };
}

export function buildSearchUrl(params: BookingSearchParams): string {
  const q = new URLSearchParams();
  q.set("tab", params.tab);
  if (params.destination) q.set("destination", params.destination);
  if (params.checkin) q.set("checkin", params.checkin);
  if (params.checkout) q.set("checkout", params.checkout);
  q.set("adults", String(params.adults));
  q.set("children", String(params.children));
  q.set("infants", String(params.infants));
  q.set("rooms", String(params.rooms));
  if (params.experience) q.set("experience", params.experience);
  if (params.package) q.set("package", params.package);
  return `/search?${q.toString()}`;
}
