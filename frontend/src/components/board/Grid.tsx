import React from "react";

import Cell from "./Cell";
import { useInterpretedGameContext } from "../../context/context";

type GridProps = {
  sudoku: Sudoku;
  activeCell: ActiveCell;
  setActiveCell: (cell: ActiveCell) => void;
  validationIsOn: boolean;
};

export default function Grid({
  sudoku,
  activeCell,
  setActiveCell,
  validationIsOn,
}: GridProps) {
  /** The grid of cells in a game of sudoku. */
  const { current } = useInterpretedGameContext();

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
              move={current.context.movesGrid[rowIndex][colIndex]}
              rowIndex={rowIndex}
              columnIndex={colIndex}
              activeCell={activeCell}
              setActiveCell={setActiveCell}
              validationIsOn={validationIsOn}
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
