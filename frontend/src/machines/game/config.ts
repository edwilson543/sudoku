import { MachineConfig } from "xstate";

import * as types from "./types";
import { services } from "./services";
import { GameState } from "./types";

export const config: MachineConfig<
  types.GameContextProps,
  any,
  types.GameEventProps
> = {
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
          actions: [types.GameAction.SET_ACTIVE_GAME],
        },
        onError: {
          target: types.GameState.UNAVAILABLE,
        },
      },
    },
    [types.GameState.LOADING_NEW_GAME]: {
      invoke: {
        id: "load-new-game",
        src: services.createNextGame,
        onDone: {
          target: types.GameState.PLAYING,
          actions: [
            types.GameAction.CLEAR_ACTIVE_CELL,
            types.GameAction.SET_ACTIVE_GAME,
          ],
        },
        onError: {
          target: GameState.UNAVAILABLE,
        },
      },
    },
    [types.GameState.UNAVAILABLE]: {},
    [types.GameState.PLAYING]: {
      on: {
        [types.GameEvent.LOAD_NEW_GAME]: {
          target: types.GameState.LOADING_NEW_GAME,
        },
        [types.GameEvent.SET_ACTIVE_CELL]: {
          actions: [types.GameAction.SET_ACTIVE_CELL],
        },
        [types.GameEvent.MAKE_MOVE]: {
          actions: [
            types.GameAction.MAKE_MOVE,
            types.SideEffect.RECORD_MOVE_MADE,
            types.GameAction.CALCULATE_MOVES_GRID,
          ],
          target: GameState.CHECKING,
        },
        [types.GameEvent.ERASE_MOVE]: {
          actions: [
            types.GameAction.ERASE_MOVE,
            types.SideEffect.RECORD_MOVE_ERASED,
            types.GameAction.CALCULATE_MOVES_GRID,
          ],
        },
        [types.GameEvent.UNDO_MOVE]: {
          actions: [
            types.GameAction.UNDO_MOVE,
            types.SideEffect.RECORD_MOVE_UNDONE,
            types.GameAction.CALCULATE_MOVES_GRID,
          ],
        },
      },
    },
    [types.GameState.CHECKING]: {
      always: [
        {
          target: types.GameState.SOLVED,
          cond: types.Guard.SUDOKU_IS_SOLVED,
        },
        { target: types.GameState.PLAYING },
      ],
    },
    [types.GameState.SOLVED]: {
      on: {
        [types.GameEvent.LOAD_NEW_GAME]: {
          target: types.GameState.LOADING_NEW_GAME,
        },
      },
    },
  },
};
