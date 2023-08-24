import { MachineConfig } from "xstate";

import * as types from "./types";
import { initialContext } from "./initial";
import { GameAction, GameContextProps, GameEventProps } from "./types";
import { gameServices } from "./gameServices";

export const config = ({
  ipAddress,
}: {
  ipAddress: string;
}): MachineConfig<GameContextProps, any, GameEventProps> => ({
  id: "game",
  initial: types.GameState.LOADING,
  predictableActionArguments: true,
  context: { ...initialContext, ipAddress: ipAddress },
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
});
