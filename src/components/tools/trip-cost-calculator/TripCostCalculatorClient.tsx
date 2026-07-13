"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import {
  BedDouble,
  Car,
  Compass,
  Loader2,
  Plane,
  Shield,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/Section";
import { TOOLS_HREF } from "@/lib/nav/tools-nav";
import { ds } from "@/lib/design-system";
import { convertCurrencyAction } from "@/server/actions/currency";
import {
  formatMoney,
  SUPPORTED_CURRENCIES,
  type CurrencyCode,
} from "@/lib/tools/currency/types";
import { tripCostCalculatorJsonLd } from "@/lib/tools/trip-cost-calculator/seo";

type CostLine = {
  id: string;
  label: string;
  amount: number;
};

const DEFAULT_LINES: CostLine[] = [
  { id: "flights", label: "Flights", amount: 0 },
  { id: "accommodation", label: "Accommodation", amount: 0 },
  { id: "meals", label: "Meals", amount: 0 },
  { id: "activities", label: "Tours", amount: 0 },
  { id: "transfers", label: "Transfers", amount: 0 },
  { id: "misc", label: "Insurance", amount: 0 },
];

const CATEGORY_META: Record<
  string,
  { description: string; icon: LucideIcon }
> = {
  flights: {
    description: "Return airfare for your party",
    icon: Plane,
  },
  accommodation: {
    description: "Resorts, villas & island stays",
    icon: BedDouble,
  },
  meals: {
    description: "Dining, room service & provisions",
    icon: UtensilsCrossed,
  },
  activities: {
    description: "Tours, diving & curated experiences",
    icon: Compass,
  },
  transfers: {
    description: "Airport, boat & private transfers",
    icon: Car,
  },
  misc: {
    description: "Travel insurance & incidentals",
    icon: Shield,
  },
};

function useAnimatedNumber(target: number, duration = 420) {
  const [display, setDisplay] = useState(target);
  const frameRef = useRef<number | null>(null);
  const fromRef = useRef(target);

  useEffect(() => {
    const from = fromRef.current;
    fromRef.current = target;
    if (from === target) return;

    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(from + (target - from) * eased);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [target, duration]);

  return display;
}

export function TripCostCalculatorClient() {
  const [lines, setLines] = useState<CostLine[]>(DEFAULT_LINES);
  const [currency, setCurrency] = useState<CurrencyCode>("FJD");
  const [displayCurrency, setDisplayCurrency] = useState<CurrencyCode>("USD");
  const [convertedTotal, setConvertedTotal] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const subtotal = useMemo(
    () => lines.reduce((sum, line) => sum + (Number.isFinite(line.amount) ? line.amount : 0), 0),
    [lines],
  );

  const animatedSubtotal = useAnimatedNumber(subtotal);
  const animatedConverted = useAnimatedNumber(convertedTotal ?? subtotal);

  const breakdown = useMemo(
    () =>
      lines
        .map((line) => ({
          ...line,
          percentage: subtotal > 0 ? (line.amount / subtotal) * 100 : 0,
        }))
        .sort((a, b) => b.amount - a.amount),
    [lines, subtotal],
  );

  const updateLine = (id: string, amount: number) => {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, amount } : l)));
  };

  const convertTotal = useCallback(() => {
    startTransition(async () => {
      if (currency === displayCurrency) {
        setConvertedTotal(subtotal);
        return;
      }
      const result = await convertCurrencyAction(subtotal, currency, displayCurrency);
      if (result.ok) setConvertedTotal(result.data.amount);
    });
  }, [subtotal, currency, displayCurrency]);

  useEffect(() => {
    convertTotal();
  }, [convertTotal]);

  return (
    <PageLayout activeHref={TOOLS_HREF}>
      <JsonLd data={tripCostCalculatorJsonLd()} />

      <PageHero
        variant="plain"
        title="Fiji Trip Cost Planner"
        subtitle="Shape your island journey with a clear, concierge-style budget — flights, stays, dining, and experiences in one elegant view."
        align="center"
      />

      <Section variant="cream" reveal={false}>
        <div className={ds.containerNarrow}>
          <div className="card-luxury tcc-shell">
            <div className="tcc-layout">
              {/* Left — inputs */}
              <div className="tcc-inputs">
                <header className="tcc-inputs-header">
                  <p className={ds.eyebrowGold}>Your Journey</p>
                  <h2 className="tcc-inputs-title mt-2">Trip Cost Inputs</h2>
                  <p className="tcc-inputs-subtitle">
                    Enter estimated costs for each category. Figures update your live budget
                    summary instantly.
                  </p>
                </header>

                <div className="tcc-currency-row">
                  <CurrencySelect
                    label="Enter costs in"
                    value={currency}
                    onChange={setCurrency}
                  />
                  <CurrencySelect
                    label="Also show total in"
                    value={displayCurrency}
                    onChange={setDisplayCurrency}
                  />
                </div>

                <div className="tcc-categories">
                  {lines.map((line) => {
                    const meta = CATEGORY_META[line.id];
                    const Icon = meta?.icon ?? Compass;
                    return (
                      <div key={line.id} className="tcc-category-row">
                        <div className="tcc-category-icon" aria-hidden>
                          <Icon className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.5} />
                        </div>
                        <div className="tcc-category-copy">
                          <label htmlFor={line.id} className="tcc-category-label">
                            {line.label}
                          </label>
                          {meta?.description && (
                            <p className="tcc-category-desc">{meta.description}</p>
                          )}
                        </div>
                        <input
                          id={line.id}
                          type="number"
                          min="0"
                          step="0.01"
                          value={line.amount || ""}
                          onChange={(e) => updateLine(line.id, parseFloat(e.target.value) || 0)}
                          className="tcc-amount-input"
                          placeholder="0"
                          aria-label={`${line.label} amount`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right — sticky summary */}
              <aside className="tcc-summary" aria-live="polite">
                <div className="tcc-summary-card">
                  <p className="tcc-summary-eyebrow">Live Budget Summary</p>
                  <p className="tcc-summary-total">{formatMoney(animatedSubtotal, currency)}</p>

                  {currency !== displayCurrency && (
                    <p className="tcc-summary-converted">
                      {isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" aria-label="Converting" />
                      ) : convertedTotal !== null ? (
                        <>
                          <span aria-hidden>≈</span>
                          <span>{formatMoney(animatedConverted, displayCurrency)}</span>
                          <span className="text-xs font-normal opacity-70">live rate</span>
                        </>
                      ) : null}
                    </p>
                  )}

                  <div className="tcc-summary-divider" role="separator" />

                  <h3 className="tcc-breakdown-heading">Cost Breakdown</h3>

                  <div className="tcc-breakdown-body">
                    {subtotal > 0 ? (
                      <ul className="tcc-breakdown-list">
                        {breakdown.map((item) => (
                          <li key={item.id} className="tcc-breakdown-item">
                            <div className="tcc-breakdown-meta">
                              <span className="tcc-breakdown-label">{item.label}</span>
                              <span className="tcc-breakdown-amount">
                                {formatMoney(item.amount, currency)}
                              </span>
                            </div>
                            <div
                              className="tcc-breakdown-bar-track"
                              role="presentation"
                              aria-hidden
                            >
                              <div
                                className="tcc-breakdown-bar-fill"
                                style={{ width: `${item.percentage}%` }}
                              />
                            </div>
                            <span className="tcc-breakdown-pct">
                              {item.percentage.toFixed(0)}% of total
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="tcc-empty-breakdown">
                        Add costs to see where your budget goes — each category will appear here
                        with its share of the trip.
                      </p>
                    )}
                  </div>
                </div>
              </aside>
            </div>
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
    <label className="block">
      <span className="tcc-field-label">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as CurrencyCode)}
        className="tcc-select"
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
