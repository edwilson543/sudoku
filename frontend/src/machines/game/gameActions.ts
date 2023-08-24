import { ActionFunctionMap, assign } from "xstate";
import { GameAction, GameContextProps, GameEventProps } from "./types";
import * as types from "./types";

// TODO -> pick
// TODO -> condition for some actions

export const gameActions: ActionFunctionMap<GameContextProps, GameEventProps> =
  {
    [GameAction.SET_ACTIVE_GAME]: assign({
      game: (_, event: types.SetActiveGameEvent) => {
        console.log("EVENT: ", event);
        console.log("EVENT DATA: ", event.data);
        return event.data;
      },
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
