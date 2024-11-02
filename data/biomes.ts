import { Color } from "three";
import { Tile } from "./mesh-context";

export type Biome = "water" | "desert" | "grassland" | "forest" | "mountain" | string;

export const WATER_LEVEL = 0.01;
export const WATER_COLOR: Color = new Color().setHSL(0.6, 1, 0.5);

export const BIOME_COLORS: Record<Biome, Color> = {
  water: WATER_COLOR,
  desert: new Color().setHSL(0.1, 1, 0.5),
  grassland: new Color().setHSL(0.3, 1, 0.5),
  forest: new Color().setColorName("forestgreen"),
  mountain: new Color().setHSL(0.7, 1, 0.5),
};

const BIOME_RANGES: Record<Biome, { temperature: [number, number]; humidity: [number, number], continentalness: [number, number] }> = {
  desert: { temperature: [0.75, 1], humidity: [0, 0.25], continentalness: [0.25, 1] },
  mountain: { temperature: [0, 0.35], humidity: [0.25, 1], continentalness: [0.35, 1] },
  forest: { temperature: [0.1, 0.6], humidity: [0.2, 1], continentalness: [0.35, 1] },
  grassland: { temperature: [0, 1], humidity: [0, 1], continentalness: [0.25, 1] },
  water: { temperature: [0, 1], humidity: [0, 1], continentalness: [0, 0.25] },
};

export const calculateBiome = (tile: Tile) => {
  const viableBiomes: Biome[] = [];
  Object.keys(BIOME_RANGES).forEach((biome) => {
    const { temperature, humidity, continentalness } = BIOME_RANGES[biome];
    if (
      tile.temperature >= temperature[0] &&
      tile.temperature <= temperature[1] &&
      tile.humidity >= humidity[0] &&
      tile.humidity <= humidity[1] &&
      tile.continentalness >= continentalness[0] &&
      tile.continentalness <= continentalness[1]
    ) {
      viableBiomes.push(biome as Biome);
    }
  });
  return viableBiomes ? viableBiomes[0] : "water";
};