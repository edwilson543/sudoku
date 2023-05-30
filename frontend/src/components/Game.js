import { useState } from "react";

import Grid from "./board/Grid";
import ControlPanel from "./controls/ControlPanel";
import { useMoves } from "../context/MovesContext";

export default function Game({ game }) {
  /** A game of sudoku, including the grid and the controls. */
  // Set the initially active cell to a non-existent one
  const initialActiveCell = {
    row: -1,
    column: -1,
    tile: -1,
    value: -1,
    isClueCell: null,
  };
  const [activeCell, setActiveCell] = useState(initialActiveCell);

  // Set the initial game mode (validation is on)
  const [validationIsOn, setValidationIsOn] = useState(true);

  // Combine the moves received from the API with the moves held in state
  const moves = combineAllMoves(useMoves(), game.moves, game.sudoku.size);
  const isSolved = sudokuIsSolved(moves, game.sudoku);

  return (
    <div className={"game-container"}>
      <div className={"game-info"}>
        difficulty: <b>{game.sudoku.difficulty.toLowerCase()}</b>
      </div>
      <div className={"game"}>
        <Grid
          sudoku={game.sudoku}
          moves={combineAllMoves(useMoves(), game.moves, game.sudoku.size)}
          activeCell={activeCell}
          setActiveCell={setActiveCell}
          validationIsOn={validationIsOn}
          isSolved={isSolved}
        />
        <ControlPanel
          sudoku={game.sudoku}
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

function combineAllMoves(stateMoves, existingMoves, sudokuSize) {
  /** Combine the moves received from the API with the moves held in state */
  // Create initial data structure for moves (an array of rows, which are also arrays)
  let rows = [];
  for (let rowIndex = 0; rowIndex < sudokuSize; rowIndex++) {
    rows.push(new Array(sudokuSize).fill(null));
  }

  // Add the moves received over the API
  for (let move of existingMoves) {
    if (!move.is_erased) {
      rows[move.row][move.column] = {
        value: move.value,
        is_correct: move.is_correct,
      };
    }
  }

  // Add the moves held in state
  // Note the last move for any index will overwrite all previous values,
  // including more recent moves with `isErased: true`
  for (let move of stateMoves) {
    rows[move.row][move.column] = {
      value: move.value,
      is_correct: move.isCorrect,
    };
  }
  return rows;
}

function sudokuIsSolved(moves, sudoku) {
  /** Check if the player has found the correct solution for the sudoku */
  for (let rowIndex = 0; rowIndex < sudoku.size; rowIndex++) {
    for (let colIndex = 0; colIndex < sudoku.size; colIndex++) {
      if (sudoku.problem[rowIndex][colIndex]) {
        continue;
      }
      const move = moves[rowIndex][colIndex];
      if (move === null) {
        return false;
      } else if (move.value !== sudoku.solution[rowIndex][colIndex]) {
        return false;
      }
    }
  }
  return true;
}
