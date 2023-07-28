import { Vector2 } from '@/utils/gestures';

export type identifier = string;

export type Required<T> = T extends object
  ? { [P in keyof T]-?: NonNullable<T[P]> }
  : T;

export type Nullish<T extends Record<string, unknown>> = {
  [P in keyof T]?: T[P] | undefined;
};

export interface Size {
  width: number;
  height: number;
}

export type Axis = 'x' | 'y';

export interface GridItem<TData = unknown> extends Vector2, Size {
  id: identifier;
  extraData?: TData;
}

export type PartialGridItem<TData = unknown> = Partial<GridItem<TData>>;

export interface GridProps {
  items: Partial<GridItem>[];
  rows?: number;
  columns?: number;
  marginX?: number;
  marginY?: number;
  axis?: Axis;
  reservedSpace?: Dimensions[];
  fillAvailable?: boolean;
  bottomPadding?: boolean;
}

export interface ItemPosition extends Vector2 {
  pinnedX?: number;
  pinnedY?: number;
}

export interface GridItemWithPosition<TData = unknown>
  extends GridItem<TData>,
    ItemPosition {
  isPinned?: boolean;
}

export type GridLayoutOptions = Required<Omit<GridProps, 'items'>>;

export const borders = ['top', 'left', 'right', 'bottom'] as const;

export type Border = (typeof borders)[number];

export const corners: Border[][] = [
  ['top', 'right'],
  ['top', 'left'],
  ['bottom', 'right'],
  ['bottom', 'left'],
];

export interface BorderEditData {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}

export type GridMatrix = (0 | 1 | 2 | 3 | 4)[]; // 0: free cell; 1: filled cell: 2: pinned cell; 3: margin; 4: reserved cell;

export interface InputGridItem extends Partial<GridItem> {
  id: identifier;
}

export interface NormalizedGridItem<TData = unknown> extends Partial<GridItem<TData>> {
  id: identifier;
  width: number;
  height: number;
}

export interface GridLayoutData<TData = unknown> {
  items: GridItemWithPosition<TData>[];
  matrix: GridMatrix;
  matrixSize: Size;
  layoutDimensions: CssSize;
}

export interface Dimensions extends Vector2, Size {}

export interface CssSize {
  width: string;
  height: string;
}

export interface CssDimensions extends CssSize {
  x: string;
  y: string;
}

export interface ItemDimensions extends Dimensions {
  css: CssDimensions;
}