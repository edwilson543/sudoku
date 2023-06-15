import React, { SetStateAction } from "react";

import NumberInput from "./NumberInput";

type NumberInputPanelProps = {
  sudokuSize: number;
  activeCell: ActiveCell;
  setActiveCell: React.Dispatch<SetStateAction<ActiveCell>>;
  isSolved: boolean;
};

export default function NumberInputPanel({
  sudokuSize,
  activeCell,
  setActiveCell,
  isSolved,
}: NumberInputPanelProps) {
  const sudokuRank = Math.sqrt(sudokuSize);
  const indexes = [...Array(Math.sqrt(sudokuSize)).keys()];

  return (
    <div className={"number-input-panel"} data-testid={"number-input-panel"}>
      {indexes.map((rowIndex) => {
        // Structure the input buttons into rows
        const rowItems = indexes.map((colIndex) => {
          const inputValue = rowIndex * sudokuRank + colIndex + 1;
          return (
            <NumberInput
              key={inputValue}
              value={inputValue}
              activeCell={activeCell}
              setActiveCell={setActiveCell}
              isSolved={isSolved}
            />
          );
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
