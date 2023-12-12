"use client";
import { ReactNode, createContext, useState } from "react";

const NoiseMapContext = createContext<[number[], (val: number[]) => void]>([
  [],
  () => null,
]);

export const NoiseMapProvider = ({ children }: { children: ReactNode }) => {
  const [noiseMap, setNoiseMap] = useState<number[]>([]);

  return (
    <NoiseMapContext.Provider value={[noiseMap, setNoiseMap]}>
      {children}
    </NoiseMapContext.Provider>
  );
};

export default NoiseMapContext;
