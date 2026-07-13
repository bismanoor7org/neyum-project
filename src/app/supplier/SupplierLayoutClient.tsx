"use client";

import { usePathname } from "next/navigation";
import { SupplierLoginGate } from "@/components/supplier/SupplierLoginGate";
import { SupplierProvider } from "@/components/supplier/SupplierProvider";
import { SupplierShell } from "@/components/supplier/SupplierShell";

export function SupplierLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/supplier/login";

  return (
    <SupplierProvider>
      {isLogin ? children : (
        <SupplierLoginGate>
          <SupplierShell>{children}</SupplierShell>
        </SupplierLoginGate>
      )}
    </SupplierProvider>
  );
}
