import { createVectorField, perlin } from "@/utils/perlin";
import seedrandom from "seedrandom";
const { alea } = seedrandom;

export type Octaves = 1 | 2 | 3 | 4 | 5;

const createGrids = (maxSize: number, octaves: Octaves, seed: number) => {
  if (octaves === 1) {
    const random = alea(seed.toString());
    return [createVectorField(maxSize, random)];
  } else {
    return Array.from({ length: octaves }, (_, i) =>
      createVectorField(maxSize, alea((seed + i).toString())),
    );
  }
};

const usePerlin = (seed: number, maxSize: number, octaves?: Octaves) => {
  const grid = createGrids(maxSize, octaves || 1, seed);

  const getValue = (x: number, y: number) => {
    const result = grid
      .map((g) => (perlin(x, y, g) + 1.0) / 2)
      .reduce((a, b) => a + b, 0);
    return result;
  };

  const getValues = (size: number, frequency?: number) => {
    let perlinArray = [];

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const _frequency = frequency || 0.1;
        // get the results of each octave
        const results = grid.map(
          (g, index) =>
            (perlin(
              // double the frequency for each octave
              j * _frequency * 2 ** index,
              i * _frequency * 2 ** index,
              g,
            ) +
              1.0) /
            2,
        );
        let d = 0;
        // add the results of each octave, but halve the amplitude for each consecutive octave
        for (let i = 0; i < results.length; i++) {
          d +=
            i + 1 === results.length
              ? results[i] / 2 ** i // last octave should have amplitude of previous octave
              : results[i] / 2 ** (i + 1);
        }
        perlinArray.push(d);
      }
    }
    const max = Math.max(...perlinArray);
    const min = Math.min(...perlinArray);
    perlinArray = perlinArray.map((value) => (value - min) / (max - min));

    return perlinArray;
  };

  return { getValue, getValues };
};

export default usePerlin;
