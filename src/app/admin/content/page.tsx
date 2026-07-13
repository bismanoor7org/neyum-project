import { redirect } from "next/navigation";

/** Legacy route — redirects to production CMS */
export default function LegacyContentPage() {
  redirect("/admin/cms");
}
