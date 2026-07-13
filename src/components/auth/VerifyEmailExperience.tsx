"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { AuthGlassCard, AuthSplitLayout } from "@/components/auth/AuthSplitLayout";
import { useT } from "@/components/providers/LocaleProvider";
import { images } from "@/lib/images";

export function VerifyEmailExperience() {
  const t = useT();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage(t.auth.verifyEmailFailed);
      return;
    }

    void (async () => {
      try {
        const res = await fetch("/api/v1/traveller/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = (await res.json()) as { error?: string };
        if (!res.ok) {
          setStatus("error");
          setMessage(data.error ?? t.auth.verifyEmailFailed);
          return;
        }
        setStatus("success");
        setMessage(t.auth.verifyEmailSuccess);
        window.setTimeout(() => router.push("/login"), 1800);
      } catch {
        setStatus("error");
        setMessage(t.auth.verifyEmailFailed);
      }
    })();
  }, [token, t.auth.verifyEmailFailed, t.auth.verifyEmailSuccess, router]);

  return (
    <AuthSplitLayout
      headline={t.auth.verifyEmailTitle}
      subtext={t.auth.verifyEmailSub}
      trustItems={[t.auth.secureLogin, t.auth.verifiedSuppliers, t.auth.premiumExperiences]}
      imageSrc={images.resortTokoriki}
      showAdminPortal={false}
    >
      <AuthGlassCard>
        <h2 className="text-center font-serif text-2xl tracking-tight text-white sm:text-3xl">
          {t.auth.verifyEmailTitle}
        </h2>

        <div className="mt-8 flex flex-col items-center gap-4 text-center">
          {status === "loading" && (
            <>
              <Loader2 className="h-8 w-8 animate-spin text-gold" />
              <p className="text-sm text-white/65">{t.auth.verifyingEmail}</p>
            </>
          )}
          {status === "success" && (
            <>
              <Check className="h-8 w-8 text-gold" strokeWidth={2.5} />
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-white/75">
                {message}
              </motion.p>
            </>
          )}
          {status === "error" && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-coral">
              {message}
            </motion.p>
          )}
        </div>

        <p className="mt-8 text-center text-sm text-white/55">
          <Link href="/login" className="font-semibold text-gold hover:text-gold-light">
            {t.auth.backToLogin}
          </Link>
        </p>
      </AuthGlassCard>
    </AuthSplitLayout>
  );
}
