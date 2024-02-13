import { alea } from "seedrandom";

const staticNoise = (size: number, seed: number) => {
  const arng = alea(seed.toString());
  const staticArray = Array.from({ length: Math.pow(size, 2) }, () =>
    arng()
  );
  return staticArray;
};

export default staticNoise;