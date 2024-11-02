import { BIOME_COLORS, WATER_LEVEL } from "@/data/biomes";
import { Tile, TileMesh } from "@/data/mesh-context";
import { Color } from "three";

const calculateTileVertices = (tile: Tile, tileIndex: number, mapSize: number, tileSize: number, maxHeight: number): number[] => {
  const row = Math.floor(tileIndex / mapSize);
  const column = tileIndex % mapSize;
  const height = !tile.water ? tile.value * maxHeight : WATER_LEVEL * maxHeight;
  const vertix1 = [row * tileSize, height, column * tileSize];
  const vertix2 = [row * tileSize + tileSize, height, column * tileSize];
  const vertix3 = [row * tileSize, height, column * tileSize + tileSize];
  const vertix4 = [
    row * tileSize + tileSize,
    height,
    column * tileSize + tileSize,
  ];
  return [vertix1, vertix2, vertix3, vertix4].flat(1);
};

const calculateTileBedVertices = (tileIndex: number, mapSize: number, tileSize: number): number[] => {
  const row = Math.floor(tileIndex / mapSize);
  const column = tileIndex % mapSize;
  const vertix1 = [row * tileSize, -1, column * tileSize];
  const vertix2 = [row * tileSize + tileSize, -1, column * tileSize];
  const vertix3 = [row * tileSize, -1, column * tileSize + tileSize];
  const vertix4 = [row * tileSize + tileSize, -1, column * tileSize + tileSize];
  return [vertix1, vertix2, vertix3, vertix4].flat(1);
};

const calculateTileIndices = (tileIndex: number, mapSize: number): number[] => {
  const tilesSize = mapSize * mapSize;
  const connectToNextTile = (tileIndex + 1) % mapSize === 0
    ? []
    : [
      tileIndex * 4 + 2,
      tileIndex * 4 + 3,
      (tileIndex + 1) * 4 + 1,
      tileIndex * 4 + 2,
      (tileIndex + 1) * 4 + 1,
      (tileIndex + 1) * 4,
    ];
  const connectToNextRowTile = tileIndex + mapSize >= tilesSize
    ? []
    : [
      (tileIndex + mapSize) * 4 + 0,
      tileIndex * 4 + 1,
      (tileIndex + mapSize) * 4 + 2,
      tileIndex * 4 + 3,
      tileIndex * 4 + 1,
      (tileIndex + mapSize) * 4 + 2,
    ];

  // add faces to base for tiles at the end of the row
  const rowEndFace = tileIndex + mapSize > tilesSize - 1
    ? [
      tileIndex * 4 + 1,
      tileIndex * 4 + 3,
      (tileIndex + tilesSize) * 4 + 1,
      tileIndex * 4 + 3,
      (tileIndex + tilesSize) * 4 + 3,
      (tileIndex + tilesSize) * 4 + 1,
    ]
    : [];

  // add faces to base for tiles at the start of the row
  const rowStartFace = tileIndex % mapSize == 0
    ? [
      tileIndex * 4 + 0,
      tileIndex * 4 + 1,
      (tileIndex + tilesSize) * 4 + 0,
      tileIndex * 4 + 1,
      (tileIndex + tilesSize) * 4 + 0,
      (tileIndex + tilesSize) * 4 + 1,
    ]
    : [];

  // add faces to base for tiles at the end of the column
  const columnEndFace = (tileIndex + 1) % mapSize == 0
    ? [
      tileIndex * 4 + 2,
      tileIndex * 4 + 3,
      (tileIndex + tilesSize) * 4 + 3,
      tileIndex * 4 + 2,
      (tileIndex + tilesSize) * 4 + 3,
      (tileIndex + tilesSize) * 4 + 2,
    ]
    : [];
    
  // add faces to base for tiles at the start of the column
  const columnStartFace = tileIndex < mapSize
    ? [
      tileIndex * 4 + 2,
      tileIndex * 4 + 0,
      (tileIndex + tilesSize) * 4 + 0,
      tileIndex * 4 + 2,
      (tileIndex + tilesSize) * 4 + 0,
      (tileIndex + tilesSize) * 4 + 2,
    ]
    : [];

  //   const meshBaseFace = [
  //     (tileIndex + tilesSize) * 4 + 0,
  //     (tileIndex + tilesSize) * 4 + 2,
  //     (tileIndex + tilesSize) * 4 + 1,
  //     (tileIndex + tilesSize) * 4 + 3,
  //     (tileIndex + tilesSize) * 4 + 2,
  //     (tileIndex + tilesSize) * 4 + 1,
  //   ];
          
  return [
    tileIndex * 4,
    tileIndex * 4 + 1,
    tileIndex * 4 + 2,
    tileIndex * 4 + 3,
    tileIndex * 4 + 1,
    tileIndex * 4 + 2,
    connectToNextTile,
    connectToNextRowTile,
    rowStartFace,
    rowEndFace,
    columnStartFace,
    columnEndFace,
  ].flat(1);
};

const calculateTileColors = (tile: Tile): number[] => {
  let _color = new Color();
  _color = tile.biome ? BIOME_COLORS[tile.biome] : new Color().setColorName("pink");
  return Array.from({ length: 4 }, () => [
    _color.r,
    _color.g,
    _color.b,
  ]).flat(1);
};

export const calculateMesh = (tiles: TileMesh, mapSize: number, tileSize: number, maxHeight: number): [number[], number[], number[], number[]] => {
  const _vertices: number[][] = [];
  const _baseVertices: number[][] = [];
  const _indices: number[][] = [];
  const _colors: number[][] = [];

  tiles.forEach((tile, i) => {
    _vertices.push(calculateTileVertices(tile, i, mapSize, tileSize, maxHeight));
    _baseVertices.push(calculateTileBedVertices(i, mapSize, tileSize));
    _indices.push(calculateTileIndices(i, mapSize));
    _colors.push(calculateTileColors(tile));
  });

  const vertices = _vertices.flat(1);
  const baseVertices = _baseVertices.flat(1);
  const indices = _indices.flat(1);
  const colors = _colors.flat(1);

  return [vertices, baseVertices, indices, colors];
};