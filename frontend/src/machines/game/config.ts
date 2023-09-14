import { MachineConfig } from "xstate";

import * as types from "./types";
import { GameAction, GameContextProps, GameEventProps } from "./types";
import { services } from "./services";

export const config: MachineConfig<GameContextProps, any, GameEventProps> = {
  id: "game",
  initial: types.GameState.LOADING_ACTIVE_GAME,
  predictableActionArguments: true,
  states: {
    [types.GameState.LOADING_ACTIVE_GAME]: {
      invoke: {
        id: "load-active-game",
        src: services.getOrCreateActiveGame,
        onDone: {
          target: types.GameState.PLAYING,
          actions: [GameAction.SET_ACTIVE_GAME],
          // TODO -> onError
        },
      },
    },
    [types.GameState.LOADING_NEW_GAME]: {
      invoke: {
        id: "load-new-game",
        src: services.createNextGame,
        onDone: {
          target: types.GameState.PLAYING,
          actions: [GameAction.CLEAR_ACTIVE_CELL, GameAction.SET_ACTIVE_GAME],
          // TODO -> onError
        },
      },
    },
    [types.GameState.PLAYING]: {
      on: {
        [types.GameEvent.LOAD_NEW_GAME]: {
          target: types.GameState.LOADING_NEW_GAME,
        },
        [types.GameEvent.SET_ACTIVE_CELL]: {
          actions: [GameAction.SET_ACTIVE_CELL],
        },
        [types.GameEvent.MAKE_MOVE]: {
          actions: [GameAction.MAKE_MOVE],
          // TODO -> record move in the BE
        },
        [types.GameEvent.ERASE_MOVE]: {
          actions: [GameAction.ERASE_MOVE],
          // TODO -> record move in the BE
        },
        [types.GameEvent.UNDO_MOVE]: {
          actions: [GameAction.UNDO_MOVE],
          // TODO -> record move in the BE
        },
      },
    },
    [types.GameState.COMPLETED]: {},
  },
};
