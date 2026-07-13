"use client";

import { useEffect, useState } from "react";
import { AdminButton, PageHeader } from "@/components/admin/ui/AdminUi";

type SettingsMap = Record<string, Record<string, unknown>>;

export default function CmsSettingsPage() {
  const [settings, setSettings] = useState<SettingsMap>({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    void fetch("/api/v1/admin/cms/settings", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => setSettings((j.data as SettingsMap) ?? {}));
  }, []);

  function update(key: string, field: string, value: string) {
    setSettings((s) => ({
      ...s,
      [key]: { ...(s[key] ?? {}), [field]: value },
    }));
  }

  async function save(key: string) {
    setSaving(true);
    setMessage(null);
    const res = await fetch("/api/v1/admin/cms/settings", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value: settings[key] ?? {} }),
    });
    setSaving(false);
    setMessage(res.ok ? `${key} saved` : "Save failed");
  }

  const blocks: { key: string; title: string; fields: string[] }[] = [
    { key: "site", title: "Website", fields: ["siteName", "tagline", "logo", "favicon"] },
    { key: "contact", title: "Contact", fields: ["email", "phone", "whatsapp", "address"] },
    { key: "social", title: "Social", fields: ["instagram", "facebook", "youtube", "tiktok"] },
    { key: "analytics", title: "Analytics", fields: ["gaId", "gscProperty", "clarityId"] },
    { key: "newsletter", title: "Newsletter", fields: ["provider", "listId"] },
  ];

  return (
    <>
      <PageHeader title="Settings" subtitle="Site-wide configuration for logo, contact, social and analytics." />
      {message && <p className="mb-4 text-sm text-navy/70">{message}</p>}
      <div className="grid gap-4 lg:grid-cols-2">
        {blocks.map((block) => (
          <div key={block.key} className="admin-card space-y-3 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl">{block.title}</h2>
              <AdminButton size="sm" disabled={saving} onClick={() => void save(block.key)}>
                Save
              </AdminButton>
            </div>
            {block.fields.map((field) => (
              <input
                key={field}
                className="admin-input h-9 w-full rounded-lg px-3 text-sm"
                placeholder={field}
                value={String(settings[block.key]?.[field] ?? "")}
                onChange={(e) => update(block.key, field, e.target.value)}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
