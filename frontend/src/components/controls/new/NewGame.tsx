import React, { useState } from "react";

import NewGameMenu from "./NewGameMenu";
import { SudokuDifficulty } from "../../../utils/constants";

type NewGameProps = {
  isSolved: boolean;
  startNewGame: (difficulty: SudokuDifficulty) => void;
};

export default function NewGame({ isSolved, startNewGame }: NewGameProps) {
  const [showNewGameMenu, setShowNewGameMenu] = useState<boolean>(false);

  function handleClick(): void {
    setShowNewGameMenu(!showNewGameMenu);
  }

  return (
    <div className={"new-game-wrapper"}>
      {showNewGameMenu || isSolved ? (
        <NewGameMenu
          setShowNewGameMenu={setShowNewGameMenu}
          startNewGame={startNewGame}
        />
      ) : (
        ""
      )}
      <div className={"new-game-button"} onClick={handleClick}>
        new game
      </div>
    </div>
  );
}
