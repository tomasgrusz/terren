import Maps from "@/components/common/Maps/Maps";
import Menu from "@/components/common/Menu";
import GithubMessage from "@/components/GithubMessage";
import Scene from "@/components/models/Scene";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Home() {
  return (
    <main className="h-lvh">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={70}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={70}>
              <Scene />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel
              defaultSize={30}
              minSize={5}
              maxSize={30}
              className="overflow-x-auto"
            >
              <Maps />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={20} minSize={20} maxSize={50}>
          <Menu />
        </ResizablePanel>
      </ResizablePanelGroup>
      <GithubMessage />
    </main>
  );
}
