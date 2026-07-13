/** WMO weather code → description + icon key (lucide-compatible) */
const WMO_MAP: Record<number, { description: string; icon: string }> = {
  0: { description: "Clear sky", icon: "sun" },
  1: { description: "Mainly clear", icon: "sun" },
  2: { description: "Partly cloudy", icon: "cloud-sun" },
  3: { description: "Overcast", icon: "cloud" },
  45: { description: "Foggy", icon: "cloud-fog" },
  48: { description: "Depositing rime fog", icon: "cloud-fog" },
  51: { description: "Light drizzle", icon: "cloud-drizzle" },
  53: { description: "Moderate drizzle", icon: "cloud-drizzle" },
  55: { description: "Dense drizzle", icon: "cloud-drizzle" },
  56: { description: "Freezing drizzle", icon: "cloud-drizzle" },
  57: { description: "Dense freezing drizzle", icon: "cloud-drizzle" },
  61: { description: "Slight rain", icon: "cloud-rain" },
  63: { description: "Moderate rain", icon: "cloud-rain" },
  65: { description: "Heavy rain", icon: "cloud-rain" },
  66: { description: "Freezing rain", icon: "cloud-rain" },
  67: { description: "Heavy freezing rain", icon: "cloud-rain" },
  71: { description: "Slight snow", icon: "cloud-snow" },
  73: { description: "Moderate snow", icon: "cloud-snow" },
  75: { description: "Heavy snow", icon: "cloud-snow" },
  77: { description: "Snow grains", icon: "cloud-snow" },
  80: { description: "Slight rain showers", icon: "cloud-rain" },
  81: { description: "Moderate rain showers", icon: "cloud-rain" },
  82: { description: "Violent rain showers", icon: "cloud-rain" },
  85: { description: "Slight snow showers", icon: "cloud-snow" },
  86: { description: "Heavy snow showers", icon: "cloud-snow" },
  95: { description: "Thunderstorm", icon: "cloud-lightning" },
  96: { description: "Thunderstorm with hail", icon: "cloud-lightning" },
  99: { description: "Thunderstorm with heavy hail", icon: "cloud-lightning" },
};

export function wmoToWeather(code: number): { description: string; icon: string } {
  return WMO_MAP[code] ?? { description: "Variable conditions", icon: "cloud" };
}

/** OpenWeather condition id → WMO-like icon key */
export function openWeatherToIcon(id: number): string {
  if (id >= 200 && id < 300) return "cloud-lightning";
  if (id >= 300 && id < 400) return "cloud-drizzle";
  if (id >= 500 && id < 600) return "cloud-rain";
  if (id >= 600 && id < 700) return "cloud-snow";
  if (id >= 700 && id < 800) return "cloud-fog";
  if (id === 800) return "sun";
  if (id > 800) return "cloud-sun";
  return "cloud";
}

/** Concierge-friendly label for the global live status bar */
export function friendlyWeatherLabel(description: string, icon: string): string {
  if (icon === "cloud-lightning") return "Storm";
  if (icon === "cloud-rain" || icon === "cloud-drizzle") return "Rain";
  if (icon === "cloud") return "Cloudy";
  if (icon === "cloud-sun") return "Partly Cloudy";
  if (icon === "sun") {
    return description.toLowerCase().includes("clear") ? "Clear" : "Sunny";
  }
  if (icon === "cloud-fog") return "Foggy";
  if (icon === "cloud-snow") return "Snow";
  return description;
}
