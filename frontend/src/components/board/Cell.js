import { useContext } from "react";

import { SudokuSizeContext } from "../SudokuSizeConext";
import { getTileIndex } from "../../utils/gemoetry";

export default function Cell({
  isClueCell,
  value,
  rowIndex,
  columnIndex,
  activeCell,
  setActiveCell,
}) {
  /** A cell in the sudoku grid that may or may not contain a clue. */
  const sudokuSize = useContext(SudokuSizeContext);
  const tileIndex = getTileIndex(rowIndex, columnIndex, sudokuSize);

  function handleClick() {
    setActiveCell({
      rowIndex: rowIndex,
      columnIndex: columnIndex,
      tileIndex: tileIndex,
      value: value,
    });
  }

  function getClassName() {
    let className = "cell";
    if (!isClueCell) {
      className += " game-cell";
    }
    if (
      activeCell.rowIndex === rowIndex &&
      activeCell.columnIndex === columnIndex
    ) {
      className += " active-cell";
    } else if (
      activeCell.rowIndex === rowIndex ||
      activeCell.columnIndex === columnIndex ||
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
      {value}
    </div>
  );
}
