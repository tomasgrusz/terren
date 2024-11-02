"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import styles from "./NoiseMapInput.module.scss";
import { Input } from "@/components/ui/input";

type NoiseMapInputProps = {
  setNoiseMap: (noise: number[]) => void;
};

const NoiseMapInput: React.FC<NoiseMapInputProps> = ({ setNoiseMap }) => {
  const [noiseMapImg, setNoiseMapImg] = useState<HTMLImageElement>();
  const noiseMapRef = useRef<HTMLInputElement>(null);

  const fr = new FileReader();

  fr.onload = function () {
    const img = new Image();
    img.src = fr.result?.toString() || "";
    img.onload = () => {
      if (
        (img.width !== img.height || img.width > 256) &&
        noiseMapRef.current
      ) {
        alert(
          "Invalid noise map size! Make sure the image is square and less than 256x256.",
        );
        noiseMapRef.current.value = "";
        return;
      }

      setNoiseMapImg(img);
    };
  };

  const updateImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      fr.readAsDataURL(e.target.files[0]);
    }

    return null;
  };

  useEffect(() => {
    if (!noiseMapImg) {
      return;
    }
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(noiseMapImg, 0, 0);
    const noiseData = ctx?.getImageData(
      0,
      0,
      noiseMapImg.width,
      noiseMapImg.height,
    ).data;
    const noise = Array.prototype.slice
      .call(noiseData)
      .filter((value, i) => i % 4 === 0)
      .map((value) => value / 255);
    setNoiseMap(noise);
  }, [noiseMapImg]);

  return (
    <div className={`flex flex-col gap-4 ${styles.NoiseMapInput}`}>
      <Label htmlFor="noiseMap">Noise Map</Label>
      <Input
        type="file"
        id="noiseMap"
        accept="image/png, image/jpeg"
        multiple={false}
        onChange={updateImage}
        ref={noiseMapRef}
      />
    </div>
  );
};

export default NoiseMapInput;
