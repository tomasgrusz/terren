"use client";

import { useContext } from "react";
import NoiseMapContext from "../NoiseMap/NoiseMapContext";
import NoiseMapImage from "../NoiseMap/NoiseMapImage";
import styles from "./Maps.module.scss";
import { Label } from "@/components/ui/label";

const Maps = () => {
  const [noiseMap, setNoiseMap] = useContext(NoiseMapContext);
  return (
    <div className={styles.Maps}>
      <div>
        <Label>Terrain Noise Map</Label>
        {noiseMap && <NoiseMapImage noiseMap={noiseMap} color />}
      </div>
    </div>
  );
};

export default Maps;
