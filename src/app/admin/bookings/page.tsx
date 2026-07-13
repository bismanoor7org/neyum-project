"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Download } from "lucide-react";
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
import { formatCurrency, formatDate, formatDateTime } from "@/lib/admin/format";

type BookingRow = {
  id: string;
  bookingNumber: string;
  amount: number | string;
  bookingStatus: string;
  paymentStatus: string;
  bookingDate: string;
  travelDate: string | null;
  traveler: { firstName: string; lastName: string; email: string };
  supplier: { companyName: string };
  tour: { title: string } | null;
};

const STATUS_OPTIONS = [
  { value: "all", label: "All statuses" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "PENDING", label: "Pending" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
  { value: "REFUNDED", label: "Refunded" },
];

const PAYMENT_OPTIONS = [
  { value: "all", label: "All payments" },
  { value: "PAID", label: "Paid" },
  { value: "PENDING", label: "Pending" },
  { value: "PARTIAL", label: "Partial" },
  { value: "REFUNDED", label: "Refunded" },
];

export default function BookingsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [items, setItems] = useState<BookingRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (statusFilter !== "all") params.set("bookingStatus", statusFilter);
    if (paymentFilter !== "all") params.set("paymentStatus", paymentFilter);
    setLoading(true);
    fetch(`/api/v1/admin/bookings?${params}`, { credentials: "include" })
      .then((r) => r.json())
      .then((j) => setItems(j.data?.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [search, statusFilter, paymentFilter]);

  const filtered = useMemo(() => items, [items]);

  return (
    <>
      <PageHeader
        title="Bookings"
        subtitle="Manage all traveller bookings — search, filter and track payment status."
        actions={
          <AdminButton variant="secondary">
            <Download className="h-4 w-4" />
            Export CSV
          </AdminButton>
        }
      />

      <Toolbar>
        <SearchInput value={search} onChange={setSearch} placeholder="Search bookings, travellers, tours…" />
        <div className="flex flex-wrap gap-2">
          <FilterSelect value={statusFilter} onChange={setStatusFilter} options={STATUS_OPTIONS} />
          <FilterSelect value={paymentFilter} onChange={setPaymentFilter} options={PAYMENT_OPTIONS} />
        </div>
      </Toolbar>

      <TableShell>
        <DataTable>
          <thead>
            <tr>
              <Th>Reference</Th>
              <Th>Traveller</Th>
              <Th>Experience</Th>
              <Th>Supplier</Th>
              <Th>Travel date</Th>
              <Th>Amount</Th>
              <Th>Status</Th>
              <Th>Payment</Th>
              <Th>Booked</Th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={9} className="admin-text-muted px-4 py-8 text-center">Loading bookings…</td>
              </tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="admin-text-muted px-4 py-8 text-center">No bookings found.</td>
              </tr>
            )}
            {filtered.map((b) => (
              <tr key={b.id}>
                <Td className="font-mono text-xs">
                  <Link href={`/admin/bookings/${b.id}`} className="hover:text-gold">
                    {b.bookingNumber}
                  </Link>
                </Td>
                <Td>
                  <div>{b.traveler.firstName} {b.traveler.lastName}</div>
                  <div className="admin-text-muted text-xs">{b.traveler.email}</div>
                </Td>
                <Td>{b.tour?.title ?? "—"}</Td>
                <Td>{b.supplier.companyName}</Td>
                <Td>{b.travelDate ? formatDate(b.travelDate) : "—"}</Td>
                <Td className="font-semibold tabular-nums">{formatCurrency(Number(b.amount))}</Td>
                <Td><StatusBadge status={b.bookingStatus} /></Td>
                <Td><StatusBadge status={b.paymentStatus} /></Td>
                <Td className="text-xs">{formatDateTime(b.bookingDate)}</Td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </TableShell>
    </>
  );
}
