import activeGameData from "../../data/activeGameData.json";
import { SudokuDifficulty, SudokuSize } from "../../../utils/constants";
import newHardGame from "../../data/newHardGame.json";
import newEasyGame from "../../data/newEasyGame.json";
import newSizeFourGame from "../../data/newSizeFourGame.json";
import { APIClient } from "../useAPI";

export default class RestAPIClient implements APIClient {
  /** Mock API client used for testing. */

  // API calls
  async getOrCreateActiveGame({
    ipAddress,
  }: {
    ipAddress: string;
  }): Promise<Game> {
    /** Load a dummy active game from the filesystem. */
    ipAddress; // To appease ESLint.
    return Promise.resolve({
      id: activeGameData.id,
      sudoku: activeGameData.sudoku,
      moves: activeGameData.moves,
      started_at: activeGameData.started_at,
    });
  }

  async createNextGame({
    difficulty,
    size,
    ipAddress,
  }: {
    ipAddress: string;
    difficulty: SudokuDifficulty;
    size: SudokuSize;
  }): Promise<Game> {
    /** Load a dummy next game from the filesystem. */
    ipAddress; // To appease ESLint.
    let newGameData = newHardGame;
    if (size === SudokuSize.Four) {
      newGameData = newSizeFourGame;
    } else if (difficulty === SudokuDifficulty.Easy) {
      newGameData = newEasyGame;
    }
    return Promise.resolve({
      sudoku: newGameData.sudoku,
      moves: newGameData.moves,
      started_at: newGameData.started_at,
    });
  }

  async makeMove({
    gameId,
    numberInGame,
    row,
    column,
    value,
  }: {
    gameId: number;
    numberInGame: number;
    row: number;
    column: number;
    value: number | null;
  }): Promise<void> {
    gameId && numberInGame && row && column && value; // To appease ESLint.
    return;
  }

  async undoMove({
    gameId,
    numberInGame,
  }: {
    gameId: number;
    numberInGame: number;
  }): Promise<void> {
    gameId && numberInGame; // To appease ESLint.
    return;
  }
}
