import type { Metadata } from "next";
import { staticPageSeo } from "@/lib/seo/pages";

export const metadata: Metadata = staticPageSeo.login;

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
