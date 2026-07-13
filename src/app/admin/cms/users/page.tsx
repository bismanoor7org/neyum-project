"use client";

import { PageHeader } from "@/components/admin/ui/AdminUi";
import { StaffRolesManager } from "@/components/cms/StaffRolesManager";

export default function CmsUsersPage() {
  return (
    <>
      <PageHeader
        title="Users & Roles"
        subtitle="Invite staff, assign Super Admin / Admin / Editor roles, and review access."
      />
      <StaffRolesManager />
      <div className="admin-card mt-6 rounded-xl p-5 text-sm leading-relaxed text-navy/75">
        <p className="font-semibold text-navy">Supabase Auth roles</p>
        <p className="mt-2">
          Run <code className="rounded bg-black/5 px-1">supabase/migrations/20260713_cms_wordpress_foundation.sql</code>{" "}
          then create a row in <code className="rounded bg-black/5 px-1">cms_profiles</code> for each staff user
          with role <code className="rounded bg-black/5 px-1">super_admin</code>,{" "}
          <code className="rounded bg-black/5 px-1">admin</code>, or{" "}
          <code className="rounded bg-black/5 px-1">editor</code>. Set{" "}
          <code className="rounded bg-black/5 px-1">SUPABASE_SERVICE_ROLE_KEY</code> for elevated CMS operations.
        </p>
      </div>
    </>
  );
}
