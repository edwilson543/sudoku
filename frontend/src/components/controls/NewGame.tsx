import React, { useState } from "react";

import NewGameMenu from "./NewGameMenu";

type NewGameProps = {
  isSolved: boolean;
};

export default function NewGame({ isSolved }: NewGameProps) {
  const [showNewGameMenu, setShowNewGameMenu] = useState<boolean>(false);

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
