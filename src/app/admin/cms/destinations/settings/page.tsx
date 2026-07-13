import { PageHeader } from "@/components/admin/ui/AdminUi";
import { DestinationsPageSettingsForm } from "@/components/cms/forms/DestinationsPageSettingsForm";
import { CMS_ROUTES } from "@/lib/cms/public-routes";
import { DESTINATIONS_HUB_DEFAULTS } from "@/lib/cms/seed-destinations";
import { getHomepageSectionCmsByKey } from "@/server/services/cms/cms.service";

export default async function DestinationsPageSettingsPage() {
  const section = await getHomepageSectionCmsByKey(DESTINATIONS_HUB_DEFAULTS.key);
  const content = (section?.content ?? DESTINATIONS_HUB_DEFAULTS.content) as Record<
    string,
    string
  >;

  return (
    <>
      <PageHeader
        title="Destinations page"
        subtitle={`Hero copy and intro for ${CMS_ROUTES.destinations.index}`}
      />
      <DestinationsPageSettingsForm
        initial={{
          id: section?.id as string | undefined,
          eyebrow: content.eyebrow,
          title: content.title ?? (section?.title as string | undefined),
          subtitle: content.subtitle,
          status: (section?.status as "DRAFT" | "PUBLISHED" | undefined) ?? "PUBLISHED",
        }}
      />
    </>
  );
}
