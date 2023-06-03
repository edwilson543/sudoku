import data from "./tempData.json";
import newGame from "./newGameData.json";
import { SudokuDifficulty } from "../utils/constants";

export default class RestAPIClient {
  // private gameId: number;
  // private playerIpAddress: string;

  /** REST API client used to persist game actions and for game continuation */
  // constructor(gameId: number, playerIpAddress: string) {
  //   this.gameId = gameId;
  //   this.playerIpAddress = playerIpAddress;
  // }

  getOrCreateActiveGame(): Game {
    /** Get the currently active game for some player */
    return {
      sudoku: data.sudoku,
      moves: normalizeAPIMoves(data.moves),
      started_at: data.started_at,
    };
  }

  createNextGame(difficulty: SudokuDifficulty): Game {
    /** Get a new game for some player */
    difficulty; // Todo -> remove once actually making an API call
    return {
      sudoku: newGame.sudoku,
      moves: normalizeAPIMoves(data.moves),
      started_at: data.started_at,
    };
  }
}

interface APIMove {
  // Moves in the structure received from the REST API
  id: number;
  row: number;
  column: number;
  value: number;
  is_correct: boolean;
  is_erased: boolean;
}

function normalizeAPIMoves(moves: Array<APIMove>): Array<MoveDetail> {
  /** Convert moves from the type received by the API to the type used in the game */
  return moves.map((move) => {
    return {
      row: move.row,
      column: move.column,
      value: move.value,
      isCorrect: move.is_correct,
      isErased: move.is_erased,
    };
  });
}
