import { Color } from "three";
import { Tile } from "./mesh-context";

// eslint-disable-next-line max-len
export type Biome = "ocean" | "sea" | "frozenRiver" | "river" | "mountains" | "swamp" | "forest" | "grasslands" | "savanna" | "rainforest" | "desert" | "snowyBeach" | "beach" | "taiga" | "snowlands" | "error";

export const WATER_LEVEL = 0.01;
export const WATER_COLOR: Color = new Color().setHSL(0.6, 1, 0.5);

export const BIOME_COLORS: Record<Biome, Color> = {
  ocean: new Color().setHSL(0.6, 1, 0.5),
  sea: new Color().setHSL(0.6, 1, 0.5),
  frozenRiver: new Color().setHSL(0.6, 1, 0.5),
  river: new Color().setHSL(0.6, 1, 0.5),
  mountains: new Color().setColorName("gray"),
  swamp: new Color().setColorName("khaki"),
  forest: new Color().setColorName("green"),
  grasslands: new Color().setColorName("lightgreen"),
  savanna: new Color().setColorName("orange"),
  rainforest: new Color().setColorName("turquoise"),
  desert: new Color().setColorName("yellow"),
  snowyBeach: new Color().setColorName("white"),
  beach: new Color().setColorName("sandybrown"),
  taiga: new Color().setColorName("darkgreen"),
  snowlands: new Color().setColorName("white"),
  error: new Color().setColorName("pink"),
};

const CONTINENTALNESS_BREAKPOINTS: Record<string, [number, number]>  = {
  ocean: [0, 0.25],
  sea: [0.25, 0.375],
  coast: [0.375, 0.425],
  lowland: [0.425, 0.525],
  midland: [0.525, 0.65],
  highland: [0.65, 1],
};

const EROSION_BREAKPOINTS: Record<string, [number, number]>  = {
  lowest: [0, 0.2],
  low: [0.2, 0.35],
  medium: [0.35, 0.65],
  high: [0.65, 0.8],
  highest: [0.8, 1]
};

const UNDULATION_BREAKPOINTS: Record<string, [number, number]>  = {
  valley: [0, 0.1],
  low: [0.1, 0.3],
  mid: [0.3, 0.75],
  high: [0.75, 0.9],
  peak: [0.9, 1],
};

const TEMPERATURE_BREAKPOINTS: Record<string, [number, number]>  = {
  polar: [0, 0.25],
  cold: [0.25, 0.45],
  temperate: [0.45, 0.6],
  warm: [0.6, 0.75],
  tropical: [0.75, 1],
};

const HUMIDITY_BREAKPOINTS: Record<string, [number, number]> = {
  arid: [0, 0.3],
  semiArid: [0.3, 0.45],
  moderate: [0.45, 0.55],
  semiHumid: [0.55, 0.65],
  humid: [0.65, 1],
};

type BiomeRange = {
    temperature?: [number, number];
    humidity?: [number, number];
    continentalness?: [number, number];
    erosion?: [number, number];
    undulation?: [number, number];
}

const BIOME: Record<Biome, BiomeRange> = {
  ocean: {
    continentalness: CONTINENTALNESS_BREAKPOINTS.ocean,
  },
  sea: {
    continentalness: CONTINENTALNESS_BREAKPOINTS.sea,
  },
  frozenRiver: {
    temperature: TEMPERATURE_BREAKPOINTS.polar,
    undulation: UNDULATION_BREAKPOINTS.valley,
    continentalness: [CONTINENTALNESS_BREAKPOINTS.coast[0], CONTINENTALNESS_BREAKPOINTS.midland[1]],
  },
  river: {
    undulation: UNDULATION_BREAKPOINTS.valley,
    continentalness: [CONTINENTALNESS_BREAKPOINTS.coast[0], CONTINENTALNESS_BREAKPOINTS.midland[1]],
  },
  mountains: {
    undulation: [UNDULATION_BREAKPOINTS.high[0], UNDULATION_BREAKPOINTS.peak[1]],
    continentalness: CONTINENTALNESS_BREAKPOINTS.highland,
    temperature: [TEMPERATURE_BREAKPOINTS.polar[0], TEMPERATURE_BREAKPOINTS.temperate[1]],
    erosion: [EROSION_BREAKPOINTS.lowest[0], EROSION_BREAKPOINTS.low[1]],
  },
  swamp: {
    temperature: TEMPERATURE_BREAKPOINTS.warm,
    humidity: HUMIDITY_BREAKPOINTS.humid,
  },
  forest: {
    temperature: [TEMPERATURE_BREAKPOINTS.cold[0], TEMPERATURE_BREAKPOINTS.temperate[1]],
    humidity: [HUMIDITY_BREAKPOINTS.moderate[0], HUMIDITY_BREAKPOINTS.humid[1]],
    erosion: [EROSION_BREAKPOINTS.medium[0], EROSION_BREAKPOINTS.highest[1]],
  },
  grasslands: {
    temperature: [TEMPERATURE_BREAKPOINTS.temperate[0], TEMPERATURE_BREAKPOINTS.warm[1]],
  },
  savanna: {
    temperature: TEMPERATURE_BREAKPOINTS.warm,
    humidity: [HUMIDITY_BREAKPOINTS.arid[0], HUMIDITY_BREAKPOINTS.semiArid[1]],
  },
  rainforest: {
    temperature: TEMPERATURE_BREAKPOINTS.tropical,
    humidity: [HUMIDITY_BREAKPOINTS.semiHumid[0], HUMIDITY_BREAKPOINTS.humid[1]],
  },
  desert: {
    temperature: TEMPERATURE_BREAKPOINTS.tropical,
  },
  snowyBeach: {
    temperature: [TEMPERATURE_BREAKPOINTS.polar[0], TEMPERATURE_BREAKPOINTS.cold[1]],
    continentalness: CONTINENTALNESS_BREAKPOINTS.coast,
  },
  beach: {
    continentalness: CONTINENTALNESS_BREAKPOINTS.coast,
  },
  taiga: {
    temperature: TEMPERATURE_BREAKPOINTS.cold,
    humidity: [HUMIDITY_BREAKPOINTS.moderate[0], HUMIDITY_BREAKPOINTS.humid[1]],
    continentalness: [CONTINENTALNESS_BREAKPOINTS.midland[0], CONTINENTALNESS_BREAKPOINTS.highland[1]], 
  },
  snowlands: {
    temperature: [TEMPERATURE_BREAKPOINTS.polar[0], TEMPERATURE_BREAKPOINTS.cold[1]],
  },
  error: {}
};

export const calculateBiome = (tile: Tile) => {
  for (const [biome, rules] of Object.entries(BIOME)) {
    let isBiome = true;
    for (const [key, range] of Object.entries(rules)) {
      // @ts-expect-error - key is a string
      if (tile[key] >= range[0] && tile[key] < range[1]) {
        isBiome = isBiome && true;
      } else {
        isBiome = isBiome && false;
      }
    }
    if (isBiome) {
      return biome as Biome;
    }
  }
};