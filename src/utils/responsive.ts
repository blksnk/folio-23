export type Breakpoint = "mobile" | "tablet" | "default";

export const breakpoints: { [key in Breakpoint]: number } = {
  mobile: 650,
  tablet: 900,
  default: 1920,
};

type ResponsiveMap = {
  [k: string]: {
    mobile: number;
    tablet: number;
    default: number;
  };
};

export const responsiveMap: ResponsiveMap = {
  unit: {
    mobile: 12,
    tablet: 12,
    default: 12,
  },
  gridMarginX: {
    default: 44,
    tablet: 28,
    mobile: 9,
  },
  gridMarginY: {
    default: 36,
    tablet: 24,
    mobile: 12,
  },
  columns: {
    mobile: 12,
    tablet: 12,
    default: 12,
  },
  rows: {
    mobile: 12,
    tablet: 12,
    default: 12,
  },
  widthOffset: {
    mobile: 3,
    tablet: 3,
    default: 0,
  },
} as const;

interface ResponsiveValueMap<T = number> {
  mobile: T;
  tablet: T;
  default: T;
}

export const currentBreakPoint = (): Breakpoint => {
  if (typeof window === "undefined" || !window) {
    return "default";
  }
  const w = window.innerWidth;
  return w <= breakpoints.mobile
    ? "mobile"
    : w <= breakpoints.tablet
    ? "tablet"
    : "default";
};

export const unit = (b?: Breakpoint) =>
  responsiveMap.unit[b ?? currentBreakPoint()];
export const columns = (b?: Breakpoint) =>
  responsiveMap.columns[b ?? currentBreakPoint()];
export const rows = (b?: Breakpoint) =>
  responsiveMap.rows[b ?? currentBreakPoint()];

const gridMarginX = (b?: Breakpoint) =>
  responsiveMap.gridMarginX[b ?? currentBreakPoint()];

export const gridMarginY = (b?: Breakpoint) =>
  responsiveMap.gridMarginY[b ?? currentBreakPoint()];

export const cellWidth = (b?: Breakpoint) =>
  (window.innerWidth - gridMarginX(b)) / columns(b) - gridMarginX(b);
export const cellHeight = (b?: Breakpoint) =>
  (window.innerHeight - gridMarginY(b)) / rows(b) - gridMarginY(b);
export const cssUnit = (multiplier = 1, b?: Breakpoint) =>
  `calc(${unit(b)}px * ${multiplier})`;

export const cssGridMarginX = (multiplier = 1, b?: Breakpoint) =>
  `calc(${gridMarginX(b)}px * ${multiplier})`;
export const cssGridMarginY = (multiplier = 1, b?: Breakpoint) =>
  `calc(${gridMarginY(b)}px * ${multiplier})`;

export const cssCellWidthOld = (multiplier = 1, isPosition?: boolean) =>
  `calc(((100vw - ${cssGridMarginX()}) / ${columns()} - ${cssGridMarginX()}) * ${multiplier} + ${cssGridMarginX()} * ${Math.max(
    multiplier - 1,
    0
  )} ${isPosition && multiplier > 0 ? ` + ${cssGridMarginX()}` : ""})`;
export const cssCellHeightOld = (multiplier = 1, isPosition?: boolean) =>
  `calc(((var(--app-height) - ${cssGridMarginY()}) / ${rows()} - ${cssGridMarginY()}) * ${multiplier} + ${cssGridMarginY()} * ${Math.max(
    multiplier - 1,
    0
  )} ${isPosition && multiplier > 0 ? ` + ${cssGridMarginY()}` : ""})`;

export const cssCellWidth = (
  multiplier = 1,
  isPosition?: boolean,
  b?: Breakpoint
) => {
  return `calc( ( 100vw - ${cssGridMarginX(2, b)} ) / ${columns(
    b
  )} * ${multiplier} )`;
};

export const cssCellHeight = (
  multiplier = 1,
  isPosition?: boolean,
  b?: Breakpoint
) => {
  return `calc( ( var(--app-height) - ${cssGridMarginY(2, b)} ) / ${rows(
    b
  )} * ${multiplier} )`;
};

export const cssCellHeightMobile = (
  multiplier = 1,
  isPosition?: boolean,
  b?: Breakpoint
) => {
  return `calc( 100% / ${rows(b)} * ${multiplier} )`;
};

export const responsiveValue = <T = number>(
  values: ResponsiveValueMap<T>,
  breakpoint?: Breakpoint
): T => {
  return values[breakpoint ?? currentBreakPoint()];
};
