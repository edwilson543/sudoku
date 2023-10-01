import React, { useState } from "react";

import NewGameMenu from "./NewGameMenu";
import { useGameMachineContext } from "../../../context/context";
import { GameState } from "../../../machines/game/types";

export default function NewGame() {
  const [showNewGameMenu, setShowNewGameMenu] = useState<boolean>(false);
  const { current } = useGameMachineContext();
  const isSolved = current.matches(GameState.SOLVED);

  function handleClick(): void {
    setShowNewGameMenu(!showNewGameMenu);
  }

  return (
    <div className={"new-game-wrapper"}>
      {showNewGameMenu || isSolved ? (
        <NewGameMenu setShowNewGameMenu={setShowNewGameMenu} />
      ) : (
        ""
      )}
      <div className={"new-game-button"} onClick={handleClick}>
        new game
      </div>
    </div>
  );
}
