import { SudokuDifficulty } from "../../utils/constants";

// Interfaces

export interface APIInterface {
  /** API client used to persist game actions and for game continuation. */
  getOrCreateActiveGame(): Game;
  createNextGame(difficulty: SudokuDifficulty): Game;
}

interface APIMove {
  /** Moves in the structure received from the REST API. */
  id: number;
  row: number;
  column: number;
  value: number;
  is_correct: boolean;
  is_erased: boolean;
}

// Utility functions

export function normalizeAPIMoves(moves: Array<APIMove>): Array<MoveDetail> {
  /** Convert moves from the type received by the API to the type used in the game. */
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
