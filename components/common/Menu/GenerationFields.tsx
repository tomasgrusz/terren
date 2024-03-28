"use client";
import { useContext } from "react";
import TerrainContext from "@/data/terrain";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const GenerationFields = () => {
  const { settings, updateSetting } = useContext(TerrainContext);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <Label>Seed</Label>
        <Slider
          defaultValue={[1]}
          min={1}
          max={Number.MAX_SAFE_INTEGER}
          step={1}
          onValueChange={(value) => updateSetting("seed", value[0])}
        />
        <Label>{settings.seed || 0}</Label>
      </div>
      <div className="flex flex-col gap-4">
        <Label>Size</Label>
        <Slider
          defaultValue={[16]}
          min={1}
          max={128}
          step={1}
          onValueCommit={(value) => updateSetting("size", value[0])}
        />
        <Label>{settings.size || 0}</Label>
      </div>
      <div className="flex flex-col gap-4">
        <Label>Maximum Height</Label>
        <Slider
          defaultValue={[2.5]}
          min={1.0}
          max={5.0}
          step={0.1}
          onValueChange={(value) => updateSetting("height", value[0])}
        />
        <Label>{settings.height || 0}</Label>
      </div>
    </div>
  );
};

export default GenerationFields;
