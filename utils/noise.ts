import perlinNoise from "./perlinNoise";
import simplexNoise from "./simplexNoise";
import staticNoise from "./staticNoise";

type NoiseOptions = "random" | "perlin" | "simplex";

const noise = (type: NoiseOptions, size: number, seed: number) => {
  if (type === "random") {
    return staticNoise(size, seed);
  }
  if (type === "perlin") {
    return perlinNoise(size, seed);
  }
  if (type === "simplex") {
    return simplexNoise(size, seed);
  }
  return [];
};

export default noise;