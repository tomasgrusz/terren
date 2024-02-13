import NoiseMapInput from "../NoiseMap/NoiseMapInput";
import { useContext } from "react";
import NoiseMapContext from "../NoiseMap/NoiseMapContext";
import NoiseMapImage from "../NoiseMap/NoiseMapImage";

const ImportFields = () => {
  const [noiseMap, setNoiseMap] = useContext(NoiseMapContext);

  return (
    <>
      <NoiseMapInput setNoiseMap={setNoiseMap} />
      <NoiseMapImage noiseMap={noiseMap} color />
    </>
  );
};

export default ImportFields;
