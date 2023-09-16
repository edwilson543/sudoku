import { ActionFunctionMap } from "xstate";
import * as types from "./types";
import RestAPIClient from "../../services/apiClient/RestAPIClient";

export const sideEffects: ActionFunctionMap<
  types.GameContextProps,
  types.GameEventProps
> = {
  [types.SideEffect.RECORD_MOVE_MADE]: async (
    context,
    event: types.MakeMoveEvent
  ) => {
    const apiClient = new RestAPIClient();
    return apiClient.makeMove({
      gameId: context.game.id,
      numberInGame: context.game.moves.length,
      row: event.row,
      column: event.column,
      value: event.value,
    });
  },
  [types.SideEffect.RECORD_MOVE_ERASED]: async (
    context,
    event: types.EraseMoveEvent
  ) => {
    const apiClient = new RestAPIClient();
    return apiClient.makeMove({
      gameId: context.game.id,
      numberInGame: context.game.moves.length,
      row: event.row,
      column: event.column,
      value: null,
    });
  },
  [types.SideEffect.RECORD_MOVE_UNDONE]: async (context) => {
    const apiClient = new RestAPIClient();
    return apiClient.undoMove({
      gameId: context.game.id,
      numberInGame: context.game.moves.length,
    });
  },
};
