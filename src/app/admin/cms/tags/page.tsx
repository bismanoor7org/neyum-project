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

type Tag = { id: string; name: string; slug: string };

export default function CmsTagsPage() {
  const [items, setItems] = useState<Tag[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/v1/admin/cms/tags", { credentials: "include" });
    const json = await res.json();
    setItems(json.data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  async function create() {
    if (!name.trim()) return;
    await fetch("/api/v1/admin/cms/tags", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setName("");
    await load();
  }

  async function remove(id: string) {
    if (!window.confirm("Delete tag?")) return;
    await fetch(`/api/v1/admin/cms/tags?id=${id}`, { method: "DELETE", credentials: "include" });
    await load();
  }

  return (
    <>
      <PageHeader title="Tags" subtitle="Lightweight labels for blog posts." />
      <div className="mb-4 flex gap-2">
        <input
          className="admin-input h-9 flex-1 rounded-lg px-3 text-sm"
          placeholder="New tag name"
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
                <Td colSpan={3}>No tags yet.</Td>
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
