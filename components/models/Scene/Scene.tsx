"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

import styles from "./Scene.module.scss";
import TileMap from "../Tile/TileMap";
import NoiseMapContext from "@/components/common/NoiseMap/NoiseMapContext";
import { useContext, useEffect } from "react";
import SettingsContext from "@/data/settings";
import noise from "@/utils/noise/noise";

const Scene = () => {
  const [noiseMap, setNoiseMap] = useContext(NoiseMapContext);
  const {settings} = useContext(SettingsContext);

  useEffect(() => {
    setNoiseMap(noise("perlin", settings.size, settings.seed));
  }, [settings]);

  return (
    <>
      <Canvas className={styles.Canvas}>
        <TileMap tiles={noiseMap} size={10} maxHeight={settings.height} />
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
          enablePan={false}
        />
      </Canvas>
    </>
  );
};

export default Scene;
