import Tile from "./Tile";
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
  const [tilesState, setTilesState] = useState<number[]>(tiles);
  const mapSize = Math.sqrt(tilesState.length);
  const width = size / Math.sqrt(tilesState.length);

  const getColor = (value: number) => `hsl(${(1 - value) * 120},100%,50%)`;

  useEffect(() => {
    setTilesState(tiles);
  }, [tiles]);

  return (
    <group>
      <group position={[-size / 2 + width / 2, 0, -size / 2 + width / 2]}>
        {tilesState.map((tile, i) => {
          const row = Math.floor(i / mapSize);
          const column = i % mapSize;
          return (
            <Tile
              key={`tile-${i}`}
              size={width}
              height={tile * maxHeight}
              x={row * width}
              y={0}
              z={column * width}
              color={getColor(tile)}
            />
          );
        })}
      </group>
      <mesh position={[0, -0.001, 0]}>
        <boxGeometry args={[size, 0.0001, size]} />
      </mesh>
    </group>
  );
};

export default TileMap;
