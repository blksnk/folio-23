import {
  Dimensions,
  GridLayoutOptions,
  GridMatrix,
  Size,
} from "@/utils/grid/types";
import { fillMatrix } from "@/utils/grid/matrix";
import { placeItem } from "@/utils/grid/position/autoPlace";
import { isDefined } from "@/utils/math";

export const setPinnedItemPosition = (
  matrix: GridMatrix,
  matrixSize: Size,
  pinnedItem: Dimensions,
  options: GridLayoutOptions
) => {
  // check for overflow
  if (
    pinnedItem.x + pinnedItem.width > matrixSize.width ||
    pinnedItem.y + pinnedItem.height > matrixSize.height
  ) {
    const autoPlacedPosition = placeItem(
      matrix,
      matrixSize,
      pinnedItem,
      options
    );
    if (isDefined(autoPlacedPosition)) {
      fillMatrix(
        matrix,
        matrixSize,
        autoPlacedPosition,
        options.marginX,
        options.marginY,
        true
      );
      return autoPlacedPosition;
    }
  }
  fillMatrix(
    matrix,
    matrixSize,
    pinnedItem,
    options.marginX,
    options.marginY,
    true
  );
  return pinnedItem;
};
