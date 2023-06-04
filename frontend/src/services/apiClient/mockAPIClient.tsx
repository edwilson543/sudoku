import activeGameData from "../data/activeGameData.json";
import { SudokuDifficulty } from "../../utils/constants";
import newGameData from "../data/newGameData.json";
import { APIInterface, normalizeAPIMoves } from "./utils";

class MockRestAPIClient implements APIInterface {
  /** Mock API client used for testing. */

  // API calls
  getOrCreateActiveGame(): Game {
    /** Get the currently active game for some player. */
    return {
      sudoku: activeGameData.sudoku,
      moves: normalizeAPIMoves(activeGameData.moves),
      started_at: activeGameData.started_at,
    };
  }

  createNextGame(difficulty: SudokuDifficulty): Game {
    /** Get a new game for some player. */
    difficulty; // Do nothing with the difficulty.
    return {
      sudoku: newGameData.sudoku,
      moves: normalizeAPIMoves(activeGameData.moves),
      started_at: activeGameData.started_at,
    };
  }
}
