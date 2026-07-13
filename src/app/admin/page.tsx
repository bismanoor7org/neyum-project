"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  DollarSign,
  Headphones,
  Map,
  RefreshCw,
  RotateCcw,
  Store,
  Users,
  XCircle,
} from "lucide-react";
import { KpiCard, KpiGrid } from "@/components/admin/ui/KpiCard";
import {
  AreaChart,
  BarChart,
  ChartCard,
  HorizontalBarChart,
} from "@/components/admin/ui/Charts";
import { PageHeader, AdminButton } from "@/components/admin/ui/AdminUi";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { useAdminApi } from "@/hooks/useAdminApi";
import { formatCurrency, formatDateTime, formatNumber } from "@/lib/admin/format";

type DashboardData = {
  metrics: {
    totalRevenue: number;
    revenueToday?: number;
    revenueWeek?: number;
    monthlyRevenue: number;
    revenueChange: number;
    totalBookings: number;
    todayBookings: number;
    activeBookings?: number;
    completedBookings?: number;
    cancelledBookings?: number;
    refundRequests?: number;
    totalTravelers?: number;
    totalUsers: number;
    activeSuppliers: number;
    pendingSuppliers?: number;
    totalTours?: number;
    activeTours?: number;
    supportTickets?: number;
    websiteVisitors: number;
    visitorsChange: number;
    conversionRate: number;
  };
  charts: {
    revenue: { label: string; value: number }[];
    bookings: { label: string; value: number }[];
    visitors: { label: string; value: number }[];
    destinations: { label: string; value: number }[];
    tours: { label: string; value: number }[];
  };
  recentBookings: {
    id: string;
    bookingNumber: string;
    amount: number | string;
    bookingStatus: string;
    traveler: { firstName: string; lastName: string };
    tour: { title: string } | null;
    supplier: { companyName: string };
  }[];
  notifications: { id: string; title: string; createdAt: string }[];
  unreadCount: number;
};

export default function AdminDashboardPage() {
  const { data, loading, error, refresh } = useAdminApi<DashboardData>("/api/v1/admin/dashboard");

  if (loading) {
    return (
      <div className="admin-text-muted flex min-h-[40vh] items-center justify-center text-sm">
        Loading dashboard…
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="admin-card rounded-xl p-8 text-center">
        <p className="admin-text text-red-600">{error ?? "Failed to load dashboard"}</p>
        <AdminButton className="mt-4" onClick={refresh}>
          <RefreshCw className="h-4 w-4" /> Retry
        </AdminButton>
      </div>
    );
  }

  const m = data.metrics;

  return (
    <>
      <PageHeader
        title="Executive Dashboard"
        subtitle="Live marketplace intelligence — revenue, bookings, suppliers, and platform health."
        actions={
          <>
            <AdminButton variant="secondary" onClick={refresh}>
              <RefreshCw className="h-4 w-4" /> Refresh
            </AdminButton>
            <Link href="/admin/bookings">
              <AdminButton>View bookings</AdminButton>
            </Link>
          </>
        }
      />

      <KpiGrid>
        <KpiCard label="Total revenue" value={formatCurrency(m.totalRevenue, "FJD", true)} change={m.revenueChange} icon={DollarSign} accent="gold" />
        <KpiCard label="Revenue today" value={formatCurrency(m.revenueToday ?? 0)} icon={DollarSign} accent="emerald" />
        <KpiCard label="Revenue this week" value={formatCurrency(m.revenueWeek ?? 0)} icon={DollarSign} accent="teal" />
        <KpiCard label="Revenue this month" value={formatCurrency(m.monthlyRevenue, "FJD", true)} change={m.revenueChange} icon={DollarSign} accent="navy" />
        <KpiCard label="Total bookings" value={formatNumber(m.totalBookings)} icon={CalendarCheck} accent="navy" />
        <KpiCard label="Active bookings" value={String(m.activeBookings ?? 0)} icon={CalendarCheck} accent="teal" />
        <KpiCard label="Completed" value={String(m.completedBookings ?? 0)} icon={CalendarCheck} accent="emerald" />
        <KpiCard label="Cancelled" value={String(m.cancelledBookings ?? 0)} icon={XCircle} accent="gold" />
        <KpiCard label="Refund requests" value={String(m.refundRequests ?? 0)} icon={RotateCcw} accent="gold" />
        <KpiCard label="Active suppliers" value={String(m.activeSuppliers)} icon={Store} accent="teal" />
        <KpiCard label="Pending suppliers" value={String(m.pendingSuppliers ?? 0)} icon={Store} accent="navy" />
        <KpiCard label="Active travellers" value={formatNumber(m.totalTravelers ?? m.totalUsers)} icon={Users} accent="navy" />
        <KpiCard label="Active tours" value={String(m.activeTours ?? 0)} icon={Map} accent="gold" />
        <KpiCard label="Support tickets" value={String(m.supportTickets ?? 0)} icon={Headphones} accent="emerald" />
      </KpiGrid>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ChartCard title="Revenue growth" subtitle="Last 8 months · FJD">
          <AreaChart data={data.charts.revenue} color="#c5a44e" />
        </ChartCard>
        <ChartCard title="Daily visitors" subtitle="Traffic · last 7 days">
          <BarChart data={data.charts.visitors} color="#0e5f63" />
        </ChartCard>
        <ChartCard title="Monthly bookings" subtitle="Booking volume trend">
          <AreaChart data={data.charts.bookings} color="#0c3238" />
        </ChartCard>
        <ChartCard title="Top destinations" subtitle="By booking count">
          <HorizontalBarChart data={data.charts.destinations} color="#c5a44e" />
        </ChartCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard
            title="Recent bookings"
            subtitle="Latest transactions"
            action={
              <Link href="/admin/bookings" className="text-xs font-medium text-gold hover:underline">
                View all
              </Link>
            }
          >
            <div className="divide-y divide-[var(--admin-border-soft)]">
              {data.recentBookings.length === 0 && (
                <p className="admin-text-muted py-6 text-center text-sm">No bookings yet.</p>
              )}
              {data.recentBookings.map((b) => (
                <div key={b.id} className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="admin-text text-sm font-medium">
                      {b.traveler.firstName} {b.traveler.lastName}
                    </p>
                    <p className="admin-text-muted truncate text-xs">
                      {b.tour?.title ?? "Experience"} · {b.supplier.companyName}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={b.bookingStatus} />
                    <span className="admin-text text-sm font-semibold tabular-nums">
                      {formatCurrency(Number(b.amount))}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        <ChartCard title="Top tours" subtitle="Best performers">
          <HorizontalBarChart data={data.charts.tours} color="#0c3238" formatValue={(v) => `${v} bookings`} />
        </ChartCard>
      </div>

      {data.notifications.length > 0 && (
        <section className="admin-card mt-6 rounded-xl border border-gold/20 bg-gold/5 p-5">
          <div className="flex items-center justify-between">
            <h3 className="admin-text text-sm font-semibold">
              Recent notifications ({data.unreadCount} unread)
            </h3>
            <Link href="/admin/notifications" className="inline-flex items-center gap-1 text-xs font-medium text-gold hover:underline">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <ul className="mt-3 space-y-2">
            {data.notifications.map((n) => (
              <li key={n.id} className="admin-surface-muted flex items-start justify-between gap-3 rounded-lg px-3 py-2 text-sm">
                <span className="admin-text">{n.title}</span>
                <time className="admin-text-subtle shrink-0 text-[11px]">{formatDateTime(n.createdAt)}</time>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
