"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

import styles from "./Scene.module.scss";
import TileMesh from "../tile/TileMesh";
import { useContext } from "react";
import SettingsContext from "@/data/settings-context";
import Light from "../lights/Light";
import MeshContext from "@/data/mesh-context";

const Scene = () => {
  const { height, waterLevel } = useContext(SettingsContext);
  const { mesh } = useContext(MeshContext);

  return (
    <Canvas className={styles.Canvas} shadows>
      <TileMesh
        tiles={mesh}
        size={10}
        maxHeight={height}
        waterLevel={waterLevel}
      />
      <Light />
      <PerspectiveCamera makeDefault position={[0, 20, 0]} />
      <OrbitControls
        autoRotate
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 4}
        enablePan={false}
      />
    </Canvas>
  );
};

export default Scene;
