"use client";

import { useEffect, useState } from "react";
import { TravellerSectionPage } from "@/components/traveller/TravellerSectionPage";
import { KpiCard, KpiGrid } from "@/components/admin/ui/KpiCard";
import { formatNumber } from "@/lib/admin/format";
import { Gift, Sparkles } from "lucide-react";

type Loyalty = {
  points: number;
  tier: string;
  referralCode?: string;
  pointsToNextTier?: number;
  nextTier?: string;
  transactions: { id: string; type: string; points: number; description: string; at: string }[];
  promoCodes?: { code: string; discount: string; expiresAt: string }[];
};

export default function TravellerLoyaltyPage() {
  const [data, setData] = useState<Loyalty | null>(null);

  useEffect(() => {
    fetch("/api/v1/traveller/loyalty", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => { if (j.ok) setData(j.data); })
      .catch(() => {});
  }, []);

  return (
    <TravellerSectionPage title="Loyalty & Rewards" subtitle="Points, tiers, referral rewards, promo codes & travel credits.">
      <KpiGrid>
        <KpiCard label="Points balance" value={formatNumber(data?.points ?? 0)} icon={Gift} accent="gold" />
        <KpiCard label="Membership tier" value={data?.tier ?? "—"} icon={Sparkles} accent="emerald" />
      </KpiGrid>
      {data?.promoCodes && data.promoCodes.length > 0 && (
        <div className="admin-card mt-6 rounded-xl p-6">
          <h3 className="admin-text font-serif text-lg">Active promo codes</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {data.promoCodes.map((p) => (
              <div key={p.code} className="admin-surface-muted rounded-lg border border-gold/20 p-4">
                <p className="font-mono text-sm font-bold text-gold">{p.code}</p>
                <p className="admin-text mt-1 text-sm">{p.discount} off</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="admin-card mt-6 rounded-xl p-6">
        <h3 className="admin-text font-serif text-lg">Recent transactions</h3>
        <div className="mt-4 divide-y divide-[var(--admin-border-soft)]">
          {(data?.transactions ?? []).map((t) => (
            <div key={t.id} className="flex justify-between gap-4 py-3 text-sm">
              <div>
                <p className="admin-text font-medium">{t.description}</p>
                <p className="admin-text-muted text-xs">{new Date(t.at).toLocaleDateString()}</p>
              </div>
              <span className="font-semibold text-gold">+{t.points}</span>
            </div>
          ))}
        </div>
      </div>
    </TravellerSectionPage>
  );
}
