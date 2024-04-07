import NoiseMapInput from "../NoiseMap/NoiseMapInput";
import { useContext } from "react";
import TerrainContext from "@/data/terrain-context";

const ImportFields = () => {
  const { setMap } = useContext(TerrainContext);

  return (
    <div className="flex flex-col gap-4">
      <NoiseMapInput setNoiseMap={setMap} />
    </div>
  );
};

export default ImportFields;
