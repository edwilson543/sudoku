import React, { useState, useMemo } from "react";

import Grid from "./board/Grid";
import ControlPanel from "./controls/ControlPanel";
import { useMoves } from "../context/movesContext";

type GameProps = {
  game: Game;
};

export default function Game({ game }: GameProps) {
  /** A game of sudoku, including the grid and the controls. */
  // Set the initially active cell to a non-existent one
  const initialActiveCell = {
    row: -1,
    column: -1,
    tile: -1,
    value: -1,
    isClueCell: null,
  };
  const [activeCell, setActiveCell] = useState<ActiveCell>(initialActiveCell);

  // Set the initial game mode (validation is on)
  const [validationIsOn, setValidationIsOn] = useState<boolean>(true);

  // Combine the moves received from the API with the moves held in state
  const stateMoves = useMoves();
  const moves = useMemo(() => {
    return combineAllMoves(stateMoves, game.moves, game.sudoku.size);
  }, [stateMoves, game.moves, game.sudoku.size]);

  // Check if the sudoku has been solved
  const isSolved = useMemo(() => {
    return sudokuIsSolved(moves, game.sudoku);
  }, [moves, game.sudoku]);

  return (
    <div className={"game-container"}>
      <div className={"game-info"}>
        difficulty: <b>{game.sudoku.difficulty.toLowerCase()}</b>
      </div>
      <div className={"game"}>
        <Grid
          sudoku={game.sudoku}
          moves={moves}
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

function combineAllMoves(
  stateMoves: Array<MoveDetail>,
  existingMoves: Array<APIMove>,
  sudokuSize: number
): Array<Array<number | null>> {
  /** Combine the moves received from the API with the moves held in state */
  // Create initial data structure for moves (an array of rows, which are also arrays)
  const rows = [];
  for (let rowIndex = 0; rowIndex < sudokuSize; rowIndex++) {
    rows.push(new Array(sudokuSize).fill(null));
  }

  // Add the moves received over the API
  for (const move of existingMoves) {
    if (!move.is_erased) {
      rows[move.row][move.column] = move.value;
    }
  }

  // Add the moves held in state
  // Note the last move for any index will overwrite all previous values,
  // including more recent moves with `isErased: true`
  for (const move of stateMoves) {
    rows[move.row][move.column] = move.value;
  }
  return rows;
}

function sudokuIsSolved(
  moves: Array<Array<number | null>>,
  sudoku: Sudoku
): boolean {
  /** Check if the player has found the correct solution for the sudoku */
  for (let rowIndex = 0; rowIndex < sudoku.size; rowIndex++) {
    for (let colIndex = 0; colIndex < sudoku.size; colIndex++) {
      if (sudoku.problem[rowIndex][colIndex]) {
        continue;
      }
      const move = moves[rowIndex][colIndex];
      if (move === null) {
        return false;
      } else if (move !== sudoku.solution[rowIndex][colIndex]) {
        return false;
      }
    }
  }
  return true;
}
