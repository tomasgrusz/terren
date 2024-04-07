"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

import styles from "./Scene.module.scss";
import TileMap from "../Tile/TileMap";
import { useContext } from "react";
import TerrainContext from "@/data/terrain-context";

const Scene = () => {
  const { settings, map } = useContext(TerrainContext);

  return (
    <>
      <Canvas className={styles.Canvas}>
        <TileMap tiles={map} size={10} maxHeight={settings.height} />
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
