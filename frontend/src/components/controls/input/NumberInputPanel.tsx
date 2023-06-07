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
  const numbers = [...Array(sudokuSize).keys()].map((i) => i + 1);

  return (
    <div className={"number-input-panel"} data-testid={"number-input-panel"}>
      {numbers.map((number) => {
        return (
          <NumberInput
            key={number}
            value={number}
            activeCell={activeCell}
            setActiveCell={setActiveCell}
            isSolved={isSolved}
          />
        );
      })}
    </div>
  );
}
