import React, { useState } from "react";

import Grid from "./board/Grid";
import ControlPanel from "./controls/ControlPanel";
import ColourThemeToggle from "./controls/ColourThemeToggle";
import { useGameMachine } from "../machines/game";
import { GameState } from "../machines/game/types";
import { useActor } from "@xstate/react";
import { GameMachineContext, useGameMachineContext } from "../context/context";

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
  const { current } = useGameMachineContext();

  // Set the initial game mode (validation is on)
  const [validationIsOn, setValidationIsOn] = useState<boolean>(true);

  // Helpers
  const sudoku = current.context.game.sudoku;
  const sudokuRank = `${Math.sqrt(sudoku.size)}`;

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
          validationIsOn={validationIsOn}
          setValidationIsOn={setValidationIsOn}
        />
      </div>
    </div>
  );
}
