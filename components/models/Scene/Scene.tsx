"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

import styles from "./Scene.module.scss";
import TileMesh from "../tile/TileMesh";
import { useContext } from "react";
import SettingsContext from "@/data/settings-context";
import MapContext from "@/data/map-context";
import Light from "../lights/Light";

const Scene = () => {
  const { height } = useContext(SettingsContext);
  const { map } = useContext(MapContext);

  return (
    <Canvas className={styles.Canvas} shadows>
      <TileMesh tiles={map} size={10} maxHeight={height} />
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
