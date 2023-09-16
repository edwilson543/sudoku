import * as types from "./types";

export const guards = {
  [types.Guard.SUDOKU_IS_SOLVED]: (
    context: types.GameContextProps
  ): boolean => {
    const movesGrid = structureMovesAsGrid(
      context.game.sudoku.size,
      context.game.moves
    );
    return sudokuIsSolved({
      movesGrid: movesGrid,
      sudoku: context.game.sudoku,
    });
  },
};

const sudokuIsSolved = ({
  movesGrid,
  sudoku,
}: {
  movesGrid: Array<Array<number | null>>;
  sudoku: types.Sudoku;
}): boolean => {
  /** Check if the player has found the correct solution for the sudoku */
  for (let rowIndex = 0; rowIndex < sudoku.size; rowIndex++) {
    for (let colIndex = 0; colIndex < sudoku.size; colIndex++) {
      if (sudoku.problem[rowIndex][colIndex]) {
        continue;
      }
      const move = movesGrid[rowIndex][colIndex];
      if (move === null) {
        return false;
      } else if (move !== sudoku.solution[rowIndex][colIndex]) {
        return false;
      }
    }
  }
  return true;
};

function structureMovesAsGrid(
  sudokuSize: number,
  movesHistory: Array<types.Move>
): Array<Array<number | null>> {
  /** Convert the move history held as an array into the current board state
   *
   * Note the most recent move for any cell will be the one that gets rendered.
   * If the most recent move for a cell has `value: null`, then that cell will
   * appear empty.
   */
  // Create empty grid (an array of arrays representing the rows)
  const rows = [];
  for (let rowIndex = 0; rowIndex < sudokuSize; rowIndex++) {
    rows.push(new Array(sudokuSize).fill(null));
  }

  // Insert each move into the grid
  for (const move of movesHistory) {
    if (!move.isUndone) {
      rows[move.row][move.column] = move.value;
    }
  }
  return rows;
}
