"use client";

import { useEffect, useState } from "react";
import { PageHeader, TableShell, DataTable, Td, Th } from "@/components/admin/ui/AdminUi";
import {
  ADMIN_STAFF_ROLE_LABELS,
  ADMIN_STAFF_ROLE_PERMISSIONS,
} from "@/lib/auth/admin-roles";
import type { AdminStaffRole } from "@prisma/client";
import { assignStaffRoleAction } from "@/server/actions/cms-extended";

type StaffRow = {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  staffRole: AdminStaffRole;
};

const ASSIGNABLE_ROLES: AdminStaffRole[] = [
  "SUPER_ADMIN",
  "ADMIN",
  "EDITOR",
  "CONTENT_MANAGER",
  "SUPPORT_MANAGER",
];

const MATRIX_PERMS = [
  "cms:read",
  "cms:write",
  "cms:publish",
  "cms:media",
  "cms:seo",
  "settings:write",
  "bookings:read",
] as const;

export function StaffRolesManager() {
  const [items, setItems] = useState<StaffRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/v1/admin/cms/staff", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => setItems(j.data?.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  async function changeRole(userId: string, staffRole: AdminStaffRole) {
    setSavingId(userId);
    setError(null);
    const result = await assignStaffRoleAction({ userId, staffRole });
    setSavingId(null);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setItems((prev) => prev.map((r) => (r.userId === userId ? { ...r, staffRole } : r)));
  }

  return (
    <>
      <PageHeader
        title="Roles & Permissions"
        subtitle="Role-based access control for CMS editors and platform administrators."
      />
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <TableShell>
        <DataTable>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <Td colSpan={3} className="text-center text-[#64748b]">Loading…</Td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <Td colSpan={3} className="text-center text-[#64748b]">
                  No admin users found. Run <code className="text-xs">npm run admin:create</code>.
                </Td>
              </tr>
            ) : (
              items.map((row) => (
                <tr key={row.userId} className="hover:bg-[#faf9f7]/80">
                  <Td className="font-medium">{row.firstName} {row.lastName}</Td>
                  <Td className="text-sm text-[#64748b]">{row.email}</Td>
                  <Td>
                    <select
                      value={row.staffRole}
                      disabled={savingId === row.userId}
                      onChange={(e) => changeRole(row.userId, e.target.value as AdminStaffRole)}
                      className="rounded-lg border border-black/10 px-3 py-1.5 text-sm"
                    >
                      {ASSIGNABLE_ROLES.map((role) => (
                        <option key={role} value={role}>
                          {ADMIN_STAFF_ROLE_LABELS[role]}
                        </option>
                      ))}
                    </select>
                  </Td>
                </tr>
              ))
            )}
          </tbody>
        </DataTable>
      </TableShell>

      <div className="admin-card mt-8 overflow-hidden rounded-xl">
        <div className="border-b border-black/5 px-4 py-3">
          <h3 className="admin-text font-semibold">Permission matrix</h3>
        </div>
        <table className="w-full text-left text-xs">
          <thead className="admin-surface-muted uppercase tracking-wide">
            <tr>
              <th className="px-4 py-2">Permission</th>
              {ASSIGNABLE_ROLES.map((role) => (
                <th key={role} className="px-3 py-2 text-center">{ADMIN_STAFF_ROLE_LABELS[role]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MATRIX_PERMS.map((perm) => (
              <tr key={perm} className="border-t border-black/5">
                <td className="px-4 py-2 font-mono">{perm}</td>
                {ASSIGNABLE_ROLES.map((role) => (
                  <td key={role} className="px-3 py-2 text-center">
                    {ADMIN_STAFF_ROLE_PERMISSIONS[role]?.includes(perm) ? "✓" : "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
