import { useState } from "react";

import Grid from "./board/Grid";
import ControlPanel from "./controls/ControlPanel";
import { useMoves } from "../context/MovesContext";

export default function Game({ sudoku, existingMoves }) {
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

  return (
    <div className={"game"}>
      <Grid
        sudoku={sudoku}
        moves={combineAllMoves(useMoves(), existingMoves, sudoku.size)}
        activeCell={activeCell}
        setActiveCell={setActiveCell}
      />
      <ControlPanel
        sudoku={sudoku}
        activeCell={activeCell}
        setActiveCell={setActiveCell}
        validationIsOn={validationIsOn}
        setValidationIsOn={setValidationIsOn}
      />
    </div>
  );
}

function combineAllMoves(stateMoves, existingMoves, sudokuSize) {
  /** Combine the moves received from the API with the moves held in state */
  // Create initial datastructure for moves (an array of rows, which are also arrays)
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
