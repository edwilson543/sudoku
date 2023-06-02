import React, { SetStateAction } from "react";

import NumberInput from "./NumberInput";

type NumberInputPanelProps = {
  sudoku: Sudoku;
  activeCell: ActiveCell;
  setActiveCell: React.Dispatch<SetStateAction<ActiveCell>>;
  isSolved: boolean;
};

export default function NumberInputPanel({
  sudoku,
  activeCell,
  setActiveCell,
  isSolved,
}: NumberInputPanelProps) {
  const numbers = [...Array(sudoku.size).keys()].map((i) => i + 1);

  return (
    <div className={"number-input-panel"}>
      {numbers.map((number) => {
        return (
          <NumberInput
            key={number}
            value={number}
            sudoku={sudoku}
            activeCell={activeCell}
            setActiveCell={setActiveCell}
            isSolved={isSolved}
          />
        );
      })}
    </div>
  );
}
