import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";

import { MoveType } from "../../../utils/constants";
import { useMoves, useMovesDispatch } from "../../../context/movesContext";
import useAPI from "../../../services/apiClient/useAPI";

type UndoButtonProps = {
  isSolved: boolean;
};

export default function UndoButton({ isSolved }: UndoButtonProps) {
  /** Button to undo the previous move (be it an entry or an erasing) */
  const moves = useMoves();
  const movesDispatch = useMovesDispatch();
  const restClient = useAPI();

  function handleClick(): void {
    if (isSolved) {
      return;
    }
    const moveNumberToUndo = getMoveNumberToUndo(moves);
    if (moveNumberToUndo !== null) {
      movesDispatch({
        type: MoveType.Undo,
        moveNumberToUndo: moveNumberToUndo,
      });
      // Record the undo in the backend
      restClient.undoMove(moveNumberToUndo);
    }
  }

  return (
    <div className={"action-button"}>
      <div
        className={"action-button-icon-wrapper"}
        onClick={handleClick}
        data-testid={"undo-button"}
      >
        <FontAwesomeIcon
          icon={faArrowRotateLeft}
          className={"action-button-icon"}
        />
      </div>
      <span className={"action-button-text"}>undo</span>
    </div>
  );
}

function getMoveNumberToUndo(moves: Array<MoveDetail>): number | null {
  /** Loop through the reversed move history, to get the most recent not-undone move */
  // Start at length minus one since the move count starts at 0
  let moveNumber = moves.length - 1;
  for (const move of moves.reverse()) {
    if (!move.isUndone) {
      return moveNumber;
    } else {
      moveNumber -= 1;
    }
  }
  return null;
}
