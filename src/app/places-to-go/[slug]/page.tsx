import { permanentRedirect } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function LegacyDestinationPage({ params }: PageProps) {
  const { slug } = await params;
  permanentRedirect(`/destinations/${slug}`);
}
