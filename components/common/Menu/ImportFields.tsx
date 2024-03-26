import NoiseMapInput from "../NoiseMap/NoiseMapInput";
import { useContext } from "react";
import NoiseMapContext from "../NoiseMap/NoiseMapContext";
import NoiseMapImage from "../NoiseMap/NoiseMapImage";

const ImportFields = () => {
  const [noiseMap, setNoiseMap] = useContext(NoiseMapContext);

  return (
    <div className="flex flex-col gap-4">
      <NoiseMapInput setNoiseMap={setNoiseMap} />
      <NoiseMapImage noiseMap={noiseMap} color />
    </div>
  );
};

export default ImportFields;
