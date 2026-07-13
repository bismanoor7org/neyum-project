import { FijiWeatherClient } from "@/components/tools/fiji-weather/FijiWeatherClient";
import { FIJI_REGIONS } from "@/lib/tools/fiji-time/constants";
import { fijiWeatherMetadata } from "@/lib/tools/fiji-weather/seo";
import { getLocationWeather } from "@/server/services/world-time-weather.service";

export const metadata = fijiWeatherMetadata();

export const revalidate = 600;

export default async function FijiWeatherPage() {
  const regions = await Promise.all(
    FIJI_REGIONS.map((region) =>
      getLocationWeather(region.latitude, region.longitude, region.city, region.country),
    ),
  );

  return <FijiWeatherClient regions={regions} />;
}
