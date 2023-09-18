import * as types from "./types";

export const guards = {
  [types.Guard.SUDOKU_IS_SOLVED]: (
    context: types.GameContextProps
  ): boolean => {
    return sudokuIsSolved({
      movesGrid: context.movesGrid,
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
