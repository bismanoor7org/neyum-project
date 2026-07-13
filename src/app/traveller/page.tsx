"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  Compass,
  Gift,
  Heart,
  MapPin,
  MessageSquare,
  Sparkles,
  Wallet,
} from "lucide-react";
import { KpiCard, KpiGrid } from "@/components/admin/ui/KpiCard";
import { AreaChart, BarChart, ChartCard } from "@/components/admin/ui/Charts";
import { PageHeader, AdminButton } from "@/components/admin/ui/AdminUi";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { formatCurrency, formatNumber } from "@/lib/admin/format";
import { useTraveller } from "@/components/traveller/TravellerProvider";

type DashboardData = {
  metrics: {
    upcomingTrips: number;
    activeBookings: number;
    wishlistCount: number;
    loyaltyPoints: number;
    loyaltyTier: string;
    walletBalance: number;
    unreadMessages: number;
    unreadNotifications: number;
    toursCompleted: number;
    totalSpent: number;
  };
  upcomingTrips: {
    id: string;
    bookingNumber: string;
    tourName: string;
    supplierName: string;
    travelDate: string | null;
    amount: number;
    bookingStatus: string;
  }[];
  recentActivity: { id: string; type: string; title: string; detail: string; at: string }[];
  recommendations: { id: string; title: string; reason: string; price: number; rating: number }[];
  personalizedOffers: { id: string; code: string; title: string; expiresAt: string }[];
  savedSearches: { id: string; label: string; alertEnabled: boolean }[];
  quickActions: { id: string; label: string; href: string }[];
  travelStatus: {
    nextDeparture: string | null;
    documentsExpiring: number;
    pendingRefunds: number;
    openSupportTickets: number;
  };
  spendingChart: { label: string; value: number }[];
  tripsChart: { label: string; value: number }[];
};

export default function TravellerDashboardPage() {
  const { travellerUser, profile } = useTraveller();
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("/api/v1/traveller/dashboard", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => { if (j.ok) setData(j.data); })
      .catch(() => {});
  }, []);

  const m = data?.metrics;
  const name = travellerUser?.firstName ?? "Traveller";

  return (
    <>
      <PageHeader
        title={`Welcome back, ${name}`}
        subtitle="Your upcoming trips, loyalty rewards, personalised offers, and travel status at a glance."
        actions={
          <>
            <Link href="/search"><AdminButton variant="secondary">Discover experiences</AdminButton></Link>
            <Link href="/traveller/bookings"><AdminButton>My bookings</AdminButton></Link>
          </>
        }
      />

      <KpiGrid>
        <KpiCard label="Upcoming trips" value={String(m?.upcomingTrips ?? 0)} icon={MapPin} accent="gold" />
        <KpiCard label="Active bookings" value={String(m?.activeBookings ?? 0)} icon={CalendarCheck} accent="navy" />
        <KpiCard label="Wishlist" value={String(m?.wishlistCount ?? 0)} icon={Heart} accent="teal" />
        <KpiCard label="Loyalty points" value={formatNumber(m?.loyaltyPoints ?? 0)} icon={Gift} accent="emerald" />
        <KpiCard label="Membership" value={m?.loyaltyTier ?? profile?.loyaltyTier ?? "—"} icon={Sparkles} accent="gold" />
        <KpiCard label="Wallet balance" value={formatCurrency(m?.walletBalance ?? 0)} icon={Wallet} accent="teal" />
        <KpiCard label="Unread messages" value={String(m?.unreadMessages ?? 0)} icon={MessageSquare} accent="navy" />
        <KpiCard label="Tours completed" value={String(m?.toursCompleted ?? 0)} icon={Compass} accent="emerald" />
      </KpiGrid>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard title="Upcoming trips" subtitle="Confirmed experiences" action={<Link href="/traveller/bookings" className="text-xs font-medium text-gold hover:underline">View all</Link>}>
            <div className="divide-y divide-[var(--admin-border-soft)]">
              {(data?.upcomingTrips ?? []).map((b) => (
                <div key={b.id} className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="admin-text text-sm font-medium">{b.tourName}</p>
                    <p className="admin-text-muted truncate text-xs">{b.bookingNumber} · {b.supplierName}</p>
                    {b.travelDate && (
                      <p className="admin-text-subtle mt-0.5 text-[11px]">
                        {new Date(b.travelDate).toLocaleDateString("en-FJ", { weekday: "short", month: "short", day: "numeric" })}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={b.bookingStatus} />
                    <span className="admin-text text-sm font-semibold tabular-nums">{formatCurrency(b.amount)}</span>
                  </div>
                </div>
              ))}
              {(data?.upcomingTrips ?? []).length === 0 && (
                <p className="admin-text-muted py-4 text-center text-sm">No upcoming trips — start planning your next Fiji adventure.</p>
              )}
            </div>
          </ChartCard>
        </div>

        <ChartCard title="Quick actions" subtitle="Jump to key tasks">
          <div className="space-y-2">
            {(data?.quickActions ?? []).map((a) => (
              <Link key={a.id} href={a.href} className="admin-surface-muted flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-[var(--admin-surface-subtle)]">
                {a.label}
                <span className="text-gold">→</span>
              </Link>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ChartCard title="Travel spend" subtitle="Last 6 months · FJD">
          <AreaChart data={data?.spendingChart ?? []} color="#c5a44e" />
        </ChartCard>
        <ChartCard title="Trips by year" subtitle="Your travel frequency">
          <BarChart data={data?.tripsChart ?? []} color="#0e5f63" />
        </ChartCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <ChartCard title="Recent activity" subtitle="Bookings, loyalty & messages">
          <div className="space-y-3">
            {(data?.recentActivity ?? []).slice(0, 5).map((a) => (
              <div key={a.id} className="admin-surface-muted rounded-lg px-3 py-2.5">
                <p className="admin-text text-xs font-medium">{a.title}</p>
                <p className="admin-text-muted truncate text-[11px]">{a.detail}</p>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="For you" subtitle="Personalised picks" action={<Link href="/traveller/recommendations" className="text-xs font-medium text-gold hover:underline">See all</Link>}>
          <div className="space-y-3">
            {(data?.recommendations ?? []).map((r) => (
              <div key={r.id} className="admin-surface-muted rounded-lg px-3 py-2.5">
                <p className="admin-text text-xs font-medium">{r.title}</p>
                <p className="admin-text-muted text-[11px]">{r.reason}</p>
                <p className="admin-text mt-1 text-xs font-semibold text-gold">{formatCurrency(r.price)} · ★ {r.rating}</p>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Exclusive offers" subtitle="Member-only deals">
          <div className="space-y-3">
            {(data?.personalizedOffers ?? []).map((o) => (
              <div key={o.id} className="admin-surface-muted rounded-lg border border-gold/20 px-3 py-2.5">
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-gold">{o.code}</p>
                <p className="admin-text mt-1 text-xs font-medium">{o.title}</p>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {data?.travelStatus && (
        <section className="admin-card mt-6 rounded-xl p-6">
          <h3 className="admin-text font-serif text-lg">Travel status overview</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Next departure", value: data.travelStatus.nextDeparture ? new Date(data.travelStatus.nextDeparture).toLocaleDateString() : "—" },
              { label: "Documents expiring", value: String(data.travelStatus.documentsExpiring) },
              { label: "Pending refunds", value: String(data.travelStatus.pendingRefunds) },
              { label: "Open support tickets", value: String(data.travelStatus.openSupportTickets) },
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
