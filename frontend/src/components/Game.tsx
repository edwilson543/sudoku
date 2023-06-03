import React, { useState, useMemo } from "react";

import Grid from "./board/Grid";
import ControlPanel from "./controls/ControlPanel";
import { useMoves } from "../context/movesContext";

type GameProps = {
  sudoku: Sudoku;
};

const initialActiveCell = {
  // The initial active cell is chosen as one that does not exist
  row: -1,
  column: -1,
  tile: -1,
  value: -1,
  isClueCell: null,
};

export default function Game({ sudoku }: GameProps) {
  /** A game of sudoku, including the grid and the controls. */
  // Store the active cell in state
  const [activeCell, setActiveCell] = useState<ActiveCell>(initialActiveCell);

  // Set the initial game mode (validation is on)
  const [validationIsOn, setValidationIsOn] = useState<boolean>(true);

  // Transform the moves array into a grid only showing the currently active moves
  const movesHistory = useMoves();
  const movesGrid = useMemo(() => {
    return structureMovesAsGrid(sudoku, movesHistory);
  }, [movesHistory, sudoku]);

  // Check if the sudoku has been solved
  const isSolved = useMemo(() => {
    return sudokuIsSolved(movesGrid, sudoku);
  }, [movesGrid, sudoku]);

  return (
    <div className={"game-container"}>
      <div className={"game-info"}>
        difficulty: <b>{sudoku.difficulty.toLowerCase()}</b>
      </div>
      <div className={"game"}>
        <Grid
          sudoku={sudoku}
          moves={movesGrid}
          activeCell={activeCell}
          setActiveCell={setActiveCell}
          validationIsOn={validationIsOn}
          isSolved={isSolved}
        />
        <ControlPanel
          sudoku={sudoku}
          activeCell={activeCell}
          setActiveCell={setActiveCell}
          validationIsOn={validationIsOn}
          setValidationIsOn={setValidationIsOn}
          isSolved={isSolved}
        />
      </div>
    </div>
  );
}

function structureMovesAsGrid(
  sudoku: Sudoku,
  movesHistory: Array<MoveDetail>
): Array<Array<number | null>> {
  /** Convert the move history held as an array into the current board state
   *
   * Note the most recent move for any cell will be the one that gets rendered.
   * For example, if the most recent move for a cell has `isErased: true`,
   * then that cell will appear empty.
   * */
  // Create empty grid (an array of arrays representing the rows)
  const rows = [];
  for (let rowIndex = 0; rowIndex < sudoku.size; rowIndex++) {
    rows.push(new Array(sudoku.size).fill(null));
  }

  // Insert each move into the grid
  for (const move of movesHistory) {
    rows[move.row][move.column] = move.value;
  }
  return rows;
}

function sudokuIsSolved(
  movesGrid: Array<Array<number | null>>,
  sudoku: Sudoku
): boolean {
  /** Check if the player has found the correct solution for the sudoku */
  for (let rowIndex = 0; rowIndex < sudoku.size; rowIndex++) {
    for (let colIndex = 0; colIndex < sudoku.size; colIndex++) {
      if (sudoku.problem[rowIndex][colIndex]) {
        continue;
      }
      const move = movesGrid[rowIndex][colIndex];
      if (move === null) {
        return false;
      } else if (move !== sudoku.solution[rowIndex][colIndex]) {
        return false;
      }
    }
  }
  return true;
}
