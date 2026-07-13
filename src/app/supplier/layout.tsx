import type { Metadata } from "next";
import { SupplierLayoutClient } from "./SupplierLayoutClient";

export const metadata: Metadata = {
  title: "Supplier — My Fiji Tour",
  robots: { index: false, follow: false },
};

export default function SupplierLayout({ children }: { children: React.ReactNode }) {
  return <SupplierLayoutClient>{children}</SupplierLayoutClient>;
}
