import {
  BufferAttribute,
  BufferGeometry,
  DoubleSide,
  MeshStandardMaterial,
  NormalBufferAttributes,
} from "three";
import { calculateMesh } from "./utils";
import { useContext, useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import SceneContext from "@/data/scene-context";
import { TileMesh } from "@/data/mesh-context";

type TileMap = {
  tiles: TileMesh;
  size: number;
  maxHeight: number;
  waterLevel: number;
};

const TileMap: React.FC<TileMap> = ({
  tiles = [],
  size = 10,
  maxHeight = 1,
  waterLevel = 0.2,
}) => {
  const mapSize = Math.sqrt(tiles.length);
  const width = size / Math.sqrt(tiles.length);

  const { gl, scene, camera } = useThree();
  const { setGL, setScene, setCamera } = useContext(SceneContext);

  useEffect(() => {
    if (gl) {
      setGL(gl);
    }
  }, [gl]);

  useEffect(() => {
    if (scene) {
      setScene(scene);
    }
  }, [scene]);

  useEffect(() => {
    if (camera) {
      setCamera(camera);
    }
  }, [camera]);

  const [mesh, updateMesh] = useState<
    [BufferGeometry<NormalBufferAttributes>, MeshStandardMaterial] | null
  >(null);

  useEffect(() => {
    const [vertices, baseVertices, indices, colors] = calculateMesh(
      tiles,
      mapSize,
      width,
      maxHeight,
      waterLevel,
    );
    const allVertices = new Float32Array([...vertices, ...baseVertices]);
    const geometry = new BufferGeometry();
    geometry.setIndex(indices);
    geometry.setAttribute(
      "color",
      new BufferAttribute(new Float32Array([...colors, ...colors]), 3),
    );
    geometry.setAttribute("position", new BufferAttribute(allVertices, 3));
    const material = new MeshStandardMaterial({
      side: DoubleSide,
      vertexColors: true,
      roughness: 0.5,
      metalness: 0,
    });
    updateMesh([geometry, material]);
  }, [tiles, size, maxHeight, waterLevel]);

  if (!mesh) {
    return null;
  }

  return (
    <mesh
      position={[-size / 2 + width / 2, 0, -size / 2 + width / 2]}
      geometry={mesh[0]}
      material={mesh[1]}
      receiveShadow
      castShadow
    ></mesh>
  );
};

export default TileMap;
