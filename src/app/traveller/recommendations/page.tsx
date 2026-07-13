"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TravellerSectionPage } from "@/components/traveller/TravellerSectionPage";
import { formatCurrency } from "@/lib/admin/format";

type Rec = { id: string; title: string; reason: string; price: number; rating: number };

export default function TravellerRecommendationsPage() {
  const [items, setItems] = useState<Rec[]>([]);

  useEffect(() => {
    fetch("/api/v1/traveller/recommendations", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => { if (j.ok) setItems(j.data.recommendations); })
      .catch(() => {});
  }, []);

  return (
    <TravellerSectionPage title="For You" subtitle="Recommendations from booking history, wishlist, searches, preferences & budget.">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((r) => (
          <article key={r.id} className="admin-card rounded-xl p-5">
            <p className="admin-text font-medium">{r.title}</p>
            <p className="admin-text-muted mt-1 text-xs">{r.reason}</p>
            <p className="admin-text mt-3 text-sm font-semibold">{formatCurrency(r.price)} · ★ {r.rating}</p>
            <Link href="/search" className="mt-3 inline-block text-xs font-medium text-gold hover:underline">View experience →</Link>
          </article>
        ))}
      </div>
    </TravellerSectionPage>
  );
}
