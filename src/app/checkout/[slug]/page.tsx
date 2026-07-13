import { notFound } from "next/navigation";
import { PageLayout } from "@/components/layout/PageLayout";
import { CheckoutFlow } from "@/components/checkout/CheckoutFlow";
import { getCheckoutTour } from "@/lib/checkout/catalog";
import { getAvailabilityCalendar } from "@/server/auth/local-checkout-store";

type Props = { params: Promise<{ slug: string }> };

export default async function CheckoutPage({ params }: Props) {
  const { slug } = await params;
  const tour = getCheckoutTour(slug);
  if (!tour) notFound();

  const availability = getAvailabilityCalendar(tour.slug, tour.timeSlots);

  return (
    <PageLayout navbarVariant="light" activeHref="/things-to-do">
      <CheckoutFlow tour={tour} initialAvailability={availability} />
    </PageLayout>
  );
}
