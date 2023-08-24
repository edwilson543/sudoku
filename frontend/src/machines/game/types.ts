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

export type GameContextProps = {
  game: Game;
  activeCell: ActiveCell;
  ipAddress: string;
};

// Actions

export enum GameAction {
  MAKE_MOVE = "MAKE_MOVE",
  SET_ACTIVE_CELL = "SET_ACTIVE_CELL",
  SET_ACTIVE_GAME = "SET_ACTIVE_GAME",
}

// Events

export enum GameEvent {
  MAKE_MOVE = "MAKE_MOVE",
  SET_ACTIVE_CELL = "SET_ACTIVE_CELL",
  SET_ACTIVE_GAME = "SET_ACTIVE_GAME",
}

export type SetActiveGameEvent = {
  type: GameEvent.SET_ACTIVE_GAME;
  data: Game;
};

export type SetActiveCellEvent = {
  type: GameEvent.SET_ACTIVE_CELL;
  cell: ActiveCell;
};

export type MakeMoveEvent = {
  type: GameEvent.MAKE_MOVE;
  move: Move;
};

export type GameEventProps =
  | SetActiveGameEvent
  | SetActiveCellEvent
  | MakeMoveEvent;

// States

export enum GameState {
  LOADING = "LOADING",
  PLAYING = "PLAYING",
  COMPLETED = "COMPLETED",
}
