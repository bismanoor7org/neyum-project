import Link from "next/link";
import { PageHeader } from "@/components/admin/ui/AdminUi";
import { DestinationForm } from "@/components/cms/forms/DestinationForm";
import { CMS_ROUTES } from "@/lib/cms/public-routes";

export default function NewDestinationPage() {
  return (
    <>
      <PageHeader
        title="New destination"
        subtitle={`Creates a live page at ${CMS_ROUTES.destinations.detail("[slug]")} when published.`}
      />
      <DestinationForm />
    </>
  );
}
