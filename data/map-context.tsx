"use client";
import { ReactNode, createContext, useEffect, useState } from "react";
import { Map } from "@/types/map";
import useTerrain, { TerrainSettings } from "@/hooks/useTerrain";
import terrain from "@/data/terrain.json";

const MapContext = createContext({
  map: [] as Map,
  setMap: (val: Map) => null as unknown as void,
  continentalness: {} as ReturnType<typeof useTerrain>,
  erosion: {} as ReturnType<typeof useTerrain>,
  undulation: {} as ReturnType<typeof useTerrain>,
});

export const MapContextProvider = ({ children }: { children: ReactNode }) => {
  const [map, setMap] = useState<Map>([]);
  const continentalness = useTerrain(
    terrain.continentalness as TerrainSettings
  );
  const erosion = useTerrain(terrain.erosion as TerrainSettings);
  const undulation = useTerrain(terrain.undulation as TerrainSettings);

  useEffect(() => {
    setMap(
      continentalness.map.map(
        (val, i) => val * erosion.map[i] * undulation.map[i]
      )
    );
  }, [continentalness.map, erosion.map, undulation.map]);

  const context = { map, setMap, continentalness, erosion, undulation };

  return <MapContext.Provider value={context}>{children}</MapContext.Provider>;
};

export default MapContext;
