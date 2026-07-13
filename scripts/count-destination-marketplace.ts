import { experiences } from "../src/lib/content/experiences";
import { resorts } from "../src/lib/content/resorts";
import { deals } from "../src/lib/content/deals";
import {
  fillExperiences,
  fillPackageDeals,
  fillResorts,
} from "../src/lib/content/destination-marketplace-fill";
import { destinations } from "../src/lib/content/destinations";
import { marketplaceEntityMatchesDestination } from "../src/lib/destinations/location-match";

const slugs = destinations.map((d) => d.slug);
const allExps = [...experiences, ...fillExperiences];
const allStays = [...resorts, ...fillResorts];
const allPkgs = [
  ...deals.filter((d) => d.category === "Package Deals"),
  ...fillPackageDeals,
];

for (const slug of slugs) {
  const exps = allExps.filter((e) =>
    marketplaceEntityMatchesDestination({ location: e.location }, slug),
  );
  const stays = allStays.filter((r) =>
    marketplaceEntityMatchesDestination({ location: r.location }, slug),
  );
  const packages = allPkgs.filter((d) =>
    marketplaceEntityMatchesDestination(
      { location: d.location, destination: d.destination },
      slug,
    ),
  );
  const ok = exps.length >= 6 && stays.length >= 6 && packages.length >= 6;
  console.log(
    `${ok ? "OK" : "!!"} ${slug}: exp=${exps.length} stays=${stays.length} pkg=${packages.length}`,
  );
}
