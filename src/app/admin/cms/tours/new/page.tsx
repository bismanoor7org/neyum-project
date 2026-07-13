import { PageHeader } from "@/components/admin/ui/AdminUi";
import { TourForm } from "@/components/cms/forms/TourForm";
import { CMS_ROUTES } from "@/lib/cms/public-routes";
import { listDestinationsForCms, listSuppliersForCms } from "@/server/services/cms/cms-platform.service";
import { listDestinationsCms } from "@/server/services/cms/cms.service";
import { isDatabaseConfigured } from "@/server/auth/local-admin-store";

async function loadDestinations() {
  if (isDatabaseConfigured()) return listDestinationsForCms();
  const result = await listDestinationsCms();
  return (result.items as { id: string; name: string; slug: string }[]).map((d) => ({
    id: d.id,
    name: d.name,
    slug: d.slug,
  }));
}

export default async function NewTourPage() {
  const [destinations, suppliers] = await Promise.all([
    loadDestinations(),
    listSuppliersForCms(),
  ]);

  return (
    <>
      <PageHeader title="New tour" subtitle={`Publishes to ${CMS_ROUTES.tours.detail("[slug]")} when approved.`} />
      <TourForm destinations={destinations} suppliers={suppliers} />
    </>
  );
}
