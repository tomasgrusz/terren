import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MdDeleteOutline } from "react-icons/md";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import {
  SplinePoint,
  SplineSegment as Segment,
  SplineTransition,
} from "@/types/spline";
import { useEffect, useState } from "react";
import { BiSolidError } from "react-icons/bi";

type SplineSegmentProps = {
  update: (spline: Segment, id: number) => boolean;
  id: number;
  segment: Segment;
  remove: (id: number) => void;
};

const SplineSegment: React.FC<SplineSegmentProps> = ({
  update,
  id,
  segment,
  remove,
}) => {
  const [splinePoints, setSplinePoints] = useState<SplinePoint>([
    ...segment.splinePoint,
  ]);
  const [splineHeight, setSplineHeight] = useState<SplinePoint>([
    ...segment.height,
  ]);
  const [splineTransition, setSplineTransition] = useState<SplineTransition>(
    segment.transition,
  );
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const result = update(
      {
        splinePoint: splinePoints,
        height: splineHeight,
        transition: splineTransition,
      },
      id,
    );
    setIsValid(result);
  }, [splinePoints, splineHeight, splineTransition]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={isValid ? "secondary" : "destructive"}
          className="flex gap-2 items-center text-center"
        >
          [{segment.splinePoint[0]} - {segment.splinePoint[1]}]{" "}
          {isValid ? "" : <BiSolidError className="text-[16px]" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium leading-none">
                Spline Segment {id + 1}
              </h4>
              <Button
                className="p-0 m-0 h-8 w-8"
                variant="destructive"
                onClick={() => remove(id)}
              >
                <MdDeleteOutline className="text-[16px]" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Edit the spline segment settings.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-4">
              <Label>Spline Points</Label>
              {!isValid && (
                <Label className="text-red-500">
                  Error: Segment points must NOT be within the range of another
                  segment.
                </Label>
              )}
              <Slider
                defaultValue={splinePoints}
                min={0}
                max={1}
                step={0.01}
                minStepsBetweenThumbs={0.01}
                onValueCommit={(value) => {
                  setSplinePoints(value as SplinePoint);
                }}
              />
              <div className="flex justify-between">
                <Label>{splinePoints[0]}</Label>
                <Label>{splinePoints[1]}</Label>
              </div>
            </div>
            <div className="grid gap-4">
              <Label>Spline Height</Label>
              <Slider
                defaultValue={splineHeight}
                min={0}
                max={1}
                step={0.01}
                minStepsBetweenThumbs={0.01}
                onValueCommit={(value) => {
                  setSplineHeight(value as SplinePoint);
                }}
              />
              <div className="flex justify-between">
                <Label>{splineHeight[0]}</Label>
                <Label>{splineHeight[1]}</Label>
              </div>
            </div>
            <RadioGroup
              defaultValue={splineTransition}
              onValueChange={(value) =>
                setSplineTransition(value as SplineTransition)
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="constant" id="r1" />
                <Label htmlFor="r1">Constant</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="linear" id="r2" />
                <Label htmlFor="r2">Linear</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="easeIn" id="r3" />
                <Label htmlFor="r3">Ease-in</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="easeOut" id="r4" />
                <Label htmlFor="r4">Ease-out</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="easeInOut" id="r5" />
                <Label htmlFor="r5">Ease-in-out</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SplineSegment;
