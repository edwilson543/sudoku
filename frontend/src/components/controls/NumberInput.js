import { useMovesDispatch } from "../../context/MovesContext";

export default function NumberInput({ value, sudoku, activeCell }) {
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
  }

  return (
    <div className={"number-input"} onClick={handleClick}>
      {value}
    </div>
  );
}
