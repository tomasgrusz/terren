import { Color } from "three";

export type Tile = {
  size: number;
  height: number;
  x: number;
  y: number;
  z: number;
  color: Color | string;
};

const Tile: React.FC<Tile> = ({
  size = 0,
  height = 0,
  x = 0,
  y = 0,
  z = 0,
  color,
}) => {
  return (
    <group position={[x, y + height / 2, z]}>
      <mesh>
        <boxGeometry args={[size, height, size]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

export default Tile;
