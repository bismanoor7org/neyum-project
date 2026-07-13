"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BarChart3,
  Bell,
  BookOpen,
  CalendarCheck,
  ChevronLeft,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Menu,
  RefreshCw,
  Settings,
  Store,
  Users,
  Wallet,
  X,
  Map,
  Globe2,
  Banknote,
  Car,
  CreditCard,
  MessageSquare,
  Percent,
  Star,
  RotateCcw,
  Shield,
  Inbox,
} from "lucide-react";
import { useAdmin } from "@/components/admin/AdminProvider";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { DashboardBrandHeader } from "@/components/layout/BrandLogo";
import { useAdminApi } from "@/hooks/useAdminApi";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/admin/refunds", label: "Refunds", icon: RotateCcw },
  { href: "/admin/suppliers", label: "Suppliers", icon: Store },
  { href: "/admin/tours", label: "Tours", icon: Map },
  { href: "/admin/transport", label: "Transport", icon: Car },
  { href: "/admin/users", label: "Travellers", icon: Users },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/revenue", label: "Revenue", icon: Wallet },
  { href: "/admin/settlements", label: "Settlements", icon: Banknote },
  { href: "/admin/commission", label: "Commission", icon: Percent },
  { href: "/admin/cms", label: "CMS", icon: BookOpen },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/support", label: "Support", icon: MessageSquare },
  { href: "/admin/enquiries", label: "Enquiries", icon: Inbox },
  { href: "/admin/explore", label: "Explore World", icon: Globe2 },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/notifications", label: "Notifications", icon: Bell },
  { href: "/admin/security", label: "Security", icon: Shield },
  { href: "/admin/settings", label: "Settings", icon: Settings },
] as const;

const SIDEBAR_COLLAPSED_KEY = "neyum-admin-sidebar-collapsed";

function NavLinks({
  pathname,
  collapsed,
  onNavigate,
  unreadCount,
}: {
  pathname: string;
  collapsed: boolean;
  onNavigate?: () => void;
  unreadCount: number;
}) {
  return (
    <>
      {NAV.map((item) => {
        const { href, label, icon: Icon } = item;
        const exact = "exact" in item && item.exact;
        const active = exact
          ? pathname === href
          : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            title={collapsed ? label : undefined}
            aria-label={collapsed ? label : undefined}
            className={cn(
              "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-all",
              collapsed && "lg:justify-center lg:px-2",
              active
                ? "bg-white/10 text-white shadow-sm"
                : "text-white/60 hover:bg-white/[0.06] hover:text-white/90",
            )}
          >
            <Icon
              className={cn(
                "h-[18px] w-[18px] shrink-0 transition-colors",
                active ? "text-gold" : "text-white/40 group-hover:text-white/70",
              )}
              strokeWidth={1.5}
            />
            <span className={cn("min-w-0 flex-1 truncate", collapsed && "lg:hidden")}>
              {label}
            </span>
            {label === "Notifications" && unreadCount > 0 && (
              <span
                className={cn(
                  "rounded-full bg-gold font-bold text-navy",
                  collapsed
                    ? "lg:absolute lg:right-1.5 lg:top-1.5 lg:h-2 lg:w-2 lg:p-0"
                    : "px-1.5 py-0.5 text-[10px]",
                )}
              >
                <span className={cn(collapsed && "lg:sr-only")}>{unreadCount}</span>
              </span>
            )}
          </Link>
        );
      })}
    </>
  );
}

function SidebarFooter({
  collapsed,
  status,
  onRefresh,
  onSignOut,
}: {
  collapsed: boolean;
  status: string;
  onRefresh: () => void;
  onSignOut: () => void;
}) {
  const actionBtn = cn(
    "flex w-full items-center rounded-lg px-3 py-2 text-[13px] font-medium text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white disabled:opacity-50",
    collapsed ? "lg:justify-center lg:gap-0 lg:px-2" : "gap-3",
  );

  return (
    <div className="space-y-0.5 border-t border-white/10 p-3">
      <div
        className={cn(
          "flex items-center rounded-lg px-3 py-2",
          collapsed ? "lg:justify-center lg:px-2" : "gap-3",
        )}
        title={collapsed ? "Theme" : undefined}
      >
        <ThemeToggle variant="navy" />
        <span
          className={cn(
            "text-[13px] font-medium text-white/60",
            collapsed && "lg:hidden",
          )}
        >
          Theme
        </span>
      </div>
      <button
        type="button"
        onClick={onRefresh}
        disabled={status === "loading"}
        title={collapsed ? "Refresh" : undefined}
        aria-label="Refresh data"
        className={actionBtn}
      >
        <RefreshCw
          className={cn(
            "h-[18px] w-[18px] shrink-0",
            status === "loading" && "animate-spin",
          )}
          strokeWidth={1.5}
        />
        <span className={cn(collapsed && "lg:hidden")}>Refresh</span>
      </button>
      <Link
        href="/"
        target="_blank"
        title={collapsed ? "View website" : undefined}
        className={actionBtn}
      >
        <ExternalLink className="h-[18px] w-[18px] shrink-0" strokeWidth={1.5} />
        <span className={cn(collapsed && "lg:hidden")}>View website</span>
      </Link>
      <button
        type="button"
        onClick={onSignOut}
        title={collapsed ? "Sign out" : undefined}
        aria-label="Sign out"
        className={actionBtn}
      >
        <LogOut className="h-[18px] w-[18px] shrink-0" strokeWidth={1.5} />
        <span className={cn(collapsed && "lg:hidden")}>Sign out</span>
      </button>
    </div>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { signOut, refresh, status } = useAdmin();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { data: dash } = useAdminApi<{ unreadCount: number }>("/api/v1/admin/dashboard");
  const unreadCount = dash?.unreadCount ?? 0;

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
      if (stored === "true") setCollapsed(true);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const sidebar = (
    <div className="flex h-full flex-col overflow-hidden">
      <div
        className={cn(
          "flex items-center gap-3 px-5 py-5",
          collapsed ? "lg:justify-center lg:px-2" : "justify-between",
        )}
      >
        <div className={cn(collapsed && "lg:hidden")}>
          <DashboardBrandHeader portalLabel="Admin Console" collapsed={collapsed} />
        </div>
        <button
          type="button"
          onClick={toggleCollapsed}
          className="hidden rounded-lg p-1.5 text-white/50 hover:bg-white/10 hover:text-white lg:block"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform duration-300",
              collapsed && "rotate-180",
            )}
          />
        </button>
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="rounded-lg p-1.5 text-white/50 hover:bg-white/10 lg:hidden"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav
        className={cn(
          "flex-1 space-y-0.5 overflow-y-auto px-3 pb-4",
          collapsed && "lg:px-2",
        )}
      >
        <NavLinks
          pathname={pathname}
          collapsed={collapsed}
          onNavigate={() => setMobileOpen(false)}
          unreadCount={unreadCount}
        />
      </nav>

      <SidebarFooter
        collapsed={collapsed}
        status={status}
        onRefresh={refresh}
        onSignOut={() => void signOut()}
      />
    </div>
  );

  return (
    <div className="admin-panel admin-shell-bg min-h-screen">
      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-navy/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu overlay"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 overflow-hidden border-r border-white/8 bg-navy shadow-[4px_0_24px_rgba(15,61,62,0.15)] transition-[width,padding,transform] duration-300 ease-out lg:translate-x-0",
          "w-[272px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          collapsed ? "lg:w-[4.5rem]" : "lg:w-[272px]",
        )}
      >
        {sidebar}
      </aside>

      {/* Main */}
      <div
        className={cn(
          "transition-[padding-left] duration-300 ease-out lg:pl-[272px]",
          collapsed && "lg:pl-[4.5rem]",
        )}
      >
        <header className="admin-mobile-header sticky top-0 z-30 flex h-16 items-center gap-4 border-b px-6 backdrop-blur-xl lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="admin-btn-ghost rounded-lg p-2"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <DashboardBrandHeader portalLabel="Admin Console" />
          </div>
          <ThemeToggle variant="light" />
        </header>

        <main className="min-w-0 px-5 py-6 sm:px-8 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}

/* Legacy exports for enquiries page */
export function AdminPageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8">
      <h2 className="admin-text font-serif text-2xl tracking-tight sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="admin-text-muted mt-1.5 max-w-2xl text-sm">{subtitle}</p>
      )}
    </div>
  );
}

export function AdminStatGrid({
  stats,
}: {
  stats: {
    total: number;
    booking: number;
    contact: number;
    today: number;
    thisWeek: number;
  };
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {[
        { label: "Total enquiries", value: stats.total },
        { label: "Today", value: stats.today },
        { label: "Last 7 days", value: stats.thisWeek },
        { label: "Booking widget", value: stats.booking },
        { label: "Contact form", value: stats.contact },
      ].map(({ label, value }) => (
        <div key={label} className="admin-card rounded-xl p-5">
          <p className="admin-text-muted text-[11px] font-semibold uppercase tracking-wide">
            {label}
          </p>
          <p className="admin-text mt-2 font-serif text-3xl">{value}</p>
        </div>
      ))}
    </div>
  );
}
