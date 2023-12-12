"use client";
import { UseFormRegister } from "react-hook-form";

import styles from "./Slider.module.scss";
import { Inputs } from "../Menu/Menu";

export type SliderProps = {
  min: number;
  max: number;
  defaultValue: number;
  id: keyof Inputs;
  label: string;
  step?: number;
  register: UseFormRegister<Inputs>;
  value: number;
};

const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 1,
  defaultValue = 0,
  id,
  label,
  step = 1,
  register,
  value,
}) => {
  return (
    <div className={styles.Slider}>
      <div className={styles.range}>
        <label>{label}</label>
        <label className={styles.value}>{value || defaultValue}</label>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        defaultValue={defaultValue}
        id={id}
        step={step}
        {...register(id)}
      />
      <div className={styles.range}>
        <label className={styles.min}>{min}</label>
        <label className={styles.max}>{max}</label>
      </div>
    </div>
  );
};

export default Slider;
