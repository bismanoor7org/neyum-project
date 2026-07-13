import { cn } from "@/lib/utils";

const VARIANTS = {
  // Booking
  pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  paid: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  confirmed: "bg-blue-50 text-blue-700 ring-blue-600/20",
  completed: "bg-slate-100 text-slate-700 ring-slate-500/20",
  cancelled: "bg-red-50 text-red-700 ring-red-600/20",
  refunded: "bg-purple-50 text-purple-700 ring-purple-600/20",
  failed: "bg-red-50 text-red-600 ring-red-600/20",
  // Supplier
  approved: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  rejected: "bg-red-50 text-red-700 ring-red-600/20",
  suspended: "bg-orange-50 text-orange-700 ring-orange-600/20",
  verified: "bg-teal-50 text-teal-700 ring-teal-600/20",
  // Tour
  draft: "bg-slate-100 text-slate-600 ring-slate-500/20",
  featured: "bg-gold/15 text-[#8b6914] ring-gold/30",
  // User
  active: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  inactive: "bg-slate-100 text-slate-600 ring-slate-500/20",
  blocked: "bg-red-50 text-red-700 ring-red-600/20",
  // Settlement
  processing: "bg-blue-50 text-blue-700 ring-blue-600/20",
  // Content
  published: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  scheduled: "bg-violet-50 text-violet-700 ring-violet-600/20",
  pending_review: "bg-amber-50 text-amber-800 ring-amber-600/20",
  needs_changes: "bg-orange-50 text-orange-800 ring-orange-600/20",
  archived: "bg-slate-100 text-slate-600 ring-slate-500/20",
} as const;

export function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const key = status.toLowerCase() as keyof typeof VARIANTS;
  const variant = VARIANTS[key] ?? "bg-slate-100 text-slate-600 ring-slate-500/20";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold capitalize ring-1 ring-inset",
        variant,
        className,
      )}
    >
      {status.replace(/_/g, " ").toLowerCase()}
    </span>
  );
}
