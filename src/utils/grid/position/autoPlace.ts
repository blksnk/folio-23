import {
  Dimensions,
  GridLayoutOptions,
  GridMatrix,
  Size,
} from '@/utils/grid/types';
import { Vector2 } from '@/utils/gestures';
import { getMatrixIndexForPosition } from '@/utils/grid/matrix';

export const placeItem = (
  matrix: GridMatrix,
  matrixSize: Size,
  item: Size,
  options: GridLayoutOptions
) => {
  const positionFn =
    options.axis === 'x' ? itemPositionAxisX : itemPositionAxisY;
  return positionFn(matrix, matrixSize, item);
};

const isLineFree = (line: GridMatrix) => {
  return line.every((cell) => cell === 0);
};

const isItemAreaCandidateFree = (
  matrix: GridMatrix,
  matrixSize: Size,
  item: Size,
  candidatePos: Vector2
) => {
  return Array(item.height)
    .fill('')
    .every((_, yOffset) => {
      const startIndex = getMatrixIndexForPosition(matrixSize, {
        x: candidatePos.x,
        y: candidatePos.y + yOffset,
      });
      const row = matrix.slice(startIndex, startIndex + item.width);
      return isLineFree(row);
    });
};

export const itemPositionAxisX = (
  matrix: GridMatrix,
  matrixSize: Size,
  item: Size
): Dimensions | undefined => {
  // limit possible positions using item size to prevent overflow
  for (let x = 0; x <= matrixSize.width - item.width; x++) {
    for (let y = 0; y <= matrixSize.height - item.height; y++) {
      // check all cells based on current x and y and item size
      const allCellsFree = isItemAreaCandidateFree(matrix, matrixSize, item, {
        x,
        y,
      });
      if (allCellsFree) {
        return {
          ...item,
          x,
          y,
        };
      }
    }
  }
  return undefined;
};

export const itemPositionAxisY = (
  matrix: GridMatrix,
  matrixSize: Size,
  item: Size
): Dimensions | undefined => {
  // limit possible positions using item size to prevent overflow
  for (let y = 0; y <= matrixSize.height - item.height; y++) {
    for (let x = 0; x <= matrixSize.width - item.width; x++) {
      // check all cells based on current x and y and item size
      const allCellsFree = isItemAreaCandidateFree(matrix, matrixSize, item, {
        x,
        y,
      });
      if (allCellsFree) {
        return {
          ...item,
          x,
          y,
        };
      }
    }
  }
  return undefined;
};
