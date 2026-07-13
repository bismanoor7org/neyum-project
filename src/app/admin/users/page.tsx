"use client";

import { useEffect, useState } from "react";
import { KpiCard, KpiGrid } from "@/components/admin/ui/KpiCard";
import {
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
import { Users } from "lucide-react";

type UserRow = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  status: string;
  role: string;
  _count: { bookings: number };
};

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    setLoading(true);
    fetch(`/api/v1/admin/users?${params}`, { credentials: "include" })
      .then((r) => r.json())
      .then((j) => setItems(j.data?.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <>
      <PageHeader
        title="Traveller Management"
        subtitle="View traveller profiles, booking history, and account status."
      />

      <KpiGrid>
        <KpiCard label="Total travellers" value={String(items.length)} icon={Users} accent="navy" />
        <KpiCard label="Active" value={String(items.filter((u) => u.status === "ACTIVE").length)} icon={Users} accent="emerald" />
      </KpiGrid>

      <div className="mt-8">
        <Toolbar>
          <SearchInput value={search} onChange={setSearch} placeholder="Search travellers…" />
        </Toolbar>
        <TableShell>
          <DataTable>
            <thead>
              <tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Bookings</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={4} className="admin-text-muted px-4 py-8 text-center">Loading…</td></tr>}
              {!loading && items.length === 0 && <tr><td colSpan={4} className="admin-text-muted px-4 py-8 text-center">No travellers found.</td></tr>}
              {items.map((u) => (
                <tr key={u.id}>
                  <Td>{u.firstName} {u.lastName}</Td>
                  <Td className="text-xs">{u.email}</Td>
                  <Td>{u._count.bookings}</Td>
                  <Td><StatusBadge status={u.status} /></Td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        </TableShell>
      </div>
    </>
  );
}
