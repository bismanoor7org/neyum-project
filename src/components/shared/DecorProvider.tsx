"use client";

import {
  createContext,
  useCallback,
  useContext,
  useId,
  useRef,
  type ReactNode,
} from "react";
import type { DecorSide } from "@/lib/page-decor";

interface DecorContextValue {
  getSideForId: (id: string) => DecorSide;
}

const DecorContext = createContext<DecorContextValue | null>(null);

interface DecorProviderProps {
  children: ReactNode;
  startSide?: DecorSide;
}

export function DecorProvider({
  children,
  startSide = "left",
}: DecorProviderProps) {
  const indexRef = useRef(startSide === "left" ? 0 : 1);
  const assignmentsRef = useRef(new Map<string, DecorSide>());

  const getSideForId = useCallback((id: string): DecorSide => {
    const existing = assignmentsRef.current.get(id);
    if (existing) return existing;

    const side: DecorSide = indexRef.current % 2 === 0 ? "left" : "right";
    indexRef.current += 1;
    assignmentsRef.current.set(id, side);
    return side;
  }, []);

  return (
    <DecorContext.Provider value={{ getSideForId }}>
      {children}
    </DecorContext.Provider>
  );
}

export function useDecorSide(enabled = true): DecorSide | null {
  const ctx = useContext(DecorContext);
  const id = useId();
  if (!enabled || !ctx) return null;
  return ctx.getSideForId(id);
}
