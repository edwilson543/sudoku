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
  isUndone: boolean;
};

type ActiveCell = {
  row: number;
  column: number;
  tile: number;
  value: number | null;
  isClueCell: boolean | null;
};

export type Game = {
  game_id: number;
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
  SET_ACTIVE_CELL = "SET_ACTIVE_CELL",
}

export type MakeMoveEvent = {
  type: GameEvent.MAKE_MOVE;
  move: Move;
};

export type SetActiveCellEvent = {
  type: GameEvent.SET_ACTIVE_CELL;
  cell: ActiveCell;
};

export type EventProps = MakeMoveEvent | SetActiveCellEvent;

// States

export enum GameState {
  LOADING = "LOADING",
  PLAYING = "PLAYING",
  COMPLETED = "COMPLETED",
}
