import type { Metadata } from "next";
import { Suspense } from "react";
import { ResetPasswordExperience } from "@/components/auth/ResetPasswordExperience";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Choose a new password for your My Fiji Tour account.",
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordExperience />
    </Suspense>
  );
}
