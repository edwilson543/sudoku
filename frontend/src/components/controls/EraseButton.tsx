import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import React from "react";

import { useMovesDispatch } from "../../context/MovesContext";

type EraseButtonProps = {
  activeCell: ActiveCell;
  isSolved: boolean;
};

export default function EraseButton({
  activeCell,
  isSolved,
}: EraseButtonProps) {
  /** Button to erase the move in the active cell */
  const movesDispatch = useMovesDispatch();

  function handleClick(): void {
    if (
      // A clue cell is active (which cannot be erased)
      activeCell.isClueCell ||
      // No cell has been selected yet
      activeCell.isClueCell === null ||
      // The active cell is an empty game cell
      !activeCell.value ||
      // The game is over
      isSolved
    ) {
      return;
    }
    movesDispatch({
      type: "erase-move",
      row: activeCell.row,
      column: activeCell.column,
    });
  }

  return (
    <div className={"action-button"}>
      <div className={"action-button-icon-wrapper"} onClick={handleClick}>
        <FontAwesomeIcon icon={faEraser} className={"action-button-icon"} />
      </div>
      <span className={"action-button-text"}>erase</span>
    </div>
  );
}
