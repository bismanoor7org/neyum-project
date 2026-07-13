"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { AuthGlassCard, AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { useT } from "@/components/providers/LocaleProvider";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

export function ResetPasswordExperience() {
  const t = useT();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!token) {
      setError(t.auth.verifyEmailFailed);
      return;
    }
    if (password !== confirm) {
      setError(t.auth.passwordMismatch);
      return;
    }
    if (password.length < 8) {
      setError(t.auth.passwordTooShort);
      return;
    }

    setError(null);
    setStatus("loading");

    try {
      const res = await fetch("/api/v1/traveller/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setError(data.error ?? t.auth.verifyEmailFailed);
        return;
      }
      setStatus("success");
      window.setTimeout(() => router.push("/login"), 1200);
    } catch {
      setStatus("error");
      setError(t.auth.verifyEmailFailed);
    }
  };

  return (
    <AuthSplitLayout
      headline={t.auth.resetPasswordTitle}
      subtext={t.auth.resetPasswordSub}
      trustItems={[t.auth.secureLogin, t.auth.verifiedSuppliers, t.auth.premiumExperiences]}
      imageSrc={images.resortTokoriki}
      showAdminPortal={false}
    >
      <AuthGlassCard>
        <h2 className="text-center font-serif text-2xl tracking-tight text-white sm:text-3xl">
          {t.auth.resetPasswordTitle}
        </h2>
        <p className="mt-2 text-center text-sm text-white/60">{t.auth.resetPasswordSub}</p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.auth.newPassword}
            autoComplete="new-password"
            className="auth-input"
          />
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder={t.auth.confirmPassword}
            autoComplete="new-password"
            className={cn("auth-input", error === t.auth.passwordMismatch && "auth-input--error")}
          />

          <AnimatePresence mode="wait">
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center text-sm text-coral"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="auth-btn-primary flex w-full items-center justify-center gap-2"
          >
            {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
            {status === "success" && <Check className="auth-success-check h-4 w-4" strokeWidth={2.5} />}
            {status === "loading"
              ? t.auth.resettingPassword
              : status === "success"
                ? t.auth.passwordResetSuccess
                : t.auth.resetPassword}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/55">
          <Link href="/login" className="font-semibold text-gold hover:text-gold-light">
            {t.auth.backToLogin}
          </Link>
        </p>
      </AuthGlassCard>
    </AuthSplitLayout>
  );
}
