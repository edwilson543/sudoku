import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";

import { useGameMachineContext } from "../../../context/context";
import { GameEvent, GameState } from "../../../machines/game/types";

export default function UndoButton() {
  /** Button to undo the previous move (be it an entry or an erasing) */
  const { current, send } = useGameMachineContext();
  const isSolved = current.matches(GameState.SOLVED);

  function handleClick(): void {
    const moveNumberToUndo = getMoveNumberToUndo(current.context.game.moves);
    if (moveNumberToUndo !== null) {
      send({
        type: GameEvent.UNDO_MOVE,
        moveNumberToUndo: moveNumberToUndo,
      });
    }
  }

  return (
    <div className={"action-button"}>
      <button
        className={"action-button-icon-wrapper"}
        onClick={handleClick}
        disabled={isSolved}
        data-testid={"undo-button"}
      >
        <FontAwesomeIcon
          icon={faArrowRotateLeft}
          className={"action-button-icon"}
        />
      </button>
      <span className={"action-button-text"}>undo</span>
    </div>
  );
}

function getMoveNumberToUndo(moves: Array<MoveDetail>): number | null {
  /** Loop through the reversed move history, to get the most recent not-undone move */
  // Start at length minus one since the move count starts at 0
  let moveNumber = moves.length - 1;
  for (const move of moves.slice().reverse()) {
    if (!move.isUndone) {
      return moveNumber;
    } else {
      moveNumber -= 1;
    }
  }
  return null;
}
