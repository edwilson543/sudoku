import { createContext, useContext } from "react";
import { SudokuDifficulty, SudokuSize } from "../../utils/constants";

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
  getOrCreateActiveGame({ ipAddress }: { ipAddress: string }): Promise<Game>;

  createNextGame({
    ipAddress,
    difficulty,
    size,
  }: {
    ipAddress: string;
    difficulty: SudokuDifficulty;
    size: SudokuSize;
  }): Promise<Game>;

  makeMove({
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
  }): Promise<void>;

  undoMove({
    gameId,
    numberInGame,
  }: {
    gameId: number;
    numberInGame: number;
  }): Promise<void>;
}
