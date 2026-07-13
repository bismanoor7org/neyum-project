"use client";

import Link from "next/link";
import {
  BarChart3,
  BookOpen,
  Globe2,
  Map,
  MapPin,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/admin/ui/AdminUi";
import { ChartCard, HorizontalBarChart } from "@/components/admin/ui/Charts";
import { countryIndex, WORLD_COUNTRY_TOTAL } from "@/lib/content/world/country-index";
import { showcaseCountries } from "@/lib/content/world/countries";
import { cn } from "@/lib/utils";

const exploreStats = [
  { label: "Total visitors", value: "284,500", change: "+12.4%", icon: Users },
  { label: "Countries live", value: String(WORLD_COUNTRY_TOTAL), change: `${countryIndex.length} indexed`, icon: Globe2 },
  { label: "Cities managed", value: "512", change: "+28 this month", icon: MapPin },
  { label: "Explore revenue", value: "$1.2M", change: "+8.1%", icon: TrendingUp },
];

const popularDestinations = [
  { label: "Fiji", value: 4820 },
  { label: "Japan", value: 3910 },
  { label: "Maldives", value: 3540 },
  { label: "France", value: 2980 },
  { label: "Greece", value: 2650 },
  { label: "USA", value: 2410 },
];

export default function AdminExplorePage() {
  return (
    <>
      <PageHeader
        title="Explore The World"
        subtitle="Global destination CMS — countries, cities, tours, analytics & SEO."
        actions={
          <Link
            href="/explore"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-gold/90"
          >
            <Globe2 className="h-4 w-4" />
            View live platform
          </Link>
        }
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {exploreStats.map((s) => (
          <div key={s.label} className="admin-explore-card rounded-xl p-5">
            <div className="flex items-center justify-between">
              <s.icon className="h-5 w-5 text-gold/70" strokeWidth={1.5} />
              <span className="text-xs font-medium text-emerald-400/90">{s.change}</span>
            </div>
            <p className="mt-4 font-serif text-2xl">{s.value}</p>
            <p className="admin-explore-text-muted mt-1 text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <ChartCard title="Popular destinations" subtitle="Page views · last 30 days">
          <HorizontalBarChart data={popularDestinations} color="#c5a44e" />
        </ChartCard>

        <div className="admin-explore-surface rounded-xl p-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-gold" />
            <h3 className="font-medium">Content management</h3>
          </div>
          <p className="admin-explore-text-muted mt-2 text-sm">
            Manage global destination content, SEO metadata, and featured placements.
          </p>
          <div className="mt-5 grid gap-2">
            {[
              { label: "Country management", count: WORLD_COUNTRY_TOTAL, icon: Globe2 },
              { label: "City management", count: 512, icon: MapPin },
              { label: "Tour management", count: 48, icon: Map },
              { label: "SEO pages", count: 340, icon: Search },
              { label: "Travel guides", count: 86, icon: BookOpen },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                className="admin-explore-row flex items-center justify-between rounded-lg px-4 py-3 text-left text-sm transition-colors"
              >
                <span className="flex items-center gap-3">
                  <item.icon className="admin-explore-text-subtle h-4 w-4" />
                  {item.label}
                </span>
                <span className="text-xs text-gold">{item.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="admin-explore-surface rounded-xl p-6">
        <h3 className="font-medium">Showcase countries (full detail)</h3>
        <p className="admin-explore-text-muted mt-1 text-sm">
          {showcaseCountries.length} countries with complete guides · {countryIndex.length} searchable in index
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="admin-explore-table-head text-xs uppercase tracking-wider">
                <th className="pb-3 pr-4">Country</th>
                <th className="pb-3 pr-4">Continent</th>
                <th className="pb-3 pr-4">Cities</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {showcaseCountries.map((c) => (
                <tr key={c.slug} className="admin-explore-table-row">
                  <td className="py-3 pr-4">
                    <span className="mr-2">{c.flag}</span>
                    {c.name}
                  </td>
                  <td className="py-3 pr-4 capitalize">{c.continent.replace("-", " ")}</td>
                  <td className="py-3 pr-4">{c.cities.length}</td>
                  <td className="py-3 pr-4">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                        c.featured ? "bg-gold/20 text-gold" : "admin-chip px-2 py-0.5",
                      )}
                    >
                      {c.featured ? "Featured" : "Live"}
                    </span>
                  </td>
                  <td className="py-3">
                    <Link
                      href={`/explore/${c.slug}`}
                      target="_blank"
                      className="text-xs text-gold hover:underline"
                    >
                      Preview
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
