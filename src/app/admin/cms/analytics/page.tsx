"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminButton, PageHeader } from "@/components/admin/ui/AdminUi";
import { AreaChart, BarChart, ChartCard } from "@/components/admin/ui/Charts";
import { useCmsToast } from "@/components/cms/platform/CmsToast";

type AnalyticsSettings = {
  gaId?: string;
  gscProperty?: string;
  clarityId?: string;
  connectedAt?: string;
};

type LivePayload = {
  connectors: {
    gaId: string;
    gscProperty: string;
    clarityId: string;
    connectedAt: string | null;
    gaConfigured: boolean;
    gscConfigured: boolean;
    liveGaReady: boolean;
  };
  content: {
    publishedDestinations: number;
    draftContent: number;
    destinations: number;
    tours: number;
    deals: number;
    seoHealth: { total: number; withTitle: number; withDescription: number; missing: number };
  } | null;
  leads: {
    total: number;
    today: number;
    thisWeek: number;
    booking: number;
    contact: number;
    series: { label: string; value: number }[];
  };
  traffic: {
    sessions: { label: string; value: number }[];
    note: string;
    source?: string;
  };
};

export default function CmsAnalyticsPage() {
  const { toast } = useCmsToast();
  const [live, setLive] = useState<LivePayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [connectors, setConnectors] = useState<AnalyticsSettings>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/v1/admin/cms/analytics/live", { credentials: "include" }).then((r) => r.json()),
      fetch("/api/v1/admin/cms/settings", { credentials: "include" }).then((r) => r.json()),
    ])
      .then(([liveJson, settingsJson]) => {
        setLive(liveJson.data ?? null);
        setConnectors((settingsJson.data?.analytics ?? {}) as AnalyticsSettings);
      })
      .catch(() => setLive(null))
      .finally(() => setLoading(false));
  }, []);

  async function saveConnectors() {
    setSaving(true);
    const res = await fetch("/api/v1/admin/cms/settings", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key: "analytics",
        value: { ...connectors, connectedAt: new Date().toISOString() },
      }),
    });
    setSaving(false);
    toast({
      title: res.ok ? "Connectors saved" : "Save failed",
      tone: res.ok ? "success" : "error",
    });
    if (res.ok) {
      const refreshed = await fetch("/api/v1/admin/cms/analytics/live", {
        credentials: "include",
      }).then((r) => r.json());
      setLive(refreshed.data ?? null);
    }
  }

  const seoPct =
    live?.content?.seoHealth?.total
      ? Math.round(
          ((live.content.seoHealth.withTitle ?? 0) / live.content.seoHealth.total) * 100,
        )
      : 0;

  return (
    <>
      <PageHeader
        title="CMS Analytics"
        subtitle="Live lead activity, content health, and GA4 / Search Console connectors."
        actions={
          <Link href="/admin/analytics" className="text-sm text-gold hover:underline">
            Executive Analytics →
          </Link>
        }
      />

      <div className="admin-card mb-6 space-y-3 rounded-xl p-5">
        <h3 className="font-semibold">Analytics connectors</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <input
            className="admin-input h-9 rounded-lg px-3 text-sm"
            placeholder="GA4 Measurement ID (G-…)"
            value={connectors.gaId ?? ""}
            onChange={(e) => setConnectors((c) => ({ ...c, gaId: e.target.value }))}
          />
          <input
            className="admin-input h-9 rounded-lg px-3 text-sm"
            placeholder="GSC property (sc-domain:…)"
            value={connectors.gscProperty ?? ""}
            onChange={(e) => setConnectors((c) => ({ ...c, gscProperty: e.target.value }))}
          />
          <input
            className="admin-input h-9 rounded-lg px-3 text-sm"
            placeholder="Clarity ID (optional)"
            value={connectors.clarityId ?? ""}
            onChange={(e) => setConnectors((c) => ({ ...c, clarityId: e.target.value }))}
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <AdminButton size="sm" disabled={saving} onClick={() => void saveConnectors()}>
            {saving ? "Saving…" : "Save connectors"}
          </AdminButton>
          <span
            className={`text-xs font-medium ${
              live?.connectors.gaConfigured || live?.connectors.gscConfigured
                ? "text-emerald-700"
                : "text-amber-700"
            }`}
          >
            {live?.connectors.gaConfigured || live?.connectors.gscConfigured
              ? "Configured"
              : "Not connected"}
          </span>
          {live?.connectors.liveGaReady && (
            <span className="text-xs text-emerald-700">GA4 service auth ready</span>
          )}
        </div>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="admin-card rounded-xl p-5">
          <p className="admin-text-subtle text-xs uppercase tracking-wide">Leads today</p>
          <p className="mt-2 font-serif text-3xl">{loading ? "—" : live?.leads.today ?? 0}</p>
        </div>
        <div className="admin-card rounded-xl p-5">
          <p className="admin-text-subtle text-xs uppercase tracking-wide">Leads this week</p>
          <p className="mt-2 font-serif text-3xl text-gold">
            {loading ? "—" : live?.leads.thisWeek ?? 0}
          </p>
        </div>
        <div className="admin-card rounded-xl p-5">
          <p className="admin-text-subtle text-xs uppercase tracking-wide">Published destinations</p>
          <p className="mt-2 font-serif text-3xl">
            {loading ? "—" : live?.content?.publishedDestinations ?? 0}
          </p>
        </div>
        <div className="admin-card rounded-xl p-5">
          <p className="admin-text-subtle text-xs uppercase tracking-wide">SEO coverage</p>
          <p className="mt-2 font-serif text-3xl">{loading ? "—" : `${seoPct}%`}</p>
        </div>
      </div>

      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <ChartCard
          title="Lead activity"
          subtitle={live?.traffic.note ?? "Concierge enquiries · last 7 days"}
        >
          {live?.leads.series?.length ? (
            <AreaChart data={live.leads.series} color="#c5a44e" />
          ) : (
            <p className="py-10 text-center text-sm text-navy/45">No lead data yet</p>
          )}
        </ChartCard>
        <ChartCard title="Traffic proxy" subtitle="Sessions when GA4 live; else lead trend">
          {live?.traffic.sessions?.length ? (
            <BarChart data={live.traffic.sessions} color="#0e5f63" />
          ) : (
            <p className="py-10 text-center text-sm text-navy/45">No series yet</p>
          )}
        </ChartCard>
      </div>

      <div className="admin-card rounded-xl p-5">
        <h3 className="admin-text mb-4 font-semibold">Content inventory</h3>
        <div className="grid gap-3 sm:grid-cols-4">
          {[
            { label: "Destinations", n: live?.content?.destinations },
            { label: "Experiences", n: live?.content?.tours },
            { label: "Deals", n: live?.content?.deals },
            { label: "Draft backlog", n: live?.content?.draftContent },
          ].map((row) => (
            <div key={row.label} className="rounded-lg bg-black/[0.03] px-3 py-3">
              <p className="text-xs text-navy/50">{row.label}</p>
              <p className="mt-1 text-xl font-semibold tabular-nums">
                {loading ? "—" : row.n ?? 0}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
