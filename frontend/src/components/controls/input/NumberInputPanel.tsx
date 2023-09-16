import React from "react";

import NumberInput from "./NumberInput";

type NumberInputPanelProps = {
  sudokuSize: number;
};

export default function NumberInputPanel({
  sudokuSize,
}: NumberInputPanelProps) {
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
