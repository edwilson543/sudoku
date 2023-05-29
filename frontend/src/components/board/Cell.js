import { getTileIndex } from "../../utils/gemoetry";

export default function Cell({
  sudokuSize,
  isClueCell,
  value,
  rowIndex,
  columnIndex,
  activeCell,
  setActiveCell,
}) {
  /** A cell in the sudoku grid that may or may not contain a clue. */
  const tileIndex = getTileIndex(rowIndex, columnIndex, sudokuSize);

  function handleClick() {
    setActiveCell({
      row: rowIndex,
      column: columnIndex,
      tile: tileIndex,
      value: value,
      isClueCell: isClueCell,
    });
  }

  function getClassName() {
    let className = "cell";
    if (!isClueCell) {
      className += " game-cell";
    }
    if (activeCell.row === rowIndex && activeCell.column === columnIndex) {
      className += " active-cell";
    } else if (
      activeCell.row === rowIndex ||
      activeCell.column === columnIndex ||
      activeCell.tileIndex === tileIndex
    ) {
      className += " highlighted-cell";
    } else if (activeCell.value === value && value) {
      className += " highlighted-cell-value";
    }
    return className;
  }

  return (
    <div className={getClassName()} onClick={handleClick}>
      {value ? value : ""}
    </div>
  );
}
