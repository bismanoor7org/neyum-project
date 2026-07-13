"use client";

import { usePathname } from "next/navigation";
import { AdminLoginGate } from "@/components/admin/AdminLoginGate";
import { AdminProvider } from "@/components/admin/AdminProvider";
import { AdminShell } from "@/components/admin/AdminShell";

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginRoute = pathname === "/admin/login";

  return (
    <AdminProvider>
      {isLoginRoute ? (
        children
      ) : (
        <AdminLoginGate>
          <AdminShell>{children}</AdminShell>
        </AdminLoginGate>
      )}
    </AdminProvider>
  );
}
