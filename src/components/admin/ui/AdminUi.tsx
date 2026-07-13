"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="admin-text font-serif text-3xl tracking-tight sm:text-[2rem]">
          {title}
        </h1>
        {subtitle && (
          <p className="admin-text-muted mt-2 max-w-2xl text-[15px] leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search…",
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <Search className="admin-search-icon pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="admin-input h-9 w-full rounded-lg pl-9 pr-3 text-sm sm:w-64"
      />
    </div>
  );
}

export function FilterSelect({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  label?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={label}
      className="admin-select h-9 rounded-lg px-3 text-sm"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export function AdminButton({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gold/30 disabled:opacity-50",
        size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm",
        variant === "primary" && "bg-navy text-white hover:bg-navy-light",
        variant === "secondary" && "admin-btn-secondary",
        variant === "ghost" && "admin-btn-ghost",
        variant === "danger" && "bg-red-600 text-white hover:bg-red-700",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function TableShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-card overflow-hidden rounded-xl">
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

export function DataTable({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <table className="w-full min-w-[720px] border-collapse text-left text-sm">
      {children}
    </table>
  );
}

export function Th({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={cn(
        "admin-table-head px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.06em]",
        className,
      )}
    >
      {children}
    </th>
  );
}

export function Td({
  children,
  className,
  colSpan,
}: {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
}) {
  return (
    <td colSpan={colSpan} className={cn("admin-table-cell px-4 py-3.5 last:border-b-0", className)}>
      {children}
    </td>
  );
}

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <p className="admin-text font-serif text-lg">{title}</p>
      {description && (
        <p className="admin-text-muted mt-2 max-w-sm text-sm">{description}</p>
      )}
    </div>
  );
}

export function Toolbar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function StatPill({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="admin-stat-pill rounded-lg px-4 py-2.5">
      <p className="admin-text-subtle text-[10px] font-semibold uppercase tracking-wide">
        {label}
      </p>
      <p className="admin-text mt-0.5 text-lg font-semibold tabular-nums">
        {value}
      </p>
    </div>
  );
}
