"use client";

import { useEffect, useState } from "react";
import { TravellerSectionPage } from "@/components/traveller/TravellerSectionPage";

type Fav = { id: string; favouriteType: string; title: string };

export default function TravellerFavouritesPage() {
  const [items, setItems] = useState<Fav[]>([]);

  useEffect(() => {
    fetch("/api/v1/traveller/favourites", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => { if (j.ok) setItems(j.data.favourites); })
      .catch(() => {});
  }, []);

  return (
    <TravellerSectionPage title="Favourites" subtitle="Favourite tours, suppliers & destinations.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((f) => (
          <article key={f.id} className="admin-card rounded-xl p-5">
            <span className="admin-chip text-[10px] uppercase">{f.favouriteType}</span>
            <p className="admin-text mt-2 font-medium">{f.title}</p>
          </article>
        ))}
      </div>
    </TravellerSectionPage>
  );
}
