import type { Metadata } from "next";
import { SignupExperience } from "@/components/auth/SignupExperience";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Join My Fiji Tour — save trips, favourites and exclusive luxury offers.",
};

export default function SignupPage() {
  return <SignupExperience />;
}
