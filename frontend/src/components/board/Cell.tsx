import React from "react";
import { useInterpretedGameContext } from "../../context/context";
import { GameState } from "../../machines/game/types";

type CellProps = {
  sudoku: Sudoku;
  move: number | null;
  rowIndex: number;
  columnIndex: number;
  activeCell: ActiveCell;
  setActiveCell: (cell: ActiveCell) => void;
  validationIsOn: boolean;
};

export default function Cell({
  sudoku,
  move,
  rowIndex,
  columnIndex,
  activeCell,
  setActiveCell,
  validationIsOn,
}: CellProps) {
  /** A cell in the sudoku grid that may or may not contain a clue. */
  const tileIndex = getTileIndex(rowIndex, columnIndex, sudoku.size);
  const solutionValue = sudoku.solution[rowIndex][columnIndex];
  const isClueCell = sudoku.problem[rowIndex][columnIndex] === solutionValue;
  const cellValue = isClueCell ? solutionValue : move;

  const { current } = useInterpretedGameContext();
  const isSolved = current.matches(GameState.SOLVED);

  function handleClick(): void {
    setActiveCell({
      row: rowIndex,
      column: columnIndex,
      tile: tileIndex,
      value: cellValue,
      isClueCell: isClueCell,
    });
  }

  function getClassName(): string {
    let className = "cell";
    if (isSolved) {
      return className + " cell-solved";
    }
    if (!isClueCell) {
      className += " game-cell";
    }
    if (validationIsOn && cellValue && cellValue !== solutionValue) {
      return className + " game-cell-incorrect";
    }
    if (activeCell.row === rowIndex && activeCell.column === columnIndex) {
      return className + " active-cell";
    } else if (
      activeCell.row === rowIndex ||
      activeCell.column === columnIndex ||
      activeCell.tile === tileIndex
    ) {
      return className + " highlighted-cell";
    } else if (activeCell.value === cellValue && cellValue) {
      return className + " highlighted-cell-value";
    }
    return className;
  }

  return (
    <div
      className={getClassName()}
      onClick={handleClick}
      data-testid={"row-" + rowIndex + "-column-" + columnIndex}
    >
      {cellValue ?? ""}
    </div>
  );
}

function getTileIndex(
  rowIndex: number,
  columnIndex: number,
  sudokuSize: number
): number {
  const sudokuRank = Math.sqrt(sudokuSize);
  return (
    Math.floor(rowIndex / sudokuRank) * sudokuRank +
    Math.floor(columnIndex / sudokuRank)
  );
}
