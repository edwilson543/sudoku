import React, { SetStateAction } from "react";

import { SudokuDifficulty } from "../../../utils/constants";
import NewGameMenuItem from "./NewGameMenuItem";

type NewGameMenuProps = {
  startNewGame: (difficulty: SudokuDifficulty) => void;
  setShowNewGameMenu: React.Dispatch<SetStateAction<boolean>>;
};

export default function NewGameMenu({
  startNewGame,
  setShowNewGameMenu,
}: NewGameMenuProps) {
  function handleMouseLeave(): void {
    setShowNewGameMenu(false);
  }

  return (
    <div className={"new-game-menu-wrapper"}>
      <div className={"new-game-menu"} onMouseLeave={handleMouseLeave}>
        <div className={"select-difficulty"}>select difficulty:</div>
        <NewGameMenuItem
          startNewGame={startNewGame}
          difficulty={SudokuDifficulty.EASY}
        />
        <NewGameMenuItem
          startNewGame={startNewGame}
          difficulty={SudokuDifficulty.MEDIUM}
        />
        <NewGameMenuItem
          startNewGame={startNewGame}
          difficulty={SudokuDifficulty.HARD}
        />
      </div>
    </div>
  );
}
