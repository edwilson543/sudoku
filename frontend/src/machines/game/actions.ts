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
      moves: [
        ...context.game.moves,
        {
          row: event.row,
          column: event.column,
          value: event.value,
          isUndone: false,
        },
      ],
    }),
    // Need to update the activeCell's value of the activeCell state
    activeCell: (context, event: types.MakeMoveEvent) => {
      return { ...context.activeCell, value: event.value };
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
  [GameAction.UNDO_MOVE]: assign({
    game: (context, event: types.UndoMoveEvent) => ({
      ...context.game,
      moves: undoMove(context.game.moves, event.moveNumberToUndo),
    }),
    // TODO -> maybe set activeCell value
  }),
};

function undoMove(moves: types.Move[], moveNumberToUndo: number): types.Move[] {
  const moveToUndo = moves[moveNumberToUndo];
  return [
    ...moves.slice(0, moveNumberToUndo),
    { ...moveToUndo, isUndone: true },
    ...moves.slice(moveNumberToUndo + 1, moves.length),
  ];
}
