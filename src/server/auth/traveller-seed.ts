import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const SEED_PATH = join(process.cwd(), "data", "traveller-seed.json");

export type TravellerSeed = {
  dashboard: Record<string, unknown>;
  bookings: unknown[];
  wishlist: unknown[];
  favourites: unknown[];
  messages: unknown[];
  notifications: unknown[];
  loyalty: Record<string, unknown>;
  trips: unknown[];
  payments: Record<string, unknown>;
  documents: unknown[];
  support: Record<string, unknown>;
  security: Record<string, unknown>;
  reviews: unknown[];
  companions: unknown[];
};

let cache: TravellerSeed | null = null;

export function readTravellerSeed(): TravellerSeed {
  if (cache) return cache;
  if (!existsSync(SEED_PATH)) {
    throw new Error("Traveller seed file missing: data/traveller-seed.json");
  }
  cache = JSON.parse(readFileSync(SEED_PATH, "utf8")) as TravellerSeed;
  return cache;
}

export function clearTravellerSeedCache() {
  cache = null;
}

export function appendTravellerBooking(booking: Record<string, unknown>) {
  const seed = readTravellerSeed();
  const bookings = [...(seed.bookings as Record<string, unknown>[])];
  bookings.unshift(booking);
  const updated = { ...seed, bookings };
  writeFileSync(SEED_PATH, JSON.stringify(updated, null, 2), "utf8");
  cache = updated as TravellerSeed;
}
