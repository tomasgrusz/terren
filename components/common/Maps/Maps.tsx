"use client";
import { useContext } from "react";
import NoiseMapContext from "../NoiseMap/NoiseMapContext";
import NoiseMapImage from "../NoiseMap/NoiseMapImage";
import styles from "./Maps.module.scss";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

const Maps = () => {
  const [noiseMap, setNoiseMap] = useContext(NoiseMapContext);
  return (
    <div className={styles.Maps}>
      <div>
        <Label>Terrain Noise</Label>
        {noiseMap && <NoiseMapImage noiseMap={noiseMap} color />}
      </div>
      <div>
        <Label>Temperature</Label>
        <Skeleton className={styles.skeleton} />
      </div>
      <div>
        <Label>Sea Level</Label>
        <Skeleton className={styles.skeleton} />
      </div>
      <div>
        <Label>Biome</Label>
        <Skeleton className={styles.skeleton} />
      </div>
      <div>
        <Label>River</Label>
        <Skeleton className={styles.skeleton} />
      </div>
    </div>
  );
};

export default Maps;
