import type { Metadata } from "next";
import { TravellerLayoutClient } from "./TravellerLayoutClient";

export const metadata: Metadata = {
  title: "My Journey | My Fiji Tour",
  description: "Manage bookings, trips, loyalty rewards, and travel documents.",
};

export default function TravellerLayout({ children }: { children: React.ReactNode }) {
  return <TravellerLayoutClient>{children}</TravellerLayoutClient>;
}
