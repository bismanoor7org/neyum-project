import { permanentRedirect } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}

export default async function LegacyTourPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sp = await searchParams;
  const q = sp.preview ? "?preview=1" : "";
  permanentRedirect(`/tours/${slug}${q}`);
}
