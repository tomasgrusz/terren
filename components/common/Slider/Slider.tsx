import styles from "./Slider.module.scss";
import { Settings } from "@/data/settings";

export type SliderProps = {
  min: number;
  max: number;
  id: keyof Settings;
  label: string;
  step?: number;
  value: number;
  setValue: (key: keyof Settings, value: number) => void;
};

const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 1,
  id,
  label,
  step = 1,
  value,
  setValue,
}) => {
  return (
    <div className={styles.Slider}>
      <div className={styles.range}>
        <label>{label}</label>
        <label className={styles.value}>{value}</label>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        defaultValue={value || 0}
        id={id}
        step={step}
        value={value}
        onChange={(e) => setValue && setValue(id, parseInt(e?.target?.value))}
      />
      <div className={styles.range}>
        <label className={styles.min}>{min}</label>
        <label className={styles.max}>{max}</label>
      </div>
    </div>
  );
};

export default Slider;
