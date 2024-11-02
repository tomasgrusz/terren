import { PRNG } from "seedrandom";

type Vector = [number, number];

const smoothstep = (x: number) => x * x * x * (x * (x * 6 - 15) + 10);
const interpolation = (a: number, b: number, t: number): number =>
  a + (b - a) * smoothstep(t);
const dotProduct = (a: Vector, b: Vector): number => a[0] * b[0] + a[1] * b[1];

const dotProductGrid = (
  x: number,
  y: number,
  cellX: number,
  cellY: number,
  grid: Vector[][],
) => {
  const vector: Vector = grid[cellY][cellX];
  const distVector: Vector = [x - cellX, y - cellY];

  return dotProduct(vector, distVector);
};

export const createRandomVector = (random: PRNG) => {
  const vectorBase = random() * Math.PI * 2;

  return [Math.cos(vectorBase), Math.sin(vectorBase)] as Vector;
};

export const createVectorField = (size: number, random: PRNG) => {
  return Array(size + 1)
    .fill([])
    .map(() =>
      Array(size + 1)
        .fill(0)
        .map(() => createRandomVector(random)),
    );
};

export const perlin = (x: number, y: number, grid: Vector[][]) => {
  const [x0, y0] = [Math.floor(x), Math.floor(y)];
  const [x1, y1] = [x0 + 1, y0 + 1];

  const corners: number[] = [
    dotProductGrid(x, y, x0, y0, grid),
    dotProductGrid(x, y, x1, y0, grid),
    dotProductGrid(x, y, x0, y1, grid),
    dotProductGrid(x, y, x1, y1, grid),
  ];

  return interpolation(
    interpolation(corners[0], corners[1], x - x0),
    interpolation(corners[2], corners[3], x - x0),
    y - y0,
  );
};
