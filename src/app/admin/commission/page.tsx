"use client";

import { useEffect, useState } from "react";
import { PageHeader, AdminButton } from "@/components/admin/ui/AdminUi";

type CommissionData = {
  defaultPercentage: string;
  rules: Array<{
    id: string;
    name: string;
    percentage: string;
    supplier?: { companyName: string } | null;
  }>;
};

export default function CommissionAdminPage() {
  const [data, setData] = useState<CommissionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/admin/settings?section=commission", { credentials: "include" })
      .then((r) => r.json())
      .then((res) => setData(res.data ?? null))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader
        title="Commission"
        subtitle="Configure platform commission percentage and supplier-specific rules."
        actions={<AdminButton variant="secondary">Add rule</AdminButton>}
      />

      <div className="admin-card rounded-xl p-6">
        {loading && <p className="admin-text-muted text-sm">Loading commission settings…</p>}
        {!loading && data && (
          <>
            <p className="admin-text text-sm">
              Default commission:{" "}
              <span className="font-semibold text-gold">{data.defaultPercentage}%</span>
            </p>
            <div className="mt-6 divide-y divide-[var(--admin-border-soft)]">
              {data.rules.length === 0 && (
                <p className="admin-text-muted py-4 text-sm">
                  No custom rules — default percentage applies to all bookings.
                </p>
              )}
              {data.rules.map((rule) => (
                <div key={rule.id} className="flex items-center justify-between py-4">
                  <div>
                    <p className="admin-text font-medium">{rule.name}</p>
                    {rule.supplier && (
                      <p className="admin-text-muted text-xs">{rule.supplier.companyName}</p>
                    )}
                  </div>
                  <span className="admin-text font-semibold">{rule.percentage}%</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
