import activeGameData from "../../data/activeGameData.json";
import { SudokuDifficulty, SudokuSize } from "../../../utils/constants";
import newGameData from "../../data/newGameData.json";
import { APIClient } from "../useAPI";

export default class RestAPIClient implements APIClient {
  /** Mock API client used for testing. */

  private playerIpAddress: string;

  constructor(playerIpAddress: string) {
    // Match the signature of the actual REST client
    this.playerIpAddress = playerIpAddress;
  }

  // API calls
  async getOrCreateActiveGame(): Promise<Game> {
    /** Load a dummy active game from the filesystem. */
    return new Promise(function (resolve, reject) {
      resolve({
        sudoku: activeGameData.sudoku,
        moves: activeGameData.moves,
        started_at: activeGameData.started_at,
      });
      reject();
    });
  }

  async createNextGame(
    difficulty: SudokuDifficulty,
    size: SudokuSize
  ): Promise<Game> {
    /** Load a dummy next game from the filesystem. */
    difficulty; // To appease ESLint.
    size; // To appease ESLint.
    return new Promise(function (resolve, reject) {
      resolve({
        sudoku: newGameData.sudoku,
        moves: newGameData.moves,
        started_at: newGameData.started_at,
      });
      reject();
    });
  }

  async makeMove(
    numberInGame: number,
    row: number,
    column: number,
    value: number | null
  ): Promise<void> {
    numberInGame && row && column && value; // To appease ESLint.
    return;
  }

  async undoMove(numberInGame: number): Promise<void> {
    numberInGame; // To appease ESLint.
    return;
  }
}
