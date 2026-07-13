"use client";

import { useEffect, useState } from "react";
import { TravellerSectionPage } from "@/components/traveller/TravellerSectionPage";
import { formatCurrency } from "@/lib/admin/format";

type Item = { id: string; itemType: string; title: string; priceSnapshot: number | null; currency: string; collection?: string | null };

export default function TravellerWishlistPage() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetch("/api/v1/traveller/wishlist", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => { if (j.ok) setItems(j.data.items); })
      .catch(() => {});
  }, []);

  return (
    <TravellerSectionPage title="Wishlist" subtitle="Saved tours, activities, destinations & packages — collections & shareable lists.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <article key={i.id} className="admin-card rounded-xl p-5">
            <span className="admin-chip text-[10px] uppercase">{i.itemType}</span>
            <p className="admin-text mt-2 font-medium">{i.title}</p>
            {i.collection && <p className="admin-text-muted text-xs">Collection: {i.collection}</p>}
            {i.priceSnapshot != null && (
              <p className="admin-text mt-2 text-sm font-semibold text-gold">{formatCurrency(i.priceSnapshot, i.currency)}</p>
            )}
          </article>
        ))}
      </div>
      {items.length === 0 && <div className="admin-card mt-4 rounded-xl p-8 text-center"><p className="admin-text-muted text-sm">Your wishlist is empty.</p></div>}
    </TravellerSectionPage>
  );
}
