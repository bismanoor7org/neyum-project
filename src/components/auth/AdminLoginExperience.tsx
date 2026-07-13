"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Loader2, Lock, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { useAdmin } from "@/components/admin/AdminProvider";
import { AdminLoginBackground } from "@/components/admin/login/AdminLoginBackground";
import { AdminPasswordInput } from "@/components/admin/login/AdminPasswordInput";
import { adminLoginSchema } from "@/components/admin/login/schema";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.42, ease: "easeOut" as const },
  }),
};

export function AdminLoginExperience() {
  const router = useRouter();
  const { signIn, authenticated, ready } = useAdmin();
  const { theme } = useTheme();
  const toggleVariant = theme === "dark" ? "navy" : "light";

  useEffect(() => {
    if (ready && authenticated) {
      router.replace("/admin");
    }
  }, [ready, authenticated, router]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError(null);
    setFieldErrors({});

    const parsed = adminLoginSchema.safeParse({
      email: email.trim(),
      password,
      remember,
    });

    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !errors[key]) {
          errors[key] = issue.message;
        }
      }
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    const result = await signIn({
      email: parsed.data.email,
      password: parsed.data.password,
      remember: parsed.data.remember,
    });

    if (!result.ok) {
      setFormError(result.error ?? "Invalid email or password.");
      setLoading(false);
      return;
    }

    router.push("/admin");
  };

  return (
    <div className="admin-panel admin-portal-login relative flex min-h-[100svh]">
      {/* Left — editorial brand panel (desktop) */}
      <aside className="relative hidden w-[52%] overflow-hidden lg:block xl:w-[55%]">
        <AdminLoginBackground />
      </aside>

      {/* Right — sign-in */}
      <div className="admin-portal-form-shell relative flex min-h-[100svh] flex-1 flex-col">
        <div className="admin-portal-form-bg pointer-events-none absolute inset-0" aria-hidden />

        <header className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <BrandLogo variant="auth" tone="adaptive" className="lg:hidden" />
          <div className="hidden lg:block" />
          <ThemeToggle variant={toggleVariant} />
        </header>

        <main className="relative z-10 flex flex-1 items-center justify-center px-5 pb-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-[420px]">
            <motion.div
              className="mb-8 text-center lg:text-left"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.07 } } }}
            >
              <motion.div custom={0} variants={fadeUp} className="mb-5 hidden lg:block">
                <BrandLogo variant="auth" tone="adaptive" />
              </motion.div>

              <motion.p
                custom={1}
                variants={fadeUp}
                className="admin-portal-eyebrow inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em]"
              >
                <Sparkles className="h-3 w-3" aria-hidden />
                Enterprise Access
              </motion.p>

              <motion.h1
                custom={2}
                variants={fadeUp}
                className="mt-5 font-serif text-[2rem] leading-tight tracking-tight text-[var(--admin-text)] sm:text-4xl"
              >
                Admin Console
              </motion.h1>
              <motion.p
                custom={3}
                variants={fadeUp}
                className="mt-3 text-sm leading-relaxed text-[var(--admin-text-muted)]"
              >
                Sign in to manage tours, bookings, suppliers and your luxury CMS.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="admin-portal-card rounded-[1.35rem] p-6 sm:p-8"
            >
              <div className="mb-6 flex items-center gap-3.5 border-b border-[var(--admin-border-soft)] pb-5">
                <div className="admin-portal-shield flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
                  <ShieldCheck className="h-5 w-5 text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--admin-text)]">Secure sign in</p>
                  <p className="text-xs text-[var(--admin-text-subtle)]">
                    Encrypted session · MFA-ready
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                noValidate
                autoComplete="off"
                data-lpignore="true"
                data-1p-ignore="true"
                data-form-type="other"
              >
                <div className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0" aria-hidden>
                  <input type="text" name="username" autoComplete="username" tabIndex={-1} defaultValue="" />
                  <input type="password" name="password" autoComplete="current-password" tabIndex={-1} defaultValue="" />
                </div>

                <div>
                  <label htmlFor="mft-admin-email" className="admin-portal-label">
                    Email
                  </label>
                  <div
                    className={cn(
                      "admin-portal-input-wrap",
                      fieldErrors.email && "admin-portal-input-wrap--error",
                    )}
                  >
                    <Mail className="admin-portal-input-icon" strokeWidth={1.5} aria-hidden />
                    <input
                      id="mft-admin-email"
                      name="mft_admin_email_field"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="none"
                      spellCheck={false}
                      data-lpignore="true"
                      data-1p-ignore="true"
                      readOnly
                      onFocus={(e) => {
                        e.target.readOnly = false;
                      }}
                      className="admin-portal-input"
                      aria-invalid={fieldErrors.email ? true : undefined}
                      aria-describedby={fieldErrors.email ? "mft-admin-email-error" : undefined}
                    />
                  </div>
                  {fieldErrors.email && (
                    <p id="mft-admin-email-error" className="mt-1.5 text-xs text-coral" role="alert">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <AdminPasswordInput
                  id="mft-admin-password"
                  label="Password"
                  value={password}
                  onChange={setPassword}
                  error={fieldErrors.password}
                  variant="portal"
                />

                <label className="admin-portal-remember group flex cursor-pointer items-start gap-3 rounded-xl px-3.5 py-3">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-[var(--admin-border)] accent-gold"
                  />
                  <span className="text-sm text-[var(--admin-text-muted)] transition-colors group-hover:text-[var(--admin-text)]">
                    Remember this device
                    <span className="mt-0.5 block text-[11px] text-[var(--admin-text-subtle)]">
                      Extends session only — credentials are never stored
                    </span>
                  </span>
                </label>

                <AnimatePresence mode="wait">
                  {formError && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -6, height: 0 }}
                      role="alert"
                      className="admin-portal-error overflow-hidden rounded-xl px-3.5 py-2.5 text-sm"
                    >
                      {formError}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={loading ? undefined : { scale: 1.01 }}
                  whileTap={loading ? undefined : { scale: 0.99 }}
                  className={cn(
                    "admin-portal-btn relative flex w-full items-center justify-center gap-2.5 rounded-xl py-3.5 text-sm font-semibold tracking-wide",
                    loading && "cursor-wait opacity-85",
                  )}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  ) : (
                    <Lock className="h-4 w-4" aria-hidden />
                  )}
                  <span>{loading ? "Accessing dashboard…" : "Access Dashboard"}</span>
                </motion.button>
              </form>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-8 text-center lg:text-left"
            >
              <Link
                href="/"
                className="admin-portal-back inline-flex items-center gap-1.5 text-sm transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to My Fiji Tour
              </Link>
            </motion.p>
          </div>
        </main>
      </div>
    </div>
  );
}
