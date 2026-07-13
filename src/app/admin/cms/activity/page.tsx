"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageHeader, Toolbar, FilterSelect } from "@/components/admin/ui/AdminUi";
import { formatDateTime } from "@/lib/admin/format";

type ActivityRow = {
  id: string;
  action: string;
  module: string;
  entityId?: string | null;
  createdAt: string;
  user?: { firstName: string; lastName: string; email: string } | null;
};

const MODULE_OPTIONS = [
  { value: "CONTENT", label: "Content (CMS)" },
  { value: "all", label: "All modules" },
  { value: "BOOKINGS", label: "Bookings" },
  { value: "SETTINGS", label: "Settings" },
  { value: "AUTH", label: "Auth" },
];

export default function CmsActivityPage() {
  const [items, setItems] = useState<ActivityRow[]>([]);
  const [module, setModule] = useState("CONTENT");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams({ limit: "100" });
    if (module !== "all") params.set("module", module);
    setLoading(true);
    fetch(`/api/v1/admin/activity?${params}`, { credentials: "include" })
      .then((r) => r.json())
      .then((j) => setItems(j.data?.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [module]);

  return (
    <>
      <PageHeader
        title="Activity Logs"
        subtitle="Audit trail for CMS publishes, edits, SEO updates and scheduler runs."
      />
      <Toolbar>
        <FilterSelect value={module} onChange={setModule} options={MODULE_OPTIONS} label="Module" />
      </Toolbar>
      <div className="admin-card overflow-hidden rounded-xl">
        <table className="w-full text-left text-sm">
          <thead className="admin-surface-muted text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Entity</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-[#64748b]">Loading…</td>
              </tr>
            )}
            {!loading && items.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-[#64748b]">No activity for this filter.</td>
              </tr>
            )}
            {items.map((row) => (
              <tr key={row.id} className="border-t border-[var(--admin-border-soft)]">
                <td className="px-4 py-3 text-xs tabular-nums">{formatDateTime(row.createdAt)}</td>
                <td className="px-4 py-3 font-medium">{row.action}</td>
                <td className="px-4 py-3 text-xs">
                  {row.user ? `${row.user.firstName} ${row.user.lastName}` : "—"}
                </td>
                <td className="px-4 py-3 font-mono text-xs">{row.entityId ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="admin-text-subtle mt-4 text-xs">
        Full security audit also available in{" "}
        <Link href="/admin/security" className="text-gold hover:underline">Security Center</Link>.
      </p>
    </>
  );
}
