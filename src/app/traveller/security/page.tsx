"use client";

import { useEffect, useState } from "react";
import { TravellerSectionPage } from "@/components/traveller/TravellerSectionPage";

type Security = {
  twoFactorEnabled: boolean;
  sessions: { id: string; deviceName: string; browser: string; location: string; isCurrent: boolean; lastActive: string }[];
};

export default function TravellerSecurityPage() {
  const [data, setData] = useState<Security | null>(null);

  useEffect(() => {
    fetch("/api/v1/traveller/security", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => { if (j.ok) setData(j.data); })
      .catch(() => {});
  }, []);

  return (
    <TravellerSectionPage title="Security & Privacy" subtitle="Login history, devices, two-factor auth & data controls.">
      <div className="admin-card rounded-xl p-6">
        <p className="admin-text font-medium">Two-factor authentication</p>
        <p className="admin-text-muted mt-1 text-sm">
          {data?.twoFactorEnabled ? "Enabled" : "Not enabled — recommended for account security"}
        </p>
      </div>
      <section className="admin-card mt-6 rounded-xl p-6">
        <h3 className="admin-text font-serif text-lg">Active devices</h3>
        <div className="mt-4 space-y-3">
          {(data?.sessions ?? []).map((s) => (
            <div key={s.id} className="admin-surface-muted flex flex-wrap items-center justify-between gap-3 rounded-lg px-4 py-3 text-sm">
              <div>
                <p className="admin-text font-medium">{s.deviceName} · {s.browser}</p>
                <p className="admin-text-muted text-xs">{s.location}</p>
              </div>
              {s.isCurrent && <span className="text-xs font-medium text-gold">This device</span>}
            </div>
          ))}
        </div>
      </section>
    </TravellerSectionPage>
  );
}
