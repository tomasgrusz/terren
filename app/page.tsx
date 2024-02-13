import Menu from "@/components/common/Menu";
import { NoiseMapProvider } from "@/components/common/NoiseMap/NoiseMapContext";
import Scene from "@/components/models/Scene";
import { MapProvider } from "@/data/map-context";
import { SettingsProvider } from "@/data/settings";

export default function Home() {
  return (
    <main>
      <NoiseMapProvider>
        <SettingsProvider>
          <MapProvider>
            <Scene />
            <Menu />
          </MapProvider>
        </SettingsProvider>
      </NoiseMapProvider>
    </main>
  );
}
