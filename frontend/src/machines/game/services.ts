import * as types from "./types";
import RestAPIClient from "../../services/apiClient/RestAPIClient";

export const services = {
  getOrCreateActiveGame: (context: types.GameContextProps) => {
    const apiClient = new RestAPIClient(context.ipAddress);
    return apiClient.getOrCreateActiveGame();
  },
  createNextGame: (
    context: types.GameContextProps,
    event: types.GameEventProps
  ) => {
    const apiClient = new RestAPIClient(context.ipAddress);
    return apiClient.createNextGame(
      (event as types.LoadNewGameEvent).difficulty,
      (event as types.LoadNewGameEvent).size
    );
  },
};
