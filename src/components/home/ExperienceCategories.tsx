"use client";

import {
  Crown,
  Flower2,
  Heart,
  Mountain,
  Palmtree,
  Users,
} from "lucide-react";
import {
  CategoryCard,
  CategoryCardMotion,
  Container,
  Section,
  SectionHeader,
} from "@/components/shared";
import { useT } from "@/components/providers/LocaleProvider";
import { ds } from "@/lib/design-system";
import { images } from "@/lib/images";

const categoryDefs = [
  {
    titleKey: "catAdventure" as const,
    descKey: "catAdventureDesc" as const,
    image: images.adventure,
    icon: Mountain,
    href: "/guides/adventure",
  },
  {
    titleKey: "catLuxury" as const,
    descKey: "catLuxuryDesc" as const,
    image: images.luxury,
    icon: Crown,
    href: "/guides/luxury-travel",
  },
  {
    titleKey: "catFamily" as const,
    descKey: "catFamilyDesc" as const,
    image: images.family,
    icon: Users,
    href: "/guides/family-travel",
  },
  {
    titleKey: "catWellness" as const,
    descKey: "catWellnessDesc" as const,
    image: images.wellness,
    icon: Flower2,
    href: "/guides/wellness",
  },
  {
    titleKey: "catCulture" as const,
    descKey: "catCultureDesc" as const,
    image: images.culture,
    icon: Palmtree,
    href: "/guides/culture",
  },
  {
    titleKey: "catRomance" as const,
    descKey: "catRomanceDesc" as const,
    image: images.romance,
    icon: Heart,
    href: "/guides/honeymoon",
  },
];

export function ExperienceCategories() {
  const t = useT();

  return (
    <Section variant="cream" reveal={false}>
      <Container>
          <SectionHeader
            title={t.home.categoriesTitle}
            subtitle={t.home.categoriesSubtitle}
            align="center"
            size="compact"
          />
        <div className={ds.categoryGrid}>
          {categoryDefs.map((cat, i) => (
            <CategoryCardMotion key={cat.titleKey} index={i}>
              <CategoryCard
                title={t.home[cat.titleKey]}
                description={t.home[cat.descKey]}
                image={cat.image}
                href={cat.href}
                icon={cat.icon}
              />
            </CategoryCardMotion>
          ))}
        </div>
      </Container>
    </Section>
  );
}
