import { UseFormRegister, UseFormWatch } from "react-hook-form";
import NoiseMapImage from "../NoiseMap/NoiseMapImage";
import Slider from "../Slider";
import { Inputs } from "./Menu";
import { useSearchParams } from "next/navigation";
import { useContext } from "react";
import NoiseMapContext from "../NoiseMap/NoiseMapContext";

export type GenerationFieldsProps = {
  register: UseFormRegister<Inputs>;
  watch: UseFormWatch<Inputs>;
};

const GenerationFields: React.FC<GenerationFieldsProps> = ({
  register,
  watch,
}) => {
  const searchParams = useSearchParams();
  const [noiseMap] = useContext(NoiseMapContext);

  return (
    <>
      <Slider
        min={1}
        max={Number.MAX_SAFE_INTEGER}
        label="Seed"
        id="seed"
        defaultValue={Number.parseInt(searchParams.get("seed") || "10")}
        register={register}
        value={watch("seed")}
      />
      <Slider
        min={1}
        max={128}
        label="Size"
        id="size"
        defaultValue={Number.parseInt(searchParams.get("size") || "10")}
        register={register}
        value={watch("size")}
      />
      <Slider
        min={1.0}
        max={5.0}
        step={0.1}
        label="Maximum Height"
        register={register}
        id="height"
        defaultValue={Number.parseFloat(searchParams.get("height") || "1.0")}
        value={watch("height")}
      />
      {noiseMap && <NoiseMapImage noiseMap={noiseMap} color />}
    </>
  );
};

export default GenerationFields;
