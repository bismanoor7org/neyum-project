"use client";

import { useEffect, useState } from "react";
import { TravellerSectionPage } from "@/components/traveller/TravellerSectionPage";

type Doc = { id: string; type: string; title: string; expiresAt?: string; country?: string | null };

export default function TravellerDocumentsPage() {
  const [docs, setDocs] = useState<Doc[]>([]);

  useEffect(() => {
    fetch("/api/v1/traveller/documents", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => { if (j.ok) setDocs(j.data.documents); })
      .catch(() => {});
  }, []);

  return (
    <TravellerSectionPage title="Travel Documents" subtitle="Passport, visa, insurance & emergency documents — secure storage.">
      <div className="grid gap-4 sm:grid-cols-2">
        {docs.map((d) => (
          <article key={d.id} className="admin-card rounded-xl p-5">
            <span className="admin-chip text-[10px] uppercase">{d.type}</span>
            <p className="admin-text mt-2 font-medium">{d.title}</p>
            {d.expiresAt && (
              <p className="admin-text-muted mt-1 text-xs">
                Expires {new Date(d.expiresAt).toLocaleDateString()}
              </p>
            )}
          </article>
        ))}
      </div>
    </TravellerSectionPage>
  );
}
