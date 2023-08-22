// Context

type Sudoku = {
  problem: Array<Array<number | null>>;
  solution: Array<Array<number>>;
  difficulty: string;
  size: number;
};

type Move = {
  row: number;
  column: number;
  value: number | null;
  is_undone: boolean;
};

type ActiveCell = {
  row: number;
  column: number;
  tile: number;
  value: number | null;
  isClueCell: boolean | null;
};

export type Game = {
  gameId: number;
  sudoku: Sudoku;
  moves: Move[];
};

export type ContextProps = {
  game: Game;
  activeCell: ActiveCell;
  ipAddress: string;
};

// Events

export enum GameEvent {
  MAKE_MOVE = "MAKE_MOVE",
  GAME_COMPLETE = "GAME_COMPLETE",
}

export type MakeMoveEvent = {
  type: GameEvent.MAKE_MOVE;
  move: Move;
};

export type EventProps = any;

// States

export enum GameState {
  LOADING = "LOADING",
  PLAYING = "PLAYING",
}
