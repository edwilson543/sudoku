import activeGameData from "../../data/activeGameData.json";
import { SudokuDifficulty, SudokuSize } from "../../../utils/constants";
import newHardGame from "../../data/newHardGame.json";
import newEasyGame from "../../data/newEasyGame.json";
import newSizeFourGame from "../../data/newSizeFourGame.json";
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
    let newGameData = newHardGame;
    if (size === SudokuSize.Four) {
      newGameData = newSizeFourGame;
    } else if (difficulty === SudokuDifficulty.Easy) {
      newGameData = newEasyGame;
    }
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
