export type DecorSide = "left" | "right";

const PAGE_DECOR_START: Record<string, DecorSide> = {
  "/": "left",
  "/destinations": "right",
  "/tours": "left",
  "/places-to-go": "right",
  "/things-to-do": "left",
  "/places-to-stay": "right",
  "/things-to-know": "left",
  "/faq": "right",
  "/events": "left",
  "/itineraries": "right",
  "/deals-and-offers": "left",
};

export function getPageDecorStart(href?: string): DecorSide {
  return PAGE_DECOR_START[href ?? "/"] ?? "left";
}
