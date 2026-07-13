import { Suspense } from "react";
import { ContactPageClient } from "./ContactPageClient";

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactPageClient />
    </Suspense>
  );
}
