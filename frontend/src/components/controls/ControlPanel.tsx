import React, { SetStateAction } from "react";

import NumberInputPanel from "./input/NumberInputPanel";
import ActionPanel from "./actions/ActionPanel";
import NewGame from "./new/NewGame";
import { SudokuDifficulty, SudokuSize } from "../../utils/constants";

type ControlPanelProps = {
  sudokuSize: number;
  startNewGame: (difficulty: SudokuDifficulty, size: SudokuSize) => void;
  activeCell: ActiveCell;
  validationIsOn: boolean;
  setValidationIsOn: React.Dispatch<SetStateAction<boolean>>;
  isSolved: boolean;
};

export default function ControlPanel({
  sudokuSize,
  startNewGame,
  activeCell,
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
      <NumberInputPanel sudokuSize={sudokuSize} isSolved={isSolved} />
      <NewGame isSolved={isSolved} startNewGame={startNewGame} />
    </div>
  );
}
