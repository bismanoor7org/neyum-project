import { PlacesToGoJsonLd } from "@/components/seo/PlacesToGoJsonLd";

export default function DestinationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PlacesToGoJsonLd />
      {children}
    </>
  );
}
