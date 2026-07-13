import { notFound } from "next/navigation";
import { PageLayout } from "@/components/layout/PageLayout";
import { VisaChecker } from "@/components/visa/VisaChecker";
import { getAllCountrySlugs, getVisaRequirement } from "@/server/services/visa-intelligence.service";
import { visaCountryJsonLd, visaCountryMetadata } from "@/lib/visa/seo";
import { TOOLS_HREF } from "@/lib/nav/tools-nav";
import { JsonLd } from "@/components/seo/JsonLd";

interface PageProps {
  params: Promise<{ country: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllCountrySlugs();
    return slugs.map((country) => ({ country }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { country } = await params;
  try {
    const requirement = await getVisaRequirement(country);
    if (!requirement) return {};
    return visaCountryMetadata(requirement);
  } catch {
    return {};
  }
}

export default async function FijiVisaCountryPage({ params }: PageProps) {
  const { country } = await params;
  let requirement;
  try {
    requirement = await getVisaRequirement(country);
  } catch {
    notFound();
  }
  if (!requirement) notFound();

  return (
    <PageLayout activeHref={TOOLS_HREF} stickyCta>
      <JsonLd data={visaCountryJsonLd(requirement)} />
      <VisaChecker initialSlug={country} showHero={false} />
    </PageLayout>
  );
}
