"use client";
import { ReactNode, createContext, useEffect, useState } from "react";
import { Map } from "@/types/map";
import noise from "@/utils/noise/noise";

// settings for the terrain
export type TerrainSettings = {
  size: number;
  height: number;
  seed: number;
};

// default settings for the terrain
const defaultSettings: TerrainSettings = {
  size: 16,
  height: 2.5,
  seed: 1,
};

const TerrainContext = createContext({
  settings: defaultSettings,
  setSettings: (val: TerrainSettings) => null as unknown as void,
  updateSetting: (key: keyof TerrainSettings, val: number) =>
    null as unknown as void,
  map: noise("perlin", defaultSettings.size, defaultSettings.seed) as Map,
  setMap: (val: Map) => null as unknown as void,
});

export const TerrainContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // set up terrain context
  const [settings, setSettings] = useState<TerrainSettings>(defaultSettings);
  const updateSetting = (key: keyof TerrainSettings, val: number) => {
    setSettings({ ...settings, [key]: val });
  };
  const [map, setMap] = useState<Map>([]);
  const context = { settings, setSettings, updateSetting, map, setMap };

  // whenever the settings change, update the map
  useEffect(() => {
    setMap(noise("perlin", settings.size, settings.seed));
  }, [settings]);

  return (
    <TerrainContext.Provider value={context}>
      {children}
    </TerrainContext.Provider>
  );
};

export default TerrainContext;
