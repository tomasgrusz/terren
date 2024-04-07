"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

import styles from "./Scene.module.scss";
import TileMap from "../Tile/TileMap";
import { useContext, useEffect, useState } from "react";
import TerrainContext from "@/data/terrain-context";
import { Map } from "@/types/map";
import SplineContext from "@/data/spline-context";

const Scene = () => {
  const { settings, map } = useContext(TerrainContext);
  const { translateMap } = useContext(SplineContext);
  const [tileMap, setTileMap] = useState<Map>([]);

  useEffect(() => {
    const translatedMap = translateMap(map);
    setTileMap(translatedMap);
  }, [map]);

  return (
    <>
      <Canvas className={styles.Canvas}>
        <TileMap tiles={tileMap} size={10} maxHeight={settings.height} />
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
