"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AdminButton,
  DataTable,
  PageHeader,
  TableShell,
  Td,
  Th,
} from "@/components/admin/ui/AdminUi";
import { useCmsToast } from "@/components/cms/platform/CmsToast";
import { formatDate } from "@/lib/admin/format";

type SessionRow = {
  id: string;
  deviceName: string | null;
  browser: string | null;
  os: string | null;
  ipAddress: string | null;
  location: string | null;
  isCurrent: boolean;
  lastActive: string;
  createdAt: string;
};

export default function CmsSessionsPage() {
  const { toast } = useCmsToast();
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [twoFactor, setTwoFactor] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    fetch("/api/v1/admin/cms/sessions", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => {
        setSessions(j.data?.sessions ?? []);
        setTwoFactor(Boolean(j.data?.security?.twoFactorEnabled));
        setEmail(j.data?.security?.email ?? null);
      })
      .catch(() => setSessions([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function revoke(id: string) {
    if (!confirm("Revoke this session?")) return;
    const res = await fetch(`/api/v1/admin/cms/sessions?id=${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) {
      toast({ title: "Could not revoke", tone: "error" });
      return;
    }
    toast({ title: "Session revoked", tone: "success" });
    load();
  }

  return (
    <>
      <PageHeader
        title="Sessions & security"
        subtitle="Active login sessions and two-factor status for your CMS account."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="admin-card rounded-xl p-5">
          <p className="admin-text-subtle text-xs uppercase tracking-wide">Account</p>
          <p className="mt-1 font-medium">{email ?? "—"}</p>
        </div>
        <div className="admin-card rounded-xl p-5">
          <p className="admin-text-subtle text-xs uppercase tracking-wide">Two-factor auth</p>
          <p className={`mt-1 font-semibold ${twoFactor ? "text-emerald-700" : "text-amber-700"}`}>
            {twoFactor ? "Enabled" : "Not enabled"}
          </p>
          <p className="admin-text-subtle mt-1 text-xs">
            Manage 2FA from staff account security when configured.
          </p>
        </div>
      </div>

      <TableShell>
        <DataTable>
          <thead>
            <tr>
              <Th>Device</Th>
              <Th>IP / location</Th>
              <Th>Last active</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <Td colSpan={4} className="text-center text-[#64748b]">
                  Loading…
                </Td>
              </tr>
            ) : sessions.length === 0 ? (
              <tr>
                <Td colSpan={4} className="text-center text-[#64748b]">
                  No active sessions recorded.
                </Td>
              </tr>
            ) : (
              sessions.map((s) => (
                <tr key={s.id}>
                  <Td>
                    <p className="font-medium">
                      {s.deviceName || s.browser || "Browser"}
                      {s.isCurrent && (
                        <span className="ml-2 rounded bg-gold/15 px-1.5 py-0.5 text-[10px] text-gold">
                          current
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-navy/45">
                      {[s.browser, s.os].filter(Boolean).join(" · ") || "—"}
                    </p>
                  </Td>
                  <Td className="text-xs">
                    {s.ipAddress ?? "—"}
                    {s.location ? ` · ${s.location}` : ""}
                  </Td>
                  <Td className="text-xs">{formatDate(s.lastActive)}</Td>
                  <Td>
                    {!s.isCurrent && (
                      <AdminButton size="sm" variant="secondary" onClick={() => void revoke(s.id)}>
                        Revoke
                      </AdminButton>
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
