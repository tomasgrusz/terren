"use client";
import { useContext } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BsQuestion } from "react-icons/bs";
import SplineFields from "./SplineFields";
import SettingsContext from "@/data/settings-context";
import MeshContext from "@/data/mesh-context";

const TerrainSettings = () => {
  const map = useContext(MeshContext);
  const { currentEdit } = useContext(SettingsContext);

  return (
    <>
      {currentEdit && (
        <div className="flex flex-col gap-4">
          <Label className="ml-auto mr-auto">{currentEdit.toUpperCase()}</Label>
          <div className="flex items-center justify-between pr-2">
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Label className="cursor-help">
                    Perlin Octaves
                    <BsQuestion className="inline" />
                  </Label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Higher octaves lead to more variation but slower
                    performance.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Label>{map[currentEdit].settings.octaves || 0}</Label>
          </div>
          <Slider
            defaultValue={[1]}
            min={1}
            max={5}
            step={1}
            value={[map[currentEdit].settings.octaves]}
            onValueChange={(value) =>
              map[currentEdit].updateSetting("octaves", value[0])
            }
          />
          <SplineFields terrain={map[currentEdit]} />
        </div>
      )}
    </>
  );
};

export default TerrainSettings;
