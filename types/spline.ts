export type SplinePoint = [start: number, end: number];
export type HeightRange = [start: number, end: number];

export type SplineTransition =
  | "constant"
  | "linear"
  | "easeIn"
  | "easeOut"
  | "easeInOut";

export type SplineSegment = {
  splinePoint: SplinePoint;
  height: HeightRange;
  transition: SplineTransition;
};

export type Spline = SplineSegment[];
