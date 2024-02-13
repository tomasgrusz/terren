import perlinNoise from "./perlinNoise";
import simplexNoise from "./simplexNoise";
import staticNoise from "./staticNoise";

type NoiseOptions = "random" | "perlin" | "simplex";

const noise = (type: NoiseOptions, size: number, seed: number) => {
  switch (type) {
  case "random":
    return staticNoise(size, seed);
  case "perlin":
    return perlinNoise(size, seed);
  case "simplex":
    return simplexNoise(size, seed);
  default:
    return [];
  }
};

export default noise;