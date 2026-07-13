import type { Metadata } from "next";
import { Suspense } from "react";
import { VerifyEmailExperience } from "@/components/auth/VerifyEmailExperience";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify your My Fiji Tour account email address.",
};

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailExperience />
    </Suspense>
  );
}
