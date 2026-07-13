import { TripCostCalculatorClient } from "@/components/tools/trip-cost-calculator/TripCostCalculatorClient";
import { tripCostCalculatorMetadata } from "@/lib/tools/trip-cost-calculator/seo";

export const metadata = tripCostCalculatorMetadata();

export default function TripCostCalculatorPage() {
  return <TripCostCalculatorClient />;
}
