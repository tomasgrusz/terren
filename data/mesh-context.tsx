"use client";
import { ReactNode, createContext, useEffect, useState } from "react";
import useTerrain, { TerrainSettings } from "@/hooks/useTerrain";
import terrain from "@/data/terrain.json";
import { Biome, calculateBiome, WATER_LEVEL } from "./biomes";

export type Tile = {
  value: number;
  water: boolean;
  continentalness: number;
  erosion: number;
  undulation: number;
  temperature: number;
  humidity: number;
  biome?: Biome;
};

export type TileMesh = Tile[];

const MeshContext = createContext({
  mesh: [] as TileMesh,
  setMesh: (val: TileMesh) => null as unknown as void,
  continentalness: {} as ReturnType<typeof useTerrain>,
  erosion: {} as ReturnType<typeof useTerrain>,
  undulation: {} as ReturnType<typeof useTerrain>,
  temperature: {} as ReturnType<typeof useTerrain>,
  humidity: {} as ReturnType<typeof useTerrain>,
});

export const MeshContextProvider = ({ children }: { children: ReactNode }) => {
  const [mesh, setMesh] = useState<TileMesh>([]);
  const continentalness = useTerrain(
    terrain.continentalness as TerrainSettings,
    0,
  );
  const erosion = useTerrain(terrain.erosion as TerrainSettings, 2560);
  const undulation = useTerrain(terrain.undulation as TerrainSettings, 5120);

  const temperature = useTerrain(terrain.temperature as TerrainSettings, 10000);
  const humidity = useTerrain(terrain.humidity as TerrainSettings, 100);

  useEffect(() => {
    setMesh(
      continentalness.map.map((c, i) => {
        const value =
          0.5 * c +
          0.3 * (0.5 - 2 * erosion.map[i]) +
          0.2 * (1 - 0.5 * erosion.map[i]) * undulation.map[i];
        const tile = {
          value,
          water: value <= WATER_LEVEL,
          continentalness: c,
          erosion: erosion.map[i],
          undulation: undulation.map[i],
          temperature: temperature.map[i],
          humidity: humidity.map[i],
        };
        return {
          ...tile,
          biome: calculateBiome(tile),
        };
      }),
    );
  }, [
    continentalness.map,
    erosion.map,
    undulation.map,
    temperature.map,
    humidity.map,
  ]);

  const context = {
    mesh,
    setMesh,
    continentalness,
    erosion,
    undulation,
    temperature,
    humidity,
  };

  return (
    <MeshContext.Provider value={context}>{children}</MeshContext.Provider>
  );
};

export default MeshContext;
