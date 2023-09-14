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
      moves: [...context.game.moves, event.move],
    }),
    // Need to update the activeCell's value of the activeCell state
    activeCell: (context, event: types.MakeMoveEvent) => {
      return { ...context.activeCell, value: event.move.value };
    },
    // TODO -> conditionally transition to completed
  }),
  [GameAction.ERASE_MOVE]: assign({
    game: (context, event: types.EraseMoveEvent) => ({
      ...context.game,
      moves: [
        ...context.game.moves,
        { row: event.row, column: event.column, value: null, isUndone: false },
      ],
    }),
    // TODO -> maybe set activeCell value to null
  }),
};
