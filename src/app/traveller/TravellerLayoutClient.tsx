"use client";

import { usePathname } from "next/navigation";
import { TravellerLoginGate } from "@/components/traveller/TravellerLoginGate";
import { TravellerProvider } from "@/components/traveller/TravellerProvider";
import { TravellerShell } from "@/components/traveller/TravellerShell";

export function TravellerLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/traveller/login";

  return (
    <TravellerProvider>
      {isLogin ? children : (
        <TravellerLoginGate>
          <TravellerShell>{children}</TravellerShell>
        </TravellerLoginGate>
      )}
    </TravellerProvider>
  );
}
