import {
  cellHeight,
  cellWidth,
  cssCellHeight,
  cssCellWidth,
  unit,
} from '@/utils/responsive';
import {
  CssSize,
  Size,
  GridItemWithPosition,
  ItemDimensions,
  Axis,
} from '@/utils/grid/types';
import { Vector2 } from '@/utils/gestures';

export const gridLength = (l: number, axis: Axis) =>
  l * (axis === 'x' ? cellWidth() : cellHeight()) +
  (l > 0 ? (l - 1) * unit() : 0);

export const gridPosition = (pos: number, axis: Axis) =>
  gridLength(pos, axis) + (pos > 0 ? unit() : 0);

export const getGridLayoutDimensions = (size: Size): CssSize => {
  return {
    width: cssCellWidth(size.width),
    height: cssCellHeight(size.height),
  };
};

export const getItemDimensions = (
  item: GridItemWithPosition
): ItemDimensions => {
  const width = gridLength(item.width, 'x');
  const height = gridLength(item.height, 'y');
  const x = gridPosition(item.x, 'x');
  const y = gridPosition(item.y, 'y');
  const css = {
    width: cssCellWidth(item.width),
    height: cssCellHeight(item.height),
    x: cssCellWidth(item.x, true),
    y: cssCellHeight(item.y, true),
  };
  return { x, y, width, height, css };
};

export const formatItemStyle = (
  dimensions: ItemDimensions,
  offset: Vector2 = { x: 0, y: 0 },
  sizeOffset: Size = { width: 0, height: 0 }
) => ({
  width: `calc(${dimensions.css.width} + ${sizeOffset.width}px)`,
  height: `calc(${dimensions.css.height} + ${sizeOffset.height}px)`,
  transform: `translate(calc(${dimensions.css.x} + ${offset.x}px), calc(${dimensions.css.y} + ${offset.y}px))`,
});
