"use client";

import type { ContinentSlug, TravelStyle } from "@/lib/content/world/types";
import { cn } from "@/lib/utils";

const STYLES: { value: TravelStyle; label: string }[] = [
  { value: "luxury", label: "Luxury" },
  { value: "beach", label: "Beach" },
  { value: "adventure", label: "Adventure" },
  { value: "culture", label: "Culture" },
  { value: "romance", label: "Romance" },
  { value: "wildlife", label: "Wildlife" },
  { value: "family", label: "Family" },
];

const BUDGETS = [
  { value: "budget", label: "Budget" },
  { value: "mid", label: "Mid-range" },
  { value: "luxury", label: "Luxury" },
] as const;

interface ExploreFiltersProps {
  continent: ContinentSlug | null;
  style: TravelStyle | null;
  budget: (typeof BUDGETS)[number]["value"] | null;
  onContinentChange: (v: ContinentSlug | null) => void;
  onStyleChange: (v: TravelStyle | null) => void;
  onBudgetChange: (v: (typeof BUDGETS)[number]["value"] | null) => void;
}

export function ExploreFilters({
  continent,
  style,
  budget,
  onContinentChange,
  onStyleChange,
  onBudgetChange,
}: ExploreFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <FilterChip
        label="All continents"
        active={!continent}
        onClick={() => onContinentChange(null)}
      />
      {(["oceania", "asia", "europe", "africa", "north-america", "south-america"] as ContinentSlug[]).map(
        (c) => (
          <FilterChip
            key={c}
            label={c.replace("-", " ")}
            active={continent === c}
            onClick={() => onContinentChange(continent === c ? null : c)}
            capitalize
          />
        ),
      )}
      <span className="mx-1 hidden h-5 w-px bg-white/20 sm:block" />
      {STYLES.map((s) => (
        <FilterChip
          key={s.value}
          label={s.label}
          active={style === s.value}
          onClick={() => onStyleChange(style === s.value ? null : s.value)}
        />
      ))}
      <span className="mx-1 hidden h-5 w-px bg-white/20 sm:block" />
      {BUDGETS.map((b) => (
        <FilterChip
          key={b.value}
          label={b.label}
          active={budget === b.value}
          onClick={() => onBudgetChange(budget === b.value ? null : b.value)}
        />
      ))}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
  capitalize,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  capitalize?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-300",
        capitalize && "capitalize",
        active
          ? "border-gold/50 bg-gold/15 text-gold"
          : "border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:text-white",
      )}
    >
      {label}
    </button>
  );
}
