"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, KeyRound, Loader2, ShieldCheck } from "lucide-react";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { AdminLoginBackground } from "@/components/admin/login/AdminLoginBackground";
import { AdminPasswordInput } from "@/components/admin/login/AdminPasswordInput";
import { supplierLoginRequestSchema } from "@/lib/validations/admin-auth";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useSupplier } from "@/components/supplier/SupplierProvider";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" as const },
  }),
};

export function SupplierLoginExperience() {
  const router = useRouter();
  const { signIn, authenticated, ready } = useSupplier();
  const { theme } = useTheme();
  const toggleVariant = theme === "dark" ? "navy" : "light";

  useEffect(() => {
    if (ready && authenticated) router.replace("/supplier");
  }, [ready, authenticated, router]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twoFactor, setTwoFactor] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError(null);
    setFieldErrors({});

    const parsed = supplierLoginRequestSchema.safeParse({
      email: email.trim(),
      password,
      twoFactor: twoFactor.trim(),
      remember,
    });

    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !errors[key]) errors[key] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    const result = await signIn(parsed.data);
    if (!result.ok) {
      setFormError(result.error ?? "Invalid email, password, or two-factor code.");
      setLoading(false);
      return;
    }
    router.push("/supplier");
  };

  return (
    <div className="admin-panel admin-login-shell auth-experience relative flex min-h-[100svh] flex-col">
      <AdminLoginBackground />
      <header className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-8">
        <BrandLogo variant="auth" tone="adaptive" />
        <ThemeToggle variant={toggleVariant} />
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 pb-10 sm:px-6">
        <div className="w-full max-w-[460px]">
          <motion.div className="mb-8 text-center" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }}>
            <motion.p custom={0} variants={fadeUp} className="admin-login-eyebrow inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.32em]">
              Partner Access
            </motion.p>
            <motion.h1 custom={1} variants={fadeUp} className="mt-5 font-serif text-3xl tracking-tight text-[var(--admin-text)] sm:text-4xl">
              Supplier Console
            </motion.h1>
            <motion.p custom={2} variants={fadeUp} className="mt-3 text-sm leading-relaxed text-[var(--admin-text-muted)]">
              Manage tours, bookings, payouts, and operations — enterprise partner portal.
            </motion.p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.55, ease: "easeOut", delay: 0.12 }} className="admin-login-card rounded-2xl p-7 sm:p-8">
            <div className="mb-7 flex items-center gap-3.5 border-b border-[var(--admin-border-soft)] pb-6">
              <div className="admin-login-shield flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                <ShieldCheck className="h-5 w-5 text-gold" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--admin-text)]">Secure partner sign in</p>
                <p className="text-xs text-[var(--admin-text-muted)]">Verified supplier access</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate autoComplete="off" data-lpignore="true" data-1p-ignore="true">
              <div className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0" aria-hidden>
                <input type="text" name="username" autoComplete="username" tabIndex={-1} defaultValue="" />
                <input type="password" name="password" autoComplete="current-password" tabIndex={-1} defaultValue="" />
              </div>
              <div>
                <label htmlFor="mft-supplier-email" className="admin-login-label">Email</label>
                <input id="mft-supplier-email" name="mft_supplier_email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" autoComplete="off" readOnly onFocus={(e) => { e.target.readOnly = false; }} className={cn("admin-login-input", fieldErrors.email && "admin-login-input--error")} />
                {fieldErrors.email && <p className="mt-1.5 text-xs text-coral">{fieldErrors.email}</p>}
              </div>
              <AdminPasswordInput id="mft-supplier-password" label="Password" value={password} onChange={setPassword} error={fieldErrors.password} />
              <div>
                <label htmlFor="mft-supplier-2fa" className="admin-login-label flex items-center gap-1.5">
                  <KeyRound className="h-3 w-3 text-gold/70" /> Two-factor code
                </label>
                <input id="mft-supplier-2fa" name="mft_supplier_2fa" type="text" inputMode="numeric" maxLength={6} value={twoFactor} onChange={(e) => setTwoFactor(e.target.value.replace(/\D/g, ""))} placeholder="6-digit code" autoComplete="off" readOnly onFocus={(e) => { e.target.readOnly = false; }} className={cn("admin-login-input font-mono tracking-[0.35em]", fieldErrors.twoFactor && "admin-login-input--error")} />
                {fieldErrors.twoFactor && <p className="mt-1.5 text-xs text-coral">{fieldErrors.twoFactor}</p>}
              </div>
              <label className="admin-login-remember group flex cursor-pointer items-center gap-3 rounded-lg px-3.5 py-3">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 rounded border-[var(--admin-border)] accent-gold" />
                <span className="admin-login-remember-text text-sm">Remember this device<span className="admin-login-remember-hint mt-0.5 block text-[11px]">Extends session only — credentials are never stored</span></span>
              </label>
              <AnimatePresence mode="wait">
                {formError && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="alert" className="admin-login-error rounded-lg px-3.5 py-2.5 text-sm">{formError}</motion.div>
                )}
              </AnimatePresence>
              <motion.button type="submit" disabled={loading} className={cn("auth-btn-primary relative flex w-full items-center justify-center gap-2.5 rounded-xl py-3.5 text-sm font-semibold", loading && "cursor-wait opacity-85")}>
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                <span>{loading ? "Opening partner dashboard…" : "Access Partner Dashboard"}</span>
              </motion.button>
            </form>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-8 text-center">
            <Link href="/" className="admin-login-back-link inline-flex items-center gap-1.5 text-sm">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to My Fiji Tour
            </Link>
          </motion.p>
        </div>
      </main>
    </div>
  );
}
