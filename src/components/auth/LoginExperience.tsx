"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { AuthDivider, AuthGlassCard, AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons";
import { useT } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils";

function LoginForm() {
  const t = useT();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn, status, resendVerification } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [resendStatus, setResendStatus] = useState<"idle" | "loading" | "sent">("idle");
  const [infoMessage, setInfoMessage] = useState<string | null>(
    searchParams.get("registered") === "1" ? t.auth.checkEmailToVerify : null,
  );

  const googleError = searchParams.get("error");
  const googleErrorMessage =
    googleError === "google_cancelled"
      ? t.auth.googleSignInCancelled
      : googleError
        ? t.auth.googleSignInFailed
        : null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setNeedsVerification(false);

    const result = await signIn(email, password, remember);
    if (result.ok) {
      const returnUrl = searchParams.get("returnUrl");
      window.setTimeout(() => router.push(returnUrl && returnUrl.startsWith("/") ? returnUrl : "/traveller"), 600);
      return;
    }

    if (result.code === "EMAIL_NOT_VERIFIED") {
      setNeedsVerification(true);
      setError(result.error ?? t.auth.emailNotVerified);
      return;
    }

    setError(result.error ?? t.auth.invalidCredentials);
  };

  const handleResend = async () => {
    if (!email.trim()) return;
    setResendStatus("loading");
    const ok = await resendVerification(email);
    setResendStatus(ok ? "sent" : "idle");
  };

  return (
    <AuthGlassCard>
      <p className="text-center text-[10px] font-bold uppercase tracking-[0.28em] text-gold">
        {t.brand.luxuryExperiences}
      </p>
      <h2 className="mt-2 text-center font-serif text-2xl tracking-tight text-white sm:text-[1.65rem]">
        {t.pages.loginTitle}
      </h2>
      <p className="mt-1.5 text-center text-sm text-white/60">{t.login.subtitle}</p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.forms.email}
            autoComplete="email"
            required
            className={cn("auth-input", error && !email.trim() && "auth-input--error")}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.login.password}
            autoComplete="current-password"
            required
            className={cn("auth-input", error && !password.trim() && "auth-input--error")}
          />
        </div>

        <div className="flex items-center justify-between gap-3 text-sm">
          <label className="flex cursor-pointer items-center gap-2 text-white/65">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border-white/25 bg-white/10 accent-gold"
            />
            {t.auth.rememberMe}
          </label>
          <Link href="/forgot-password" className="font-medium text-gold transition-colors hover:text-gold-light">
            {t.auth.forgotPassword}
          </Link>
        </div>

        <AnimatePresence mode="wait">
          {(error || infoMessage || googleErrorMessage) && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-2 text-center text-sm"
            >
              {googleErrorMessage && <p className="text-coral">{googleErrorMessage}</p>}
              {infoMessage && <p className="text-white/75">{infoMessage}</p>}
              {error && <p className="text-coral">{error}</p>}
              {needsVerification && (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendStatus === "loading" || resendStatus === "sent"}
                  className="font-medium text-gold hover:text-gold-light"
                >
                  {resendStatus === "loading"
                    ? t.auth.resendingVerification
                    : resendStatus === "sent"
                      ? t.auth.verificationResent
                      : t.auth.resendVerification}
                </button>
              )}
            </motion.div>
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
            ? t.auth.signingIn
            : status === "success"
              ? t.auth.welcomeBack
              : t.forms.signIn}
        </button>
      </form>

      <AuthDivider label={t.auth.orContinueWith} />
      <SocialLoginButtons remember={remember} returnUrl={searchParams.get("returnUrl")} />

      <div className="mt-4 space-y-2">
        <Link
          href="/signup"
          className="auth-btn-primary flex w-full items-center justify-center py-2.5 text-sm"
        >
          {t.auth.createAccount}
        </Link>
        <Link
          href="/contact?topic=supplier"
          className="auth-btn-outline flex w-full items-center justify-center py-2.5 text-sm"
        >
          {t.auth.becomeSupplier}
        </Link>
      </div>
    </AuthGlassCard>
  );
}

export function LoginExperience() {
  const t = useT();

  return (
    <AuthSplitLayout
      headline={t.auth.welcomeParadise}
      subtext={t.auth.loginSubtext}
      adminPortalLabel={t.auth.adminPortal}
      showVisualBrandLabel={false}
      visualTone="light"
    >
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>

      <div className="auth-mobile-sticky lg:hidden">
        <Link href="/signup" className="auth-btn-primary flex w-full items-center justify-center py-4">
          {t.auth.createAccount}
        </Link>
      </div>
    </AuthSplitLayout>
  );
}
