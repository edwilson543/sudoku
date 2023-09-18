import React, { SetStateAction } from "react";

import NumberInputPanel from "./input/NumberInputPanel";
import ActionPanel from "./actions/ActionPanel";
import NewGame from "./new/NewGame";
import { SudokuDifficulty, SudokuSize } from "../../utils/constants";

type ControlPanelProps = {
  sudokuSize: number;
  startNewGame: (difficulty: SudokuDifficulty, size: SudokuSize) => void;
  validationIsOn: boolean;
  setValidationIsOn: React.Dispatch<SetStateAction<boolean>>;
};

export default function ControlPanel({
  sudokuSize,
  startNewGame,
  validationIsOn,
  setValidationIsOn,
}: ControlPanelProps) {
  return (
    <div className={"control-panel"}>
      <ActionPanel
        validationIsOn={validationIsOn}
        setValidationIsOn={setValidationIsOn}
      />
      <NumberInputPanel sudokuSize={sudokuSize} />
      <NewGame startNewGame={startNewGame} />
    </div>
  );
}
