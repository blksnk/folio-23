import {
  Axis,
  Dimensions,
  GridLayoutOptions,
  GridMatrix,
  Size,
} from '@/utils/grid/types';
import { Vector2 } from '@/utils/gestures';
import { isBetween } from '@/utils/math';

interface getMatrixSizeOptions {
  axis: Axis;
  rows: number;
  columns: number;
  marginX: number;
  marginY: number;
  reservedSpace?: Dimensions[];
}

export const getMatrixMaxSize = (
  sizes: {
    width: number;
    height: number;
    x?: number;
    y?: number;
  }[],
  options: getMatrixSizeOptions
): Size => {
  const maximums = [...sizes, ...(options.reservedSpace ?? [])].reduce(
    (acc, size) => ({
      width: acc.width + size.width + (size.x ?? 0) + options.marginX,
      height: acc.height + size.height + (size.y ?? 0) + options.marginY,
    }),
    {
      height: options.marginY,
      width: options.marginX,
    }
  );
  return {
    height: options.axis === 'x' ? options.rows : maximums.height,
    width: options.axis === 'y' ? options.columns : maximums.width,
  };
};

export const createMatrix = ({ width, height }: Size): GridMatrix => {
  return Array(width * height).fill(0);
};

export const getMatrixIndexForPosition = (
  matrixSize: Size,
  position: Vector2
) => {
  return matrixSize.width * position.y + position.x;
};

export const getMatrixValueAtPosition = (
  matrix: GridMatrix,
  matrixSize: Size,
  position: Vector2
) => {
  const index = getMatrixIndexForPosition(matrixSize, position);
  return matrix[index];
};

export const fillMatrix = (
  matrix: GridMatrix,
  matrixSize: Size,
  item: Dimensions,
  marginX: number,
  marginY: number,
  isPinned?: boolean,
  isReserved?: boolean
): GridMatrix => {
  const mX = item.x === 0 ? 0 : marginX;
  const mY = item.y === 0 ? 0 : marginY;
  const xStart = Math.max(item.x - mX, 0);
  const yStart = Math.max(item.y - mY, 0);
  // prevent margin overflow
  const xEnd = Math.min(item.x + item.width + marginX, matrixSize.width);
  const yEnd = Math.min(item.y + item.height + marginY, matrixSize.height);

  for (let x = xStart; x < xEnd; x++) {
    for (let y = yStart; y < yEnd; y++) {
      const index = getMatrixIndexForPosition(matrixSize, { x, y });

      const currentCellIsReserved = matrix[index] === 4;
      const isFilled =
        isBetween(x, item.x, item.x + item.width - 1) &&
        isBetween(y, item.y, item.y + item.height - 1);
      matrix[index] =
        isReserved || currentCellIsReserved
          ? 4
          : isFilled
          ? isPinned
            ? 2
            : 1
          : 3;
    }
  }
  return matrix;
};

const trimMatrixAxisX = (
  matrix: GridMatrix,
  matrixSize: Size,
  { bottomPadding, columns, rows }: GridLayoutOptions
): Size => {
  for (let x = matrixSize.width - 1; x >= 0; x--) {
    const nonEmptyColumn = Array(rows)
      .fill(0)
      .some((_, y) => {
        const matrixIndex = getMatrixIndexForPosition(matrixSize, { x, y });
        const cell = matrix[matrixIndex];
        return cell !== 0 && cell !== 3 && cell !== 4;
      });

    if (nonEmptyColumn) {
      const firstEmptyIndex = getMatrixIndexForPosition(matrixSize, {
        x: x + 1,
        y: 0,
      });
      matrix.splice(firstEmptyIndex);
      return {
        height: matrixSize.height,
        width: x + 1 + (bottomPadding ? columns : 0),
      };
    }
  }

  return matrixSize;
};

export const trimMatrix = (
  matrix: GridMatrix,
  matrixSize: Size,
  opts: GridLayoutOptions
): Size => {
  // start counting from the end
  const { axis, bottomPadding, rows } = opts;
  if (axis === 'x') {
    return trimMatrixAxisX(matrix, matrixSize, opts);
  } else {
    for (let y = matrixSize.height - 1; y >= 0; y--) {
      const rowStartIndex = getMatrixIndexForPosition(matrixSize, { x: 0, y });
      // check for non-empty row
      const row = matrix.slice(rowStartIndex, rowStartIndex + matrixSize.width);
      const rowIsFilled = row.some(
        (cell) => cell !== 0 && cell !== 3 && cell !== 4
      );
      if (rowIsFilled) {
        const firstEmptyIndex = getMatrixIndexForPosition(matrixSize, {
          x: 0,
          y: y + 1,
        });
        matrix.splice(firstEmptyIndex);
        return {
          width: matrixSize.width,
          height: y + 1 + (bottomPadding ? rows : 0),
        };
      }
    }
  }
  return matrixSize;
};
