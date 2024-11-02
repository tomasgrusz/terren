"use client";
import { useContext } from "react";
import NoiseMapImage from "../NoiseMap/NoiseMapImage";
import styles from "./Maps.module.scss";
import { Label } from "@/components/ui/label";
import SettingsContext from "@/data/settings-context";
import MeshContext from "@/data/mesh-context";

const Maps = () => {
  const { continentalness, erosion, undulation, temperature, humidity } =
    useContext(MeshContext);
  const { updateSetting } = useContext(SettingsContext);
  return (
    <div className={styles.Maps}>
      <div>
        <Label>Continentalness</Label>
        {continentalness && (
          <div
            className="w-full"
            onClick={() => updateSetting("currentEdit", "continentalness")}
          >
            <NoiseMapImage noiseMap={continentalness.map} color />
          </div>
        )}
      </div>
      <div>
        <Label>Erosion</Label>
        {erosion && (
          <div
            className="w-full"
            onClick={() => updateSetting("currentEdit", "erosion")}
          >
            <NoiseMapImage noiseMap={erosion.map} color />
          </div>
        )}
      </div>
      <div>
        <Label>Surface Undulation</Label>
        {undulation && (
          <div
            className="w-full"
            onClick={() => updateSetting("currentEdit", "undulation")}
          >
            <NoiseMapImage noiseMap={undulation.map} color />
          </div>
        )}
      </div>
      <div>
        <Label>Temperature</Label>
        {temperature && (
          <div
            className="w-full"
            onClick={() => updateSetting("currentEdit", "temperature")}
          >
            <NoiseMapImage noiseMap={temperature.map} color />
          </div>
        )}
      </div>
      <div>
        <Label>Humidity</Label>
        {humidity && (
          <div
            className="w-full"
            onClick={() => updateSetting("currentEdit", "humidity")}
          >
            <NoiseMapImage noiseMap={humidity.map} color />
          </div>
        )}
      </div>
    </div>
  );
};

export default Maps;
