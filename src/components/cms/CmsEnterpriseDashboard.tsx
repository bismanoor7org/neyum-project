"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  FileEdit,
  Layers,
  Mail,
  ShoppingBag,
  Sparkles,
  Users,
  HardDrive,
} from "lucide-react";
import { PageHeader } from "@/components/admin/ui/AdminUi";
import { CMS_MODULES } from "@/lib/cms/modules";
import type { CmsEnterpriseDashboard } from "@/lib/cms/types";
import { formatDateTime } from "@/lib/admin/format";

async function fetchDashboard(): Promise<CmsEnterpriseDashboard | null> {
  const r = await fetch("/api/v1/admin/cms/dashboard", { credentials: "include" });
  const j = await r.json();
  return j.data?.stats ?? null;
}

export function CmsEnterpriseDashboard() {
  const { data: stats, isLoading: loading, refetch } = useQuery({
    queryKey: ["cms-dashboard"],
    queryFn: fetchDashboard,
  });
  const [scheduling, setScheduling] = useState(false);
  const [postsStats, setPostsStats] = useState({ published: 0, draft: 0 });

  useEffect(() => {
    void fetch("/api/v1/admin/cms/posts?pageSize=1&status=PUBLISHED", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => {
        const published = j.data?.total ?? 0;
        return fetch("/api/v1/admin/cms/posts?pageSize=1&status=DRAFT", { credentials: "include" })
          .then((r) => r.json())
          .then((d) => setPostsStats({ published, draft: d.data?.total ?? 0 }));
      })
      .catch(() => undefined);
  }, []);

  async function runScheduler() {
    setScheduling(true);
    try {
      await fetch("/api/v1/admin/cms/scheduler", { method: "POST", credentials: "include" });
      await refetch();
    } finally {
      setScheduling(false);
    }
  }

  const kpis = [
    { label: "Published destinations", value: stats?.publishedDestinations, icon: Sparkles },
    { label: "Published posts", value: postsStats.published, icon: FileEdit },
    { label: "Draft posts", value: postsStats.draft, icon: FileEdit, accent: true },
    { label: "Draft items", value: stats?.draftContent, icon: FileEdit, accent: true },
    { label: "Scheduled", value: stats?.scheduledContent, icon: CalendarClock },
    { label: "Pending bookings", value: stats?.pendingBookings, icon: ShoppingBag },
    { label: "New leads", value: stats?.newLeads, icon: Mail },
    { label: "Media assets", value: stats?.mediaAssets, icon: Layers },
    { label: "SEO records", value: stats?.seoHealth?.total, icon: BarChart3 },
    { label: "Pending reviews", value: stats?.pendingSubmissions, icon: Users, accent: true },
    { label: "Storage (assets)", value: stats?.mediaAssets, icon: HardDrive },
    { label: "Modules", value: CMS_MODULES.length, icon: ArrowRight },
  ];

  return (
    <>
      <PageHeader
        title="Enterprise CMS"
        subtitle="Headless command centre — content, SEO, bookings, AI tools. Press Ctrl+K to jump."
        actions={
          <button
            type="button"
            onClick={runScheduler}
            disabled={scheduling}
            className="inline-flex items-center gap-2 rounded-lg border border-gold/30 bg-gold/10 px-4 py-2 text-sm font-medium text-gold hover:bg-gold/15 disabled:opacity-60"
          >
            <CalendarClock className="h-4 w-4" />
            {scheduling ? "Running…" : "Run scheduler"}
          </button>
        }
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="admin-card rounded-xl p-5">
              <div className="flex items-center justify-between">
                <p className="admin-text-subtle text-[11px] font-semibold uppercase tracking-wide">
                  {card.label}
                </p>
                <Icon className="h-4 w-4 text-gold" />
              </div>
              <p className={`mt-2 font-serif text-3xl ${card.accent ? "text-gold" : "admin-text"}`}>
                {loading ? "—" : (card.value ?? 0)}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <div className="admin-card rounded-xl p-5">
          <h3 className="admin-text mb-3 font-semibold">SEO health</h3>
          {loading ? (
            <p className="admin-text-subtle text-sm">Loading…</p>
          ) : (
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="admin-text-muted">Total SEO rows</span>
                <span className="admin-text font-medium">{stats?.seoHealth?.total ?? 0}</span>
              </li>
              <li className="flex justify-between">
                <span className="admin-text-muted">With titles</span>
                <span className="admin-text font-medium">{stats?.seoHealth?.withTitle ?? 0}</span>
              </li>
              <li className="flex justify-between">
                <span className="admin-text-muted">With descriptions</span>
                <span className="admin-text font-medium">{stats?.seoHealth?.withDescription ?? 0}</span>
              </li>
              <li className="flex justify-between">
                <span className="admin-text-muted">Missing SEO</span>
                <span className="admin-text font-medium">{stats?.seoHealth?.missing ?? 0}</span>
              </li>
            </ul>
          )}
        </div>

        <div className="admin-card rounded-xl p-5">
          <h3 className="admin-text mb-3 font-semibold">Recent activity</h3>
          {loading ? (
            <p className="admin-text-subtle text-sm">Loading…</p>
          ) : (stats?.recentActivity?.length ?? 0) === 0 ? (
            <p className="admin-text-subtle text-sm">No recent activity.</p>
          ) : (
            <ul className="space-y-3">
              {(stats?.recentActivity ?? []).slice(0, 6).map((row) => (
                <li key={row.id} className="flex items-start justify-between gap-3 text-sm">
                  <div>
                    <p className="admin-text font-medium">{row.action}</p>
                    <p className="admin-text-subtle text-xs">{row.userName ?? "CMS"}</p>
                  </div>
                  <span className="admin-text-subtle shrink-0 text-xs">
                    {row.createdAt ? formatDateTime(row.createdAt) : "—"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="admin-card rounded-xl p-5">
        <h3 className="admin-text mb-4 font-semibold">Content modules</h3>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CMS_MODULES.map((m) => (
            <Link
              key={m.id}
              href={m.href}
              className="rounded-lg border border-transparent px-3 py-2.5 text-sm transition hover:border-gold/25 hover:bg-gold/5"
            >
              <p className="font-medium text-navy">{m.label}</p>
              <p className="mt-0.5 line-clamp-1 text-xs text-navy/50">{m.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
