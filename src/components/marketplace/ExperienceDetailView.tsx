"use client";

import { useLocale, useT } from "@/components/providers/LocaleProvider";
import { Container, Section } from "@/components/shared";
import { localizeExperience } from "@/lib/i18n/content";
import type { Experience } from "@/lib/content/types";
import { experiences } from "@/lib/content/experiences";
import {
  getEnrichedFaqs,
  getExperienceGallery,
  getExperienceMapSlug,
  getGuestReviews,
  getWhyChooseReasons,
} from "@/lib/content/experience-detail-helpers";
import { getExperienceHeroAlt } from "@/lib/seo/content-meta";
import {
  ExperienceFaqSection,
  ExperienceGuestReviews,
  ExperienceHighlightsGrid,
  ExperienceIncludedList,
  ExperienceMapSection,
  ExperienceMobileBookingBar,
  ExperienceOverview,
  ExperiencePhotoGallery,
  ExperienceRelatedGrid,
  ExperienceTrustBar,
  ExperienceWhyChoose,
  LuxuryExperienceHero,
} from "@/components/marketplace/experience-detail/ExperienceLuxurySections";

export function ExperienceDetailView({ experience }: { experience: Experience }) {
  const { locale } = useLocale();
  const t = useT();
  const exp = localizeExperience(experience, locale);

  const related = exp.relatedSlugs
    .map((s) => experiences.find((e) => e.slug === s))
    .filter(Boolean)
    .map((e) => {
      const loc = localizeExperience(e!, locale);
      return {
        slug: loc.slug,
        title: loc.title,
        image: loc.heroImage,
        location: loc.location,
        duration: loc.duration,
        category: loc.category,
        priceFrom: loc.priceFrom,
        rating: loc.rating,
      };
    });

  const galleryImages = getExperienceGallery(exp);
  const mapSlug = getExperienceMapSlug(exp.location);
  const whyChoose = getWhyChooseReasons(exp);
  const guestReviews = getGuestReviews(exp);
  const faqs = getEnrichedFaqs(exp);

  return (
    <>
      <LuxuryExperienceHero
        title={exp.title}
        location={exp.location}
        category={exp.category}
        duration={exp.duration}
        ages={exp.ages}
        rating={exp.rating}
        image={exp.heroImage}
        imageAlt={getExperienceHeroAlt(exp.slug, exp.title)}
        reviewsLabel={t.detail.reviews}
        locationLabel={t.detail.location}
        agesLabel={t.detail.ages}
      />

      <Section compact className="!pt-0" decor={false} reveal={false}>
        <Container size="narrow">
          <div className="min-w-0 space-y-20 lg:space-y-24 lg:pt-6">
            <ExperienceTrustBar />

            <ExperienceOverview
              eyebrow={t.detail.aboutExperience}
              title={exp.title}
              overview={exp.overview}
            />

            <ExperienceHighlightsGrid title={t.detail.highlights} highlights={exp.highlights} />

            <ExperiencePhotoGallery
              title={t.detail.photoGallery}
              subtitle={t.detail.photoGallerySub}
              images={galleryImages}
              experienceTitle={exp.title}
            />

            <ExperienceIncludedList title={t.detail.included} items={exp.included} />

            <ExperienceMapSection
              title={t.detail.experienceMap}
              subtitle={t.detail.experienceMapSub}
              location={exp.location}
              mapSlug={mapSlug}
            />

            <ExperienceWhyChoose
              title={t.detail.whyChooseExperience}
              subtitle={t.detail.whyChooseExperienceSub}
              reasons={whyChoose}
            />

            <ExperienceGuestReviews
              title={t.detail.guestReviews}
              subtitle={t.detail.guestReviewsSub}
              reviews={guestReviews}
              reviewsLabel={t.detail.reviews}
            />
          </div>

          <div className="mt-20 lg:mt-24">
            <ExperienceFaqSection title={t.common.faqs} faqs={faqs} />
          </div>

          <div className="mt-20 lg:mt-24">
            <ExperienceRelatedGrid title={t.detail.youMayLike} items={related} />
          </div>
        </Container>
      </Section>

      <ExperienceMobileBookingBar
        priceFrom={exp.priceFrom}
        fromLabel={t.detail.fromPrice}
        bookHref={`/checkout/${exp.slug}`}
        bookLabel={t.detail.bookExperience}
      />
    </>
  );
}
