"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { CalendarDays, Loader2, Plus, Trash2 } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/Section";
import { TOOLS_HREF } from "@/lib/nav/tools-nav";
import { ds } from "@/lib/design-system";
import { cn } from "@/lib/utils";
import { convertCurrencyAction } from "@/server/actions/currency";
import {
  formatMoney,
  SUPPORTED_CURRENCIES,
  type CurrencyCode,
} from "@/lib/tools/currency/types";
import { travelBudgetPlannerJsonLd } from "@/lib/tools/travel-budget-planner/seo";

type BudgetCategory = "accommodation" | "meals" | "activities" | "transfers" | "other";

type DayBudget = {
  id: string;
  day: number;
  accommodation: number;
  meals: number;
  activities: number;
  transfers: number;
  other: number;
};

const CATEGORY_LABELS: Record<BudgetCategory, string> = {
  accommodation: "Accommodation",
  meals: "Meals & dining",
  activities: "Tours & activities",
  transfers: "Transfers",
  other: "Other",
};

function createDay(day: number): DayBudget {
  return {
    id: `day-${day}-${Date.now()}`,
    day,
    accommodation: 0,
    meals: 0,
    activities: 0,
    transfers: 0,
    other: 0,
  };
}

function dayTotal(day: DayBudget): number {
  return day.accommodation + day.meals + day.activities + day.transfers + day.other;
}

export function TravelBudgetPlannerClient() {
  const [days, setDays] = useState<DayBudget[]>([createDay(1), createDay(2), createDay(3)]);
  const [currency, setCurrency] = useState<CurrencyCode>("FJD");
  const [displayCurrency, setDisplayCurrency] = useState<CurrencyCode>("USD");
  const [convertedTotal, setConvertedTotal] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const grandTotal = useMemo(
    () => days.reduce((sum, d) => sum + dayTotal(d), 0),
    [days],
  );

  const categoryTotals = useMemo(() => {
    const totals: Record<BudgetCategory, number> = {
      accommodation: 0,
      meals: 0,
      activities: 0,
      transfers: 0,
      other: 0,
    };
    for (const day of days) {
      totals.accommodation += day.accommodation;
      totals.meals += day.meals;
      totals.activities += day.activities;
      totals.transfers += day.transfers;
      totals.other += day.other;
    }
    return totals;
  }, [days]);

  const updateDay = (id: string, field: BudgetCategory, value: number) => {
    setDays((prev) =>
      prev.map((d) => (d.id === id ? { ...d, [field]: value } : d)),
    );
  };

  const addDay = () => {
    setDays((prev) => [...prev, createDay(prev.length + 1)]);
  };

  const removeDay = (id: string) => {
    setDays((prev) => {
      const next = prev.filter((d) => d.id !== id);
      return next.map((d, i) => ({ ...d, day: i + 1 }));
    });
  };

  const convertTotal = useCallback(() => {
    startTransition(async () => {
      if (currency === displayCurrency) {
        setConvertedTotal(grandTotal);
        return;
      }
      const result = await convertCurrencyAction(grandTotal, currency, displayCurrency);
      if (result.ok) setConvertedTotal(result.data.amount);
    });
  }, [grandTotal, currency, displayCurrency]);

  useEffect(() => {
    convertTotal();
  }, [convertTotal]);

  return (
    <PageLayout activeHref={TOOLS_HREF}>
      <JsonLd data={travelBudgetPlannerJsonLd()} />

      <PageHero
        variant="plain"
        eyebrow="Travel Tools"
        title="Travel Budget Planner"
        subtitle="Build a day-by-day Fiji budget with real totals and live currency conversion across accommodation, dining, and experiences."
        align="center"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Tools", href: TOOLS_HREF },
          { label: "Travel Budget Planner" },
        ]}
      />

      <Section variant="cream" reveal={false}>
        <div className={ds.containerNarrow}>
          <div className="card-luxury p-6 md:p-8">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-gold" strokeWidth={1.5} />
              <p className={ds.eyebrowGold}>Daily Budget</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <CurrencyField label="Budget currency" value={currency} onChange={setCurrency} />
              <CurrencyField
                label="Display total in"
                value={displayCurrency}
                onChange={setDisplayCurrency}
              />
            </div>

            <div className="mt-6 space-y-4">
              {days.map((day) => (
                <div
                  key={day.id}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--card-surface)] p-4 md:p-5"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg text-navy">Day {day.day}</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gold">
                        {formatMoney(dayTotal(day), currency)}
                      </span>
                      {days.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeDay(day.id)}
                          className="text-foreground/40 hover:text-coral"
                          aria-label={`Remove day ${day.day}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {(Object.keys(CATEGORY_LABELS) as BudgetCategory[]).map((cat) => (
                      <label key={cat} className="block">
                        <span className="text-xs text-foreground/50">{CATEGORY_LABELS[cat]}</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={day[cat] || ""}
                          onChange={(e) =>
                            updateDay(day.id, cat, parseFloat(e.target.value) || 0)
                          }
                          className={inputClass}
                        />
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addDay}
              className={cn(ds.btnBase, "mt-4 border border-[var(--border)] text-navy hover:border-gold/40")}
            >
              <Plus className="h-4 w-4" />
              Add day
            </button>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-gold/25 bg-gold/5 px-5 py-4">
                <p className="text-sm text-foreground/60">Grand total ({days.length} days)</p>
                <p className="mt-1 font-serif text-3xl text-navy">
                  {formatMoney(grandTotal, currency)}
                </p>
                {currency !== displayCurrency && (
                  <p className="mt-2 text-sm text-foreground/55">
                    {isPending ? (
                      <Loader2 className="inline h-4 w-4 animate-spin" />
                    ) : convertedTotal !== null ? (
                      <>≈ {formatMoney(convertedTotal, displayCurrency)} (live rate)</>
                    ) : null}
                  </p>
                )}
              </div>

              <div className="rounded-2xl border border-[var(--border)] px-5 py-4">
                <p className="text-sm font-semibold text-navy">Category breakdown</p>
                <ul className="mt-3 space-y-1 text-sm text-foreground/65">
                  {(Object.keys(CATEGORY_LABELS) as BudgetCategory[]).map((cat) => (
                    <li key={cat} className="flex justify-between">
                      <span>{CATEGORY_LABELS[cat]}</span>
                      <span>{formatMoney(categoryTotals[cat], currency)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}

function CurrencyField({
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
      <span className="text-xs font-medium uppercase tracking-[0.14em] text-foreground/50">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as CurrencyCode)}
        className={cn(inputClass, "mt-2")}
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

const inputClass = cn(
  ds.radiusInput,
  "mt-1 w-full border border-[var(--border)] bg-white px-3 py-2 text-sm text-navy",
);
