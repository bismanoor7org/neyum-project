"use client";

import { useEffect, useState } from "react";
import { TravellerSectionPage } from "@/components/traveller/TravellerSectionPage";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";

type Trip = {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: string;
  days: { dayNumber: number; title: string; activities: string[] }[];
};

export default function TravellerTripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    fetch("/api/v1/traveller/trips", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => { if (j.ok) setTrips(j.data.trips); })
      .catch(() => {});
  }, []);

  return (
    <TravellerSectionPage title="My Trips" subtitle="Trip planner, itineraries, documents & shared travel.">
      <div className="space-y-6">
        {trips.map((trip) => (
          <article key={trip.id} className="admin-card rounded-xl p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="admin-text font-serif text-xl">{trip.title}</p>
                <p className="admin-text-muted text-sm">{trip.destination}</p>
                <p className="admin-text-subtle mt-1 text-xs">
                  {new Date(trip.startDate).toLocaleDateString()} — {new Date(trip.endDate).toLocaleDateString()}
                </p>
              </div>
              <StatusBadge status={trip.status} />
            </div>
            <ol className="mt-4 space-y-3 border-t border-[var(--admin-border-soft)] pt-4">
              {trip.days.map((day) => (
                <li key={day.dayNumber} className="admin-surface-muted rounded-lg p-4">
                  <p className="admin-text text-sm font-medium">Day {day.dayNumber}: {day.title}</p>
                  <ul className="admin-text-muted mt-2 list-inside list-disc text-xs">
                    {day.activities.map((a) => <li key={a}>{a}</li>)}
                  </ul>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </TravellerSectionPage>
  );
}
