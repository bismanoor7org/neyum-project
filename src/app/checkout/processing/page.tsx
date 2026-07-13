import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { CheckoutProcessingClient } from "./CheckoutProcessingClient";

export default function CheckoutProcessingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-navy" />
        </div>
      }
    >
      <CheckoutProcessingClient />
    </Suspense>
  );
}
