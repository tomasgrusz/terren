"use client";
import { useContext, useEffect, useState } from "react";
import { Map } from "@/types/map";
import usePerlin, { Octaves } from "@/hooks/usePerlin";
import { spline as getSpline } from "@/utils/spline";
import { Spline } from "@/types/spline";
import SettingsContext from "@/data/settings-context";

// settings for the terrain
export type TerrainSettings = {
  octaves: Octaves;
  frequency: number;
  spline: Spline;
};

const MAX_MAP_SIZE = 128;

const useTerrain = (defaultSettings: TerrainSettings, seedIndex: number) => {
  const { seed, size } = useContext(SettingsContext);
  const [settings, setSettings] = useState<TerrainSettings>(defaultSettings);
  const updateSetting = (key: keyof TerrainSettings, val: any) => {
    setSettings({ ...settings, [key]: val });
  };
  const [map, setMap] = useState<Map>([]);

  const { getValues } = usePerlin(seed + seedIndex, MAX_MAP_SIZE, settings.octaves);

  // whenever the settings change, update the map
  useEffect(() => {
    const perlin = getValues(size, settings.frequency);
    const spline = getSpline(perlin, settings.spline);
    setMap(spline);
  }, [settings, size, seed]);

  return { settings, setSettings, updateSetting, map, setMap };
};

export default useTerrain;
