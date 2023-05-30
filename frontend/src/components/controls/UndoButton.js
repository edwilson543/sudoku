import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";

import { useMoves, useMovesDispatch } from "../../context/MovesContext";

export default function UndoButton({ isSolved }) {
  /** Button to undo the previous move (be it an entry or an erasing) */
  const moves = useMoves();
  const movesDispatch = useMovesDispatch();

  function handleClick() {
    if (moves.length === 0 || isSolved) {
      return null;
    }
    movesDispatch({
      type: "undo-move",
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
