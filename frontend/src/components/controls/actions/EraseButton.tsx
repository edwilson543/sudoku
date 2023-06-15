import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import React from "react";

import { MoveType } from "../../../utils/constants";
import { useMoves, useMovesDispatch } from "../../../context/movesContext";
import useAPI from "../../../services/apiClient/useAPI";

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
  const moves = useMoves();
  const restClient = useAPI();
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
    movesDispatch({
      type: MoveType.Erase,
      row: activeCell.row,
      column: activeCell.column,
    });

    // Record the move in the backend
    restClient.makeMove(moves.length, activeCell.row, activeCell.column, null);
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
