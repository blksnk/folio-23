import {
  GridLayoutOptions,
  GridItem,
  GridLayoutData,
  GridMatrix,
  Size,
  Dimensions, GridItemWithPosition,
} from '@/utils/grid/types';
import { columns, rows } from '@/utils/responsive';
import { normalizeGridItems } from '@/utils/grid/items';
import {
  createMatrix,
  fillMatrix,
  getMatrixMaxSize,
  trimMatrix,
} from '@/utils/grid/matrix';
import { placeAllItems } from './position';
import { getGridLayoutDimensions } from '@/utils/grid/layout';
import { isDefined } from '@/utils/math';

export const defaultGridOptions: GridLayoutOptions = {
  rows: rows(),
  columns: columns(),
  marginX: 0,
  marginY: 0,
  axis: 'x',
  reservedSpace: [],
  fillAvailable: false,
  bottomPadding: false,
};

const prefillReservedSpace = (
  matrix: GridMatrix,
  matrixSize: Size,
  reservedSpace: Dimensions[],
  options: GridLayoutOptions
) => {
  reservedSpace.forEach((space) => {
    fillMatrix(
      matrix,
      matrixSize,
      space,
      options.marginX,
      options.marginY,
      false,
      true
    );
  });
};

export const generateGridLayout = <TData = unknown>(
  items: Partial<GridItem<TData>>[],
  opts: Partial<typeof defaultGridOptions>
): GridLayoutData<TData> => {
  const options = Object.assign({}, defaultGridOptions, opts);
  const normalizedItems = normalizeGridItems(items);

  let matrixSize = getMatrixMaxSize(normalizedItems, options);

  const matrix = createMatrix(matrixSize);
  if (isDefined(options.reservedSpace)) {
    prefillReservedSpace(matrix, matrixSize, options.reservedSpace, options);
  }
  const placedItems = placeAllItems(
    matrix,
    matrixSize,
    normalizedItems,
    options
  );
  matrixSize = trimMatrix(matrix, matrixSize, options);
  const layoutDimensions = getGridLayoutDimensions(matrixSize);

  return { items: placedItems, matrix, matrixSize, layoutDimensions };
};
