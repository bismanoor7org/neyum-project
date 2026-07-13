"use client";

import { useEffect, useState } from "react";
import { TravellerSectionPage } from "@/components/traveller/TravellerSectionPage";
import { KpiCard, KpiGrid } from "@/components/admin/ui/KpiCard";
import { BarChart, ChartCard } from "@/components/admin/ui/Charts";
import { formatCurrency, formatNumber } from "@/lib/admin/format";
import { Globe, MapPin, Compass, Wallet } from "lucide-react";

type Analytics = {
  countriesVisited: number;
  citiesVisited: number;
  toursCompleted: number;
  totalSpent: number;
  travelFrequency: string;
  timeline: { year: number; trips: number; spent: number }[];
};

export default function TravellerAnalyticsPage() {
  const [data, setData] = useState<Analytics | null>(null);

  useEffect(() => {
    fetch("/api/v1/traveller/analytics", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => { if (j.ok) setData(j.data); })
      .catch(() => {});
  }, []);

  return (
    <TravellerSectionPage title="Travel Statistics" subtitle="Countries & cities visited, tours completed, spend & travel timeline.">
      <KpiGrid>
        <KpiCard label="Countries visited" value={String(data?.countriesVisited ?? 0)} icon={Globe} accent="gold" />
        <KpiCard label="Cities explored" value={String(data?.citiesVisited ?? 0)} icon={MapPin} accent="navy" />
        <KpiCard label="Tours completed" value={formatNumber(data?.toursCompleted ?? 0)} icon={Compass} accent="teal" />
        <KpiCard label="Total spent" value={formatCurrency(data?.totalSpent ?? 0, "FJD", true)} icon={Wallet} accent="emerald" />
      </KpiGrid>
      <div className="mt-6">
        <ChartCard title="Travel timeline" subtitle={`Frequency: ${data?.travelFrequency ?? "—"}`}>
          <BarChart
            data={(data?.timeline ?? []).map((t) => ({ label: String(t.year), value: t.trips }))}
            color="#0c3238"
          />
        </ChartCard>
      </div>
    </TravellerSectionPage>
  );
}
