import { createContext, useContext } from "react";
import { SudokuDifficulty } from "../../utils/constants";

// Context

export const APIClientContext = createContext<APIClient | null>(null);

export default function useAPI(): APIClient {
  /** Helper to access the API client when one is available in context */
  const client = useContext(APIClientContext);
  if (!client) {
    throw Error("API client can only be used within a context provider.");
  }
  return client;
}

// Interface

export interface APIClient {
  /** API client used to persist game actions and for game continuation. */
  getOrCreateActiveGame(): Promise<Game>;

  createNextGame(difficulty: SudokuDifficulty): Promise<Game>;

  makeMove(
    numberInGame: number,
    row: number,
    column: number,
    value: number | null
  ): Promise<void>;

  undoMove(numberInGame: number): Promise<void>;
}
