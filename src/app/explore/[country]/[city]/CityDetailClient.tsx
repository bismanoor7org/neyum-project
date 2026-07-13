"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Sparkles } from "lucide-react";
import { Container, PageHero, Section, SectionHeader } from "@/components/shared";
import type { WorldCity, WorldCountry } from "@/lib/content/world/types";

interface CityDetailClientProps {
  country: WorldCountry;
  city: WorldCity;
}

export function CityDetailClient({ country, city }: CityDetailClientProps) {
  return (
    <>
      <PageHero
        image={city.image}
        eyebrow={country.name}
        title={city.name}
        subtitle={city.tagline}
        breadcrumbs={[
          { label: "Explore", href: "/explore" },
          { label: country.name, href: `/explore/${country.slug}` },
          { label: city.name },
        ]}
        minHeight="min-h-[55vh] lg:min-h-[62vh]"
      >
        <Link
          href={`/explore/${country.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {country.name}
        </Link>
      </PageHero>

      <Section className="bg-cream">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader eyebrow="Highlights" title={`Discover ${city.name}`} align="split" size="compact" />
              <ul className="space-y-3">
                {city.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-[15px] text-foreground/75">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeader eyebrow="Landmarks" title="Iconic sights" align="split" size="compact" />
              <div className="flex flex-wrap gap-2">
                {city.landmarks.map((l) => (
                  <span
                    key={l}
                    className="rounded-full border border-foreground/10 bg-white px-4 py-2 text-sm text-navy"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <SectionHeader eyebrow="Experiences" title="Popular activities" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {city.activities.map((a, i) => (
              <motion.div
                key={a}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-foreground/8 bg-cream/50 p-6"
              >
                <p className="font-medium text-navy">{a}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-navy text-white">
        <Container>
          <SectionHeader
            eyebrow="Exclusive"
            title="Luxury experiences"
            subtitle="Private access, bespoke itineraries, and white-glove service."
            theme="dark"
          />
          <div className="grid gap-5 md:grid-cols-2">
            {city.luxuryExperiences.map((exp, i) => (
              <motion.div
                key={exp}
                initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-panel-dark flex gap-4 rounded-2xl border-white/10 p-6"
              >
                <Sparkles className="h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="font-medium text-white">{exp}</p>
                  <p className="mt-1 text-sm text-white/60">
                    Curated by our global concierge team
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-cream">
        <Container>
          <div className="overflow-hidden rounded-2xl border border-foreground/8">
            <div className="relative aspect-[21/9]">
              <Image
                src={country.heroImage}
                alt={country.name}
                fill
                className="object-cover"
                sizes="1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy/90 to-navy/40" />
              <div className="absolute inset-0 flex flex-col justify-center px-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                  Plan your journey
                </p>
                <h3 className="mt-2 font-serif text-3xl text-white">
                  Explore more of {country.name}
                </h3>
                <Link
                  href={`/explore/${country.slug}`}
                  className="mt-4 inline-flex w-fit rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-gold/90"
                >
                  View country guide
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
