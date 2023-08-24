import * as types from "./types";
import RestAPIClient from "../../services/apiClient/RestAPIClient";

export const gameServices = {
  getOrCreateActiveGame: (context: types.GameContextProps) => {
    const apiClient = new RestAPIClient(context.ipAddress);
    return apiClient.getOrCreateActiveGame();
  },
};
