import { ActionFunctionMap, assign } from "xstate";
import * as types from "./types";
import { initialActiveCell } from "./initial";

// TODO -> pick

export const actions: ActionFunctionMap<
  types.GameContextProps,
  types.GameEventProps
> = {
  [types.GameAction.SET_ACTIVE_GAME]: assign({
    game: (_, event: types.SetActiveGameEvent) => {
      return event.data;
    },
  }),
  [types.GameAction.CLEAR_ACTIVE_CELL]: assign({
    activeCell: () => initialActiveCell,
  }),
  [types.GameAction.SET_ACTIVE_CELL]: assign({
    activeCell: (_, event: types.SetActiveCellEvent) => {
      return event.cell;
    },
  }),
  [types.GameAction.MAKE_MOVE]: assign({
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
  [types.GameAction.ERASE_MOVE]: assign({
    game: (context, event: types.EraseMoveEvent) => ({
      ...context.game,
      moves: [
        ...context.game.moves,
        { row: event.row, column: event.column, value: null, isUndone: false },
      ],
    }),
  }),
  [types.GameAction.UNDO_MOVE]: assign({
    game: (context, event: types.UndoMoveEvent) => ({
      ...context.game,
      moves: undoMove(context.game.moves, event.moveNumberToUndo),
    }),
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
