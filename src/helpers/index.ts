import { Cell, CellStatus } from 'components/BoardCell';

export const generateBoard = (
  cols: number,
  rows: number,
  mines: number
): Cell[][] => {
  let cells: Cell[][] = []; // This is cell array which will include all the cells.
  const options = []; // This is the array which will be used to make mines randomly.

  for (let i = 0; i < cols; i++) {
    cells[i] = [];
    for (let j = 0; j < rows; j++) {
      // Set initial status of the cell
      cells[i][j] = {
        neighborCount: -1,
        isMine: false,
        status: CellStatus.Unknown,
      };
      options.push([i, j]);
    }
  }

  cells = makeMines(mines, cells, options);
  cells = countMines(cells);

  return cells;
};

export const makeMines = (
  mineCount: number,
  cells: Cell[][],
  options: number[][]
): Cell[][] => {
  for (let n = 0; n < mineCount; n++) {
    const index = Math.floor(Math.random() * options.length);
    const choice = options.splice(index, 1)[0];
    const col = choice[0];
    const row = choice[1];
    cells[col][row].isMine = true;
  }
  return cells;
};

export const countMines = (cells: Cell[][]): Cell[][] => {
  const cols = cells.length;
  const rows = cells[0].length;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (!cells[i][j].isMine) {
        let totalMines = 0;
        for (let xOff = -1; xOff <= 1; xOff++) {
          for (let yOff = -1; yOff <= 1; yOff++) {
            const col = i + xOff;
            const row = j + yOff;
            if (col > -1 && col < cols && row > -1 && row < rows) {
              if (cells[col][row].isMine) totalMines++;
            }
          }
        }
        cells[i][j].neighborCount = totalMines;
      }
    }
  }
  return cells;
};

export const revealCell = (
  cols: number,
  rows: number,
  col: number,
  row: number,
  cells: Cell[][]
): void => {
  if (cells[col][row].status === CellStatus.Unknown) {
    cells[col][row].status = CellStatus.Revealed;
    if (cells[col][row].neighborCount === 0) {
      for (let xOff = -1; xOff <= 1; xOff++) {
        for (let yOff = -1; yOff <= 1; yOff++) {
          const newCol = col + xOff;
          const newRow = row + yOff;
          if (newCol > -1 && newCol < cols && newRow > -1 && newRow < rows) {
            const neighbor = cells[newCol][newRow];
            if (!neighbor.isMine && !(neighbor.status === CellStatus.Revealed)) {
              revealCell(cols, rows, newCol, newRow, cells);
            }
          }
        }
      }
    }
  }
};

export const flagCell = (
  col: number,
  row: number,
  cells: Cell[][]
): void => {
  const status = cells[col][row].status;
  if (status !== CellStatus.Revealed) {
    if (status === CellStatus.Flagged) {
      cells[col][row].status = CellStatus.Unknown;
    } else cells[col][row].status = CellStatus.Flagged;
  }
};
