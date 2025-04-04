"use client";
import { useContext } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

import SettingsContext from "@/data/settings-context";
import { MAX_MAP_SIZE } from "@/data/constants";

const GeneralSettings = () => {
  const { seed, size, height, updateSetting } = useContext(SettingsContext);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between pr-2">
          <Label>Seed</Label>
          <Label>{seed || 0}</Label>
        </div>
        <Slider
          defaultValue={[1]}
          min={1}
          max={Number.MAX_SAFE_INTEGER}
          step={1}
          onValueChange={(value) => updateSetting("seed", value[0])}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between pr-2">
          <Label>Size</Label>
          <Label>{size || 0}</Label>
        </div>
        <Slider
          defaultValue={[32]}
          min={1}
          max={MAX_MAP_SIZE}
          step={1}
          onValueCommit={(value) => updateSetting("size", value[0])}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between pr-2">
          <Label>Maximum Height</Label>
          <Label>{height || 0}</Label>
        </div>
        <Slider
          defaultValue={[1.5]}
          min={1.0}
          max={2.5}
          step={0.1}
          onValueChange={(value) => updateSetting("height", value[0])}
        />
      </div>
    </>
  );
};

export default GeneralSettings;
