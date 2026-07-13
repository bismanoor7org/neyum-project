"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAdmin } from "@/components/admin/AdminProvider";
import { AdminDashboardLoading } from "@/components/auth/AdminDashboardLoading";

export function AdminLoginGate({ children }: { children: ReactNode }) {
  const { authenticated, ready, status } = useAdmin();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!ready) return;
    if (!authenticated && status !== "loading" && pathname !== "/admin/login") {
      router.replace("/admin/login");
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
