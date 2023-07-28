import {
  GridItem,
  NormalizedGridItem,
  Nullish,
  Size,
} from '@/utils/grid/types';
import { Vector2 } from '@/utils/gestures';

export const defaultGridItemSize: Size = {
  width: 5,
  height: 3,
};

const getFixedPositionWeight = (pos: Nullish<Vector2>) =>
  Object.values(pos).reduce(
    (acc, p) => (p !== undefined ? (acc ?? 0) + 1 : acc),
    0
  ) ?? 0;

export const normalizeGridItems = (
  items: Partial<GridItem>[]
): NormalizedGridItem[] =>
  items
    .map((item, index) => ({
      ...item,
      id: item.id ?? 'grid__item__' + index,
      width: item.width ?? defaultGridItemSize.width,
      height: item.height ?? defaultGridItemSize.height,
    }))
    .sort((a, b) => {
      const aWeight = getFixedPositionWeight(a);
      const bWeight = getFixedPositionWeight(b);
      return bWeight - aWeight;
    });
