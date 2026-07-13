import nextDynamic from "next/dynamic";
import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { staticPageSeo } from "@/lib/seo/pages";
import { HomeHero } from "@/components/home/HomeHero";
import { FeaturedDestinations } from "@/components/home/HomeMarketplaceSections";
import {
  getHomeHeroConfig,
  getHomepageSectionByKey,
  getPublishedDestinations,
  getPublishedFaqs,
  getPublishedTestimonials,
} from "@/server/services/public-content.service";

export const metadata: Metadata = staticPageSeo.home;
export const dynamic = "force-dynamic";

const ExperiencesGrid = nextDynamic(
  () => import("@/components/home/ExperiencesGrid").then((m) => ({ default: m.ExperiencesGrid })),
);
const FijiMapSection = nextDynamic(
  () => import("@/components/home/FijiMapSection").then((m) => ({ default: m.FijiMapSection })),
);
const LuxuryEscapes = nextDynamic(
  () =>
    import("@/components/home/HomeMarketplaceSections").then((m) => ({
      default: m.LuxuryEscapes,
    })),
);
const StorySection = nextDynamic(
  () => import("@/components/home/StorySection").then((m) => ({ default: m.StorySection })),
);
const HomeDealsPreview = nextDynamic(
  () =>
    import("@/components/home/HomeMarketplaceSections").then((m) => ({
      default: m.HomeDealsPreview,
    })),
);
const PlanWithConfidence = nextDynamic(
  () =>
    import("@/components/home/PlanWithConfidence").then((m) => ({
      default: m.PlanWithConfidence,
    })),
);
const CustomerStories = nextDynamic(
  () =>
    import("@/components/home/HomeMarketplaceSections").then((m) => ({
      default: m.CustomerStories,
    })),
);
const FAQPreview = nextDynamic(
  () =>
    import("@/components/home/HomeMarketplaceSections").then((m) => ({
      default: m.FAQPreview,
    })),
);
const SocialFeed = nextDynamic(
  () => import("@/components/home/SocialFeed").then((m) => ({ default: m.SocialFeed })),
);
const LuxuryCTA = nextDynamic(
  () => import("@/components/home/LuxuryCTA").then((m) => ({ default: m.LuxuryCTA })),
);

function sectionCopy(
  row: Awaited<ReturnType<typeof getHomepageSectionByKey>>,
): { title?: string; subtitle?: string } | undefined {
  if (!row?.content) return undefined;
  const c = row.content as Record<string, string>;
  return {
    title: c.title ?? c.titleMain,
    subtitle: c.subtitle,
  };
}

export default async function HomePage() {
  const [
    featuredFromDb,
    allDestinations,
    faqs,
    testimonials,
    heroSection,
    featuredSection,
    faqSection,
    storiesSection,
  ] = await Promise.all([
    getPublishedDestinations({ featured: true, limit: 4 }),
    getPublishedDestinations({ limit: 4 }),
    getPublishedFaqs({ limit: 12 }),
    getPublishedTestimonials({ limit: 6 }),
    getHomeHeroConfig(),
    getHomepageSectionByKey("featured_destinations"),
    getHomepageSectionByKey("faq_preview"),
    getHomepageSectionByKey("customer_stories"),
  ]);

  const featuredDestinations =
    featuredFromDb.length >= 4 ? featuredFromDb : allDestinations;

  return (
    <PageLayout heroOverlap activeHref="/" stickyCta>
      <HomeHero hero={heroSection} />
      <FeaturedDestinations
        destinations={featuredDestinations}
        section={sectionCopy(featuredSection)}
      />

      <FijiMapSection />
      <ExperiencesGrid />
      <LuxuryEscapes />

      <StorySection />
      <HomeDealsPreview />
      <PlanWithConfidence />

      <CustomerStories
        testimonials={testimonials}
        section={sectionCopy(storiesSection)}
      />
      <FAQPreview items={faqs} section={sectionCopy(faqSection)} />
      <SocialFeed />
      <LuxuryCTA />
    </PageLayout>
  );
}
