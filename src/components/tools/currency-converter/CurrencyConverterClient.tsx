"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { ArrowLeftRight, Loader2, RefreshCw, TrendingUp } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/Section";
import { TOOLS_HREF } from "@/lib/nav/tools-nav";
import { ds } from "@/lib/design-system";
import { cn } from "@/lib/utils";
import { convertCurrencyAction, fetchExchangeRateSnapshotAction } from "@/server/actions/currency";
import {
  formatMoney,
  SUPPORTED_CURRENCIES,
  type CurrencyCode,
  type ExchangeRateSnapshot,
} from "@/lib/tools/currency/types";
import { currencyConverterJsonLd } from "@/lib/tools/currency-converter/seo";

const POPULAR_CURRENCIES: CurrencyCode[] = [
  "USD",
  "FJD",
  "AUD",
  "NZD",
  "GBP",
  "EUR",
  "CAD",
  "SGD",
];

const POPULAR_CONVERSIONS: { amount: number; from: CurrencyCode; to: CurrencyCode }[] = [
  { amount: 100, from: "USD", to: "FJD" },
  { amount: 100, from: "AUD", to: "FJD" },
  { amount: 50, from: "EUR", to: "FJD" },
  { amount: 100, from: "GBP", to: "USD" },
  { amount: 100, from: "NZD", to: "AUD" },
  { amount: 100, from: "CAD", to: "USD" },
];

function crossRate(
  snapshot: ExchangeRateSnapshot,
  from: CurrencyCode,
  to: CurrencyCode,
): number | null {
  if (from === to) return 1;
  const { base, rates } = snapshot;
  if (from === base) return rates[to] ?? null;
  if (to === base) return rates[from] ? 1 / rates[from] : null;
  const fromRate = rates[from];
  const toRate = rates[to];
  if (!fromRate || !toRate) return null;
  return toRate / fromRate;
}

export function CurrencyConverterClient() {
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState<CurrencyCode>("USD");
  const [to, setTo] = useState<CurrencyCode>("FJD");
  const [snapshot, setSnapshot] = useState<ExchangeRateSnapshot | null>(null);
  const [converted, setConverted] = useState<number | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [swapSpinning, setSwapSpinning] = useState(false);

  const loadSnapshot = useCallback(async (base: CurrencyCode) => {
    const result = await fetchExchangeRateSnapshotAction(base);
    if (result.ok) setSnapshot(result.data);
  }, []);

  const runConversion = useCallback(() => {
    const num = parseFloat(amount);
    if (!Number.isFinite(num) || num < 0) {
      setError("Enter a valid amount.");
      return;
    }
    setError("");
    startTransition(async () => {
      const result = await convertCurrencyAction(num, from, to);
      if (result.ok) {
        setConverted(result.data.amount);
        setRate(result.data.rate);
        setSnapshot(result.data.snapshot);
      } else {
        setError(result.error);
      }
    });
  }, [amount, from, to]);

  useEffect(() => {
    loadSnapshot(from);
  }, [from, loadSnapshot]);

  useEffect(() => {
    runConversion();
  }, [runConversion]);

  const swap = () => {
    setSwapSpinning(true);
    setFrom(to);
    setTo(from);
    window.setTimeout(() => setSwapSpinning(false), 420);
  };

  const selectPopularCurrency = (code: CurrencyCode) => {
    if (code === from) return;
    if (code === to) {
      setFrom(to);
      setTo(from);
      return;
    }
    setTo(code);
  };

  return (
    <PageLayout activeHref={TOOLS_HREF}>
      <JsonLd data={currencyConverterJsonLd()} />

      <PageHero
        variant="plain"
        eyebrow="Travel Tools"
        title="Currency Converter"
        subtitle="Live exchange rates with FJD support — convert between major world currencies for confident Fiji travel planning."
        align="center"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: TOOLS_HREF },
          { label: "Currency Converter" },
        ]}
      />

      <Section variant="cream" reveal={false}>
        <div className={ds.container}>
          <div className="cc-layout">
            {/* Left — converter */}
            <div className="card-luxury cc-converter">
              <header className="cc-converter-header">
                <p className={ds.eyebrowGold}>Concierge Exchange</p>
                <h2 className="cc-converter-title mt-2">Currency Converter</h2>
                <p className="cc-converter-subtitle">
                  Enter your amount and currencies — your conversion updates instantly.
                </p>
              </header>

              <div className="cc-converter-body">
                <label className="cc-amount-field">
                  <span className="cc-field-label">Amount</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="cc-amount-input"
                    aria-label="Amount to convert"
                  />
                </label>

                <div className="cc-currency-stack">
                  <CurrencySelect label="From" value={from} onChange={setFrom} />
                  <button
                    type="button"
                    onClick={swap}
                    className={cn("cc-swap", swapSpinning && "cc-swap--active")}
                    aria-label="Swap currencies"
                  >
                    <ArrowLeftRight className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.75} />
                  </button>
                  <CurrencySelect label="To" value={to} onChange={setTo} />
                </div>

                <button
                  type="button"
                  onClick={runConversion}
                  disabled={isPending}
                  className={cn(ds.btnBase, ds.btnGold, "cc-refresh-btn")}
                >
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" strokeWidth={1.75} />
                  )}
                  Refresh rate
                </button>

                {error && (
                  <p className="cc-error" role="alert">
                    {error}
                  </p>
                )}

                {converted !== null && rate !== null && (
                  <>
                    <div className="cc-result-details" aria-live="polite">
                      <p className="cc-result-heading">Conversion summary</p>
                      <dl className="cc-result-grid">
                        <div className="cc-result-row">
                          <dt>Converted amount</dt>
                          <dd>
                            {isPending ? (
                              <Loader2 className="ml-auto h-4 w-4 animate-spin opacity-60" />
                            ) : (
                              formatMoney(converted, to)
                            )}
                          </dd>
                        </div>
                        <div className="cc-result-row">
                          <dt>Exchange rate</dt>
                          <dd>
                            1 {from} = {rate.toFixed(4)} {to}
                          </dd>
                        </div>
                        <div className="cc-result-row">
                          <dt>Inverse rate</dt>
                          <dd>
                            1 {to} = {(1 / rate).toFixed(4)} {from}
                          </dd>
                        </div>
                        {snapshot?.fetchedAt && (
                          <div className="cc-result-row">
                            <dt>Rates updated</dt>
                            <dd>{snapshot.fetchedAt}</dd>
                          </div>
                        )}
                        <div className="cc-result-row">
                          <dt>Source</dt>
                          <dd>Live mid-market rates</dd>
                        </div>
                      </dl>
                      <p className="cc-result-note">
                        {to === "FJD" || from === "FJD"
                          ? "Fijian dollars (FJD) are used locally — this estimate helps you plan resort spend, tours, and transfers before you arrive."
                          : "Amounts update automatically when you change currency or tap Refresh rate."}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right — live insights */}
            <aside className="card-luxury cc-insights" aria-label="Live exchange insights">
              <header className="cc-insights-header">
                <div className="cc-insights-icon" aria-hidden>
                  <TrendingUp className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className={ds.eyebrowGold}>Market Pulse</p>
                  <h2 className="cc-insights-title mt-1">Live Exchange Insights</h2>
                </div>
              </header>

              <div className="cc-insight-stats">
                <div className="cc-stat">
                  <span className="cc-stat-label">Current rate</span>
                  <span className="cc-stat-value cc-stat-value--rate">
                    {rate !== null ? (
                      <>
                        1 {from} = {rate.toFixed(4)} {to}
                      </>
                    ) : (
                      "—"
                    )}
                  </span>
                </div>
                <div className="cc-stat">
                  <span className="cc-stat-label">24h change</span>
                  <span className="cc-stat-value cc-stat-value--muted">Live rates</span>
                </div>
                <div className="cc-stat">
                  <span className="cc-stat-label">Last updated</span>
                  <span className="cc-stat-value cc-stat-value--meta">
                    {snapshot?.fetchedAt ?? "—"}
                  </span>
                </div>
              </div>

              {snapshot && (
                <>
                  <div className="cc-insights-section">
                    <h3 className="cc-section-heading">Popular conversions</h3>
                    <ul className="cc-conversions-list">
                      {POPULAR_CONVERSIONS.map((pair) => {
                        const pairRate = crossRate(snapshot, pair.from, pair.to);
                        if (pairRate === null) return null;
                        const result = pair.amount * pairRate;
                        return (
                          <li key={`${pair.from}-${pair.to}-${pair.amount}`}>
                            <button
                              type="button"
                              className="cc-conversion-item"
                              onClick={() => {
                                setAmount(String(pair.amount));
                                setFrom(pair.from);
                                setTo(pair.to);
                              }}
                            >
                              <span className="cc-conversion-pair">
                                {pair.amount} {pair.from}
                              </span>
                              <span className="cc-conversion-arrow" aria-hidden>
                                →
                              </span>
                              <span className="cc-conversion-result">
                                {formatMoney(result, pair.to)}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="cc-insights-section">
                    <h3 className="cc-section-heading">Popular currencies</h3>
                    <div className="cc-currency-pills">
                      {POPULAR_CURRENCIES.map((code) => (
                        <button
                          key={code}
                          type="button"
                          onClick={() => selectPopularCurrency(code)}
                          className={cn(
                            "cc-currency-pill",
                            code === from && "cc-currency-pill--from",
                            code === to && "cc-currency-pill--to",
                          )}
                          aria-pressed={code === from || code === to}
                        >
                          {code}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="cc-insights-section">
                    <h3 className="cc-section-heading">
                      Rates vs {snapshot.base}
                    </h3>
                    <div className="cc-rate-highlights">
                      {POPULAR_CURRENCIES.filter(
                        (c) => c !== snapshot.base && snapshot.rates[c],
                      ).map((code) => (
                        <div key={code} className="cc-rate-highlight">
                          <span className="cc-rate-highlight-code">{code}</span>
                          <span className="cc-rate-highlight-value">
                            {snapshot.rates[code]!.toFixed(4)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </aside>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}

function CurrencySelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: CurrencyCode;
  onChange: (v: CurrencyCode) => void;
}) {
  return (
    <label className="cc-currency-field">
      <span className="cc-field-label">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as CurrencyCode)}
        className="cc-currency-select"
      >
        {SUPPORTED_CURRENCIES.map((code) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
    </label>
  );
}
