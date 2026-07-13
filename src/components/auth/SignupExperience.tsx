"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { AuthDivider, AuthGlassCard, AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons";
import { useT } from "@/components/providers/LocaleProvider";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

export function SignupExperience() {
  const t = useT();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirm) {
      setError(t.auth.passwordMismatch);
      return;
    }
    if (password.length < 8) {
      setError(t.auth.passwordTooShort);
      return;
    }
    if (!firstName.trim() || !lastName.trim()) {
      setError(t.forms.name);
      return;
    }

    setError(null);
    setMessage(null);
    setStatus("loading");

    try {
      const res = await fetch("/api/v1/traveller/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
        }),
      });
      const data = (await res.json()) as { error?: string; message?: string };
      if (!res.ok) {
        setStatus("error");
        setError(data.error ?? t.auth.invalidCredentials);
        return;
      }
      setStatus("success");
      setMessage(data.message ?? t.auth.checkEmailToVerify);
      window.setTimeout(() => router.push("/login?registered=1"), 1800);
    } catch {
      setStatus("error");
      setError(t.auth.invalidCredentials);
    }
  };

  return (
    <AuthSplitLayout
      headline={t.auth.joinParadise}
      subtext={t.auth.signupSubtext}
      trustItems={[t.auth.secureLogin, t.auth.verifiedSuppliers, t.auth.premiumExperiences]}
      imageSrc={images.resortTokoriki}
      showAdminPortal={false}
    >
      <AuthGlassCard>
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.28em] text-gold">
          {t.brand.luxuryExperiences}
        </p>
        <h2 className="mt-3 text-center font-serif text-2xl tracking-tight text-white sm:text-3xl">
          {t.auth.createAccount}
        </h2>
        <p className="mt-2 text-center text-sm text-white/60">{t.auth.signupCardSub}</p>

        <form id="signup-form" onSubmit={handleSubmit} className="mt-7 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={t.contact.firstName}
              autoComplete="given-name"
              required
              className="auth-input"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder={t.contact.lastName}
              autoComplete="family-name"
              required
              className="auth-input"
            />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.forms.email}
            autoComplete="email"
            required
            className="auth-input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.login.password}
            autoComplete="new-password"
            required
            className="auth-input"
          />
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder={t.auth.confirmPassword}
            autoComplete="new-password"
            required
            className={cn("auth-input", error === t.auth.passwordMismatch && "auth-input--error")}
          />

          <AnimatePresence mode="wait">
            {(error || message) && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`text-center text-sm ${error ? "text-coral" : "text-white/75"}`}
              >
                {error ?? message}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="auth-btn-primary flex w-full items-center justify-center gap-2"
          >
            {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
            {status === "success" && (
              <Check className="auth-success-check h-4 w-4" strokeWidth={2.5} />
            )}
            {status === "loading"
              ? t.auth.creatingAccount
              : status === "success"
                ? t.auth.accountCreated
                : t.auth.createAccount}
          </button>
        </form>

        <AuthDivider label={t.auth.orContinueWith} />
        <SocialLoginButtons />

        <p className="mt-6 text-center text-sm text-white/55">
          {t.auth.alreadyHaveAccount}{" "}
          <Link href="/login" className="font-semibold text-gold hover:text-gold-light">
            {t.forms.signIn}
          </Link>
        </p>
      </AuthGlassCard>

      <div className="auth-mobile-sticky lg:hidden">
        <button type="submit" form="signup-form" className="auth-btn-primary flex w-full items-center justify-center py-4">
          {t.auth.createAccount}
        </button>
      </div>
    </AuthSplitLayout>
  );
}
