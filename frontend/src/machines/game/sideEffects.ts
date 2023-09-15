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
    const apiClient = new RestAPIClient(context.ipAddress);
    return apiClient.makeMove(
      context.game.moves.length,
      event.row,
      event.column,
      event.value
    );
  },
};
