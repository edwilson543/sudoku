import React, { useState } from "react";

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
  const sudokuRank = `${Math.sqrt(sudoku.size)}`;

  const startNewGame = (
    difficulty: SudokuDifficulty,
    size: SudokuSize
  ): void => {
    send({ type: GameEvent.LOAD_NEW_GAME, difficulty: difficulty, size: size });
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
        <Grid validationIsOn={validationIsOn} />
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
