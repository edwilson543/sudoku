import { SudokuDifficulty, SudokuSize } from "../../../utils/constants";
import React from "react";
import { GameEvent } from "../../../machines/game/types";
import { useInterpretedGameContext } from "../../../context/context";

type NewGameMenuItemProps = {
  difficulty: SudokuDifficulty;
  size: SudokuSize;
};

export default function NewGameDifficulty({
  difficulty,
  size,
}: NewGameMenuItemProps) {
  /** A button for starting a new game of a particular difficulty */
  const { send } = useInterpretedGameContext();

  const handleClick = (): void => {
    send({ type: GameEvent.LOAD_NEW_GAME, difficulty: difficulty, size: size });
  };

  return (
    <div className={"new-game-difficulty-button"} onClick={handleClick}>
      {difficulty.toLowerCase()}
    </div>
  );
}
