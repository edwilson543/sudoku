import { ActionFunctionMap } from "xstate";
import * as types from "./types";
import RestAPIClient from "../../services/apiClient/RestAPIClient";

export const sideEffects: ActionFunctionMap<
  types.GameContextProps,
  types.GameEventProps
> = {
  [types.SideEffect.RECORD_MAKE_MOVE]: async (
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
};
