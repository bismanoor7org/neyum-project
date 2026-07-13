"use client";

import { PageHeader } from "@/components/admin/ui/AdminUi";

export function TravellerSectionPage({
  title,
  subtitle,
  children,
  actions,
}: {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <>
      <PageHeader title={title} subtitle={subtitle} actions={actions} />
      {children}
    </>
  );
}
