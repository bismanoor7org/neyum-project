import type { LocationSearchResult } from "@/lib/tools/world-time-weather/types";
import { COUNTRY_REFERENCE_BY_NAME } from "@/lib/tools/world-time-weather/country-reference";
import { normalizeSearchText } from "@/lib/tools/world-time-weather/rank-location-search";

/** Authoritative IANA zones for capitals, major cities, and tourist destinations. */
const CITY_TIMEZONE_MAP = new Map<string, string>([
  ["islamabad|pakistan", "Asia/Karachi"],
  ["karachi|pakistan", "Asia/Karachi"],
  ["lahore|pakistan", "Asia/Karachi"],
  ["rawalpindi|pakistan", "Asia/Karachi"],
  ["new delhi|india", "Asia/Kolkata"],
  ["delhi|india", "Asia/Kolkata"],
  ["mumbai|india", "Asia/Kolkata"],
  ["bangalore|india", "Asia/Kolkata"],
  ["bengaluru|india", "Asia/Kolkata"],
  ["chennai|india", "Asia/Kolkata"],
  ["kolkata|india", "Asia/Kolkata"],
  ["hyderabad|india", "Asia/Kolkata"],
  ["dubai|united arab emirates", "Asia/Dubai"],
  ["abu dhabi|united arab emirates", "Asia/Dubai"],
  ["london|united kingdom", "Europe/London"],
  ["paris|france", "Europe/Paris"],
  ["berlin|germany", "Europe/Berlin"],
  ["rome|italy", "Europe/Rome"],
  ["madrid|spain", "Europe/Madrid"],
  ["amsterdam|netherlands", "Europe/Amsterdam"],
  ["new york|united states", "America/New_York"],
  ["los angeles|united states", "America/Los_Angeles"],
  ["chicago|united states", "America/Chicago"],
  ["san francisco|united states", "America/Los_Angeles"],
  ["miami|united states", "America/New_York"],
  ["washington|united states", "America/New_York"],
  ["toronto|canada", "America/Toronto"],
  ["vancouver|canada", "America/Vancouver"],
  ["montreal|canada", "America/Toronto"],
  ["sydney|australia", "Australia/Sydney"],
  ["melbourne|australia", "Australia/Melbourne"],
  ["perth|australia", "Australia/Perth"],
  ["brisbane|australia", "Australia/Brisbane"],
  ["canberra|australia", "Australia/Sydney"],
  ["tokyo|japan", "Asia/Tokyo"],
  ["osaka|japan", "Asia/Tokyo"],
  ["singapore|singapore", "Asia/Singapore"],
  ["hong kong|hong kong", "Asia/Hong_Kong"],
  ["bangkok|thailand", "Asia/Bangkok"],
  ["seoul|south korea", "Asia/Seoul"],
  ["beijing|china", "Asia/Shanghai"],
  ["shanghai|china", "Asia/Shanghai"],
  ["auckland|new zealand", "Pacific/Auckland"],
  ["wellington|new zealand", "Pacific/Auckland"],
  ["prague|czech republic", "Europe/Prague"],
  ["prague|czechia", "Europe/Prague"],
  ["istanbul|turkey", "Europe/Istanbul"],
  ["doha|qatar", "Asia/Qatar"],
  ["nadi|fiji", "Pacific/Fiji"],
  ["suva|fiji", "Pacific/Fiji"],
]);

/** Default IANA zone when a country spans multiple offsets (capital / primary hub). */
const COUNTRY_DEFAULT_TIMEZONE = new Map<string, string>([
  ["pakistan", "Asia/Karachi"],
  ["india", "Asia/Kolkata"],
  ["united kingdom", "Europe/London"],
  ["united states", "America/New_York"],
  ["australia", "Australia/Sydney"],
  ["canada", "America/Toronto"],
  ["france", "Europe/Paris"],
  ["germany", "Europe/Berlin"],
  ["japan", "Asia/Tokyo"],
  ["china", "Asia/Shanghai"],
  ["brazil", "America/Sao_Paulo"],
  ["russia", "Europe/Moscow"],
  ["mexico", "America/Mexico_City"],
  ["indonesia", "Asia/Jakarta"],
  ["argentina", "America/Argentina/Buenos_Aires"],
  ["south africa", "Africa/Johannesburg"],
  ["egypt", "Africa/Cairo"],
  ["saudi arabia", "Asia/Riyadh"],
  ["united arab emirates", "Asia/Dubai"],
  ["new zealand", "Pacific/Auckland"],
  ["fiji", "Pacific/Fiji"],
  ["turkey", "Europe/Istanbul"],
  ["italy", "Europe/Rome"],
  ["spain", "Europe/Madrid"],
  ["netherlands", "Europe/Amsterdam"],
  ["switzerland", "Europe/Zurich"],
  ["sweden", "Europe/Stockholm"],
  ["norway", "Europe/Oslo"],
  ["denmark", "Europe/Copenhagen"],
  ["poland", "Europe/Warsaw"],
  ["czech republic", "Europe/Prague"],
  ["czechia", "Europe/Prague"],
  ["greece", "Europe/Athens"],
  ["portugal", "Europe/Lisbon"],
  ["ireland", "Europe/Dublin"],
  ["belgium", "Europe/Brussels"],
  ["austria", "Europe/Vienna"],
  ["thailand", "Asia/Bangkok"],
  ["vietnam", "Asia/Ho_Chi_Minh"],
  ["malaysia", "Asia/Kuala_Lumpur"],
  ["philippines", "Asia/Manila"],
  ["south korea", "Asia/Seoul"],
  ["taiwan", "Asia/Taipei"],
  ["hong kong", "Asia/Hong_Kong"],
  ["singapore", "Asia/Singapore"],
  ["qatar", "Asia/Qatar"],
  ["israel", "Asia/Jerusalem"],
  ["kenya", "Africa/Nairobi"],
  ["nigeria", "Africa/Lagos"],
  ["morocco", "Africa/Casablanca"],
]);

function cityCountryKey(city: string, country: string): string {
  return `${normalizeSearchText(city)}|${normalizeSearchText(country)}`;
}

function lookupCityTimezone(city: string, country: string): string | undefined {
  return CITY_TIMEZONE_MAP.get(cityCountryKey(city, country));
}

export function lookupCountryDefault(country: string): string | undefined {
  const key = normalizeSearchText(country);
  const direct = COUNTRY_DEFAULT_TIMEZONE.get(key);
  if (direct) return direct;
  const ref = COUNTRY_REFERENCE_BY_NAME.get(key);
  if (ref?.timezone && ref.timezone !== "UTC") return ref.timezone;
  return undefined;
}

export function isValidIanaTimezone(timezone: string | undefined): timezone is string {
  if (!timezone || timezone === "UTC") return false;
  try {
    Intl.DateTimeFormat("en-US", { timeZone: timezone }).format(new Date());
    return true;
  } catch {
    return false;
  }
}

/** Synchronous IANA resolution — never returns UTC unless no mapping exists. */
export function resolveLocationTimezoneSync(
  item: Pick<
    LocationSearchResult,
    "city" | "country" | "timezone" | "kind" | "admin"
  >,
): string {
  const cityTz = lookupCityTimezone(item.city, item.country);
  if (cityTz) return cityTz;

  if (item.admin) {
    const adminTz = lookupCityTimezone(item.admin, item.country);
    if (adminTz) return adminTz;
  }

  if (isValidIanaTimezone(item.timezone)) return item.timezone;

  if (item.kind === "country") {
    const capital = item.admin ?? item.city;
    const capitalTz = lookupCityTimezone(capital, item.city);
    if (capitalTz) return capitalTz;

    const countryTz = lookupCountryDefault(item.city);
    if (countryTz) return countryTz;
  }

  const countryTz = lookupCountryDefault(item.country);
  if (countryTz) return countryTz;

  return item.timezone && item.timezone !== "UTC" ? item.timezone : "UTC";
}

const coordinateTzCache = new Map<string, string>();
const COORDINATE_TZ_TTL_MS = 86_400_000;
const coordinateTzFetchedAt = new Map<string, number>();

/** Open-Meteo coordinate lookup — cached, used only when sync resolution fails. */
export async function lookupTimezoneByCoordinates(
  lat: number,
  lng: number,
): Promise<string | undefined> {
  const key = `${lat.toFixed(2)},${lng.toFixed(2)}`;
  const cached = coordinateTzCache.get(key);
  const fetchedAt = coordinateTzFetchedAt.get(key) ?? 0;
  if (cached && Date.now() - fetchedAt < COORDINATE_TZ_TTL_MS) return cached;

  try {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}` +
      "&current=temperature_2m&timezone=auto";
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return undefined;
    const data = (await res.json()) as { timezone?: string };
    if (isValidIanaTimezone(data.timezone)) {
      coordinateTzCache.set(key, data.timezone);
      coordinateTzFetchedAt.set(key, Date.now());
      return data.timezone;
    }
  } catch {
    /* fall through */
  }
  return undefined;
}

export async function enrichLocationTimezones(
  results: LocationSearchResult[],
): Promise<LocationSearchResult[]> {
  return Promise.all(
    results.map(async (result) => {
      const syncTz = resolveLocationTimezoneSync(result);
      if (syncTz !== "UTC") return { ...result, timezone: syncTz };

      const coordTz = await lookupTimezoneByCoordinates(result.latitude, result.longitude);
      return { ...result, timezone: coordTz ?? syncTz };
    }),
  );
}

export function enrichLocationTimezonesSync(
  results: LocationSearchResult[],
): LocationSearchResult[] {
  return results.map((result) => ({
    ...result,
    timezone: resolveLocationTimezoneSync(result),
  }));
}
