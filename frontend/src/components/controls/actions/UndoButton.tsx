import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";

import { useMoves, useMovesDispatch } from "../../../context/movesContext";
import { MoveType } from "../../../utils/constants";

type UndoButtonProps = {
  isSolved: boolean;
};

export default function UndoButton({ isSolved }: UndoButtonProps) {
  /** Button to undo the previous move (be it an entry or an erasing) */
  const moves = useMoves();
  const movesDispatch = useMovesDispatch();

  function handleClick(): void {
    if (moves.length === 0 || isSolved) {
      return;
    }
    movesDispatch({
      type: MoveType.UNDO,
    });
  }

  return (
    <div className={"action-button"}>
      <div className={"action-button-icon-wrapper"} onClick={handleClick}>
        <FontAwesomeIcon
          icon={faArrowRotateLeft}
          className={"action-button-icon"}
        />
      </div>
      <span className={"action-button-text"}>undo</span>
    </div>
  );
}
