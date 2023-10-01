import * as types from "./types";
import RestAPIClient from "../../services/apiClient/RestAPIClient";

export const services = {
  getOrCreateActiveGame: (context: types.GameContextProps) => {
    const apiClient = new RestAPIClient();
    return apiClient.getOrCreateActiveGame({ ipAddress: context.ipAddress });
  },
  createNextGame: (
    context: types.GameContextProps,
    event: types.GameEventProps
  ) => {
    const apiClient = new RestAPIClient();
    return apiClient.createNextGame({
      ipAddress: context.ipAddress,
      difficulty: (event as types.LoadNewGameEvent).difficulty,
      size: (event as types.LoadNewGameEvent).size,
    });
  },
};
