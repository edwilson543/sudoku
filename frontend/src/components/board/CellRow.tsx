import React, { SetStateAction } from "react";

import Cell from "./Cell";

type CellRowProps = {
  sudoku: Sudoku;
  rowIndex: number;
  rowMoves: Array<number | null>;
  activeCell: ActiveCell;
  setActiveCell: React.Dispatch<SetStateAction<ActiveCell>>;
  validationIsOn: boolean;
  isSolved: boolean;
};

export default function CellRow({
  sudoku,
  rowIndex,
  rowMoves,
  activeCell,
  setActiveCell,
  validationIsOn,
  isSolved,
}: CellRowProps) {
  /** A row of cells in the sudoku board. */
  const solutionRow = sudoku.solution[rowIndex];
  return (
    <div className={"cell-row"}>
      {solutionRow.map((solutionValue: number, colIndex: number) => {
        return (
          <Cell
            key={colIndex}
            sudoku={sudoku}
            move={rowMoves[colIndex]}
            rowIndex={rowIndex}
            columnIndex={colIndex}
            activeCell={activeCell}
            setActiveCell={setActiveCell}
            validationIsOn={validationIsOn}
            isSolved={isSolved}
          />
        );
      })}
    </div>
  );
}
