import { TravelBudgetPlannerClient } from "@/components/tools/travel-budget-planner/TravelBudgetPlannerClient";
import { travelBudgetPlannerMetadata } from "@/lib/tools/travel-budget-planner/seo";

export const metadata = travelBudgetPlannerMetadata();

export default function TravelBudgetPlannerPage() {
  return <TravelBudgetPlannerClient />;
}
