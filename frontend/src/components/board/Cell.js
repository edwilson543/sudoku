import { getTileIndex } from "../../utils/gemoetry";

export default function Cell({
  sudoku,
  move,
  rowIndex,
  columnIndex,
  activeCell,
  setActiveCell,
  validationIsOn,
  isSolved,
}) {
  /** A cell in the sudoku grid that may or may not contain a clue. */
  const tileIndex = getTileIndex(rowIndex, columnIndex, sudoku.size);
  const solutionValue = sudoku.solution[rowIndex][columnIndex];
  const isClueCell = sudoku.problem[rowIndex][columnIndex] === solutionValue;
  const displayValue = isClueCell ? solutionValue : move ? move.value : "";

  function handleClick() {
    if (isSolved) {
      return null;
    }
    setActiveCell({
      row: rowIndex,
      column: columnIndex,
      tile: tileIndex,
      value: displayValue,
      isClueCell: isClueCell,
    });
  }

  function getClassName() {
    let className = "cell";
    if (isSolved) {
      className += " cell-solved";
      return className;
    }
    if (!isClueCell) {
      className += " game-cell";
    }
    if (validationIsOn && displayValue && displayValue !== solutionValue) {
      className += " game-cell-invalid";
    }
    if (activeCell.row === rowIndex && activeCell.column === columnIndex) {
      className += " active-cell";
    } else if (
      activeCell.row === rowIndex ||
      activeCell.column === columnIndex ||
      activeCell.tileIndex === tileIndex
    ) {
      className += " highlighted-cell";
    } else if (activeCell.value === displayValue && displayValue) {
      className += " highlighted-cell-value";
    }
    return className;
  }

  return (
    <div className={getClassName()} onClick={handleClick}>
      {displayValue}
    </div>
  );
}
