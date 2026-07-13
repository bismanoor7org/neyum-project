"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import {
  DataTable,
  PageHeader,
  SearchInput,
  TableShell,
  Td,
  Th,
  Toolbar,
} from "@/components/admin/ui/AdminUi";

type CountryRow = {
  id: string;
  name: string;
  code: string;
  slug: string;
  _count?: { visaRules: number };
};

export default function VisaCountriesPage() {
  const [items, setItems] = useState<CountryRow[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams({ section: "countries" });
    if (search) params.set("search", search);
    setLoading(true);
    fetch(`/api/v1/admin/cms/visa?${params}`, { credentials: "include" })
      .then((r) => r.json())
      .then((j) => setItems(j.data?.items ?? j.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <>
      <PageHeader
        title="Visa Countries"
        subtitle="Nationalities used across visa lookup, search and AI assistant."
        actions={
          <Link
            href="/admin/cms/visa/countries/new"
            className="inline-flex items-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-navy-light"
          >
            <Plus className="h-4 w-4" />
            Add country
          </Link>
        }
      />
      <Toolbar>
        <SearchInput value={search} onChange={setSearch} placeholder="Search countries…" />
      </Toolbar>
      <TableShell>
        <DataTable>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Code</Th>
              <Th>Slug</Th>
              <Th>Rules</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><Td colSpan={5} className="text-center text-[#64748b]">Loading…</Td></tr>
            ) : items.length === 0 ? (
              <tr><Td colSpan={5} className="text-center text-[#64748b]">No countries found</Td></tr>
            ) : (
              items.map((c) => (
                <tr key={c.id}>
                  <Td className="font-medium">{c.name}</Td>
                  <Td>{c.code}</Td>
                  <Td className="text-xs text-[#64748b]">{c.slug}</Td>
                  <Td>{c._count?.visaRules ?? 0}</Td>
                  <Td>
                    <Link href={`/admin/cms/visa/countries/${c.id}/edit`} className="text-xs text-gold">
                      Edit
                    </Link>
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
