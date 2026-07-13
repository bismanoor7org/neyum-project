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
  Compass,
  CreditCard,
  ExternalLink,
  FileText,
  Gift,
  Heart,
  LayoutDashboard,
  LogOut,
  Map,
  Menu,
  MessageSquare,
  RefreshCw,
  Shield,
  Sparkles,
  Star,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { DashboardBrandHeader } from "@/components/layout/BrandLogo";
import { useTraveller } from "@/components/traveller/TravellerProvider";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/traveller", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/traveller/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/traveller/trips", label: "My Trips", icon: Map },
  { href: "/traveller/wishlist", label: "Wishlist", icon: Heart },
  { href: "/traveller/favourites", label: "Favourites", icon: Sparkles },
  { href: "/traveller/messages", label: "Messages", icon: MessageSquare },
  { href: "/traveller/profile", label: "Profile", icon: Users },
  { href: "/traveller/payments", label: "Payments", icon: CreditCard },
  { href: "/traveller/documents", label: "Documents", icon: FileText },
  { href: "/traveller/reviews", label: "Reviews", icon: Star },
  { href: "/traveller/loyalty", label: "Loyalty", icon: Gift },
  { href: "/traveller/notifications", label: "Notifications", icon: Bell },
  { href: "/traveller/companions", label: "Companions", icon: Users },
  { href: "/traveller/support", label: "Support", icon: BookOpen },
  { href: "/traveller/recommendations", label: "For You", icon: Compass },
  { href: "/traveller/analytics", label: "Travel Stats", icon: BarChart3 },
  { href: "/traveller/security", label: "Security", icon: Shield },
] as const;

const SIDEBAR_KEY = "neyum-traveller-sidebar-collapsed";

function NavLinks({
  pathname,
  collapsed,
  onNavigate,
}: {
  pathname: string;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  return (
    <>
      {NAV.map((item) => {
        const active =
          "exact" in item && item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            title={collapsed ? item.label : undefined}
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
                "h-[18px] w-[18px] shrink-0",
                active ? "text-gold" : "text-white/40 group-hover:text-white/70",
              )}
              strokeWidth={1.5}
            />
            <span className={cn("min-w-0 flex-1 truncate", collapsed && "lg:hidden")}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </>
  );
}

export function TravellerShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { signOut, refresh, status, travellerUser, profile } = useTraveller();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(SIDEBAR_KEY) === "true") setCollapsed(true);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((p) => {
      const n = !p;
      try {
        localStorage.setItem(SIDEBAR_KEY, String(n));
      } catch {
        /* ignore */
      }
      return n;
    });
  };

  const displayName = travellerUser
    ? `${travellerUser.firstName} ${travellerUser.lastName}`
    : "Traveller";

  const sidebar = (
    <div className="flex h-full flex-col overflow-hidden">
      <div
        className={cn(
          "flex items-center gap-3 px-5 py-5",
          collapsed ? "lg:justify-center lg:px-2" : "justify-between",
        )}
      >
        <div className={cn(collapsed && "lg:hidden")}>
          <DashboardBrandHeader portalLabel="My Journey" collapsed={collapsed} />
          <p className="mt-1 truncate font-serif text-lg text-white/90">{displayName}</p>
          {profile && (
            <p className="mt-1 flex items-center gap-1.5 text-[11px] text-white/50">
              <Wallet className="h-3 w-3 text-gold/70" />
              {profile.loyaltyTier} · {profile.loyaltyPoints.toLocaleString()} pts
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={toggleCollapsed}
          className="hidden rounded-lg p-1.5 text-white/50 hover:bg-white/10 hover:text-white lg:block"
          aria-label="Toggle sidebar"
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
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
      <nav className={cn("flex-1 space-y-0.5 overflow-y-auto px-3 pb-4", collapsed && "lg:px-2")}>
        <NavLinks pathname={pathname} collapsed={collapsed} onNavigate={() => setMobileOpen(false)} />
      </nav>
      <div className="space-y-0.5 border-t border-white/10 p-3">
        <div className={cn("flex items-center rounded-lg px-3 py-2", collapsed ? "lg:justify-center" : "gap-3")}>
          <ThemeToggle variant="navy" />
          {!collapsed && <span className="hidden text-[13px] text-white/60 lg:inline">Theme</span>}
        </div>
        <button
          type="button"
          onClick={refresh}
          disabled={status === "loading"}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] text-white/60 hover:bg-white/[0.06] hover:text-white disabled:opacity-50"
        >
          <RefreshCw
            className={cn("h-[18px] w-[18px] shrink-0", status === "loading" && "animate-spin")}
            strokeWidth={1.5}
          />
          <span className={cn(collapsed && "lg:hidden")}>Refresh</span>
        </button>
        <Link
          href="/"
          target="_blank"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] text-white/60 hover:bg-white/[0.06] hover:text-white"
        >
          <ExternalLink className="h-[18px] w-[18px] shrink-0" strokeWidth={1.5} />
          <span className={cn(collapsed && "lg:hidden")}>Explore Fiji</span>
        </Link>
        <button
          type="button"
          onClick={() => void signOut()}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] text-white/60 hover:bg-white/[0.06] hover:text-white"
        >
          <LogOut className="h-[18px] w-[18px] shrink-0" strokeWidth={1.5} />
          <span className={cn(collapsed && "lg:hidden")}>Sign out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="admin-panel admin-shell-bg min-h-screen">
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-navy/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close overlay"
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 overflow-hidden border-r border-white/8 bg-navy shadow-[4px_0_24px_rgba(15,61,62,0.15)] transition-all duration-300 w-[272px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          collapsed ? "lg:w-[4.5rem]" : "lg:w-[272px]",
        )}
      >
        {sidebar}
      </aside>
      <div className={cn("transition-[padding-left] duration-300 lg:pl-[272px]", collapsed && "lg:pl-[4.5rem]")}>
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
            <DashboardBrandHeader portalLabel="My Journey" />
            <p className="admin-text truncate text-sm font-semibold">{displayName}</p>
          </div>
          <ThemeToggle variant="light" />
        </header>
        <main className="min-w-0 px-5 py-6 sm:px-8 lg:px-10 lg:py-10">{children}</main>
      </div>
    </div>
  );
}
