import "server-only";

import { unstable_cache } from "next/cache";
import {
  SUPPORTED_CURRENCIES,
  type CurrencyCode,
  type ExchangeRateSnapshot,
} from "@/lib/tools/currency/types";

export { SUPPORTED_CURRENCIES, type CurrencyCode, type ExchangeRateSnapshot };
export { formatMoney } from "@/lib/tools/currency/types";

const CACHE_SECONDS = 3600;
const REQUEST_TIMEOUT_MS = 12_000;

async function fetchJson<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: CACHE_SECONDS },
    });
    if (!res.ok) throw new Error(`Exchange rate API error ${res.status}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

type ErApiResponse = {
  result: string;
  base_code: string;
  rates: Record<string, number>;
  time_last_update_utc: string;
};

async function fetchErApiLatest(base: CurrencyCode): Promise<ExchangeRateSnapshot> {
  const data = await fetchJson<ErApiResponse>(
    `https://open.er-api.com/v6/latest/${base}`,
  );
  if (data.result !== "success") {
    throw new Error("Unable to fetch exchange rates");
  }
  return {
    base,
    rates: data.rates,
    fetchedAt: data.time_last_update_utc,
    provider: "open-er-api",
  };
}

const getCachedRateSnapshot = (base: CurrencyCode) =>
  unstable_cache(
    async () => fetchErApiLatest(base),
    [`exchange-rates-${base}`],
    { revalidate: CACHE_SECONDS, tags: [`exchange-rates-${base}`] },
  )();

export async function getExchangeRateSnapshot(
  base: CurrencyCode = "FJD",
): Promise<ExchangeRateSnapshot> {
  return getCachedRateSnapshot(base);
}

export async function convertCurrency(
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode,
): Promise<{ amount: number; rate: number; snapshot: ExchangeRateSnapshot }> {
  if (from === to) {
    const snapshot = await getExchangeRateSnapshot(from);
    return { amount, rate: 1, snapshot };
  }

  const snapshot = await getExchangeRateSnapshot(from);
  const rate = snapshot.rates[to];
  if (!rate) {
    throw new Error(`Exchange rate not available for ${from} → ${to}`);
  }

  return {
    amount: amount * rate,
    rate,
    snapshot,
  };
}
