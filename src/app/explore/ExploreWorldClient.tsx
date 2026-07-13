"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Section, SectionHeader } from "@/components/shared";
import { ExploreWorldHero } from "@/components/explore/ExploreWorldHero";
import { ContinentGrid } from "@/components/explore/ContinentGrid";
import { DestinationCard } from "@/components/explore/DestinationCard";
import { ExploreFilters } from "@/components/explore/ExploreFilters";
import { TourCard, InspirationGallery } from "@/components/explore/ExploreGallery";
import {
  filterCountries,
  getFeaturedCountries,
  getHiddenGems,
  getMostVisitedCountries,
  getTrendingCountries,
  worldTours,
} from "@/lib/content/world";
import type { ContinentSlug, TravelStyle } from "@/lib/content/world/types";

interface ExploreWorldClientProps {
  initialContinent?: ContinentSlug | null;
}

export function ExploreWorldClient({ initialContinent = null }: ExploreWorldClientProps) {
  const router = useRouter();
  const [activeCountry, setActiveCountry] = useState("fiji");
  const [search, setSearch] = useState("");
  const [continent, setContinent] = useState<ContinentSlug | null>(initialContinent);
  const [style, setStyle] = useState<TravelStyle | null>(null);
  const [budget, setBudget] = useState<"budget" | "mid" | "luxury" | null>(null);

  const filtered = useMemo(() => {
    let list = filterCountries({ continent: continent ?? undefined, style: style ?? undefined, query: search || undefined });
    if (budget) list = list.filter((c) => c.budget === budget);
    return list;
  }, [continent, style, budget, search]);

  const trending = getTrendingCountries();
  const mostVisited = getMostVisitedCountries();
  const hiddenGems = getHiddenGems();
  const featured = getFeaturedCountries();
  const featuredTours = worldTours.filter((t) => t.featured);

  return (
    <>
      <ExploreWorldHero
        activeCountry={activeCountry}
        onSelectCountry={(slug) => {
          setActiveCountry(slug);
          router.push(`/explore/${slug}`);
        }}
        search={search}
        onSearchChange={setSearch}
      />

      <Section className="bg-cream">
        <Container>
          <SectionHeader
            eyebrow="Seven continents"
            title="Explore by region"
            subtitle="From Arctic wilderness to Pacific lagoons — every continent, one premium platform."
          />
          <ContinentGrid
            active={continent}
            onSelect={(slug) => setContinent(slug)}
          />
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <SectionHeader
            eyebrow="Refine your journey"
            title="Filter destinations"
            subtitle="Continent, travel style, and budget — find your perfect match instantly."
          />
          <ExploreFilters
            continent={continent}
            style={style}
            budget={budget}
            onContinentChange={setContinent}
            onStyleChange={setStyle}
            onBudgetChange={setBudget}
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.slice(0, 12).map((c, i) => (
              <DestinationCard key={c.slug} country={c} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-navy text-white">
        <Container>
          <SectionHeader
            eyebrow="Trending now"
            title="Destinations on every traveller's list"
            subtitle="The world's most sought-after escapes, updated continuously."
            theme="dark"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trending.map((c, i) => (
              <DestinationCard key={c.slug} country={c} index={i} variant="compact" />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-cream">
        <Container>
          <SectionHeader
            eyebrow="Most visited"
            title="The world's favourite countries"
            subtitle="Measured by annual arrivals — the destinations drawing millions."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {mostVisited.map((c, i) => (
              <DestinationCard key={c.slug} country={c} index={i} variant={i === 0 ? "featured" : "default"} />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <SectionHeader
            eyebrow="Hidden gems"
            title="Off the beaten path"
            subtitle="Undiscovered treasures for the discerning explorer."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {hiddenGems.map((c, i) => (
              <DestinationCard key={c.slug} country={c} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-navy text-white">
        <Container>
          <SectionHeader
            eyebrow="Curated journeys"
            title="Featured luxury tours"
            subtitle="Handcrafted itineraries with private guides, exclusive access, and seamless logistics."
            theme="dark"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTours.map((t, i) => (
              <TourCard key={t.slug} tour={t} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-cream">
        <Container>
          <SectionHeader
            eyebrow="Editor's picks"
            title="Featured destinations"
            subtitle="Our concierge team's current favourites across the globe."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((c, i) => (
              <DestinationCard key={c.slug} country={c} index={i} variant="featured" />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <SectionHeader
            eyebrow="Visual inspiration"
            title="Travel inspiration gallery"
            subtitle="Editorial photography from the world's most breathtaking places."
          />
          <InspirationGallery />
        </Container>
      </Section>
    </>
  );
}
