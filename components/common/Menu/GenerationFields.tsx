import NoiseMapImage from "../NoiseMap/NoiseMapImage";
import Slider from "../Slider";
import { useContext } from "react";
import NoiseMapContext from "../NoiseMap/NoiseMapContext";
import SettingsContext from "@/data/settings";

const GenerationFields = () => {
  const [noiseMap] = useContext(NoiseMapContext);
  const { settings, updateSetting } = useContext(SettingsContext);

  return (
    <>
      <Slider
        min={1}
        max={Number.MAX_SAFE_INTEGER}
        label="Seed"
        id="seed"
        value={settings.seed}
        setValue={updateSetting}
      />
      <Slider
        min={1}
        max={128}
        label="Size"
        id="size"
        value={settings.size}
        setValue={updateSetting}
      />
      <Slider
        min={1.0}
        max={5.0}
        step={0.1}
        label="Maximum Height"
        id="height"
        value={settings.height}
        setValue={updateSetting}
      />
      {noiseMap && <NoiseMapImage noiseMap={noiseMap} color />}
    </>
  );
};

export default GenerationFields;
