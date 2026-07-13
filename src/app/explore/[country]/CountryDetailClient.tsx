"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  CloudSun,
  Coins,
  Globe2,
  Languages,
  MapPin,
  Stamp,
} from "lucide-react";
import { Container, PageHero, Section, SectionHeader } from "@/components/shared";
import { DestinationCard } from "@/components/explore/DestinationCard";
import { TourCard } from "@/components/explore/ExploreGallery";
import type { WorldCountry } from "@/lib/content/world/types";
import { getWorldCountry, worldTours } from "@/lib/content/world";

interface CountryDetailClientProps {
  country: WorldCountry;
}

function InfoTile({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
}) {
  return (
    <div className="glass-panel rounded-2xl border-foreground/8 bg-white/80 p-5">
      <Icon className="h-5 w-5 text-teal" strokeWidth={1.5} />
      <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/45">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-navy">{value}</p>
    </div>
  );
}

export function CountryDetailClient({ country }: CountryDetailClientProps) {
  const related = country.relatedSlugs
    .map((s) => getWorldCountry(s))
    .filter(Boolean) as WorldCountry[];
  const tours = worldTours.filter((t) => t.countrySlug === country.slug);

  return (
    <>
      <PageHero
        image={country.heroImage}
        eyebrow={`${country.flag} ${country.continent.replace("-", " ")}`}
        title={country.name}
        subtitle={country.tagline}
        breadcrumbs={[
          { label: "Explore The World", href: "/explore" },
          { label: country.name },
        ]}
        minHeight="min-h-[60vh] lg:min-h-[68vh]"
      />

      <Section className="bg-cream">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <SectionHeader
                eyebrow="Overview"
                title={`Why visit ${country.name}`}
                align="split"
                size="compact"
              />
              <p className="text-[15px] leading-relaxed text-foreground/70">{country.overview}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {country.landscapes.map((l) => (
                  <span
                    key={l}
                    className="rounded-full bg-teal/10 px-3 py-1 text-xs font-medium capitalize text-teal"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InfoTile icon={Calendar} label="Best time" value={country.bestTime} />
              <InfoTile icon={CloudSun} label="Weather" value={country.weather} />
              <InfoTile icon={Stamp} label="Visa" value={country.visa} />
              <InfoTile icon={Coins} label="Currency" value={country.currency} />
              <InfoTile icon={Languages} label="Language" value={country.language} />
              <InfoTile icon={Globe2} label="Capital" value={country.capital} />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <SectionHeader
            eyebrow="Major cities"
            title="Explore cities & regions"
            subtitle={`${country.cities.length} curated destinations within ${country.name}.`}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {country.cities.map((city, i) => (
              <motion.div
                key={city.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  href={`/explore/${country.slug}/${city.slug}`}
                  className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-foreground/8"
                >
                  <Image
                    src={city.image}
                    alt={city.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="flex items-center gap-2 text-gold">
                      <MapPin className="h-3.5 w-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em]">City</span>
                    </div>
                    <h3 className="mt-1 font-serif text-xl text-white">{city.name}</h3>
                    <p className="mt-1 text-sm text-white/70">{city.tagline}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-cream">
        <Container>
          <SectionHeader eyebrow="Must-see" title="Attractions & landmarks" align="split" size="compact" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {country.attractions.map((a) => (
              <div
                key={a}
                className="rounded-xl border border-foreground/8 bg-white px-5 py-4 text-sm font-medium text-navy"
              >
                {a}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {tours.length > 0 && (
        <Section className="bg-navy text-white">
          <Container>
            <SectionHeader
              eyebrow="Curated tours"
              title={`Luxury journeys in ${country.name}`}
              theme="dark"
              size="compact"
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tours.map((t, i) => (
                <TourCard key={t.slug} tour={t} index={i} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {related.length > 0 && (
        <Section className="bg-white">
          <Container>
            <SectionHeader eyebrow="You may also like" title="Related destinations" size="compact" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c, i) => (
                <DestinationCard key={c.slug} country={c} index={i} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
