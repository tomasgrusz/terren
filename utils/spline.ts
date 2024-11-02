import { Map } from "@/types/map";
import {
  Spline,
  SplinePoint,
  HeightRange,
  SplineTransition,
} from "@/types/spline";
import { easeIn, easeInOut, easeOut } from "./ease";

const SplineEquation = {
  constant: (splinePoint: SplinePoint, height: HeightRange, value: number) =>
    height[0],
  linear: (splinePoint: SplinePoint, height: HeightRange, value: number) => {
    // progress of value between start and end
    const progress =
      (value - splinePoint[0]) / (splinePoint[1] - splinePoint[0]);
    // relative height between highest and lowest values
    const heightDiff = height[1] - height[0];

    return heightDiff * progress + height[0];
  },
  easeIn: (splinePoint: SplinePoint, height: HeightRange, value: number) => {
    // progress of value between start and end
    const progress =
      (value - splinePoint[0]) / (splinePoint[1] - splinePoint[0]);
    // quart easing (in)
    const easeInProgress = easeIn(progress);
    // relative height between highest and lowest values
    const heightDiff = height[1] - height[0];

    return easeInProgress * heightDiff + height[0];
  },
  easeOut: (splinePoint: SplinePoint, height: HeightRange, value: number) => {
    // progress of value between start and end
    const progress =
      (value - splinePoint[0]) / (splinePoint[1] - splinePoint[0]);
    // quart easing (out)
    const easeOutProgress = easeOut(progress);
    // relative height between highest and lowest values
    const heightDiff = height[1] - height[0];

    return easeOutProgress * heightDiff + height[0];
  },
  easeInOut: (splinePoint: SplinePoint, height: HeightRange, value: number) => {
    // progress of value between start and end
    const progress =
      (value - splinePoint[0]) / (splinePoint[1] - splinePoint[0]);
    // quart easing (in/out)
    const easeInOutProgress = easeInOut(progress);
    // relative height between highest and lowest values
    const heightDiff = height[1] - height[0];

    return easeInOutProgress * heightDiff + height[0];
  },
} as const satisfies Record<
  SplineTransition,
  (splinePoint: SplinePoint, height: HeightRange, value: number) => number
>;

export const splinePoint = (value: number, spline: Spline) => {
  const segment = spline.find(
    (segment) =>
      value >= segment.splinePoint[0] && value < segment.splinePoint[1],
  );

  if (!segment) {
    return value;
  }

  return SplineEquation[segment?.transition](
    segment.splinePoint,
    segment.height,
    value,
  );
};

export const spline = (map: Map, spline: Spline) =>
  map.map((point) => splinePoint(point, spline)) as Map;
