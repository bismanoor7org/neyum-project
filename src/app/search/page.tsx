import { Suspense } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SearchResultsClient } from "@/app/search/SearchResultsClient";
import { Loader2 } from "lucide-react";

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchResultsClient />
    </Suspense>
  );
}

function SearchFallback() {
  return (
    <PageLayout>
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    </PageLayout>
  );
}
