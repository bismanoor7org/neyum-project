"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import {
  DataTable,
  PageHeader,
  SearchInput,
  TableShell,
  Td,
  Th,
  Toolbar,
} from "@/components/admin/ui/AdminUi";
import { deleteVisaRuleAction } from "@/server/actions/visa-intelligence";

type RuleRow = {
  id: string;
  visaType: string;
  stayDuration: string;
  processingTime: string;
  nationality: { name: string; slug: string };
};

const TYPE_LABELS: Record<string, string> = {
  VISA_FREE: "Visa Free",
  VISA_ON_ARRIVAL: "Visa On Arrival",
  EVISA: "eVisa",
  VISA_REQUIRED: "Visa Required",
};

export default function VisaRulesPage() {
  const [items, setItems] = useState<RuleRow[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  function load() {
    const params = new URLSearchParams({ section: "rules" });
    if (search) params.set("search", search);
    setLoading(true);
    fetch(`/api/v1/admin/cms/visa?${params}`, { credentials: "include" })
      .then((r) => r.json())
      .then((j) => setItems(j.data?.items ?? j.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, [search]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this visa rule?")) return;
    await deleteVisaRuleAction(id);
    load();
  }

  return (
    <>
      <PageHeader
        title="Visa Rules"
        subtitle="Fiji entry requirements by nationality."
        actions={
          <Link
            href="/admin/cms/visa/rules/new"
            className="inline-flex items-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-navy-light"
          >
            <Plus className="h-4 w-4" />
            Add rule
          </Link>
        }
      />
      <Toolbar>
        <SearchInput value={search} onChange={setSearch} placeholder="Search nationality…" />
      </Toolbar>
      <TableShell>
        <DataTable>
          <thead>
            <tr>
              <Th>Nationality</Th>
              <Th>Visa type</Th>
              <Th>Stay</Th>
              <Th>Processing</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><Td colSpan={5} className="text-center text-[#64748b]">Loading…</Td></tr>
            ) : items.length === 0 ? (
              <tr><Td colSpan={5} className="text-center text-[#64748b]">No visa rules found</Td></tr>
            ) : (
              items.map((r) => (
                <tr key={r.id}>
                  <Td className="font-medium">{r.nationality.name}</Td>
                  <Td>{TYPE_LABELS[r.visaType] ?? r.visaType}</Td>
                  <Td className="text-xs">{r.stayDuration}</Td>
                  <Td className="text-xs">{r.processingTime}</Td>
                  <Td className="flex gap-3">
                    <Link href={`/admin/cms/visa/rules/${r.id}/edit`} className="text-xs text-gold">
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(r.id)}
                      className="inline-flex items-center gap-1 text-xs text-red-600"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </button>
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
