import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageLayout } from "@/components/layout/PageLayout";
import { CountryDetailClient } from "./CountryDetailClient";
import { getWorldCountry, getWorldCountrySlugs } from "@/lib/content/world";
import { getExploreCountryMetadata } from "@/lib/seo/content-meta";

interface CountryPageProps {
  params: Promise<{ country: string }>;
}

export async function generateStaticParams() {
  return getWorldCountrySlugs().map((country) => ({ country }));
}

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const { country: slug } = await params;
  const country = getWorldCountry(slug);
  if (!country) return { title: "Country not found" };
  return getExploreCountryMetadata({
    slug: country.slug,
    name: country.name,
    overview: country.overview,
    heroImage: country.heroImage,
  });
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { country: slug } = await params;
  const country = getWorldCountry(slug);
  if (!country) notFound();

  return (
    <PageLayout>
      <CountryDetailClient country={country} />
    </PageLayout>
  );
}
