import { Button } from "@/components/ui/button";

import { SplineSegment } from "@/types/spline";
import SplineSegmentField from "./SplineSegment";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { BsQuestion, BsPlus } from "react-icons/bs";
import useTerrain from "@/hooks/useTerrain";

type SplineFieldsProps = {
  terrain: ReturnType<typeof useTerrain>;
};

const SplineFields: React.FC<SplineFieldsProps> = ({ terrain }) => {
  const { settings, updateSetting } = terrain;

  const addSplineSegment = () => {
    updateSetting("spline", [
      ...settings.spline,
      { splinePoint: [0, 0], height: [0, 1], transition: "linear" },
    ]);
  };

  const removeSplineSegment = (id: number) => {
    updateSetting("spline", [
      ...settings.spline.slice(0, id),
      ...settings.spline.slice(id + 1),
    ]);
  };

  const validateSegment = (segment: SplineSegment, id: number) => {
    const [start, end] = segment.splinePoint;
    const isInvalid = settings.spline.some((s, i) => {
      if (i === id) {
        return false;
      }
      const [sStart, sEnd] = s.splinePoint;
      if (start >= sEnd || end <= sStart) {
        return false;
      }
      return true;
    });

    return !isInvalid;
  };

  const updateSpline = (segment: SplineSegment, id: number) => {
    if (!validateSegment(segment, id)) {
      return false;
    }
    updateSetting("spline", [
      ...settings.spline.slice(0, id),
      segment,
      ...settings.spline.slice(id + 1),
    ]);
    return true;
  };

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Label className="cursor-help">
                Spline
                <BsQuestion className="inline" />
              </Label>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Define the height of the terrain at specific points. The terrain
                will interpolate between these points.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button variant="ghost" onClick={addSplineSegment}>
          <BsPlus className="text-[24px]" /> Add
        </Button>
      </div>
      <div className="flex gap-2 flex-wrap max-h-[300px] overflow-y-auto">
        {settings.spline.map((segment, i) => (
          <SplineSegmentField
            key={i}
            id={i}
            segment={segment}
            update={updateSpline}
            remove={removeSplineSegment}
          />
        ))}
      </div>
    </div>
  );
};

export default SplineFields;
