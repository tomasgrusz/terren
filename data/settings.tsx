"use client";
import { ReactNode, createContext, useEffect, useState } from "react";

export type Settings = {
    size: number;
    height: number;
    seed: number;
};

const SettingsContext = createContext({
  settings: {
    size: 10,
    height: 1.0,
    seed: 1,
  } as Settings,
  setSettings: (val: Settings) => null as unknown as void,
  updateSetting: (key: keyof Settings, val: number) => null as unknown as void,
});

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings>({
    size: 10,
    height: 1.0,
    seed: 1,
  });

  const updateSetting = (key: keyof Settings, val: number) => {
    console.log(settings);
    setSettings({...settings, [key]: val});
  };

  useEffect(() => {
    console.log(settings);
  } , [settings]);

  const context = {settings, setSettings, updateSetting};
  
  return (
    <SettingsContext.Provider value={context}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;