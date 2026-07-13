export type ItineraryDay = {
  id: string;
  title: string;
  location: string;
  activities: string;
  stay: string;
};

export type ItineraryDraft = {
  tripName: string;
  travellers: string;
  notes: string;
  days: ItineraryDay[];
  updatedAt: string;
};

export const ITINERARY_STORAGE_KEY = "neyum-itinerary-draft";

export function createEmptyDay(index: number): ItineraryDay {
  return {
    id: `day_${Math.random().toString(36).slice(2, 9)}`,
    title: `Day ${index}`,
    location: "",
    activities: "",
    stay: "",
  };
}

export const DEFAULT_ITINERARY: ItineraryDraft = {
  tripName: "My Fiji journey",
  travellers: "2 adults",
  notes: "",
  days: [createEmptyDay(1), createEmptyDay(2), createEmptyDay(3)],
  updatedAt: new Date().toISOString(),
};

export function formatItineraryMessage(draft: ItineraryDraft): string {
  const lines = [
    "I'd like a bespoke Fiji itinerary designed from this outline:",
    `Trip: ${draft.tripName}`,
    `Travelers: ${draft.travellers}`,
  ];
  draft.days.forEach((day, i) => {
    lines.push("");
    lines.push(`Day ${i + 1}: ${day.title || `Day ${i + 1}`}`);
    if (day.location) lines.push(`  Location: ${day.location}`);
    if (day.activities) lines.push(`  Activities: ${day.activities}`);
    if (day.stay) lines.push(`  Stay: ${day.stay}`);
  });
  if (draft.notes.trim()) {
    lines.push("");
    lines.push(`Notes: ${draft.notes.trim()}`);
  }
  return lines.join("\n");
}
