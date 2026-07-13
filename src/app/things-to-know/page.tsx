"use client";

import Link from "next/link";
import {
  BookOpen,
  Car,
  CloudSun,
  FileText,
  Heart,
  Map,
  Plane,
  Shield,
  Sparkles,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { ImageOverlayCard } from "@/components/cards/ImageOverlayCard";
import { ValueProps } from "@/components/sections/ValueProps";
import { GuideTabsSection } from "@/components/ui/GuideTabs";
import { Container, Section } from "@/components/shared";
import { useT } from "@/components/providers/LocaleProvider";
import { images } from "@/lib/images";
import { ds } from "@/lib/design-system";

export default function ThingsToKnowPage() {
  const t = useT();

  const guideCards = [
    {
      title: t.thingsToKnow.visaTitle,
      description: t.thingsToKnow.visaDesc,
      image: images.travelReq,
      href: "/guides/visa-guide",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: t.thingsToKnow.weatherTitle,
      description: t.thingsToKnow.weatherDesc,
      image: images.weather,
      href: "/guides/weather-guide",
      icon: <CloudSun className="h-5 w-5" />,
    },
    {
      title: t.thingsToKnow.transportTitle,
      description: t.thingsToKnow.transportDesc,
      image: images.transport,
      href: "/guides/transportation",
      icon: <Car className="h-5 w-5" />,
    },
    {
      title: t.thingsToKnow.destGuideTitle,
      description: t.thingsToKnow.destGuideDesc,
      image: images.destination,
      href: "/places-to-go",
      icon: <Map className="h-5 w-5" />,
    },
    {
      title: t.thingsToKnow.adventureTitle,
      description: t.thingsToKnow.adventureDesc,
      image: images.hiking,
      href: "/guides/adventure",
      icon: <Sparkles className="h-5 w-5" />,
    },
    {
      title: t.thingsToKnow.essentialTitle,
      description: t.thingsToKnow.essentialDesc,
      image: images.picnic,
      href: "/guides/first-time-fiji",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: t.thingsToKnow.honeymoonTitle,
      description: t.thingsToKnow.honeymoonDesc,
      image: images.romance,
      href: "/guides/honeymoon",
      icon: <Heart className="h-5 w-5" />,
    },
    {
      title: t.thingsToKnow.healthTitle,
      description: t.thingsToKnow.healthDesc,
      image: images.wellness,
      href: "/faq",
      icon: <Shield className="h-5 w-5" />,
    },
    {
      title: t.thingsToKnow.luxuryTitle,
      description: t.thingsToKnow.luxuryDesc,
      image: images.luxury,
      href: "/guides/luxury-travel",
      icon: <Sparkles className="h-5 w-5" />,
    },
    {
      title: t.thingsToKnow.transitTitle,
      description: t.thingsToKnow.transitDesc,
      image: images.nadi,
      href: "/guides/transportation",
      icon: <Plane className="h-5 w-5" />,
    },
  ];

  return (
    <PageLayout activeHref="/things-to-know" stickyCta >
      <GuideTabsSection activeHref="/things-to-know" />

      <Section compact className="pb-20 pt-5" decor={false}>
        <Container>
          <div className={ds.grid4}>
            {guideCards.map((card) => (
              <ImageOverlayCard
                key={card.title}
                {...card}
                cta={t.thingsToKnow.readGuideCta}
                className="min-h-[280px]"
              />
            ))}
          </div>

          <div className="pt-8 text-center">
            <Link href="/guides" className={ds.linkGold}>
              {t.thingsToKnow.viewAllGuides}
            </Link>
          </div>
        </Container>
      </Section>

      <ValueProps
        items={[
          {
            icon: BookOpen,
            title: t.thingsToKnow.valuePlanningTitle,
            description: t.thingsToKnow.valuePlanningDesc,
          },
          {
            icon: Shield,
            title: t.thingsToKnow.valueSafetyTitle,
            description: t.thingsToKnow.valueSafetyDesc,
          },
          {
            icon: Heart,
            title: t.thingsToKnow.valueCultureTitle,
            description: t.thingsToKnow.valueCultureDesc,
          },
          {
            icon: Map,
            title: t.thingsToKnow.valueIslandTitle,
            description: t.thingsToKnow.valueIslandDesc,
          },
        ]}
      />
    </PageLayout>
  );
}
