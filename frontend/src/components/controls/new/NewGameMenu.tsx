import React, { SetStateAction, useState } from "react";

import { SudokuDifficulty, SudokuSize } from "../../../utils/constants";
import NewGameDifficulty from "./NewGameDifficulty";
import NewGameSizeRadio from "./NewGameSizeRadio";

type NewGameMenuProps = {
  setShowNewGameMenu: React.Dispatch<SetStateAction<boolean>>;
};

export default function NewGameMenu({ setShowNewGameMenu }: NewGameMenuProps) {
  /** Select the parameters for a new game */
  const [newGameSize, setNewGameSize] = useState<SudokuSize>(SudokuSize.Nine);

  function handleMouseLeave(): void {
    setShowNewGameMenu(false);
  }

  return (
    <div className={"new-game-menu-wrapper"}>
      <div
        className={"new-game-menu"}
        onMouseLeave={handleMouseLeave}
        data-testid={"new-game-menu"}
      >
        <div className={"select-text"}>difficulty:</div>
        <NewGameDifficulty
          difficulty={SudokuDifficulty.Easy}
          size={newGameSize}
        />
        <NewGameDifficulty
          difficulty={SudokuDifficulty.Medium}
          size={newGameSize}
        />
        <NewGameDifficulty
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
