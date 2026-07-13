"use client";

import { useEffect, useState } from "react";
import { TravellerSectionPage } from "@/components/traveller/TravellerSectionPage";
import { AdminButton } from "@/components/admin/ui/AdminUi";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";

type Support = {
  tickets: { id: string; subject: string; status: string; priority: string; createdAt: string }[];
  liveChatAvailable: boolean;
};

export default function TravellerSupportPage() {
  const [data, setData] = useState<Support | null>(null);

  useEffect(() => {
    fetch("/api/v1/traveller/support", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => { if (j.ok) setData(j.data); })
      .catch(() => {});
  }, []);

  return (
    <TravellerSectionPage
      title="Support Center"
      subtitle="Tickets, live chat, help centre & dispute resolution."
      actions={data?.liveChatAvailable ? <AdminButton>Start live chat</AdminButton> : undefined}
    >
      <div className="space-y-4">
        {(data?.tickets ?? []).map((t) => (
          <article key={t.id} className="admin-card rounded-xl p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="admin-text font-medium">{t.subject}</p>
              <StatusBadge status={t.status} />
            </div>
            <p className="admin-text-muted mt-2 text-xs">
              {t.priority} priority · {new Date(t.createdAt).toLocaleDateString()}
            </p>
          </article>
        ))}
      </div>
    </TravellerSectionPage>
  );
}
