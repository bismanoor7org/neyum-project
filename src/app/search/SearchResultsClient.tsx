"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  CalendarRange,
  Loader2,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Container, Section } from "@/components/shared";
import {
  DESTINATION_LOCATION_MAP,
  getBookingDestination,
} from "@/lib/booking/destinations";
import { formatDateRange, formatDisplayDate } from "@/lib/booking/calendar";
import {
  draftFromSearchParams,
  loadBookingDraft,
  parseSearchParams,
  saveBookingDraft,
} from "@/lib/booking/storage";
import type { BookingSearchParams } from "@/lib/booking/types";
import { resolveDestinationTitle } from "@/components/booking/BookingDestinationField";
import { resorts } from "@/lib/content/resorts";
import { ds } from "@/lib/design-system";
import { cn } from "@/lib/utils";

export function SearchResultsClient() {
  const searchParams = useSearchParams();
  const [ready, setReady] = useState(false);

  const params = useMemo(() => {
    const parsed = parseSearchParams(searchParams);
    if (!parsed?.destination && !parsed?.checkin) return null;
    return {
      tab: parsed.tab ?? "stay",
      destination: parsed.destination ?? "",
      checkin: parsed.checkin ?? "",
      checkout: parsed.checkout ?? "",
      adults: parsed.adults ?? 2,
      children: parsed.children ?? 0,
      infants: parsed.infants ?? 0,
      rooms: parsed.rooms ?? 1,
      experience: parsed.experience,
      package: parsed.package,
    } satisfies BookingSearchParams;
  }, [searchParams]);

  useEffect(() => {
    if (!params) {
      setReady(true);
      return;
    }
    const title = resolveDestinationTitle(params.destination);
    const draft = {
      ...loadBookingDraft(),
      ...draftFromSearchParams(params),
      destinationTitle: title,
    };
    saveBookingDraft(draft);
    setReady(true);
  }, [params]);

  if (!ready) {
    return (
      <PageLayout>
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
        </div>
      </PageLayout>
    );
  }

  if (!params?.destination || !params.checkin || !params.checkout) {
    return (
      <PageLayout>
        <Section variant="cream">
          <Container className="py-20 text-center">
            <h1 className={ds.headingPage}>Search unavailable</h1>
            <p className="mt-4 text-foreground/65">
              Please complete your search from the booking widget on the homepage.
            </p>
            <Link
              href="/"
              className={cn(ds.btnBase, ds.btnGold, "mt-8 inline-flex")}
            >
              Plan Your Journey
            </Link>
          </Container>
        </Section>
      </PageLayout>
    );
  }

  const destinationTitle =
    resolveDestinationTitle(params.destination) ??
    params.destination.replace(/-/g, " ");
  const destMeta = getBookingDestination(params.destination);
  const locations = DESTINATION_LOCATION_MAP[params.destination] ?? [
    destinationTitle,
  ];
  const results = resorts.filter((r) =>
    locations.some((loc) => r.location.toLowerCase().includes(loc.toLowerCase())),
  );
  const displayResults = results.length > 0 ? results : resorts.slice(0, 4);
  const travellers = params.adults + params.children + params.infants;

  return (
    <PageLayout>
      <Section variant="cream" className="pb-8 pt-28">
        <Container>
          <p className="eyebrow-gold">Search results</p>
          <h1 className="mt-2 font-serif text-3xl text-navy md:text-4xl">
            {params.tab === "stay"
              ? `Stays in ${destinationTitle}`
              : params.tab === "experiences"
                ? `Experiences in Fiji`
                : `Packages for Fiji`}
          </h1>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-foreground/65">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/25 bg-white px-3 py-1.5">
              <MapPin className="h-3.5 w-3.5 text-gold" />
              {destinationTitle}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/25 bg-white px-3 py-1.5">
              <CalendarRange className="h-3.5 w-3.5 text-gold" />
              {formatDateRange(params.checkin, params.checkout)}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/25 bg-white px-3 py-1.5">
              <Users className="h-3.5 w-3.5 text-gold" />
              {travellers} traveller{travellers === 1 ? "" : "s"}
              {params.tab === "stay" &&
                ` · ${params.rooms} room${params.rooms === 1 ? "" : "s"}`}
            </span>
          </div>

          {params.experience && (
            <p className="mt-3 text-sm text-foreground/60">
              Experience: <span className="font-medium text-navy">{params.experience}</span>
            </p>
          )}
          {params.package && (
            <p className="mt-3 text-sm text-foreground/60">
              Package: <span className="font-medium text-navy">{params.package}</span>
            </p>
          )}

          {destMeta && (
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-foreground/65">
              {destMeta.tagline}
            </p>
          )}
        </Container>
      </Section>

      <Section variant="cream-alt" className="pb-20">
        <Container>
          <p className="mb-6 text-sm text-foreground/55">
            {displayResults.length} curated option
            {displayResults.length === 1 ? "" : "s"} · Best price guarantee
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayResults.map((resort) => (
              <article
                key={resort.slug}
                className="card-luxury overflow-hidden transition-shadow hover:shadow-[var(--shadow-card-hover)]"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={resort.heroImage}
                    alt={resort.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 text-gold">
                    {Array.from({ length: resort.stars }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                  <h2 className="mt-2 font-serif text-xl text-navy">{resort.title}</h2>
                  <p className="mt-1 text-xs text-foreground/50">{resort.location}</p>
                  <p className="mt-3 line-clamp-2 text-sm text-foreground/65">
                    {resort.overview}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm font-semibold text-navy">
                      From {resort.priceFrom}
                      <span className="font-normal text-foreground/45"> / night</span>
                    </p>
                    <Link
                      href={`/places-to-stay/${resort.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-gold"
                    >
                      View
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                  <p className="mt-2 text-[11px] text-foreground/45">
                    {formatDisplayDate(params.checkin)} – {formatDisplayDate(params.checkout)}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-gold/20 bg-white p-6 text-center shadow-sm">
            <p className="font-serif text-xl text-navy">Need a bespoke itinerary?</p>
            <p className="mt-2 text-sm text-foreground/60">
              Our concierge can tailor {destinationTitle} to your exact dates and preferences.
            </p>
            <Link
              href={`/contact?source=booking&tab=${params.tab}`}
              className={cn(ds.btnBase, ds.btnGold, "mt-5 inline-flex")}
            >
              Speak to concierge
            </Link>
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
}
