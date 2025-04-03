"use client";
import { useContext, useEffect, useState } from "react";
import { Map } from "@/types/map";
import usePerlin, { Octaves } from "@/hooks/usePerlin";
import { spline as getSpline } from "@/utils/spline";
import { Spline } from "@/types/spline";
import SettingsContext from "@/data/settings-context";
import { MAX_MAP_SIZE } from "@/data/constants";

// settings for the terrain
export type TerrainSettings = {
  octaves: Octaves;
  frequency: number;
  spline: Spline;
};

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
    const perlin = async () => getValues(size, settings.frequency);
    const fetchData = async () => {
      // get the data from the api
      const data = await perlin();
      // convert the data to json
      const json = await getSpline(data, settings.spline);
  
      // set state with the result
      setMap(json);
    };
    fetchData();
  }, [settings, size, seed]);

  return { settings, setSettings, updateSetting, map, setMap };
};

export default useTerrain;
