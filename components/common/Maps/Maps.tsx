"use client";
import { useContext } from "react";
import NoiseMapImage from "../NoiseMap/NoiseMapImage";
import styles from "./Maps.module.scss";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import TerrainContext from "@/data/terrain";

const Maps = () => {
  const { map } = useContext(TerrainContext);
  return (
    <div className={styles.Maps}>
      <div>
        <Label>Terrain Noise</Label>
        {map && <NoiseMapImage noiseMap={map} color />}
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
