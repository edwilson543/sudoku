import { useState } from "react";
import NewGameMenu from "./NewGameMenu";

export default function NewGame() {
  const [showNewGameMenu, setShowNewGameMenu] = useState(false);

  function handleClick() {
    setShowNewGameMenu(!showNewGameMenu);
  }

  return (
    <div className={"new-game-wrapper"}>
      {showNewGameMenu ? (
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
