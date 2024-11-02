"use client";
import { useContext } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

import SettingsContext from "@/data/settings-context";

const GeneralSettings = () => {
  const { seed, size, height, updateSetting } = useContext(SettingsContext);

  return (
    <>
      <div className="flex flex-col gap-4">
        <Label>Seed</Label>
        <Slider
          defaultValue={[1]}
          min={1}
          max={Number.MAX_SAFE_INTEGER}
          step={1}
          onValueChange={(value) => updateSetting("seed", value[0])}
        />
        <Label>{seed || 0}</Label>
      </div>
      <div className="flex flex-col gap-4">
        <Label>Size</Label>
        <Slider
          defaultValue={[32]}
          min={1}
          max={128}
          step={1}
          onValueCommit={(value) => updateSetting("size", value[0])}
        />
        <Label>{size || 0}</Label>
      </div>
      <div className="flex flex-col gap-4">
        <Label>Maximum Height</Label>
        <Slider
          defaultValue={[1.5]}
          min={1.0}
          max={2.5}
          step={0.1}
          onValueChange={(value) => updateSetting("height", value[0])}
        />
        <Label>{height || 0}</Label>
      </div>
    </>
  );
};

export default GeneralSettings;
