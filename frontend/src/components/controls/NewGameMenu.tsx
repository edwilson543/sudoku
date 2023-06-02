import React, { SetStateAction } from "react";

type NewGameMenuProps = {
  setShowNewGameMenu: React.Dispatch<SetStateAction<boolean>>;
};

export default function NewGameMenu({ setShowNewGameMenu }: NewGameMenuProps) {
  function handleMouseLeave(): void {
    setShowNewGameMenu(false);
  }

  return (
    <div className={"new-game-menu-wrapper"}>
      <div className={"new-game-menu"} onMouseLeave={handleMouseLeave}>
        <div className={"select-difficulty"}>select difficulty:</div>
        <div className={"new-game-menu-item"}>easy</div>
        <div className={"new-game-menu-item"}>medium</div>
        <div className={"new-game-menu-item"}>hard</div>
      </div>
    </div>
  );
}
