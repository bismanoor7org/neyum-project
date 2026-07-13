"use server";

import {
  convertCurrency,
  getExchangeRateSnapshot,
  type CurrencyCode,
  SUPPORTED_CURRENCIES,
} from "@/server/services/currency.service";

export async function fetchExchangeRateSnapshotAction(base: CurrencyCode = "FJD") {
  try {
    const snapshot = await getExchangeRateSnapshot(base);
    return { ok: true as const, data: snapshot };
  } catch (err) {
    return {
      ok: false as const,
      error: err instanceof Error ? err.message : "Unable to load exchange rates.",
    };
  }
}

export async function convertCurrencyAction(
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode,
) {
  if (!Number.isFinite(amount) || amount < 0) {
    return { ok: false as const, error: "Enter a valid amount." };
  }
  if (!SUPPORTED_CURRENCIES.includes(from) || !SUPPORTED_CURRENCIES.includes(to)) {
    return { ok: false as const, error: "Unsupported currency." };
  }

  try {
    const result = await convertCurrency(amount, from, to);
    return { ok: true as const, data: result };
  } catch (err) {
    return {
      ok: false as const,
      error: err instanceof Error ? err.message : "Conversion failed.",
    };
  }
}
