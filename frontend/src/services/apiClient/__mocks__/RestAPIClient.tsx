import activeGameData from "../../data/activeGameData.json";
import { SudokuDifficulty } from "../../../utils/constants";
import newGameData from "../../data/newGameData.json";
import { APIClient } from "../useAPI";

export default class RestAPIClient implements APIClient {
  /** Mock API client used for testing. */

  // API calls
  async getOrCreateActiveGame(): Promise<Game> {
    /** Get the currently active game for some player. */
    return new Promise(function (resolve, reject) {
      resolve({
        sudoku: activeGameData.sudoku,
        moves: activeGameData.moves,
        started_at: activeGameData.started_at,
      });
      reject();
    });
  }

  async createNextGame(difficulty: SudokuDifficulty): Promise<Game> {
    /** Get a new game for the active player. */
    difficulty; // Do nothing with the difficulty.
    return new Promise(function (resolve, reject) {
      resolve({
        sudoku: newGameData.sudoku,
        moves: newGameData.moves,
        started_at: newGameData.started_at,
      });
      reject();
    });
  }
}
