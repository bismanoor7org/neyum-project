"use client";

import { DollarSign, Percent, TrendingUp, Wallet } from "lucide-react";
import { KpiCard, KpiGrid } from "@/components/admin/ui/KpiCard";
import {
  AreaChart,
  ChartCard,
  HorizontalBarChart,
} from "@/components/admin/ui/Charts";
import { PageHeader, StatPill } from "@/components/admin/ui/AdminUi";
import {
  financeSummary,
  revenueGrowth,
  topSuppliersChart,
} from "@/lib/admin/mock-data";
import { formatCurrency } from "@/lib/admin/format";

export default function RevenuePage() {
  const f = financeSummary;
  const commissionRate = ((f.commissionEarned / f.totalRevenue) * 100).toFixed(1);

  return (
    <>
      <PageHeader
        title="Revenue & Commission"
        subtitle="Financial overview — platform revenue, commission earnings and supplier payouts."
      />

      <KpiGrid>
        <KpiCard
          label="Total revenue"
          value={formatCurrency(f.totalRevenue, "FJD", true)}
          change={18.4}
          icon={DollarSign}
          accent="gold"
        />
        <KpiCard
          label="Commission earned"
          value={formatCurrency(f.commissionEarned, "FJD", true)}
          change={15.2}
          icon={Percent}
          accent="emerald"
        />
        <KpiCard
          label="Supplier earnings"
          value={formatCurrency(f.supplierEarnings, "FJD", true)}
          icon={Wallet}
          accent="navy"
        />
        <KpiCard
          label="Monthly commission"
          value={formatCurrency(f.monthlyCommission, "FJD", true)}
          change={12.8}
          icon={TrendingUp}
          accent="teal"
        />
      </KpiGrid>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatPill
          label="Pending settlements"
          value={formatCurrency(f.pendingSettlements)}
        />
        <StatPill
          label="Paid settlements"
          value={formatCurrency(f.paidSettlements, "FJD", true)}
        />
        <StatPill
          label="Avg order value"
          value={formatCurrency(f.avgOrderValue)}
        />
        <StatPill label="Commission rate" value={`${commissionRate}%`} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ChartCard
          title="Revenue growth"
          subtitle="Gross marketplace revenue · FJD"
        >
          <AreaChart data={revenueGrowth} color="#d4a574" />
        </ChartCard>

        <ChartCard
          title="Top suppliers by revenue"
          subtitle="Lifetime gross revenue"
        >
          <HorizontalBarChart
            data={topSuppliersChart}
            color="#082b4b"
            formatValue={(v) => formatCurrency(v, "FJD", true)}
          />
        </ChartCard>
      </div>

      <section className="admin-card mt-6 rounded-xl p-6">
        <h3 className="admin-text text-sm font-semibold">Revenue breakdown</h3>
        <div className="mt-4 space-y-4">
          {[
            {
              label: "Platform commission (15%)",
              amount: f.commissionEarned,
              pct: 15,
              color: "#d4a574",
            },
            {
              label: "Supplier payouts (85%)",
              amount: f.supplierEarnings,
              pct: 85,
              color: "#082b4b",
            },
          ].map((row) => (
            <div key={row.label}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="admin-text-muted">{row.label}</span>
                <span className="admin-text font-semibold tabular-nums">
                  {formatCurrency(row.amount, "FJD", true)}
                </span>
              </div>
              <div className="admin-progress-track h-3 overflow-hidden rounded-full">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${row.pct}%`,
                    backgroundColor: row.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
