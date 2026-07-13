"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { AuthGlassCard, AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { useT } from "@/components/providers/LocaleProvider";
import { images } from "@/lib/images";

export function ForgotPasswordExperience() {
  const t = useT();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("loading");
    setMessage(null);

    try {
      const res = await fetch("/api/v1/traveller/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = (await res.json()) as { message?: string; error?: string };
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? t.auth.invalidCredentials);
        return;
      }
      setStatus("sent");
      setMessage(data.message ?? t.auth.forgotPasswordSent);
    } catch {
      setStatus("error");
      setMessage(t.auth.invalidCredentials);
    }
  };

  return (
    <AuthSplitLayout
      headline={t.auth.forgotPasswordTitle}
      subtext={t.auth.forgotPasswordSub}
      trustItems={[t.auth.secureLogin, t.auth.verifiedSuppliers, t.auth.premiumExperiences]}
      imageSrc={images.resortTokoriki}
      showAdminPortal={false}
    >
      <AuthGlassCard>
        <h2 className="text-center font-serif text-2xl tracking-tight text-white sm:text-3xl">
          {t.auth.forgotPasswordTitle}
        </h2>
        <p className="mt-2 text-center text-sm text-white/60">{t.auth.forgotPasswordSub}</p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.forms.email}
            autoComplete="email"
            required
            className="auth-input"
          />

          <AnimatePresence mode="wait">
            {message && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`text-center text-sm ${status === "error" ? "text-coral" : "text-white/75"}`}
              >
                {message}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={status === "loading" || status === "sent"}
            className="auth-btn-primary flex w-full items-center justify-center gap-2"
          >
            {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
            {status === "loading" ? t.auth.sendingResetLink : t.auth.sendResetLink}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/55">
          <Link href="/login" className="font-semibold text-gold hover:text-gold-light">
            {t.auth.backToLogin}
          </Link>
        </p>
      </AuthGlassCard>

      {status === "sent" && (
        <div className="auth-mobile-sticky lg:hidden">
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="auth-btn-primary flex w-full items-center justify-center py-4"
          >
            {t.auth.backToLogin}
          </button>
        </div>
      )}
    </AuthSplitLayout>
  );
}
