"use client";

import { useEffect, useState } from "react";
import { TravellerSectionPage } from "@/components/traveller/TravellerSectionPage";
import { cn } from "@/lib/utils";

type Message = { id: string; channel: string; subject: string | null; body: string; isRead: boolean; createdAt: string };

export default function TravellerMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetch("/api/v1/traveller/messages", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => { if (j.ok) setMessages(j.data.messages); })
      .catch(() => {});
  }, []);

  return (
    <TravellerSectionPage title="Messages" subtitle="Supplier chat, concierge support, attachments & read receipts.">
      <div className="space-y-3">
        {messages.map((m) => (
          <article key={m.id} className={cn("admin-card rounded-xl p-5", !m.isRead && "border-l-2 border-l-gold")}>
            <div className="flex items-center justify-between gap-2">
              <span className="admin-chip text-[10px] uppercase">{m.channel}</span>
              <time className="admin-text-subtle text-[11px]">{new Date(m.createdAt).toLocaleString()}</time>
            </div>
            {m.subject && <p className="admin-text mt-2 font-medium">{m.subject}</p>}
            <p className="admin-text-muted mt-1 text-sm">{m.body}</p>
          </article>
        ))}
      </div>
    </TravellerSectionPage>
  );
}
