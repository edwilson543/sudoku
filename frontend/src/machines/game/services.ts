import * as types from "./types";
import RestAPIClient from "../../services/apiClient/RestAPIClient";

export const services = {
  getOrCreateActiveGame: (context: types.GameContextProps) => {
    const apiClient = new RestAPIClient(context.ipAddress);
    return apiClient.getOrCreateActiveGame();
  },
};
