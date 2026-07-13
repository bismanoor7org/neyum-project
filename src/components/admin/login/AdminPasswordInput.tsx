"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

type AdminPasswordInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  variant?: "default" | "portal";
};

export function AdminPasswordInput({
  id,
  label,
  value,
  onChange,
  error,
  variant = "default",
}: AdminPasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const inputClass = variant === "portal" ? "admin-portal-input" : "admin-login-input";
  const labelClass = variant === "portal" ? "admin-portal-label" : "admin-login-label";

  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {variant === "portal" ? (
        <div className={cn("admin-portal-input-wrap", error && "admin-portal-input-wrap--error")}>
          <Lock className="admin-portal-input-icon" strokeWidth={1.5} aria-hidden />
          <input
            id={id}
            name={`${id}_field`}
            type={visible ? "text" : "password"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter your password"
            autoComplete="new-password"
            autoCorrect="off"
            spellCheck={false}
            readOnly
            onFocus={(e) => {
              e.target.readOnly = false;
            }}
            data-lpignore="true"
            data-1p-ignore="true"
            className="admin-portal-input"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="admin-portal-input-toggle"
            aria-label={visible ? "Hide password" : "Show password"}
            tabIndex={0}
          >
            {visible ? (
              <EyeOff className="h-4 w-4" strokeWidth={1.5} />
            ) : (
              <Eye className="h-4 w-4" strokeWidth={1.5} />
            )}
          </button>
        </div>
      ) : (
        <div className="relative">
          <Lock
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--admin-text-subtle)]"
            strokeWidth={1.5}
            aria-hidden
          />
          <input
            id={id}
            name={`${id}_field`}
            type={visible ? "text" : "password"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter your password"
            autoComplete="new-password"
            autoCorrect="off"
            spellCheck={false}
            readOnly
            onFocus={(e) => {
              e.target.readOnly = false;
            }}
            data-lpignore="true"
            data-1p-ignore="true"
            className={cn(
              inputClass,
              "admin-login-input--with-leading-icon admin-login-input--with-trailing-icon",
              error && "admin-login-input--error",
            )}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-[var(--admin-text-subtle)] transition-colors",
              "hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40",
            )}
            aria-label={visible ? "Hide password" : "Show password"}
            tabIndex={0}
          >
            {visible ? (
              <EyeOff className="h-4 w-4" strokeWidth={1.5} />
            ) : (
              <Eye className="h-4 w-4" strokeWidth={1.5} />
            )}
          </button>
        </div>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-coral" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
