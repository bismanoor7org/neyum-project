"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSupplier } from "@/components/supplier/SupplierProvider";
import { AdminDashboardLoading } from "@/components/auth/AdminDashboardLoading";

export function SupplierLoginGate({ children }: { children: ReactNode }) {
  const { authenticated, ready, status } = useSupplier();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!ready) return;
    if (!authenticated && status !== "loading" && pathname !== "/supplier/login") {
      router.replace("/supplier/login");
    }
  }, [ready, authenticated, status, pathname, router]);

  if (!ready || status === "loading") {
    return <AdminDashboardLoading />;
  }

  if (!authenticated || status === "unauthorized") {
    return <AdminDashboardLoading />;
  }

  return children;
}
