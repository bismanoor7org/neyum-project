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
import type { AuthStatus, UserSession } from "@/lib/auth/types";

export const USER_SESSION_KEY = "fiji-user-session";
export const USER_REMEMBER_KEY = "fiji-user-remember";

type SignInResult = {
  ok: boolean;
  error?: string;
  code?: string;
};

type AuthContextValue = {
  user: UserSession | null;
  ready: boolean;
  status: AuthStatus;
  signIn: (email: string, password: string, remember?: boolean) => Promise<SignInResult>;
  signOut: () => void;
  resendVerification: (email: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function buildUser(email: string): UserSession {
  const name = email.split("@")[0]?.replace(/[._]/g, " ") ?? "Guest";
  const formatted = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
  const initials = formatted
    .split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
  return { email, name: formatted || "Guest", initials: initials || "G" };
}

function buildUserFromTraveller(user: {
  email: string;
  firstName: string;
  lastName: string;
}): UserSession {
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || buildUser(user.email).name;
  const initials = [user.firstName, user.lastName]
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);
  return { email: user.email, name, initials: initials || "G" };
}

async function fetchTravellerSession(): Promise<UserSession | null> {
  try {
    const res = await fetch("/api/v1/traveller/auth/session", { credentials: "include" });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      user?: { email: string; firstName: string; lastName: string };
    };
    if (!data.user?.email) return null;
    return buildUserFromTraveller(data.user);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState<AuthStatus>("idle");

  useEffect(() => {
    void (async () => {
      try {
        const sessionUser = await fetchTravellerSession();
        if (sessionUser) {
          setUser(sessionUser);
          setReady(true);
          return;
        }

        const session = sessionStorage.getItem(USER_SESSION_KEY);
        const remembered = localStorage.getItem(USER_REMEMBER_KEY);
        const raw = session ?? remembered;
        if (raw) setUser(JSON.parse(raw) as UserSession);
      } catch {
        sessionStorage.removeItem(USER_SESSION_KEY);
        localStorage.removeItem(USER_REMEMBER_KEY);
      }
      setReady(true);
    })();
  }, []);

  const persist = useCallback((next: UserSession, remember: boolean) => {
    const payload = JSON.stringify(next);
    sessionStorage.setItem(USER_SESSION_KEY, payload);
    if (remember) {
      localStorage.setItem(USER_REMEMBER_KEY, payload);
    } else {
      localStorage.removeItem(USER_REMEMBER_KEY);
    }
  }, []);

  const signIn = useCallback(
    async (email: string, password: string, remember = false): Promise<SignInResult> => {
      const trimmedEmail = email.trim();
      if (!trimmedEmail || !password.trim()) {
        setStatus("error");
        return { ok: false, error: "Please enter a valid email and password." };
      }

      setStatus("loading");
      try {
        const res = await fetch("/api/v1/traveller/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email: trimmedEmail, password, remember }),
        });
        const data = (await res.json()) as { error?: string; code?: string };
        if (!res.ok) {
          setStatus("error");
          return { ok: false, error: data.error, code: data.code };
        }

        const next = (await fetchTravellerSession()) ?? buildUser(trimmedEmail);
        persist(next, remember);
        setUser(next);
        setStatus("success");
        return { ok: true };
      } catch {
        setStatus("error");
        return { ok: false, error: "Please enter a valid email and password." };
      }
    },
    [persist],
  );

  const resendVerification = useCallback(async (email: string) => {
    try {
      const res = await fetch("/api/v1/traveller/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      return res.ok;
    } catch {
      return false;
    }
  }, []);

  const signOut = useCallback(() => {
    void fetch("/api/v1/traveller/auth/logout", { method: "POST", credentials: "include" });
    sessionStorage.removeItem(USER_SESSION_KEY);
    localStorage.removeItem(USER_REMEMBER_KEY);
    setUser(null);
    setStatus("idle");
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, ready, status, signIn, signOut, resendVerification }),
    [user, ready, status, signIn, signOut, resendVerification],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
