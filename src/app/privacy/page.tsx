"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { Container, CTABanner, PageHero, Section } from "@/components/shared";
import { useT } from "@/components/providers/LocaleProvider";
import { images } from "@/lib/images";
import { ds } from "@/lib/design-system";

export default function PrivacyPage() {
  const t = useT();

  const sections = [
    { title: t.privacy.title, body: t.privacy.p1 },
    { title: t.footer.privacy, body: t.privacy.p2 },
    { title: t.contact.emailAddress, body: t.privacy.p3 },
  ];

  return (
    <PageLayout >
      <PageHero
        image={images.culture}
        eyebrow={t.privacy.eyebrow}
        title={t.privacy.title}
        subtitle={t.privacy.p1.slice(0, 100) + "…"}
        breadcrumbs={[
          { label: t.common.home, href: "/" },
          { label: t.footer.privacy },
        ]}
        overlay="light"
        minHeight="min-h-[40vh] lg:min-h-[44vh]"
      />

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl space-y-6">
            {sections.map((s, i) => (
              <article
                key={s.title}
                className="rounded-2xl border border-foreground/6 bg-white p-7 shadow-[var(--shadow-card)] lg:p-8"
              >
                <h2 className={ds.headingCard}>{s.title}</h2>
                <p className="mt-4 text-[15px] leading-[1.85] text-foreground/70">{s.body}</p>
                {i === 0 && (
                  <p className="mt-4 text-xs font-medium uppercase tracking-wider text-foreground/40">
                    Last updated · 2026
                  </p>
                )}
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <CTABanner
        image={images.heroHome}
        title={t.contact.title}
        description={t.contact.subtitle}
        ctaLabel={t.nav.contact}
        ctaHref="/contact"
      />
    </PageLayout>
  );
}
