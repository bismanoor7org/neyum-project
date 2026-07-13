"use client";

import { useTraveller } from "@/components/traveller/TravellerProvider";
import { TravellerLoginExperience } from "@/components/auth/TravellerLoginExperience";

export function TravellerLoginGate({ children }: { children: React.ReactNode }) {
  const { authenticated, ready } = useTraveller();

  if (!ready) {
    return (
      <div className="admin-panel flex min-h-screen items-center justify-center">
        <div className="admin-text-muted text-sm">Loading your journey…</div>
      </div>
    );
  }

  if (!authenticated) {
    return <TravellerLoginExperience />;
  }

  return children;
}
