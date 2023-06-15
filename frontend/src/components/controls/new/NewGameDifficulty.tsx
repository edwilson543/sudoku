import { SudokuDifficulty, SudokuSize } from "../../../utils/constants";
import React from "react";

type NewGameMenuItemProps = {
  startNewGame: (difficulty: SudokuDifficulty, size: SudokuSize) => void;
  difficulty: SudokuDifficulty;
  size: SudokuSize;
};

export default function NewGameDifficulty({
  startNewGame,
  difficulty,
  size,
}: NewGameMenuItemProps) {
  /** A button for starting a new game of a particular difficulty */
  function handleClick(): void {
    startNewGame(difficulty, size);
  }

  return (
    <div className={"new-game-difficulty-button"} onClick={handleClick}>
      {difficulty.toLowerCase()}
    </div>
  );
}
