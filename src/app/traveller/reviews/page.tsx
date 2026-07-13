"use client";

import { useEffect, useState } from "react";
import { TravellerSectionPage } from "@/components/traveller/TravellerSectionPage";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";

type Review = { id: string; tourName: string; rating: number; review: string; status: string; createdAt: string };

export default function TravellerReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch("/api/v1/traveller/reviews", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => { if (j.ok) setReviews(j.data.reviews); })
      .catch(() => {});
  }, []);

  return (
    <TravellerSectionPage title="Reviews & Ratings" subtitle="Your reviews, photos & ratings history.">
      <div className="space-y-4">
        {reviews.map((r) => (
          <article key={r.id} className="admin-card rounded-xl p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="admin-text font-medium">{r.tourName}</p>
              <div className="flex items-center gap-2">
                <span className="text-gold">★ {r.rating}</span>
                <StatusBadge status={r.status} />
              </div>
            </div>
            <p className="admin-text-muted mt-2 text-sm">{r.review}</p>
            <p className="admin-text-subtle mt-2 text-xs">{new Date(r.createdAt).toLocaleDateString()}</p>
          </article>
        ))}
      </div>
    </TravellerSectionPage>
  );
}
