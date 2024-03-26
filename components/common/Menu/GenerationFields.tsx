import NoiseMapImage from "../NoiseMap/NoiseMapImage";
// import Slider from "../Slider";
import { useContext } from "react";
import NoiseMapContext from "../NoiseMap/NoiseMapContext";
import SettingsContext from "@/data/settings";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const GenerationFields = () => {
  const [noiseMap] = useContext(NoiseMapContext);
  const { settings, updateSetting } = useContext(SettingsContext);

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
        <Label>{settings.seed}</Label>
      </div>
      <div className="flex flex-col gap-4">
        <Label>Size</Label>
        <Slider
          defaultValue={[10]}
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
          defaultValue={[1]}
          min={1.0}
          max={5.0}
          step={0.1}
          onValueChange={(value) => updateSetting("height", value[0])}
        />
        <Label>{settings.height}</Label>
      </div>
      {noiseMap && <NoiseMapImage noiseMap={noiseMap} color />}
    </div>
  );
};

export default GenerationFields;
