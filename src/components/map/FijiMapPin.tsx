import { cn } from "@/lib/utils";

interface FijiMapPinDotProps {
  active?: boolean;
  className?: string;
}

/** Map marker — dot only, no labels (moves with map zoom/pan) */
export function FijiMapPinDot({ active = false, className }: FijiMapPinDotProps) {
  return (
    <span
      className={cn(
        "block rounded-full transition-all duration-300",
        active
          ? "h-5 w-5 bg-gold shadow-[0_0_22px_rgba(212,175,55,0.8)] ring-2 ring-white/50"
          : "h-3.5 w-3.5 bg-white shadow-md ring-2 ring-white/90 hover:scale-110 hover:bg-gold",
        className,
      )}
    />
  );
}

/** DOM pin for MapLibre markers */
export function createMapPinElement(active: boolean, onClick: () => void) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className =
    "flex items-center justify-center border-0 bg-transparent p-0 cursor-pointer outline-none";
  btn.setAttribute("aria-hidden", "true");

  const dot = document.createElement("span");
  dot.className = active
    ? "block h-5 w-5 rounded-full bg-[#D4AF37] shadow-[0_0_22px_rgba(212,175,55,0.8)] ring-2 ring-white/50"
    : "block h-3.5 w-3.5 rounded-full bg-white shadow-md ring-2 ring-white/90 hover:bg-[#D4AF37]";
  btn.appendChild(dot);
  btn.onclick = (e) => {
    e.stopPropagation();
    onClick();
  };
  return btn;
}

/** SVG icon for Google Maps Marker */
export function makeGooglePinIcon(active: boolean): google.maps.Icon {
  const size = active ? 22 : 14;
  const fill = active ? "%23D4AF37" : "%23FFFFFF";
  const ring = active
    ? `<circle cx="11" cy="11" r="10" fill="none" stroke="%23D4AF37" stroke-width="1.5" opacity="0.5"/>`
    : "";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">${ring}<circle cx="11" cy="11" r="${active ? 6 : 5}" fill="${fill}" stroke="%230F3D3E" stroke-width="1.5"/></svg>`;

  return {
    url: `data:image/svg+xml,${svg}`,
    scaledSize: new google.maps.Size(size, size),
    anchor: new google.maps.Point(size / 2, size / 2),
  };
}
