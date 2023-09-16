import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";

import { useInterpretedGameContext } from "../../../context/context";
import { GameEvent, GameState } from "../../../machines/game/types";

export default function EraseButton() {
  /** Button to erase the move in the active cell */
  const { current, send } = useInterpretedGameContext();
  const isSolved = current.matches(GameState.SOLVED);
  const activeCell = current.context.activeCell;

  const isDisabled =
    // The game is over
    isSolved ||
    // A clue cell is active (which cannot be erased)
    activeCell.isClueCell ||
    // No cell has been selected yet
    activeCell.isClueCell === null ||
    // The active cell is an empty game cell
    !activeCell.value;

  function handleClick(): void {
    send({
      type: GameEvent.ERASE_MOVE,
      row: activeCell.row,
      column: activeCell.column,
    });
  }

  return (
    <div className={"action-button"}>
      <button
        className={"action-button-icon-wrapper"}
        onClick={handleClick}
        disabled={isDisabled}
        data-testid={"erase-button"}
      >
        <FontAwesomeIcon icon={faEraser} className={"action-button-icon"} />
      </button>
      <span className={"action-button-text"}>erase</span>
    </div>
  );
}
