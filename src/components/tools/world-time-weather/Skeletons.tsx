import { cn } from "@/lib/utils";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-[var(--border)]/60",
        className,
      )}
      aria-hidden
    />
  );
}

export function FijiDashboardSkeleton() {
  return (
    <div className="card-luxury p-6 md:p-8" aria-busy="true" aria-label="Loading Fiji weather">
      <Shimmer className="h-4 w-24" />
      <Shimmer className="mt-4 h-8 w-48" />
      <Shimmer className="mt-3 h-10 w-40" />
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Shimmer key={i} className="h-20" />
        ))}
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Shimmer key={i} className="h-28" />
        ))}
      </div>
    </div>
  );
}

export function SearchResultsSkeleton() {
  return (
    <div className="card-luxury p-6 md:p-8" aria-busy="true" aria-label="Loading search results">
      <Shimmer className="h-4 w-32" />
      <Shimmer className="mt-4 h-8 w-56" />
      <Shimmer className="mt-3 h-10 w-36" />
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Shimmer key={i} className="h-20" />
        ))}
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="space-y-8">
      <FijiDashboardSkeleton />
      <div className="card-luxury p-6 md:p-8">
        <Shimmer className="h-4 w-28" />
        <Shimmer className="mt-4 h-8 w-64" />
        <Shimmer className="mt-6 h-12 w-full" />
      </div>
    </div>
  );
}
