"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useT } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/design-system";

type AuthNavProps = {
  className?: string;
  compact?: boolean;
};

export function AuthNav({ className, compact = false }: AuthNavProps) {
  const t = useT();
  const router = useRouter();
  const pathname = usePathname();
  const { user, ready, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!ready) return null;

  if (!user) {
    if (compact) {
      return (
        <div className={cn("flex flex-col gap-2", className)}>
          <Link href="/login" className="auth-btn-outline block py-3 text-center">
            {t.nav.login}
          </Link>
          <Link href="/signup" className="auth-btn-primary block py-3 text-center text-sm">
            {t.nav.signup}
          </Link>
        </div>
      );
    }

    return (
      <div className={cn("flex shrink-0 items-center gap-4", className)}>
        <Link href="/login" className="fiji-luxury-nav-auth-link">
          {t.nav.login}
        </Link>
        <Link href="/signup" className="fiji-luxury-nav-auth-link">
          {t.nav.signup}
        </Link>
      </div>
    );
  }

  const menuItems = [
    { href: "/traveller", label: t.auth.profile, icon: User },
    { href: "/traveller/bookings", label: t.auth.bookings, icon: BookOpen },
    { href: "/traveller/profile", label: t.auth.settings, icon: Settings },
  ];

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="auth-nav-pill"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-light text-[11px] font-bold text-navy">
          {user.initials}
        </span>
        <span className="hidden sm:inline">{t.nav.dashboard}</span>
        <ChevronDown
          className={cn("h-4 w-4 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            role="menu"
            className="auth-nav-dropdown absolute right-0 top-[calc(100%+8px)] z-50 overflow-hidden py-1.5"
          >
            <div className="border-b border-white/10 px-4 py-3">
              <p className="text-sm font-semibold text-white">{user.name}</p>
              <p className="text-xs text-white/45">{user.email}</p>
            </div>

            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/8 hover:text-gold"
              >
                <item.icon className="h-4 w-4" strokeWidth={1.5} />
                {item.label}
              </Link>
            ))}

            <Link
              href="/traveller"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/8 hover:text-gold"
            >
              <LayoutDashboard className="h-4 w-4" strokeWidth={1.5} />
              {t.nav.dashboard}
            </Link>

            <div className="mt-1 border-t border-white/10 pt-1">
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  signOut();
                  setOpen(false);
                  if (pathname.startsWith("/admin")) router.push("/");
                }}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-coral-soft transition-colors hover:bg-white/8"
              >
                <LogOut className="h-4 w-4" strokeWidth={1.5} />
                {t.nav.logout}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
