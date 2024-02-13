import hslToRgb from "../hslToRgb";

const noiseToImage = (noise: number[], color: boolean) => {
  const size = Math.sqrt(noise.length);

  if (size !== Math.sqrt(noise.length) || size === 0) {
    return [];
  }

  const buffer = new Uint8ClampedArray(size * size * 4);

  for(let y = 0; y < size; y++) {
    for(let x = 0; x < size; x++) {
      const pos = (y * size + x) * 4; // position in buffer based on x and y
      const noiseValue = noise[y * size + x];
      if (color) {
        const [r,g,b] = hslToRgb((1 - noiseValue) * (100 / 255), 1, 0.5);
        buffer[pos  ] = r; // R value [0, 255]
        buffer[pos+1] = g; // G value
        buffer[pos+2] = b; // B value
        buffer[pos+3] = 255; // alpha channel
      } else {
        buffer[pos  ] = noiseValue * 255; // R value [0, 255]
        buffer[pos+1] = noiseValue * 255; // G value
        buffer[pos+2] = noiseValue * 255; // B value
        buffer[pos+3] = 255; // alpha channel
      }
    }
  }

  return buffer;
};

export default noiseToImage;