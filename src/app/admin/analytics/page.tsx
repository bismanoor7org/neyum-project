"use client";

import { useAdminApi } from "@/hooks/useAdminApi";
import {
  AreaChart,
  BarChart,
  ChartCard,
  HorizontalBarChart,
} from "@/components/admin/ui/Charts";
import { PageHeader } from "@/components/admin/ui/AdminUi";
import { formatCurrency } from "@/lib/admin/format";

type AnalyticsData = {
  revenue: { label: string; value: number }[];
  bookings: { label: string; value: number }[];
  visitors: { label: string; value: number }[];
  destinations: { label: string; value: number }[];
  tours: { label: string; value: number }[];
  suppliers: { label: string; value: number }[];
};

export default function AnalyticsPage() {
  const { data, loading } = useAdminApi<AnalyticsData>("/api/v1/admin/analytics");

  if (loading || !data) {
    return <div className="admin-text-muted py-20 text-center text-sm">Loading analytics…</div>;
  }

  return (
    <>
      <PageHeader
        title="Analytics Center"
        subtitle="Revenue, traffic, bookings, and performance rankings from live platform data."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Revenue analytics" subtitle="Monthly gross revenue · FJD">
          <AreaChart data={data.revenue} color="#c5a44e" />
        </ChartCard>
        <ChartCard title="Visitor analytics" subtitle="Sessions · last 7 days">
          <BarChart data={data.visitors} color="#0e5f63" />
        </ChartCard>
        <ChartCard title="Booking analytics" subtitle="Monthly booking volume">
          <AreaChart data={data.bookings} color="#0c3238" />
        </ChartCard>
        <ChartCard title="Geographic analytics" subtitle="Top destinations">
          <HorizontalBarChart data={data.destinations} color="#c5a44e" />
        </ChartCard>
        <ChartCard title="Tour analytics" subtitle="Most booked experiences">
          <HorizontalBarChart data={data.tours} color="#0c3238" formatValue={(v) => `${v} bookings`} />
        </ChartCard>
        <ChartCard title="Supplier analytics" subtitle="Revenue by partner">
          <HorizontalBarChart data={data.suppliers} color="#0e5f63" formatValue={(v) => formatCurrency(v, "FJD", true)} />
        </ChartCard>
      </div>
    </>
  );
}
