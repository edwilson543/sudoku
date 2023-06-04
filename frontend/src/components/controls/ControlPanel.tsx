import React, { SetStateAction } from "react";

import NumberInputPanel from "./input/NumberInputPanel";
import ActionPanel from "./actions/ActionPanel";
import NewGame from "./new/NewGame";
import { SudokuDifficulty } from "../../utils/constants";

type ControlPanelProps = {
  sudoku: Sudoku;
  startNewGame: (difficulty: SudokuDifficulty) => void;
  activeCell: ActiveCell;
  setActiveCell: React.Dispatch<SetStateAction<ActiveCell>>;
  validationIsOn: boolean;
  setValidationIsOn: React.Dispatch<SetStateAction<boolean>>;
  isSolved: boolean;
};

export default function ControlPanel({
  sudoku,
  startNewGame,
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
      <NewGame isSolved={isSolved} startNewGame={startNewGame} />
    </div>
  );
}
