export const easeIn = (val: number) => val ** 4;

export const easeOut = (val: number) => 1 - Math.pow(1 - val, 4);

export const easeInOut = (val: number) =>
  val < 0.5 ? 8 * val * val * val * val : 1 - Math.pow(-2 * val + 2, 4) / 2;
