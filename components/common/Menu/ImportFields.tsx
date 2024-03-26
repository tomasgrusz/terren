import NoiseMapInput from "../NoiseMap/NoiseMapInput";
import { useContext } from "react";
import NoiseMapContext from "../NoiseMap/NoiseMapContext";

const ImportFields = () => {
  const [noiseMap, setNoiseMap] = useContext(NoiseMapContext);

  return (
    <div className="flex flex-col gap-4">
      <NoiseMapInput setNoiseMap={setNoiseMap} />
    </div>
  );
};

export default ImportFields;
