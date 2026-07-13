"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarCheck, DollarSign, Percent, Star, Store, TrendingUp } from "lucide-react";
import { KpiCard, KpiGrid } from "@/components/admin/ui/KpiCard";
import { AreaChart, BarChart, ChartCard, HorizontalBarChart } from "@/components/admin/ui/Charts";
import { PageHeader, AdminButton } from "@/components/admin/ui/AdminUi";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { formatCurrency, formatNumber } from "@/lib/admin/format";
import { useSupplier } from "@/components/supplier/SupplierProvider";

type DashboardData = {
  metrics: {
    totalRevenue: number;
    monthlyRevenue: number;
    revenueChange: number;
    totalBookings: number;
    todayBookings: number;
    pendingBookings: number;
    activeTours: number;
    avgRating: number;
    healthScore: number;
    responseRate: number;
    cancellationRate: number;
  };
  revenueChart: { label: string; value: number }[];
  bookingsChart: { label: string; value: number }[];
  recentBookings: { id: string; bookingNumber: string; travelerName: string; tourName: string; amount: number; bookingStatus: string }[];
  topTours: { label: string; value: number }[];
  performance: { responseRate: number; cancellationRate: number; reviewScore: number; revenueGrowth: number; customerSatisfaction: number };
};

export default function SupplierDashboardPage() {
  const { supplier } = useSupplier();
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("/api/v1/supplier/dashboard", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => { if (j.ok) setData(j.data); })
      .catch(() => {});
  }, []);

  const m = data?.metrics;

  return (
    <>
      <PageHeader
        title="Partner Dashboard"
        subtitle={`${supplier?.companyName ?? "Your company"} — revenue, bookings, performance, and health score.`}
        actions={
          <>
            <AdminButton variant="secondary">Export report</AdminButton>
            <Link href="/supplier/bookings"><AdminButton>View bookings</AdminButton></Link>
          </>
        }
      />

      <KpiGrid>
        <KpiCard label="Total earnings" value={formatCurrency(m?.totalRevenue ?? 0, "FJD", true)} change={m?.revenueChange} icon={DollarSign} accent="gold" />
        <KpiCard label="Monthly revenue" value={formatCurrency(m?.monthlyRevenue ?? 0, "FJD", true)} icon={DollarSign} accent="emerald" />
        <KpiCard label="Total bookings" value={formatNumber(m?.totalBookings ?? 0)} icon={CalendarCheck} accent="navy" />
        <KpiCard label="Today's bookings" value={String(m?.todayBookings ?? 0)} icon={CalendarCheck} accent="teal" />
        <KpiCard label="Pending requests" value={String(m?.pendingBookings ?? 0)} icon={Store} accent="gold" />
        <KpiCard label="Active tours" value={String(m?.activeTours ?? 0)} icon={TrendingUp} accent="teal" />
        <KpiCard label="Avg rating" value={String(m?.avgRating ?? 0)} icon={Star} accent="emerald" />
        <KpiCard label="Health score" value={`${m?.healthScore ?? 0}%`} icon={Percent} accent="navy" />
      </KpiGrid>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ChartCard title="Revenue trend" subtitle="Last 6 months · FJD">
          <AreaChart data={data?.revenueChart ?? []} color="#c5a44e" />
        </ChartCard>
        <ChartCard title="Weekly bookings" subtitle="Booking volume">
          <BarChart data={data?.bookingsChart ?? []} color="#0e5f63" />
        </ChartCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard title="Recent bookings" subtitle="Latest partner transactions" action={<Link href="/supplier/bookings" className="text-xs font-medium text-gold hover:underline">View all</Link>}>
            <div className="divide-y divide-[var(--admin-border-soft)]">
              {(data?.recentBookings ?? []).map((b) => (
                <div key={b.id} className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="admin-text text-sm font-medium">{b.travelerName}</p>
                    <p className="admin-text-muted truncate text-xs">{b.bookingNumber} · {b.tourName}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={b.bookingStatus} />
                    <span className="admin-text text-sm font-semibold tabular-nums">{formatCurrency(b.amount)}</span>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
        <ChartCard title="Top tours" subtitle="By bookings">
          <HorizontalBarChart data={data?.topTours ?? []} color="#0c3238" />
        </ChartCard>
      </div>

      {data?.performance && (
        <section className="admin-card mt-6 rounded-xl p-6">
          <h3 className="admin-text font-serif text-lg">Supplier performance score</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { label: "Response rate", value: `${data.performance.responseRate}%` },
              { label: "Cancellation rate", value: `${data.performance.cancellationRate}%` },
              { label: "Review score", value: String(data.performance.reviewScore) },
              { label: "Revenue growth", value: `${data.performance.revenueGrowth}%` },
              { label: "Satisfaction", value: `${data.performance.customerSatisfaction}%` },
            ].map((item) => (
              <div key={item.label} className="admin-surface-muted rounded-lg p-4">
                <p className="admin-text-subtle text-[11px] font-semibold uppercase tracking-wide">{item.label}</p>
                <p className="admin-text mt-2 font-serif text-2xl">{item.value}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
