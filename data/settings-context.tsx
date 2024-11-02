"use client";
import { ReactNode, createContext, useState } from "react";

export type Variable = "continentalness" | "undulation" | "erosion" | null;

type Settings = {
  size: number;
  height: number;
  seed: number;
  currentEdit: Variable;
};

const defaultSettings: Settings = {
  size: 32,
  height: 1.5,
  seed: 1,
  currentEdit: "continentalness",
};

const SettingsContext = createContext({
  settings: defaultSettings as Settings,
  size: 32 as number,
  height: 1.5 as number,
  seed: 1 as number,
  currentEdit: null as Variable,
  setSettings: (settings: Settings) => null as unknown as void,
  updateSetting: (key: keyof Settings, val: any) => null as unknown as void,
});

export const SettingsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const updateSetting = (key: keyof Settings, val: number) => {
    setSettings({ ...settings, [key]: val });
  };

  const context = {
    settings,
    size: settings.size,
    height: settings.height,
    seed: settings.seed,
    currentEdit: settings.currentEdit,
    setSettings,
    updateSetting,
  };

  return (
    <SettingsContext.Provider value={context}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
