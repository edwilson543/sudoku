import React from "react";

import NumberInput from "./NumberInput";
import { useGameMachineContext } from "../../../context/context";

export default function NumberInputPanel() {
  const { current } = useGameMachineContext();

  const sudokuSize = current.context.game.sudoku.size;
  const sudokuRank = Math.sqrt(sudokuSize);
  const indexes = [...Array(Math.sqrt(sudokuSize)).keys()];

  return (
    <div className={"number-input-panel"} data-testid={"number-input-panel"}>
      {indexes.map((rowIndex: number) => {
        // Structure the input buttons into rows
        const rowItems = indexes.map((colIndex: number) => {
          const inputValue = rowIndex * sudokuRank + colIndex + 1;
          return <NumberInput key={inputValue} value={inputValue} />;
        });
        return (
          <div key={rowIndex} className={"number-input-row"}>
            {rowItems}
          </div>
        );
      })}
    </div>
  );
}
