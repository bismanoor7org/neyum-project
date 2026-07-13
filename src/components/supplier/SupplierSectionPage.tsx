"use client";

import { PageHeader } from "@/components/admin/ui/AdminUi";

export function SupplierSectionPage({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />
      {children ?? (
        <div className="admin-card rounded-xl p-8 text-center">
          <p className="admin-text-muted text-sm">Connected to supplier APIs — data loads when database is configured.</p>
        </div>
      )}
    </>
  );
}
