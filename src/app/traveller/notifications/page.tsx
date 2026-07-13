"use client";

import { useEffect, useState } from "react";
import { TravellerSectionPage } from "@/components/traveller/TravellerSectionPage";
import { cn } from "@/lib/utils";

type Notification = { id: string; title: string; message: string; type: string; isRead: boolean; at: string };

export default function TravellerNotificationsPage() {
  const [items, setItems] = useState<Notification[]>([]);

  useEffect(() => {
    fetch("/api/v1/traveller/notifications", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => { if (j.ok) setItems(j.data.notifications); })
      .catch(() => {});
  }, []);

  return (
    <TravellerSectionPage title="Notifications" subtitle="Booking updates, messages, refunds, offers & travel alerts.">
      <div className="space-y-3">
        {items.map((n) => (
          <article key={n.id} className={cn("admin-card rounded-xl p-5", !n.isRead && "border-l-2 border-l-gold")}>
            <div className="flex items-center justify-between gap-2">
              <span className="admin-chip text-[10px] uppercase">{n.type}</span>
              <time className="admin-text-subtle text-[11px]">{new Date(n.at).toLocaleString()}</time>
            </div>
            <p className="admin-text mt-2 font-medium">{n.title}</p>
            <p className="admin-text-muted mt-1 text-sm">{n.message}</p>
          </article>
        ))}
      </div>
    </TravellerSectionPage>
  );
}
