import noiseToImage from "@/utils/noiseToImage";
import { useEffect, useRef } from "react";

const NoiseMapImage = ({
  noiseMap,
  color = false,
}: {
  noiseMap: number[];
  color?: boolean;
}) => {
  const size = Math.sqrt(noiseMap.length);
  const noiseMapRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!noiseMapRef.current || size === 0) {
      return;
    }
    const buffer = noiseToImage(noiseMap, color);
    const ctx = noiseMapRef.current.getContext("2d");
    noiseMapRef.current.width = size;
    noiseMapRef.current.height = size;
    const imgData = ctx?.createImageData(size, size);
    imgData?.data.set(buffer);
    if (imgData) {
      ctx?.putImageData(imgData, 0, 0);
    }
  }, [noiseMapRef, noiseMapRef.current, noiseMap]);

  return <canvas ref={noiseMapRef} className="rounded-md" />;
};

export default NoiseMapImage;
