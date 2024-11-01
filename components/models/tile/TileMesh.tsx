import {
  BufferAttribute,
  BufferGeometry,
  DoubleSide,
  MeshStandardMaterial,
  NormalBufferAttributes,
} from "three";
import { calculateMesh } from "./utils";
import { useEffect, useState } from "react";

type TileMap = {
  tiles: number[];
  size: number;
  maxHeight: number;
};

const TileMap: React.FC<TileMap> = ({
  tiles = [],
  size = 10,
  maxHeight = 1,
}) => {
  const mapSize = Math.sqrt(tiles.length);
  const width = size / Math.sqrt(tiles.length);

  const [mesh, updateMesh] = useState<
    [BufferGeometry<NormalBufferAttributes>, MeshStandardMaterial] | null
  >(null);

  useEffect(() => {
    const [vertices, baseVertices, indices, colors] = calculateMesh(
      tiles,
      mapSize,
      width,
      maxHeight,
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
  }, [tiles, size, maxHeight]);

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
