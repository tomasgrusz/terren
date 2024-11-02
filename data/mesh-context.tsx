"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import useTerrain, { TerrainSettings } from "@/hooks/useTerrain";
import terrain from "@/data/terrain.json";
import SettingsContext from "./settings-context";

export type Tile = {
  value: number;
  water: boolean;
  continentalness: number;
  erosion: number;
  undulation: number;
};

export type TileMesh = Tile[];

const MeshContext = createContext({
  mesh: [] as TileMesh,
  setMesh: (val: TileMesh) => null as unknown as void,
  continentalness: {} as ReturnType<typeof useTerrain>,
  erosion: {} as ReturnType<typeof useTerrain>,
  undulation: {} as ReturnType<typeof useTerrain>,
});

export const MeshContextProvider = ({ children }: { children: ReactNode }) => {
  const [mesh, setMesh] = useState<TileMesh>([]);
  const continentalness = useTerrain(
    terrain.continentalness as TerrainSettings,
  );
  const erosion = useTerrain(terrain.erosion as TerrainSettings);
  const undulation = useTerrain(terrain.undulation as TerrainSettings);

  const { waterLevel } = useContext(SettingsContext);

  useEffect(() => {
    setMesh(
      continentalness.map.map((c, i) => {
        const value = c * erosion.map[i] * undulation.map[i];
        return {
          value,
          water: value <= waterLevel,
          continentalness: c,
          erosion: erosion.map[i],
          undulation: undulation.map[i],
        };
      }),
    );
  }, [continentalness.map, erosion.map, undulation.map, waterLevel]);

  const context = {
    mesh,
    setMesh,
    continentalness,
    erosion,
    undulation,
  };

  return (
    <MeshContext.Provider value={context}>{children}</MeshContext.Provider>
  );
};

export default MeshContext;
