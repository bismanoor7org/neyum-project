"use client";

import { useEffect, useState } from "react";
import {
  AdminButton,
  DataTable,
  FilterSelect,
  PageHeader,
  TableShell,
  Td,
  Th,
  Toolbar,
} from "@/components/admin/ui/AdminUi";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { formatDate } from "@/lib/admin/format";

const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
  { value: "REVISION_REQUESTED", label: "Revision requested" },
];

type SubmissionRow = {
  id: string;
  supplierName?: string;
  title: string;
  contentType: string;
  status: string;
  submittedAt?: string;
};

export default function SupplierApprovalCmsPage() {
  const [items, setItems] = useState<SubmissionRow[]>([]);
  const [status, setStatus] = useState("PENDING");
  const [loading, setLoading] = useState(true);

  const load = () => {
    const params = new URLSearchParams();
    if (status !== "all") params.set("status", status);
    setLoading(true);
    fetch(`/api/v1/admin/cms/supplier-submissions?${params}`, { credentials: "include" })
      .then((r) => r.json())
      .then((j) => setItems(j.data?.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [status]);

  const review = async (id: string, next: "APPROVED" | "REJECTED" | "REVISION_REQUESTED") => {
    await fetch(`/api/v1/admin/cms/supplier-submissions?id=${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    load();
  };

  return (
    <>
      <PageHeader
        title="Supplier Content Approval"
        subtitle="Review supplier-submitted tours, descriptions and media before publishing."
      />
      <Toolbar>
        <FilterSelect value={status} onChange={setStatus} options={STATUS_OPTIONS} label="Status" />
      </Toolbar>
      <TableShell>
        <DataTable>
          <thead>
            <tr>
              <Th>Title</Th>
              <Th>Supplier</Th>
              <Th>Type</Th>
              <Th>Status</Th>
              <Th>Submitted</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><Td colSpan={6} className="text-center text-[#64748b]">Loading…</Td></tr>
            ) : items.length === 0 ? (
              <tr><Td colSpan={6} className="text-center text-[#64748b]">No submissions in queue.</Td></tr>
            ) : (
              items.map((s) => (
                <tr key={s.id}>
                  <Td className="font-medium">{s.title}</Td>
                  <Td>{s.supplierName ?? "—"}</Td>
                  <Td className="text-xs uppercase">{s.contentType}</Td>
                  <Td><StatusBadge status={s.status} /></Td>
                  <Td className="text-xs">{s.submittedAt ? formatDate(s.submittedAt) : "—"}</Td>
                  <Td>
                    {s.status === "PENDING" && (
                      <div className="flex gap-1">
                        <AdminButton size="sm" onClick={() => review(s.id, "APPROVED")}>Approve</AdminButton>
                        <AdminButton size="sm" variant="ghost" onClick={() => review(s.id, "REJECTED")}>Reject</AdminButton>
                      </div>
                    )}
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
