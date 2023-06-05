import activeGameData from "../data/activeGameData.json";
import newGameData from "../data/newGameData.json";
import { SudokuDifficulty } from "../../utils/constants";
import { APIClient } from "./useAPI";
import getPlayerIpAddress from "../profile";

const frontendAPIKey = "_9)*jy)3d=c84v7zl)-=s2=0m*(+_duv24zme2417nwjszb#u%";

const baseUrl = "http://127.0.0.1:8000/rest-api/game/";

enum RestAPIEndpoint {
  ActiveGame = "active/",
  NextGame = "next/",
  MakeMove = "make-move/",
  UndoLastMove = "undo-last-move/",
}

export default class RestAPIClient implements APIClient {
  /** API client for the backend REST API. */
  private playerIpAddress: string;
  private gameId: number | null;

  constructor() {
    /** Store the player's IP address and the game ID
     * These are used for player & game identification when communicating with the REST API.
     * */
    this.playerIpAddress = "";
    getPlayerIpAddress().then((playerIpAddress) => {
      this.playerIpAddress = playerIpAddress;
    });
    this.gameId = null;
  }

  // API calls

  async getOrCreateActiveGame(): Promise<Game> {
    /** Get the currently active game for some player */
    const payload = {
      ip_address: this.playerIpAddress,
    };
    return this.postRequest(RestAPIEndpoint.ActiveGame, payload)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.gameId = data.game_id;
      })
      .then((data) => {
        return data as unknown as Game;
      });
  }

  createNextGame(difficulty: SudokuDifficulty): Game {
    /** Get a new game for some player */
    difficulty; // Todo -> remove once actually making an API call
    const newGame = {
      sudoku: newGameData.sudoku,
      moves: [],
      started_at: activeGameData.started_at,
    };
    this.gameId = newGameData.id;
    return newGame;
  }

  // Helpers

  private async postRequest(
    endpoint: RestAPIEndpoint,
    payload: object
  ): Promise<Response> {
    /** Send a POST request to the backend with the payload as JSON. */
    const absoluteUrl = this.getAbsoluteUrl(endpoint);
    const request = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: frontendAPIKey,
        "Frontend-Api-Key": frontendAPIKey,
      },
      body: JSON.stringify(payload),
    };
    return fetch(absoluteUrl, request);
  }

  private getAbsoluteUrl(name: RestAPIEndpoint): string {
    /** Get the url to which the REST client should send its request */
    switch (name) {
      case RestAPIEndpoint.ActiveGame:
      case RestAPIEndpoint.NextGame: {
        return baseUrl + name;
      }
      case RestAPIEndpoint.MakeMove:
      case RestAPIEndpoint.UndoLastMove: {
        return baseUrl + `${this.gameId}/` + name;
      }
    }
  }
}
