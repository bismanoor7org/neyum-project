"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, ShieldCheck, ShieldX } from "lucide-react";
import {
  AdminButton,
  DataTable,
  FilterSelect,
  PageHeader,
  SearchInput,
  TableShell,
  Td,
  Th,
  Toolbar,
} from "@/components/admin/ui/AdminUi";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { adminPatch } from "@/hooks/useAdminApi";

type SupplierRow = {
  id: string;
  companyName: string;
  verificationStatus: string;
  kycStatus: string;
  rating: number;
  healthScore: number;
  user: { email: string; firstName: string; lastName: string };
  _count: { tours: number; bookings: number };
};

const STATUS_OPTIONS = [
  { value: "all", label: "All statuses" },
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "VERIFIED", label: "Verified" },
  { value: "SUSPENDED", label: "Suspended" },
  { value: "REJECTED", label: "Rejected" },
];

export default function SuppliersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [items, setItems] = useState<SupplierRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (statusFilter !== "all") params.set("status", statusFilter);
    setLoading(true);
    fetch(`/api/v1/admin/suppliers?${params}`, { credentials: "include" })
      .then((r) => r.json())
      .then((j) => setItems(j.data?.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [search, statusFilter]);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id: string, status: string) => {
    await adminPatch("/api/v1/admin/suppliers", { id, verificationStatus: status });
    load();
  };

  return (
    <>
      <PageHeader
        title="Supplier Management"
        subtitle="Approve, verify, suspend and monitor tour operators and experience hosts."
      />

      <Toolbar>
        <SearchInput value={search} onChange={setSearch} placeholder="Search suppliers…" />
        <FilterSelect value={statusFilter} onChange={setStatusFilter} options={STATUS_OPTIONS} label="Status" />
      </Toolbar>

      <TableShell>
        <DataTable>
          <thead>
            <tr>
              <Th>Supplier</Th>
              <Th>Company</Th>
              <Th>Email</Th>
              <Th>Tours</Th>
              <Th>Bookings</Th>
              <Th>Rating</Th>
              <Th>KYC</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={9} className="admin-text-muted px-4 py-8 text-center">Loading…</td></tr>}
            {!loading && items.length === 0 && <tr><td colSpan={9} className="admin-text-muted px-4 py-8 text-center">No suppliers found.</td></tr>}
            {items.map((s) => (
              <tr key={s.id}>
                <Td>
                  <p className="font-medium">{s.user.firstName} {s.user.lastName}</p>
                </Td>
                <Td>{s.companyName}</Td>
                <Td className="text-xs">{s.user.email}</Td>
                <Td>{s._count.tours}</Td>
                <Td>{s._count.bookings}</Td>
                <Td>{s.rating.toFixed(1)}</Td>
                <Td><StatusBadge status={s.kycStatus} /></Td>
                <Td><StatusBadge status={s.verificationStatus} /></Td>
                <Td>
                  <div className="flex flex-wrap gap-1">
                    {s.verificationStatus === "PENDING" && (
                      <>
                        <AdminButton variant="ghost" onClick={() => updateStatus(s.id, "APPROVED")}>
                          <Check className="h-3.5 w-3.5" /> Approve
                        </AdminButton>
                        <AdminButton variant="ghost" onClick={() => updateStatus(s.id, "REJECTED")}>
                          <ShieldX className="h-3.5 w-3.5" /> Reject
                        </AdminButton>
                      </>
                    )}
                    {s.verificationStatus === "APPROVED" && (
                      <AdminButton variant="ghost" onClick={() => updateStatus(s.id, "VERIFIED")}>
                        <ShieldCheck className="h-3.5 w-3.5" /> Verify
                      </AdminButton>
                    )}
                    {s.verificationStatus !== "SUSPENDED" && (
                      <AdminButton variant="ghost" onClick={() => updateStatus(s.id, "SUSPENDED")}>Suspend</AdminButton>
                    )}
                    {s.verificationStatus === "SUSPENDED" && (
                      <AdminButton variant="ghost" onClick={() => updateStatus(s.id, "APPROVED")}>Reactivate</AdminButton>
                    )}
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </TableShell>
    </>
  );
}
