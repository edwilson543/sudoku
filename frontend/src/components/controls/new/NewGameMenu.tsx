import React, { SetStateAction, useState } from "react";

import { SudokuDifficulty, SudokuSize } from "../../../utils/constants";
import NewGameDifficulty from "./NewGameDifficulty";
import NewGameSizeRadio from "./NewGameSizeRadio";

type NewGameMenuProps = {
  startNewGame: (difficulty: SudokuDifficulty, size: SudokuSize) => void;
  setShowNewGameMenu: React.Dispatch<SetStateAction<boolean>>;
};

export default function NewGameMenu({
  startNewGame,
  setShowNewGameMenu,
}: NewGameMenuProps) {
  /** Select the parameters for a new game */
  const [newGameSize, setNewGameSize] = useState<SudokuSize>(SudokuSize.Nine);

  function handleMouseLeave(): void {
    setShowNewGameMenu(false);
  }
  return (
    <div className={"new-game-menu-wrapper"}>
      <div className={"new-game-menu"} onMouseLeave={handleMouseLeave}>
        <div className={"select-text"} data-testid={"select-difficulty"}>
          difficulty:
        </div>
        <NewGameDifficulty
          startNewGame={startNewGame}
          difficulty={SudokuDifficulty.Easy}
          size={newGameSize}
        />
        <NewGameDifficulty
          startNewGame={startNewGame}
          difficulty={SudokuDifficulty.Medium}
          size={newGameSize}
        />
        <NewGameDifficulty
          startNewGame={startNewGame}
          difficulty={SudokuDifficulty.Hard}
          size={newGameSize}
        />
        <legend className={"select-text"}>size:</legend>
        <fieldset className={"new-game-size-radio"}>
          <NewGameSizeRadio
            newGameSize={newGameSize}
            setNewGameSize={setNewGameSize}
            sudokuSize={SudokuSize.Four}
          />
          <NewGameSizeRadio
            newGameSize={newGameSize}
            setNewGameSize={setNewGameSize}
            sudokuSize={SudokuSize.Nine}
          />
          <NewGameSizeRadio
            newGameSize={newGameSize}
            setNewGameSize={setNewGameSize}
            sudokuSize={SudokuSize.Sixteen}
          />
        </fieldset>
      </div>
    </div>
  );
}
