import { MachineConfig } from "xstate";

import * as types from "./types";
import { GameAction, GameContextProps, GameEventProps } from "./types";
import { gameServices } from "./gameServices";

export const config: MachineConfig<GameContextProps, any, GameEventProps> = {
  id: "game",
  initial: types.GameState.LOADING,
  predictableActionArguments: true,
  states: {
    [types.GameState.LOADING]: {
      invoke: {
        id: "active-game",
        src: gameServices.getOrCreateActiveGame,
        onDone: {
          target: types.GameState.PLAYING,
          actions: [GameAction.SET_ACTIVE_GAME],
          // TODO -> onError
        },
      },
    },
    [types.GameState.PLAYING]: {
      on: {
        [types.GameEvent.MAKE_MOVE]: {
          actions: [GameAction.MAKE_MOVE],
        },
        [types.GameEvent.SET_ACTIVE_CELL]: {
          actions: [GameAction.SET_ACTIVE_CELL],
        },
      },
    },
    [types.GameState.COMPLETED]: {},
  },
};
