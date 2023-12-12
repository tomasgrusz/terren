"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

import styles from "./Scene.module.scss";
import TileMap from "../Tile/TileMap";
import { useSearchParams } from "next/navigation";
import NoiseMapContext from "@/components/common/NoiseMap/NoiseMapContext";
import { useContext, useEffect } from "react";
import noise from "@/utils/noise";

const Scene = () => {
  const searchParams = useSearchParams();
  const seed = Number.parseInt(searchParams.get("seed") || "1");
  const size = Number.parseInt(searchParams.get("size") || "10");
  const height = Number.parseFloat(searchParams.get("height") || "1.0");

  const [noiseMap, setNoiseMap] = useContext(NoiseMapContext);

  useEffect(() => {
    setNoiseMap(noise("perlin", size, seed));
  }, []);

  return (
    <>
      <Canvas className={styles.Canvas}>
        <TileMap tiles={noiseMap} size={10} maxHeight={height} />
        <ambientLight intensity={1} />
        <spotLight intensity={20} position={[10, 0, 10]} />
        <spotLight intensity={20} position={[-10, 0, -10]} />
        <spotLight intensity={20} position={[10, 0, -10]} />
        <spotLight intensity={20} position={[-10, 0, 10]} />
        <PerspectiveCamera makeDefault position={[0, 20, 0]} />
        <OrbitControls
          autoRotate
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </>
  );
};

export default Scene;
