import React from "react";

import Cell from "./Cell";

type GridProps = {
  sudoku: Sudoku;
  moves: Array<Array<number | null>>;
  activeCell: ActiveCell;
  setActiveCell: (cell: ActiveCell) => void;
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
  const indexes = [...Array(sudoku.size).keys()];
  return (
    <div className={"grid"} data-testid={"grid"}>
      {indexes.map((rowIndex: number) => {
        const row = indexes.map((colIndex: number) => {
          const cellKey = rowIndex * sudoku.size + colIndex;
          return (
            <Cell
              key={cellKey}
              sudoku={sudoku}
              move={moves[rowIndex][colIndex]}
              rowIndex={rowIndex}
              columnIndex={colIndex}
              activeCell={activeCell}
              setActiveCell={setActiveCell}
              validationIsOn={validationIsOn}
              isSolved={isSolved}
            />
          );
        });
        return (
          <div key={rowIndex} className={"cell-row"}>
            {row}
          </div>
        );
      })}
    </div>
  );
}
