import { PageHeader } from "@/components/admin/ui/AdminUi";
import { BannerForm } from "@/components/cms/forms/BannerForm";

export default function NewBannerPage() {
  return (
    <>
      <PageHeader title="New banner" subtitle="Promotional banners for homepage and landing pages." />
      <BannerForm />
    </>
  );
}
