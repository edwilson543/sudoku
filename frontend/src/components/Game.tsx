import React, { useState, useMemo, SetStateAction } from "react";

import Grid from "./board/Grid";
import ControlPanel from "./controls/ControlPanel";
import ColourThemeToggle from "./controls/ColourThemeToggle";
import { useMoves, useMovesDispatch } from "../context/movesContext";
import { MoveType, SudokuDifficulty, SudokuSize } from "../utils/constants";
import { useGameMachine } from "../machines/game";
import { GameEvent } from "../machines/game/types";
import { useActor } from "@xstate/react";
import { GameMachineContext } from "../context/context";

const initialActiveCell = {
  // The initial active cell is chosen as one that does not exist
  row: -1,
  column: -1,
  tile: -1,
  value: -1,
  isClueCell: null,
};

type GameProps = {
  toggleDarkMode: () => void;
  ipAddress: string;
};

export default function Game({ toggleDarkMode, ipAddress }: GameProps) {
  /** A game of sudoku, including the grid and the controls. */
  const gameMachine = useGameMachine({ ipAddress });
  const [current, send] = useActor(gameMachine);
  const activeGame = {
    game_id: current.context.game.game_id,
    sudoku: current.context.game.sudoku,
    moves: current.context.game.moves,
    started_at: "",
  };

  // Set the initial game mode (validation is on)
  const [validationIsOn, setValidationIsOn] = useState<boolean>(true);

  const sudoku = activeGame.sudoku;

  // Transform the moves array into a grid only showing the currently active moves
  const movesHistory = useMoves();
  const movesGrid = useMemo(() => {
    return structureMovesAsGrid(sudoku.size, movesHistory);
  }, [movesHistory, sudoku]);

  // Check if the sudoku has been solved
  const isSolved = useMemo(() => {
    return sudokuIsSolved(movesGrid, sudoku);
  }, [movesGrid, sudoku]);

  const movesDispatch = useMovesDispatch();
  // const restClient = useAPI();

  const sudokuRank = activeGame ? `${Math.sqrt(activeGame.sudoku.size)}` : null;

  function startNewGame(difficulty: SudokuDifficulty, size: SudokuSize): void {
    /** Start a new game, at the player's discretion */
    // Clear all moves held in state since they were for the old game
    movesDispatch({
      type: MoveType.ClearAll,
    });

    // Clear the currently active cell
    setActiveCell(initialActiveCell); // todo -> make a clear active cell event
  }

  const setActiveCell = (cell: ActiveCell): void => {
    send({ type: GameEvent.SET_ACTIVE_CELL, cell: cell });
  };

  return (
    <GameMachineContext.Provider value={gameMachine}>
      <div className={"game-container"} data-sudoku-rank={sudokuRank}>
        <div className={"game-info-container"}>
          <div className={"game-difficulty"}>
            difficulty: <b>{sudoku.difficulty.toLowerCase()}</b>
          </div>
          <ColourThemeToggle toggleDarkMode={toggleDarkMode} />
        </div>
        <div className={"game"}>
          <Grid
            sudoku={sudoku}
            moves={movesGrid}
            activeCell={current.context.activeCell}
            setActiveCell={setActiveCell}
            validationIsOn={validationIsOn}
            isSolved={isSolved}
          />
          <ControlPanel
            sudokuSize={sudoku.size}
            startNewGame={startNewGame}
            activeCell={current.context.activeCell}
            setActiveCell={setActiveCell}
            validationIsOn={validationIsOn}
            setValidationIsOn={setValidationIsOn}
            isSolved={isSolved}
          />
        </div>
      </div>
    </GameMachineContext.Provider>
  );
}

function structureMovesAsGrid(
  sudokuSize: number,
  movesHistory: Array<MoveDetail>
): Array<Array<number | null>> {
  /** Convert the move history held as an array into the current board state
   *
   * Note the most recent move for any cell will be the one that gets rendered.
   * If the most recent move for a cell has `value: null`, then that cell will
   * appear empty.
   */
  // Create empty grid (an array of arrays representing the rows)
  const rows = [];
  for (let rowIndex = 0; rowIndex < sudokuSize; rowIndex++) {
    rows.push(new Array(sudokuSize).fill(null));
  }

  // Insert each move into the grid
  for (const move of movesHistory) {
    if (!move.isUndone) {
      rows[move.row][move.column] = move.value;
    }
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
