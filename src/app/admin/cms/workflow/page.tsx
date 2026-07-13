"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  AdminButton,
  DataTable,
  PageHeader,
  TableShell,
  Td,
  Th,
  Toolbar,
} from "@/components/admin/ui/AdminUi";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { useCmsToast } from "@/components/cms/platform/CmsToast";
import { formatDate } from "@/lib/admin/format";

type QueueItem = {
  id: string;
  entity: "page" | "post";
  title: string;
  slug: string;
  status: string;
  updatedAt: string;
};

const FILTERS = [
  { value: "", label: "All in queue" },
  { value: "PENDING_REVIEW", label: "Pending review" },
  { value: "NEEDS_CHANGES", label: "Needs changes" },
  { value: "APPROVED", label: "Approved" },
];

export default function WorkflowQueuePage() {
  const { toast } = useCmsToast();
  const [items, setItems] = useState<QueueItem[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    const q = filter ? `?status=${filter}` : "";
    fetch(`/api/v1/admin/cms/workflow${q}`, { credentials: "include" })
      .then((r) => r.json())
      .then((j) => setItems(j.data?.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [filter]);

  useEffect(() => {
    load();
  }, [load]);

  async function transition(item: QueueItem, status: string) {
    setBusyId(item.id);
    const res = await fetch("/api/v1/admin/cms/workflow", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        entity: item.entity,
        id: item.id,
        status,
        comment: comment || undefined,
      }),
    });
    setBusyId(null);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      toast({ title: "Transition failed", description: j?.error, tone: "error" });
      return;
    }
    toast({ title: `Marked ${status.replace(/_/g, " ").toLowerCase()}`, tone: "success" });
    setComment("");
    load();
  }

  return (
    <>
      <PageHeader
        title="Editorial workflow"
        subtitle="Submit for review, request changes, approve, then publish — without touching the public site."
      />

      <Toolbar>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value || "all"}
              type="button"
              onClick={() => setFilter(f.value)}
              className={`rounded-lg px-3 py-1.5 text-sm ${
                filter === f.value ? "bg-gold/15 text-gold" : "admin-text-subtle hover:bg-black/5"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </Toolbar>

      <div className="admin-card mb-4 rounded-xl p-4">
        <label className="block space-y-1">
          <span className="text-xs font-medium text-navy/50">Reviewer comment (optional)</span>
          <textarea
            className="admin-input min-h-16 w-full rounded-lg px-3 py-2 text-sm"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Feedback for the author…"
          />
        </label>
      </div>

      <TableShell>
        <DataTable>
          <thead>
            <tr>
              <Th>Type</Th>
              <Th>Title</Th>
              <Th>Status</Th>
              <Th>Updated</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <Td colSpan={5} className="text-center text-[#64748b]">
                  Loading…
                </Td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <Td colSpan={5} className="text-center text-[#64748b]">
                  Queue empty. From pages/posts, set status to Pending Review.
                </Td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={`${item.entity}-${item.id}`}>
                  <Td className="uppercase text-xs">{item.entity}</Td>
                  <Td>
                    <Link
                      href={
                        item.entity === "page"
                          ? `/admin/cms/pages/${item.id}/edit`
                          : `/admin/cms/posts/${item.id}/edit`
                      }
                      className="font-medium hover:text-gold"
                    >
                      {item.title}
                    </Link>
                    <p className="font-mono text-[10px] text-navy/40">{item.slug}</p>
                  </Td>
                  <Td>
                    <StatusBadge status={item.status} />
                  </Td>
                  <Td className="text-xs">{formatDate(item.updatedAt)}</Td>
                  <Td>
                    <div className="flex flex-wrap gap-1">
                      <AdminButton
                        size="sm"
                        variant="secondary"
                        disabled={busyId === item.id}
                        onClick={() => void transition(item, "NEEDS_CHANGES")}
                      >
                        Changes
                      </AdminButton>
                      <AdminButton
                        size="sm"
                        variant="secondary"
                        disabled={busyId === item.id}
                        onClick={() => void transition(item, "APPROVED")}
                      >
                        Approve
                      </AdminButton>
                      <AdminButton
                        size="sm"
                        disabled={busyId === item.id}
                        onClick={() => void transition(item, "PUBLISHED")}
                      >
                        Publish
                      </AdminButton>
                    </div>
                  </Td>
                </tr>
              ))
            )}
          </tbody>
        </DataTable>
      </TableShell>
    </>
  );
}
