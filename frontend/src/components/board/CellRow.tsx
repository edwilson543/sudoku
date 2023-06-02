import Cell from "./Cell";
import React, { SetStateAction } from "react";

type CellRowProps = {
  sudoku: Sudoku;
  rowIndex: number;
  rowMoves: Array<Move>;
  activeCell: ActiveCell;
  setActiveCell: React.Dispatch<SetStateAction<ActiveCell>>;
  validationIsOn: Boolean;
  isSolved: Boolean;
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
