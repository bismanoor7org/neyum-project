export interface ForecastDay {
  date: string;
  label: string;
  tempMax: number;
  tempMin: number;
  weatherCode: number;
  description: string;
  icon: string;
}

export interface LocationWeather {
  city: string;
  country: string;
  timezone: string;
  latitude: number;
  longitude: number;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  description: string;
  icon: string;
  sunrise: string;
  sunset: string;
  forecast: ForecastDay[];
}

export interface LocationSearchResult {
  city: string;
  country: string;
  timezone: string;
  latitude: number;
  longitude: number;
  admin?: string;
  population?: number;
  kind?: "country" | "city" | "airport" | "region" | "destination";
  iata?: string;
}

export interface TimeDifferenceInfo {
  userTimezone: string;
  userLabel: string;
  selectedTimezone: string;
  selectedLabel: string;
  userTime: string;
  selectedTime: string;
  differenceHours: number;
  differenceLabel: string;
  direction: "ahead" | "behind" | "same";
  bestTimeToContact: string;
}

export interface TravelInsight {
  title: string;
  body: string;
}

export interface WorldTimeWeatherData {
  location: LocationWeather;
  fetchedAt: string;
}

export type SearchActionResult =
  | { ok: true; data: LocationWeather }
  | { ok: false; error: string };

export interface FijiLiveStatus {
  temperature: number;
  description: string;
  icon: string;
  weatherCode: number;
  fetchedAt: string;
}
