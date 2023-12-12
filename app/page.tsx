import Menu from "@/components/common/Menu";
import { NoiseMapProvider } from "@/components/common/NoiseMap/NoiseMapContext";
import Scene from "@/components/models/Scene";

export default function Home() {
  return (
    <main>
      <NoiseMapProvider>
        <Scene />
        <Menu />
      </NoiseMapProvider>
    </main>
  );
}
