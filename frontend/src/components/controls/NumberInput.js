import { useMovesDispatch } from "../../context/MovesContext";

export default function NumberInput({
  value,
  sudoku,
  activeCell,
  setActiveCell,
}) {
  const movesDispatch = useMovesDispatch();

  function handleClick() {
    if (activeCell.row === -1) {
      // The player hasn't clicked on a cell yet, so just return
      return null;
    }

    const isCorrect =
      sudoku.solution[activeCell.row][activeCell.column] === value;
    movesDispatch({
      type: "create-move",
      row: activeCell.row,
      column: activeCell.column,
      value: value,
      isCorrect: isCorrect,
    });

    // Need to update the value stored in the activeCell state
    setActiveCell({
      row: activeCell.row,
      column: activeCell.column,
      tile: activeCell.tile,
      value: value,
      isClueCell: activeCell.isClueCell,
    });
  }

  return (
    <div className={"number-input"} onClick={handleClick}>
      {value}
    </div>
  );
}
