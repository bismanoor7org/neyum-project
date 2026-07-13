/** Major currencies supported by the converter and budget tools */
export const SUPPORTED_CURRENCIES = [
  "FJD",
  "USD",
  "AUD",
  "NZD",
  "GBP",
  "EUR",
  "CAD",
  "SGD",
  "JPY",
  "CNY",
  "INR",
  "AED",
  "HKD",
  "CHF",
  "ZAR",
  "THB",
  "MYR",
  "KRW",
  "PHP",
  "PKR",
] as const;

export type CurrencyCode = (typeof SUPPORTED_CURRENCIES)[number];

export function formatMoney(amount: number, currency: string, locale = "en-US"): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: currency === "JPY" || currency === "KRW" ? 0 : 2,
      maximumFractionDigits: currency === "JPY" || currency === "KRW" ? 0 : 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

export type ExchangeRateSnapshot = {
  base: CurrencyCode;
  rates: Record<string, number>;
  fetchedAt: string;
  provider: "open-er-api";
};
