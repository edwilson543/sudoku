import React, { SetStateAction } from "react";

import { SudokuSize } from "../../../utils/constants";

type NewGameSizeSelectProps = {
  newGameSize: SudokuSize;
  setNewGameSize: React.Dispatch<SetStateAction<SudokuSize>>;
  sudokuSize: SudokuSize;
};

export default function NewGameSizeRadio({
  newGameSize,
  sudokuSize,
  setNewGameSize,
}: NewGameSizeSelectProps) {
  /** A single option in the radio select for the size of the new game to be played */

  function handleChange(): void {
    setNewGameSize(sudokuSize);
  }
  return (
    <div>
      <input
        type="radio"
        name={"size"}
        checked={newGameSize === sudokuSize}
        onChange={handleChange}
        data-testid={`new-game-radio-${sudokuSize}`}
      />
      <label>{sudokuSize}</label>
    </div>
  );
}
