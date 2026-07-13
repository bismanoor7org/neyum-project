import { CloudOff } from "lucide-react";
import { ds } from "@/lib/design-system";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  message: string;
}

export function EmptyState({
  title = "No results yet",
  message,
}: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--card-surface)] px-6 py-12 text-center"
      role="status"
    >
      <CloudOff className="h-10 w-10 text-foreground/30" strokeWidth={1.25} aria-hidden />
      <p className={cn(ds.headingCard, "mt-4 text-lg")}>{title}</p>
      <p className="mt-2 max-w-md text-sm text-foreground/60">{message}</p>
    </div>
  );
}
