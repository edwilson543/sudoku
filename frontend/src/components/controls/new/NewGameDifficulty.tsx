import { SudokuDifficulty } from "../../../utils/constants";
import React from "react";

type NewGameMenuItemProps = {
  startNewGame: (difficulty: SudokuDifficulty) => void;
  difficulty: SudokuDifficulty;
};

export default function NewGameDifficulty({
  startNewGame,
  difficulty,
}: NewGameMenuItemProps) {
  /** A button for starting a new game of a particular difficulty */

  function handleClick(): void {
    startNewGame(difficulty);
  }

  return (
    <div className={"new-game-difficulty-button"} onClick={handleClick}>
      {difficulty.toLowerCase()}
    </div>
  );
}
