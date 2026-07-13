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

export type TravellerUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string | null;
};

export type TravellerProfileSummary = {
  loyaltyPoints: number;
  loyaltyTier: string;
  walletBalance: number;
  wishlistCount: number;
  upcomingTrips: number;
};

type TravellerLoginInput = {
  email: string;
  password: string;
  remember?: boolean;
};

type TravellerContextValue = {
  authenticated: boolean;
  travellerUser: TravellerUser | null;
  profile: TravellerProfileSummary | null;
  ready: boolean;
  status: "idle" | "loading" | "ready" | "error" | "unauthorized";
  signIn: (input: TravellerLoginInput) => Promise<{ ok: boolean; error?: string }>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
};

const TravellerContext = createContext<TravellerContextValue | null>(null);

export function TravellerProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [travellerUser, setTravellerUser] = useState<TravellerUser | null>(null);
  const [profile, setProfile] = useState<TravellerProfileSummary | null>(null);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState<TravellerContextValue["status"]>("idle");

  const checkSession = useCallback(async () => {
    try {
      const res = await fetch("/api/v1/traveller/auth/session", { credentials: "include" });
      if (!res.ok) {
        setAuthenticated(false);
        setTravellerUser(null);
        setProfile(null);
        setStatus("idle");
        return false;
      }
      const data = (await res.json()) as {
        user: TravellerUser;
        profile: TravellerProfileSummary;
      };
      setAuthenticated(true);
      setTravellerUser(data.user);
      setProfile(data.profile);
      setStatus("ready");
      return true;
    } catch {
      setAuthenticated(false);
      setTravellerUser(null);
      setProfile(null);
      setStatus("idle");
      return false;
    }
  }, []);

  useEffect(() => {
    void checkSession().finally(() => setReady(true));
  }, [checkSession]);

  const value = useMemo<TravellerContextValue>(
    () => ({
      authenticated,
      travellerUser,
      profile,
      ready,
      status,
      signIn: async (input) => {
        const res = await fetch("/api/v1/traveller/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(input),
        });
        const data = (await res.json()) as { ok?: boolean; error?: string };
        if (!res.ok || !data.ok) {
          setAuthenticated(false);
          setTravellerUser(null);
          setProfile(null);
          setStatus("unauthorized");
          return { ok: false, error: data.error ?? "Authentication failed" };
        }
        const sessionOk = await checkSession();
        if (!sessionOk) {
          return { ok: false, error: "Session could not be established" };
        }
        return { ok: true };
      },
      signOut: async () => {
        await fetch("/api/v1/traveller/auth/logout", { method: "POST", credentials: "include" });
        setAuthenticated(false);
        setTravellerUser(null);
        setProfile(null);
        setStatus("idle");
      },
      refresh: async () => {
        await checkSession();
      },
    }),
    [authenticated, travellerUser, profile, ready, status, checkSession],
  );

  return <TravellerContext.Provider value={value}>{children}</TravellerContext.Provider>;
}

export function useTraveller() {
  const ctx = useContext(TravellerContext);
  if (!ctx) throw new Error("useTraveller must be used within TravellerProvider");
  return ctx;
}
