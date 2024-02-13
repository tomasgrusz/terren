import { alea } from "seedrandom";
import { createNoise2D } from "simplex-noise";

const simplexNoise = (size: number, seed: number) => {
  const arng = alea(seed.toString());
  const simplex = createNoise2D(arng);
  const simplexArray = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      simplexArray.push((simplex(j * 0.1, i * 0.1) + 1.0) / 2);
    }
  }

  return simplexArray;
};

export default simplexNoise;