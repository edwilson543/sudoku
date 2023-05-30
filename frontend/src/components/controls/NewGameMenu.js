export default function NewGameMenu({ setShowNewGameMenu }) {
  function handleMouseLeave() {
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
