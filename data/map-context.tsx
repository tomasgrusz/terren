"use client";
import { ReactNode, createContext, useState } from "react";

export type Map = number[];

const MapContext = createContext({
  map: [] as Map,
  setMap: (val: Map) => null as unknown as void,
});

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [map, setMap] = useState<Map>([]);

  const context = {map, setMap};
  
  return (
    <MapContext.Provider value={context}>
      {children}
    </MapContext.Provider>
  );
};

export default MapContext;