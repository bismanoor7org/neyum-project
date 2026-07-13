import { HeroHome } from "@/components/shared";
import type { HomeHeroConfig } from "@/server/services/public-content.service";

export function HomeHero({ hero }: { hero?: HomeHeroConfig | null }) {
  return <HeroHome hero={hero ?? undefined} />;
}
