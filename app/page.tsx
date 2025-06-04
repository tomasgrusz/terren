"use client";
import Maps from "@/components/common/Maps/Maps";
import Menu from "@/components/common/Menu";
import GithubMessage from "@/components/GithubMessage";
import Scene from "@/components/models/Scene";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SettingsContext from "@/data/settings-context";
import { FlaskConical, LandPlot } from "lucide-react";
import { useContext } from "react";

export default function Home() {
  const { biomesEnabled, updateSetting } = useContext(SettingsContext);
  return (
    <main className="h-lvh">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={70}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={70} className="relative">
              <Scene />
              <div className="absolute bottom-2 left-2">
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Toggle
                        pressed={biomesEnabled}
                        onPressedChange={(val) =>
                          updateSetting("biomesEnabled", val)
                        }
                      >
                        <LandPlot className="h-4 w-4" />
                      </Toggle>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p className="flex gap-1 text-center items-center">
                        <FlaskConical className="h-4 w-4" />
                        Enable <strong>biomes</strong> (experimental)
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
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
