"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/admin/ui/AdminUi";
import { useSupplier } from "@/components/supplier/SupplierProvider";

export default function SupplierSettingsPage() {
  const { supplier } = useSupplier();
  const [profile, setProfile] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    fetch("/api/v1/supplier/profile", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => { if (j.ok) setProfile(j.data); });
  }, []);

  return (
    <>
      <PageHeader title="Settings" subtitle="Company profile, payouts, security, and notification preferences." />
      <div className="admin-card max-w-2xl space-y-4 rounded-xl p-6">
        <div>
          <p className="admin-text-subtle text-xs uppercase tracking-wide">Company</p>
          <p className="admin-text mt-1 text-lg font-semibold">{String(profile?.companyName ?? supplier?.companyName ?? "—")}</p>
        </div>
        <div>
          <p className="admin-text-subtle text-xs uppercase tracking-wide">Verification</p>
          <p className="admin-text mt-1">{String(profile?.verificationStatus ?? supplier?.verificationStatus ?? "—")}</p>
        </div>
        <div>
          <p className="admin-text-subtle text-xs uppercase tracking-wide">KYC status</p>
          <p className="admin-text mt-1">{String(profile?.kycStatus ?? supplier?.kycStatus ?? "—")}</p>
        </div>
        <div>
          <p className="admin-text-subtle text-xs uppercase tracking-wide">Stripe Connect</p>
          <p className="admin-text mt-1">{profile?.stripeOnboarded ? "Connected" : "Not connected"}</p>
        </div>
      </div>
    </>
  );
}
