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

export type SupplierUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type SupplierProfile = {
  id: string;
  companyName: string;
  verificationStatus: string;
  kycStatus: string;
  onboardingStep: number;
  rating: number;
  healthScore: number;
};

type SupplierLoginInput = {
  email: string;
  password: string;
  twoFactor: string;
  remember?: boolean;
};

type SupplierContextValue = {
  authenticated: boolean;
  supplierUser: SupplierUser | null;
  supplier: SupplierProfile | null;
  ready: boolean;
  status: "idle" | "loading" | "ready" | "error" | "unauthorized";
  signIn: (input: SupplierLoginInput) => Promise<{ ok: boolean; error?: string }>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
};

const SupplierContext = createContext<SupplierContextValue | null>(null);

export function SupplierProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [supplierUser, setSupplierUser] = useState<SupplierUser | null>(null);
  const [supplier, setSupplier] = useState<SupplierProfile | null>(null);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState<SupplierContextValue["status"]>("idle");

  const checkSession = useCallback(async () => {
    try {
      const res = await fetch("/api/v1/supplier/auth/session", { credentials: "include" });
      if (!res.ok) {
        setAuthenticated(false);
        setSupplierUser(null);
        setSupplier(null);
        setStatus("idle");
        return false;
      }
      const data = (await res.json()) as {
        user: SupplierUser;
        supplier: SupplierProfile;
      };
      setAuthenticated(true);
      setSupplierUser(data.user);
      setSupplier(data.supplier);
      setStatus("ready");
      return true;
    } catch {
      setAuthenticated(false);
      setSupplierUser(null);
      setSupplier(null);
      setStatus("idle");
      return false;
    }
  }, []);

  useEffect(() => {
    void checkSession().finally(() => setReady(true));
  }, [checkSession]);

  const value = useMemo<SupplierContextValue>(
    () => ({
      authenticated,
      supplierUser,
      supplier,
      ready,
      status,
      signIn: async (input) => {
        const res = await fetch("/api/v1/supplier/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(input),
        });
        const data = (await res.json()) as { ok?: boolean; error?: string };
        if (!res.ok || !data.ok) {
          setAuthenticated(false);
          setSupplierUser(null);
          setSupplier(null);
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
        await fetch("/api/v1/supplier/auth/logout", { method: "POST", credentials: "include" });
        setAuthenticated(false);
        setSupplierUser(null);
        setSupplier(null);
        setStatus("idle");
      },
      refresh: async () => {
        await checkSession();
      },
    }),
    [authenticated, supplierUser, supplier, ready, status, checkSession],
  );

  return <SupplierContext.Provider value={value}>{children}</SupplierContext.Provider>;
}

export function useSupplier() {
  const ctx = useContext(SupplierContext);
  if (!ctx) throw new Error("useSupplier must be used within SupplierProvider");
  return ctx;
}
