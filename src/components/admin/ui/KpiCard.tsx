import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPercent } from "@/lib/admin/format";

type KpiCardProps = {
  label: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon?: LucideIcon;
  accent?: "gold" | "teal" | "navy" | "emerald";
  className?: string;
};

const ACCENTS = {
  gold: "from-gold/15 to-gold/5 text-gold border-gold/20",
  teal: "from-teal/15 to-teal/5 text-teal border-teal/20",
  navy: "from-navy/12 to-navy/5 text-navy border-navy/15",
  emerald: "from-emerald-500/12 to-emerald-500/5 text-emerald-600 border-emerald-200",
};

export function KpiCard({
  label,
  value,
  change,
  changeLabel = "vs last month",
  icon: Icon,
  accent = "navy",
  className,
}: KpiCardProps) {
  const positive = change !== undefined && change >= 0;

  return (
    <div
      className={cn(
        "admin-card-md group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:border-gold/20",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="admin-text-muted text-[10px] font-bold uppercase tracking-[0.14em]">
            {label}
          </p>
          <p className="admin-text mt-3 truncate font-serif text-[2rem] leading-none tracking-tight">
            {value}
          </p>
          {change !== undefined && (
            <div className="mt-4 flex items-center gap-1.5">
              {positive ? (
                <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-red-500" />
              )}
              <span
                className={cn(
                  "text-xs font-semibold",
                  positive ? "text-emerald-600" : "text-red-500",
                )}
              >
                {formatPercent(change, true)}
              </span>
              <span className="admin-text-subtle text-xs">{changeLabel}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-gradient-to-br",
              ACCENTS[accent],
            )}
          >
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </div>
        )}
      </div>
    </div>
  );
}

export function KpiGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{children}</div>
  );
}
