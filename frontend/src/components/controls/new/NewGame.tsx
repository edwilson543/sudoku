import React, { useState } from "react";

import NewGameMenu from "./NewGameMenu";
import { SudokuDifficulty, SudokuSize } from "../../../utils/constants";
import { useInterpretedGameContext } from "../../../context/context";
import { GameState } from "../../../machines/game/types";

type NewGameProps = {
  startNewGame: (difficulty: SudokuDifficulty, size: SudokuSize) => void;
};

export default function NewGame({ startNewGame }: NewGameProps) {
  const [showNewGameMenu, setShowNewGameMenu] = useState<boolean>(false);
  const { current } = useInterpretedGameContext();
  const isSolved = current.matches(GameState.SOLVED);

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
