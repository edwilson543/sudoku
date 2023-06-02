import React, { SetStateAction } from "react";

type CellProps = {
  sudoku: Sudoku;
  move: Move | null;
  rowIndex: number;
  columnIndex: number;
  activeCell: ActiveCell;
  setActiveCell: React.Dispatch<SetStateAction<ActiveCell>>;
  validationIsOn: boolean;
  isSolved: boolean;
};

export default function Cell({
  sudoku,
  move,
  rowIndex,
  columnIndex,
  activeCell,
  setActiveCell,
  validationIsOn,
  isSolved,
}: CellProps) {
  /** A cell in the sudoku grid that may or may not contain a clue. */
  const tileIndex = getTileIndex(rowIndex, columnIndex, sudoku.size);
  const solutionValue = sudoku.solution[rowIndex][columnIndex];
  const isClueCell = sudoku.problem[rowIndex][columnIndex] === solutionValue;
  const cellValue = isClueCell ? solutionValue : move ? move.value : null;

  function handleClick() {
    if (isSolved) {
      return null;
    }
    setActiveCell({
      row: rowIndex,
      column: columnIndex,
      tile: tileIndex,
      value: cellValue,
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
    if (validationIsOn && cellValue && cellValue !== solutionValue) {
      className += " game-cell-invalid";
    }
    if (activeCell.row === rowIndex && activeCell.column === columnIndex) {
      className += " active-cell";
    } else if (
      activeCell.row === rowIndex ||
      activeCell.column === columnIndex ||
      activeCell.tile === tileIndex
    ) {
      className += " highlighted-cell";
    } else if (activeCell.value === cellValue && cellValue) {
      className += " highlighted-cell-value";
    }
    return className;
  }

  return (
    <div className={getClassName()} onClick={handleClick}>
      {cellValue ?? ""}
    </div>
  );
}

function getTileIndex(
  rowIndex: number,
  columnIndex: number,
  sudokuSize: number
) {
  const sudokuRank = Math.sqrt(sudokuSize);
  return (
    Math.floor(rowIndex / sudokuRank) * sudokuRank +
    Math.floor(columnIndex / sudokuRank)
  );
}
