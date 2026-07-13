import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageLayout } from "@/components/layout/PageLayout";
import { CityDetailClient } from "./CityDetailClient";
import { getCity, getWorldCountry, getWorldCountrySlugs } from "@/lib/content/world";
import { buildPageMetadata } from "@/lib/seo/metadata";

interface CityPageProps {
  params: Promise<{ country: string; city: string }>;
}

export async function generateStaticParams() {
  const params: { country: string; city: string }[] = [];
  for (const slug of getWorldCountrySlugs()) {
    const country = getWorldCountry(slug);
    if (!country) continue;
    for (const city of country.cities) {
      params.push({ country: slug, city: city.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { country: countrySlug, city: citySlug } = await params;
  const city = getCity(countrySlug, citySlug);
  const country = getWorldCountry(countrySlug);
  if (!city || !country) return { title: "City not found" };
  return buildPageMetadata({
    title: `${city.name}, ${country.name} — Luxury Travel Guide`,
    description: city.tagline,
    path: `/explore/${countrySlug}/${citySlug}`,
    keywords: [`${city.name} travel`, `${country.name} luxury travel`, "luxury destinations"],
    imageAlt: `${city.name} ${country.name} luxury travel destination`,
  });
}

export default async function CityPage({ params }: CityPageProps) {
  const { country: countrySlug, city: citySlug } = await params;
  const country = getWorldCountry(countrySlug);
  const city = getCity(countrySlug, citySlug);
  if (!country || !city) notFound();

  return (
    <PageLayout>
      <CityDetailClient country={country} city={city} />
    </PageLayout>
  );
}
