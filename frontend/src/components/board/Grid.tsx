import React, { SetStateAction } from "react";

import CellRow from "./CellRow";

type GridProps = {
  sudoku: Sudoku;
  moves: Array<Array<number | null>>;
  activeCell: ActiveCell;
  setActiveCell: React.Dispatch<SetStateAction<ActiveCell>>;
  validationIsOn: boolean;
  isSolved: boolean;
};

export default function Grid({
  sudoku,
  moves,
  activeCell,
  setActiveCell,
  validationIsOn,
  isSolved,
}: GridProps) {
  /** The grid of cells in a game of sudoku. */
  return (
    <div className={"grid"} data-testid={"grid"}>
      {sudoku.problem.map(
        (problemRow: Array<number | null>, rowIndex: number) => {
          return (
            <CellRow
              key={rowIndex}
              sudoku={sudoku}
              rowIndex={rowIndex}
              rowMoves={moves[rowIndex]}
              activeCell={activeCell}
              setActiveCell={setActiveCell}
              validationIsOn={validationIsOn}
              isSolved={isSolved}
            />
          );
        }
      )}
    </div>
  );
}
