"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/admin/ui/AdminUi";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";

type ReviewRow = {
  id: string;
  rating: number;
  review: string | null;
  status: string;
  user: { firstName: string; lastName: string };
  tour: { title: string };
};

export default function ReviewsAdminPage() {
  const [items, setItems] = useState<ReviewRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/admin/reviews", { credentials: "include" })
      .then((r) => r.json())
      .then((res) => setItems(res.data ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader
        title="Reviews"
        subtitle="Moderate traveler reviews — approve, reject or flag content."
      />
      <div className="admin-card overflow-hidden rounded-xl">
        <table className="w-full text-left text-sm">
          <thead className="admin-surface-muted text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">Tour</th>
              <th className="px-4 py-3">Reviewer</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={4} className="admin-text-muted px-4 py-8 text-center">
                  Loading reviews…
                </td>
              </tr>
            )}
            {!loading && items.length === 0 && (
              <tr>
                <td colSpan={4} className="admin-text-muted px-4 py-8 text-center">
                  No reviews pending moderation.
                </td>
              </tr>
            )}
            {items.map((row) => (
              <tr key={row.id} className="border-t border-[var(--admin-border-soft)]">
                <td className="admin-text px-4 py-3 font-medium">{row.tour.title}</td>
                <td className="admin-text-muted px-4 py-3">
                  {row.user.firstName} {row.user.lastName}
                </td>
                <td className="admin-text px-4 py-3">{row.rating} / 5</td>
                <td className="px-4 py-3">
                  <StatusBadge status={row.status.toLowerCase()} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
