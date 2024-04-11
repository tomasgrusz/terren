import MapContext from "@/data/map-context";
import NoiseMapInput from "../NoiseMap/NoiseMapInput";
import { useContext } from "react";

const ImportFields = () => {
  const { setMap } = useContext(MapContext);

  return (
    <div className="flex flex-col gap-4">
      <NoiseMapInput setNoiseMap={setMap} />
    </div>
  );
};

export default ImportFields;
