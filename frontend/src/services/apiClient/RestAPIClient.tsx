import { SudokuDifficulty, SudokuSize } from "../../utils/constants";
import { APIClient } from "./useAPI";

const frontendAPIKey = "_9)*jy)3d=c84v7zl)-=s2=0m*(+_duv24zme2417nwjszb#u%";

const baseUrl = "http://127.0.0.1:8000/rest-api/game/";

enum RestAPIEndpoint {
  ActiveGame = "active/",
  NextGame = "next/",
  MakeMove = "make-move/",
  UndoLastMove = "undo-move/",
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

  // TODO -> remove these

  // API calls

  async getOrCreateActiveGame(): Promise<Game> {
    /** Get the currently active game for some player */
    const payload = {
      ip_address: this.playerIpAddress,
    };
    const absoluteUrl = baseUrl + RestAPIEndpoint.ActiveGame;
    return this.postRequest(absoluteUrl, payload)
      .then((response) => {
        return response.json() as unknown as APIGame;
      })
      .then((data) => {
        this.gameId = data.id;
        return {
          sudoku: data.sudoku,
          moves: normalizeAPIMoves(data.moves),
          started_at: data.started_at,
        };
      });
  }

  async createNextGame(
    difficulty: SudokuDifficulty,
    size: SudokuSize
  ): Promise<Game> {
    /** Get a new game for the active player. */
    const payload = {
      ip_address: this.playerIpAddress,
      difficulty: difficulty,
      size: size,
    };
    const absoluteUrl = baseUrl + RestAPIEndpoint.NextGame;
    return this.postRequest(absoluteUrl, payload)
      .then((response) => {
        return response.json() as unknown as APIGame;
      })
      .then((data) => {
        this.gameId = data.id;
        return {
          sudoku: data.sudoku,
          moves: normalizeAPIMoves(data.moves),
          started_at: data.started_at,
        };
      });
  }

  async makeMove(
    numberInGame: number,
    row: number,
    column: number,
    value: number | null
  ): Promise<void> {
    const payload = {
      number_in_game: numberInGame,
      row: row,
      column: column,
      value: value,
    };
    const absoluteUrl = baseUrl + `${this.gameId}/` + RestAPIEndpoint.MakeMove;
    this.postRequest(absoluteUrl, payload);
  }

  async undoMove(numberInGame: number): Promise<void> {
    const payload = {};
    const absoluteUrl =
      baseUrl +
      `${this.gameId}/` +
      RestAPIEndpoint.UndoLastMove +
      `${numberInGame}/`;
    this.postRequest(absoluteUrl, payload);
  }

  // Helpers

  private async postRequest(
    absoluteUrl: string,
    payload: object
  ): Promise<Response> {
    /** Send a POST request to the backend with the payload as JSON. */
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
}

// Interfaces for the payloads received from the REST API

interface APIGame {
  id: number;
  sudoku: Sudoku;
  moves: Array<APIMove>;
  started_at: string;
}

interface APIMove {
  row: number;
  column: number;
  value: number | null;
  is_undone: boolean;
}

// Helpers

function normalizeAPIMoves(moves: Array<APIMove>): Array<MoveDetail> {
  /** Convert moves received form the REST api into the type used in the frontend. */
  return moves.map((move) => {
    return {
      row: move.row,
      column: move.column,
      value: move.value,
      isUndone: move.is_undone,
    };
  });
}
