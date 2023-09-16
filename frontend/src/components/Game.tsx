import React, { useState, useMemo } from "react";

import Grid from "./board/Grid";
import ControlPanel from "./controls/ControlPanel";
import ColourThemeToggle from "./controls/ColourThemeToggle";
import { SudokuDifficulty, SudokuSize } from "../utils/constants";
import { useGameMachine } from "../machines/game";
import { GameEvent, GameState } from "../machines/game/types";
import { useActor } from "@xstate/react";
import {
  GameMachineContext,
  useInterpretedGameContext,
} from "../context/context";

export type GameWrapperProps = {
  toggleDarkMode: () => void;
  ipAddress: string;
};

export function GameWrapper({ toggleDarkMode, ipAddress }: GameWrapperProps) {
  const gameMachine = useGameMachine({ ipAddress });
  const [current] = useActor(gameMachine);
  const ready = !current.matches(GameState.LOADING_ACTIVE_GAME);
  return (
    <>
      {ready && (
        <GameMachineContext.Provider value={gameMachine}>
          <Game toggleDarkMode={toggleDarkMode} />
        </GameMachineContext.Provider>
      )}
    </>
  );
}

type GameProps = {
  toggleDarkMode: () => void;
};

function Game({ toggleDarkMode }: GameProps) {
  /** A game of sudoku, including the grid and the controls. */
  const { current, send } = useInterpretedGameContext();

  // Set the initial game mode (validation is on)
  const [validationIsOn, setValidationIsOn] = useState<boolean>(true);

  // Helpers
  const sudoku = current.context.game.sudoku;
  const moves = current.context.game.moves;
  const sudokuRank = `${Math.sqrt(sudoku.size)}`;

  // Transform the moves array into a grid only showing the currently active moves
  const movesGrid = useMemo(() => {
    return structureMovesAsGrid(sudoku.size, moves);
  }, [moves, sudoku]);

  const startNewGame = (
    difficulty: SudokuDifficulty,
    size: SudokuSize
  ): void => {
    send({ type: GameEvent.LOAD_NEW_GAME, difficulty: difficulty, size: size });
  };

  const setActiveCell = (cell: ActiveCell): void => {
    send({ type: GameEvent.SET_ACTIVE_CELL, cell: cell });
  };

  return (
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
        />
        <ControlPanel
          sudokuSize={sudoku.size}
          startNewGame={startNewGame}
          validationIsOn={validationIsOn}
          setValidationIsOn={setValidationIsOn}
        />
      </div>
    </div>
  );
}

// Helpers

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
