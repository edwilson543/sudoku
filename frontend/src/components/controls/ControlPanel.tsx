import React, { SetStateAction } from "react";

import NumberInputPanel from "./NumberInputPanel";
import ActionPanel from "./ActionPanel";
import NewGame from "./NewGame";

type ControlPanelProps = {
  sudoku: Sudoku;
  activeCell: ActiveCell;
  setActiveCell: React.Dispatch<SetStateAction<ActiveCell>>;
  validationIsOn: boolean;
  setValidationIsOn: React.Dispatch<SetStateAction<boolean>>;
  isSolved: boolean;
};

export default function ControlPanel({
  sudoku,
  activeCell,
  setActiveCell,
  validationIsOn,
  setValidationIsOn,
  isSolved,
}: ControlPanelProps) {
  return (
    <div className={"control-panel"}>
      <ActionPanel
        activeCell={activeCell}
        validationIsOn={validationIsOn}
        setValidationIsOn={setValidationIsOn}
        isSolved={isSolved}
      />
      <NumberInputPanel
        sudoku={sudoku}
        activeCell={activeCell}
        setActiveCell={setActiveCell}
        isSolved={isSolved}
      />
      <NewGame isSolved={isSolved} />
    </div>
  );
}
