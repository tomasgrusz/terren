"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./NoiseMapInput.module.scss";

type NoiseMapInputProps = {
  noiseMap: number[];
  setNoiseMap: (noise: number[]) => void;
};

const NoiseMapInput: React.FC<NoiseMapInputProps> = ({
  noiseMap,
  setNoiseMap,
}) => {
  const [noiseMapImg, setNoiseMapImg] = useState(null);
  const noiseMapRef = useRef<HTMLCanvasElement>(null);

  const fr = new FileReader();

  fr.onload = function () {
    const img = new Image();
    img.src = fr.result;

    if (img.width !== img.height) {
      alert(
        "Invalid noise map size! Make sure the image is square (e.g. 64x64)."
      );
      noiseMapRef.current.value = "";
      return;
    }

    setNoiseMapImg(img);
  };

  const updateImage = (e) => {
    fr.readAsDataURL(e.target.files[0]);

    return null;
  };

  useEffect(() => {
    if (!noiseMapImg || !noiseMapRef.current) {
      return;
    }
    const ctx = noiseMapRef.current?.getContext("2d");
    ctx?.drawImage(noiseMapImg, 0, 0);
    let noise = ctx?.getImageData(
      0,
      0,
      noiseMapImg.width,
      noiseMapImg.height
    ).data;
    noise = noise?.filter((value, i) => i % 4 === 0);
    noise = Array.prototype.slice.call(noise);
    noise = noise?.map((value) => value / 255);
    setNoiseMap(noise);
  }, [noiseMapRef, noiseMapRef.current, noiseMapImg]);

  useEffect(() => {
    console.log(noiseMap);
  }, [noiseMap]);

  return (
    <div className={styles.NoiseMapInput}>
      <label>{"Noise Map"}</label>
      <input
        type="file"
        id="noiseMap"
        name="Noise Map"
        accept="image/png, image/jpeg"
        multiple={false}
        onChange={updateImage}
      ></input>
      {noiseMapImg && <canvas ref={noiseMapRef} />}
    </div>
  );
};

export default NoiseMapInput;
