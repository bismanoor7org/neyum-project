import { WorldTimeWeatherClient } from "@/components/tools/world-time-weather/WorldTimeWeatherClient";
import { worldTimeWeatherMetadata } from "@/lib/tools/world-time-weather/seo";
import { getFijiWeather } from "@/server/services/world-time-weather.service";

export const metadata = worldTimeWeatherMetadata();

export const revalidate = 600;

export default async function WorldTimeWeatherPage() {
  const fijiData = await getFijiWeather();
  return <WorldTimeWeatherClient fijiData={fijiData} />;
}
