import { PageLayout } from "@/components/layout/PageLayout";
import { HomeBookingBar } from "@/components/home/HomeBookingBar";
import { ItineraryBuilder } from "@/components/itinerary/ItineraryBuilder";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan Your Fiji Itinerary",
  description:
    "Build a day-by-day luxury Fiji itinerary and send it to our concierge for a bespoke proposal.",
};

export default function TripPlannerPage() {
  return (
    <PageLayout activeHref="/trip-planner" stickyCta>
      <HomeBookingBar standalone />
      <ItineraryBuilder />
    </PageLayout>
  );
}
