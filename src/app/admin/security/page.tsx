"use client";

import { useAdminApi } from "@/hooks/useAdminApi";
import { PageHeader } from "@/components/admin/ui/AdminUi";
import { formatDateTime } from "@/lib/admin/format";

type ActivityRow = {
  id?: string;
  action: string;
  module: string;
  userId?: string | null;
  ipAddress?: string;
  createdAt: string;
  metadata?: unknown;
};

export default function SecurityPage() {
  const { data, loading } = useAdminApi<{ items: ActivityRow[] }>("/api/v1/admin/activity");

  return (
    <>
      <PageHeader
        title="Security Center"
        subtitle="Admin activity logs, audit trail, login history and security events."
      />

      <div className="admin-card overflow-hidden rounded-xl">
        <table className="w-full text-left text-sm">
          <thead className="admin-surface-muted text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Module</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">IP</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={5} className="admin-text-muted px-4 py-8 text-center">Loading audit logs…</td></tr>
            )}
            {!loading && (data?.items.length ?? 0) === 0 && (
              <tr><td colSpan={5} className="admin-text-muted px-4 py-8 text-center">No activity logged yet. Actions will appear after admin login and operations.</td></tr>
            )}
            {data?.items.map((row, i) => (
              <tr key={row.id ?? i} className="border-t border-[var(--admin-border-soft)]">
                <td className="px-4 py-3 text-xs tabular-nums">{formatDateTime(row.createdAt)}</td>
                <td className="px-4 py-3 font-medium">{row.action}</td>
                <td className="px-4 py-3">{row.module}</td>
                <td className="px-4 py-3 text-xs">{row.userId ?? "—"}</td>
                <td className="px-4 py-3 text-xs">{row.ipAddress ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
