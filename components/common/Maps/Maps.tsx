"use client";
import { useContext } from "react";
import NoiseMapImage from "../NoiseMap/NoiseMapImage";
import styles from "./Maps.module.scss";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import TerrainContext from "@/data/terrain-context";

const Maps = () => {
  const { map: terrainMap } = useContext(TerrainContext);
  return (
    <div className={styles.Maps}>
      <div>
        <Label>Continentalness</Label>
        {terrainMap && <NoiseMapImage noiseMap={terrainMap} color />}
      </div>
      <div>
        <Label>Erosion</Label>
        <Skeleton className={styles.skeleton} />
      </div>
      <div>
        <Label>Surface Undulation</Label>
        <Skeleton className={styles.skeleton} />
      </div>
      <div>
        <Label>Temperature</Label>
        <Skeleton className={styles.skeleton} />
      </div>
      <div>
        <Label>Humidity</Label>
        <Skeleton className={styles.skeleton} />
      </div>
    </div>
  );
};

export default Maps;
