"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/admin/ui/AdminUi";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { formatDateTime } from "@/lib/admin/format";

type TicketRow = {
  id: string;
  subject: string;
  type: string;
  status: string;
  priority: string;
  createdAt: string;
  user: { firstName: string; lastName: string; email: string };
};

export default function SupportAdminPage() {
  const [items, setItems] = useState<TicketRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/admin/support", { credentials: "include" })
      .then((r) => r.json())
      .then((res) => setItems(res.data ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader
        title="Support Center"
        subtitle="User tickets, supplier requests and complaints."
      />
      <div className="admin-card overflow-hidden rounded-xl">
        <table className="w-full text-left text-sm">
          <thead className="admin-surface-muted text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Submitter</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="admin-text-muted px-4 py-8 text-center">
                  Loading tickets…
                </td>
              </tr>
            )}
            {!loading && items.length === 0 && (
              <tr>
                <td colSpan={6} className="admin-text-muted px-4 py-8 text-center">
                  No support tickets open.
                </td>
              </tr>
            )}
            {items.map((row) => (
              <tr key={row.id} className="border-t border-[var(--admin-border-soft)]">
                <td className="admin-text px-4 py-3 font-medium">{row.subject}</td>
                <td className="admin-text-muted px-4 py-3">{row.user.email}</td>
                <td className="admin-text-muted px-4 py-3">{row.type}</td>
                <td className="admin-text-muted px-4 py-3">{row.priority}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={row.status.toLowerCase()} />
                </td>
                <td className="admin-text-muted px-4 py-3">{formatDateTime(row.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
