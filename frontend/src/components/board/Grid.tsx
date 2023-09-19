import React from "react";

import Cell from "./Cell";
import { useInterpretedGameContext } from "../../context/context";

type GridProps = {
  validationIsOn: boolean;
};

export default function Grid({ validationIsOn }: GridProps) {
  /** The grid of cells in a game of sudoku. */
  const { current } = useInterpretedGameContext();

  const sudoku = current.context.game.sudoku;
  const indexes = [...Array(sudoku.size).keys()];

  return (
    <div className={"grid"} data-testid={"grid"}>
      {indexes.map((rowIndex: number) => {
        const row = indexes.map((colIndex: number) => {
          const cellKey = rowIndex * sudoku.size + colIndex;
          return (
            <Cell
              key={cellKey}
              move={current.context.movesGrid[rowIndex][colIndex]}
              rowIndex={rowIndex}
              columnIndex={colIndex}
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
