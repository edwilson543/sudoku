import { useContext, createContext } from "react";

import activeGameData from "../data/activeGameData.json";
import newGameData from "../data/newGameData.json";
import { SudokuDifficulty } from "../../utils/constants";
import { APIInterface, normalizeAPIMoves } from "./utils";
import getPlayerIpAddress from "../profile";

/**
 * Todo -
 - Enum for the endpoints
 */

export const RestAPIClientContext = createContext<RestAPIClient | null>(null);

export function useRestAPI(): RestAPIClient {
  /** Helper to access the rest API client when one is available in context */
  const restClient = useContext(RestAPIClientContext);
  if (!restClient) {
    throw Error("Rest client can only be used within a context provider.");
  }
  return restClient;
}

export class RestAPIClient implements APIInterface {
  /** API client for the backend REST API. */
  private playerIpAddress: string;
  private gameId: number | null;

  constructor() {
    /**
     * Get the player's IP address and game ID. These are used in most payloads.
     * */
    this.playerIpAddress = "";
    getPlayerIpAddress().then((playerIpAddress) => {
      this.playerIpAddress = playerIpAddress;
    });
    this.gameId = null;
  }

  // API calls

  getOrCreateActiveGame(): Game {
    /** Get the currently active game for some player */
    const game = {
      sudoku: activeGameData.sudoku,
      moves: normalizeAPIMoves(activeGameData.moves),
      started_at: activeGameData.started_at,
    };
    this.gameId = activeGameData.id;
    return game;
  }

  createNextGame(difficulty: SudokuDifficulty): Game {
    /** Get a new game for some player */
    difficulty; // Todo -> remove once actually making an API call
    const newGame = {
      sudoku: newGameData.sudoku,
      moves: normalizeAPIMoves(activeGameData.moves),
      started_at: activeGameData.started_at,
    };
    this.gameId = newGameData.id;
    return newGame;
  }
}
