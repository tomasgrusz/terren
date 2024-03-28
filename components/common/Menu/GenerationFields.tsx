"use client";
import { useContext } from "react";
import SettingsContext from "@/data/settings";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const GenerationFields = () => {
  const { settings, updateSetting } = useContext(SettingsContext);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <Label>Seed</Label>
        <Slider
          defaultValue={[settings.seed]}
          min={1}
          max={Number.MAX_SAFE_INTEGER}
          step={1}
          onValueChange={(value) => updateSetting("seed", value[0])}
        />
        <Label>{settings.seed}</Label>
      </div>
      <div className="flex flex-col gap-4">
        <Label>Size</Label>
        <Slider
          defaultValue={[settings.size]}
          min={1}
          max={128}
          step={1}
          onValueCommit={(value) => updateSetting("size", value[0])}
        />
        <Label>{settings.size}</Label>
      </div>
      <div className="flex flex-col gap-4">
        <Label>Maximum Height</Label>
        <Slider
          defaultValue={[settings.height]}
          min={1.0}
          max={5.0}
          step={0.1}
          onValueChange={(value) => updateSetting("height", value[0])}
        />
        <Label>{settings.height}</Label>
      </div>
    </div>
  );
};

export default GenerationFields;
