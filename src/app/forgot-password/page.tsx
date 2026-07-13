import type { Metadata } from "next";
import { ForgotPasswordExperience } from "@/components/auth/ForgotPasswordExperience";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your My Fiji Tour account password.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordExperience />;
}
