"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Compass, Loader2, ShieldCheck } from "lucide-react";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { AdminLoginBackground } from "@/components/admin/login/AdminLoginBackground";
import { AdminPasswordInput } from "@/components/admin/login/AdminPasswordInput";
import { adminLoginSchema } from "@/components/admin/login/schema";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useTraveller } from "@/components/traveller/TravellerProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" as const },
  }),
};

export function TravellerLoginExperience() {
  const router = useRouter();
  const { signIn, authenticated, ready } = useTraveller();
  const { theme } = useTheme();
  const toggleVariant = theme === "dark" ? "navy" : "light";

  useEffect(() => {
    if (ready && authenticated) router.replace("/traveller");
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

    const parsed = adminLoginSchema.safeParse({ email: email.trim(), password, remember });
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
      setFormError(result.error ?? "Invalid email or password.");
      setLoading(false);
      return;
    }
    router.push("/traveller");
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
              Your Journey
            </motion.p>
            <motion.h1 custom={1} variants={fadeUp} className="mt-4 font-serif text-3xl text-[var(--admin-text)] sm:text-4xl">
              Traveller Dashboard
            </motion.h1>
            <motion.p custom={2} variants={fadeUp} className="admin-login-subtitle mx-auto mt-3 max-w-sm text-sm">
              Bookings, trips, loyalty rewards, and concierge support — all in one place.
            </motion.p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="admin-login-card rounded-2xl p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10">
                <ShieldCheck className="h-5 w-5 text-gold" strokeWidth={1.5} />
              </span>
              <div>
                <p className="admin-text text-sm font-semibold">Secure sign in</p>
                <p className="admin-text-muted text-xs">Access your bookings &amp; trips</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
              <input type="text" name="fake_user" className="hidden" tabIndex={-1} aria-hidden />
              <input type="password" name="fake_pass" className="hidden" tabIndex={-1} aria-hidden />

              <div>
                <label htmlFor="mft-traveller-email" className="admin-login-label">Email</label>
                <input
                  id="mft-traveller-email"
                  name="mft_traveller_email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  data-lpignore="true"
                  data-1p-ignore="true"
                  readOnly
                  onFocus={(e) => { e.target.readOnly = false; }}
                  className={cn("admin-login-input", fieldErrors.email && "admin-login-input--error")}
                />
                {fieldErrors.email && <p className="mt-1.5 text-xs text-coral">{fieldErrors.email}</p>}
              </div>

              <AdminPasswordInput id="mft-traveller-password" label="Password" value={password} onChange={setPassword} error={fieldErrors.password} />

              <label className="admin-login-remember group flex cursor-pointer items-center gap-3 rounded-lg px-3.5 py-3">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 rounded border-[var(--admin-border)] accent-gold" />
                <span className="admin-login-remember-text text-sm">Remember this device</span>
              </label>

              <AnimatePresence mode="wait">
                {formError && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="alert" className="admin-login-error rounded-lg px-3.5 py-2.5 text-sm">
                    {formError}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button type="submit" disabled={loading} className={cn("auth-btn-primary flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold", loading && "opacity-85")}>
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? "Opening your dashboard…" : "Access My Journey"}
              </motion.button>
            </form>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-8 text-center">
            <Link href="/" className="admin-login-back-link inline-flex items-center gap-1.5 text-sm">
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to My Fiji Tour
            </Link>
          </motion.p>
        </div>
      </main>
    </div>
  );
}
