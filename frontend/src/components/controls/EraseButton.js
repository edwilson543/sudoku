import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";

import { useMovesDispatch } from "../../context/MovesContext";

export default function EraseButton({ activeCell }) {
  /** Button to erase the move in the active cell */
  const movesDispatch = useMovesDispatch();

  function handleClick() {
    if (
      // A clue cell is active (which cannot be erased)
      activeCell.isClueCell ||
      // No cell has been selected yet
      activeCell.isClueCell === null ||
      // The active cell is an empty game cell
      !activeCell.value
    ) {
      return null;
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
