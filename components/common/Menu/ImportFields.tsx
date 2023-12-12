import { UseFormRegister, UseFormWatch } from "react-hook-form";
import NoiseMapInput from "../NoiseMap/NoiseMapInput";
import { Inputs } from "./Menu";
import { useContext } from "react";
import NoiseMapContext from "../NoiseMap/NoiseMapContext";
import styles from "./Menu.module.scss";
import NoiseMapImage from "../NoiseMap/NoiseMapImage";

export type ImportFieldsProps = {
  register: UseFormRegister<Inputs>;
  watch: UseFormWatch<Inputs>;
};

const ImportFields: React.FC<ImportFieldsProps> = ({ register, watch }) => {
  const [noiseMap, setNoiseMap] = useContext(NoiseMapContext);

  return (
    <>
      <NoiseMapInput noiseMap={noiseMap} setNoiseMap={setNoiseMap} />
      <NoiseMapImage noiseMap={noiseMap} color />
    </>
  );
};

export default ImportFields;
