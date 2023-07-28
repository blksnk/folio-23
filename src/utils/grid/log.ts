import { GridMatrix, Size } from '@/utils/grid/types';
import { getMatrixIndexForPosition } from '@/utils/grid/matrix';

const logCell = (cell: GridMatrix[number]): string => {
  switch (cell) {
    case 1:
      return ' ■ ';
    case 2:
      return '[▣]';
    case 3:
      return ' · ';
    case 4:
      return ' X ';
    default:
      return '   ';
  }
};

const logLine = ({ width }: Size) => {
  return Array(width + 1)
    .fill('–––')
    .join('–––');
};

const logHeader = (matrixSize: Size) => {
  return (
    'y\\x | ' +
    Array(matrixSize.width)
      .fill('')
      .map((_, i) => (i > 9 ? '' : ' ') + i + ' ')
      .join(' | ')
  );
};

type MatrixRow = GridMatrix;

const logRow = (row: MatrixRow, rowIndex: number) => {
  const rowStart = ' ' + rowIndex + (rowIndex > 9 ? '' : ' ');
  return [rowStart, ...row.map((cell) => logCell(cell))].join(' | ');
};

export const logMatrix = (matrix: GridMatrix, matrixSize: Size) => {
  // console.clear();
  const rowStrings: string[] = [];
  for (let y = 0; y < matrixSize.height; y++) {
    const rowStartIndex = getMatrixIndexForPosition(matrixSize, { x: 0, y });
    const row = matrix.slice(rowStartIndex, rowStartIndex + matrixSize.width);
    rowStrings.push(logRow(row, y));
  }

  const fullLog = [logHeader(matrixSize), ...rowStrings].join(
    '\n' + logLine(matrixSize) + '\n'
  );
  console.log(fullLog);
  return fullLog;
};
