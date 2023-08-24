import { ActionFunctionMap, assign } from "xstate";
import { GameAction, GameContextProps, GameEventProps } from "./types";
import * as types from "./types";
import { initialActiveCell } from "./initial";

// TODO -> pick
// TODO -> condition for some actions

export const actions: ActionFunctionMap<GameContextProps, GameEventProps> = {
  [GameAction.SET_ACTIVE_GAME]: assign({
    game: (_, event: types.SetActiveGameEvent) => {
      return event.data;
    },
  }),
  [GameAction.CLEAR_ACTIVE_CELL]: assign({
    activeCell: () => initialActiveCell,
  }),
  [GameAction.SET_ACTIVE_CELL]: assign({
    activeCell: (_, event: types.SetActiveCellEvent) => {
      return event.cell;
    },
  }),
  [GameAction.MAKE_MOVE]: assign({
    game: (context, event: types.MakeMoveEvent) => ({
      ...context.game,
      moves: [event.move, ...context.game.moves],
    }),
    // TODO -> conditionally transition to completed
  }),
};
