"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { EnquiryRecord } from "@/lib/enquiry/types";
import type { EnquiryStats } from "@/lib/enquiry/stats";

export type AdminUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

type AdminLoginInput = {
  email: string;
  password: string;
  remember?: boolean;
};

type AdminContextValue = {
  authenticated: boolean;
  adminUser: AdminUser | null;
  ready: boolean;
  enquiries: EnquiryRecord[];
  stats: EnquiryStats | null;
  status: "idle" | "loading" | "ready" | "error" | "unauthorized";
  signIn: (input: AdminLoginInput) => Promise<{ ok: boolean; error?: string }>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
};

const emptyStats: EnquiryStats = {
  total: 0,
  booking: 0,
  contact: 0,
  today: 0,
  thisWeek: 0,
  byLocale: {},
  byBookingTab: {},
};

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [ready, setReady] = useState(false);
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [stats, setStats] = useState<EnquiryStats | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "ready" | "error" | "unauthorized"
  >("idle");

  const fetchEnquiries = useCallback(async (): Promise<boolean> => {
    setStatus("loading");
    try {
      const response = await fetch("/api/enquiry", { credentials: "include" });

      if (response.status === 401) {
        setAuthenticated(false);
        setAdminUser(null);
        setEnquiries([]);
        setStats(null);
        setStatus("unauthorized");
        return false;
      }

      if (!response.ok) throw new Error("Failed to load");

      const data = (await response.json()) as {
        enquiries: EnquiryRecord[];
        stats: EnquiryStats;
      };

      setEnquiries(data.enquiries);
      setStats(data.stats);
      setStatus("ready");
      return true;
    } catch {
      setStatus("error");
      return false;
    }
  }, []);

  const checkSession = useCallback(async () => {
    try {
      const res = await fetch("/api/v1/admin/auth/session", {
        credentials: "include",
      });
      if (!res.ok) {
        setAuthenticated(false);
        setAdminUser(null);
        setStatus("idle");
        return false;
      }
      const data = (await res.json()) as { user: AdminUser };
      setAuthenticated(true);
      setAdminUser(data.user);
      setStatus("ready");
      void fetchEnquiries();
      return true;
    } catch {
      setAuthenticated(false);
      setAdminUser(null);
      setStatus("idle");
      return false;
    }
  }, [fetchEnquiries]);

  useEffect(() => {
    void checkSession().finally(() => setReady(true));
  }, [checkSession]);

  const value = useMemo<AdminContextValue>(
    () => ({
      authenticated,
      adminUser,
      ready,
      enquiries,
      stats,
      status,
      signIn: async (input) => {
        const res = await fetch("/api/v1/admin/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(input),
        });

        const data = (await res.json()) as { ok?: boolean; error?: string };

        if (!res.ok || !data.ok) {
          setAuthenticated(false);
          setAdminUser(null);
          setStatus("unauthorized");
          return { ok: false, error: data.error ?? "Authentication failed" };
        }

        setAuthenticated(true);
        const sessionOk = await checkSession();
        if (!sessionOk) {
          return {
            ok: false,
            error: "Session could not be established. Check ADMIN_SESSION_SECRET in .env.local.",
          };
        }
        return { ok: true };
      },
      signOut: async () => {
        await fetch("/api/v1/admin/auth/logout", {
          method: "POST",
          credentials: "include",
        });
        setAuthenticated(false);
        setAdminUser(null);
        setEnquiries([]);
        setStats(null);
        setStatus("idle");
      },
      refresh: async () => {
        if (!authenticated) return;
        await fetchEnquiries();
      },
    }),
    [
      authenticated,
      adminUser,
      ready,
      enquiries,
      stats,
      status,
      checkSession,
      fetchEnquiries,
    ],
  );

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
}

export { emptyStats };
