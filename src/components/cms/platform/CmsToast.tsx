"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type ToastTone = "success" | "error" | "info";

type ToastItem = {
  id: string;
  title: string;
  description?: string;
  tone: ToastTone;
};

type ToastContextValue = {
  toast: (input: { title: string; description?: string; tone?: ToastTone }) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function CmsToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const toast = useCallback(
    (input: { title: string; description?: string; tone?: ToastTone }) => {
      const id = `t_${Math.random().toString(36).slice(2, 9)}`;
      setItems((prev) => [
        ...prev,
        {
          id,
          title: input.title,
          description: input.description,
          tone: input.tone ?? "info",
        },
      ]);
      window.setTimeout(() => {
        setItems((prev) => prev.filter((t) => t.id !== id));
      }, 4200);
    },
    [],
  );

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[200] flex w-[min(22rem,calc(100vw-2rem))] flex-col gap-2">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "pointer-events-auto rounded-xl border px-4 py-3 shadow-lg backdrop-blur",
              item.tone === "success" && "border-emerald-200 bg-emerald-50 text-emerald-900",
              item.tone === "error" && "border-red-200 bg-red-50 text-red-900",
              item.tone === "info" && "border-gold/30 bg-white text-navy",
            )}
          >
            <p className="text-sm font-semibold">{item.title}</p>
            {item.description && (
              <p className="mt-0.5 text-xs opacity-80">{item.description}</p>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useCmsToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    return {
      toast: ({ title }: { title: string }) => {
        if (typeof window !== "undefined") window.alert(title);
      },
    };
  }
  return ctx;
}
