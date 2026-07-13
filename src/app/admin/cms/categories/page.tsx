"use client";

import { useEffect, useState } from "react";
import {
  AdminButton,
  DataTable,
  PageHeader,
  TableShell,
  Td,
  Th,
} from "@/components/admin/ui/AdminUi";

type Category = { id: string; name: string; slug: string; description: string | null };

export default function CmsCategoriesPage() {
  const [items, setItems] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/v1/admin/cms/categories", { credentials: "include" });
    const json = await res.json();
    setItems(json.data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  async function create() {
    if (!name.trim()) return;
    await fetch("/api/v1/admin/cms/categories", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setName("");
    await load();
  }

  async function remove(id: string) {
    if (!window.confirm("Delete category?")) return;
    await fetch(`/api/v1/admin/cms/categories?id=${id}`, { method: "DELETE", credentials: "include" });
    await load();
  }

  return (
    <>
      <PageHeader title="Categories" subtitle="Blog and content taxonomy." />
      <div className="mb-4 flex gap-2">
        <input
          className="admin-input h-9 flex-1 rounded-lg px-3 text-sm"
          placeholder="New category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <AdminButton onClick={() => void create()}>Add</AdminButton>
      </div>
      <TableShell>
        <DataTable>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Slug</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <Td colSpan={3}>Loading…</Td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <Td colSpan={3}>No categories yet.</Td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id}>
                  <Td>{item.name}</Td>
                  <Td>/{item.slug}</Td>
                  <Td>
                    <button type="button" className="text-xs text-red-600" onClick={() => void remove(item.id)}>
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
