"use client";

import { useEffect, useState } from "react";
import { TravellerSectionPage } from "@/components/traveller/TravellerSectionPage";

type Companion = { id: string; firstName: string; lastName: string; relation: string; email?: string };

export default function TravellerCompanionsPage() {
  const [companions, setCompanions] = useState<Companion[]>([]);

  useEffect(() => {
    fetch("/api/v1/traveller/companions", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => { if (j.ok) setCompanions(j.data.companions); })
      .catch(() => {});
  }, []);

  return (
    <TravellerSectionPage title="Travel Companions" subtitle="Family, friends & shared booking profiles.">
      <div className="grid gap-4 sm:grid-cols-2">
        {companions.map((c) => (
          <article key={c.id} className="admin-card rounded-xl p-5">
            <p className="admin-text font-medium">{c.firstName} {c.lastName}</p>
            <p className="admin-text-muted text-xs uppercase">{c.relation}</p>
            {c.email && <p className="admin-text-subtle mt-1 text-xs">{c.email}</p>}
          </article>
        ))}
      </div>
    </TravellerSectionPage>
  );
}
