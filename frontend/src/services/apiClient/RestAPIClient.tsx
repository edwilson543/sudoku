import { SudokuDifficulty } from "../../utils/constants";
import { APIClient } from "./useAPI";

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

  constructor(playerIpAddress: string) {
    /** Store the player's IP address and the game ID
     * These are used for player & game identification when communicating with the REST API.
     * */
    this.playerIpAddress = playerIpAddress;
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
        return response.json() as unknown as APIGame;
      })
      .then((data) => {
        this.gameId = data.id;
        return {
          sudoku: data.sudoku,
          moves: data.moves,
          started_at: data.started_at,
        };
      });
  }

  async createNextGame(difficulty: SudokuDifficulty): Promise<Game> {
    /** Get a new game for the active player. */
    const payload = {
      ip_address: this.playerIpAddress,
      difficulty: difficulty,
    };
    return this.postRequest(RestAPIEndpoint.NextGame, payload)
      .then((response) => {
        return response.json() as unknown as APIGame;
      })
      .then((data) => {
        this.gameId = data.id;
        return {
          sudoku: data.sudoku,
          moves: data.moves,
          started_at: data.started_at,
        };
      });
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

interface APIGame {
  id: number;
  sudoku: Sudoku;
  moves: Array<MoveDetail>;
  started_at: string;
}
