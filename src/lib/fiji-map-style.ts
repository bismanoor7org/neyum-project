/** World map tiles — no city labels, full globe */
import type { StyleSpecification } from "maplibre-gl";

export const FIJI_WORLD_MAP_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    world: {
      type: "raster",
      tiles: [
        "https://a.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png",
        "https://b.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png",
        "https://c.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
      attribution: "© CARTO © OpenStreetMap",
    },
  },
  layers: [{ id: "world-base", type: "raster", source: "world" }],
};

/** Backup tiles if Carto is unreachable */
export const FIJI_OSM_RASTER_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "© OpenStreetMap",
    },
  },
  layers: [{ id: "osm-raster", type: "raster", source: "osm" }],
};

/** @deprecated use FIJI_WORLD_MAP_STYLE */
export const FIJI_CARTO_RASTER_STYLE = FIJI_WORLD_MAP_STYLE;
