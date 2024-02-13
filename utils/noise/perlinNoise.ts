import PerlinNoise from "perlin-noise-2d";

const perlinNoise = (size: number, seed: number) => {
  const perlin = new PerlinNoise(size, size, seed);
  const perlinArray = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      perlinArray.push((perlin.perlin(j * 0.1, i * 0.1) + 1.0) / 2);
    }
  }

  return perlinArray;
};

export default perlinNoise;