// Context

import { SudokuDifficulty, SudokuSize } from "../../utils/constants";

type Sudoku = {
  problem: Array<Array<number | null>>;
  solution: Array<Array<number>>;
  difficulty: string;
  size: number;
};

export type Move = {
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
  id: number;
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
  // Game loading
  CLEAR_ACTIVE_CELL = "CLEAR_ACTIVE_CELL",
  // Active cell
  SET_ACTIVE_CELL = "SET_ACTIVE_CELL",
  SET_ACTIVE_GAME = "SET_ACTIVE_GAME",
  // Moves
  MAKE_MOVE = "MAKE_MOVE",
  ERASE_MOVE = "ERASE_MOVE",
  UNDO_MOVE = "UNDO_MOVE",
}

export enum SideEffect {
  // Record moves in BE
  RECORD_MAKE_MOVE = "RECORD_MAKE_MOVE",
  RECORD_UNDO_MOVE = "RECORD_UNDO_MOVE",
}

// Events

export enum GameEvent {
  // Game loading
  LOAD_NEW_GAME = "LOAD_NEW_GAME",
  SET_ACTIVE_GAME = "SET_ACTIVE_GAME",
  // Active cell
  CLEAR_ACTIVE_CELL = "CLEAR_ACTIVE_CELL",
  SET_ACTIVE_CELL = "SET_ACTIVE_CELL",
  // Moves
  MAKE_MOVE = "MAKE_MOVE",
  ERASE_MOVE = "ERASE_MOVE",
  UNDO_MOVE = "UNDON_MOVE",
}

export type LoadNewGameEvent = {
  type: GameEvent.LOAD_NEW_GAME;
  difficulty: SudokuDifficulty;
  size: SudokuSize;
};

export type SetActiveGameEvent = {
  type: GameEvent.SET_ACTIVE_GAME;
  data: Game;
};

export type ClearActiveCellEvent = {
  type: GameEvent.CLEAR_ACTIVE_CELL;
};

export type SetActiveCellEvent = {
  type: GameEvent.SET_ACTIVE_CELL;
  cell: ActiveCell;
};

export type MakeMoveEvent = {
  type: GameEvent.MAKE_MOVE;
  row: number;
  column: number;
  value: number;
};

export type EraseMoveEvent = {
  type: GameEvent.ERASE_MOVE;
  row: number;
  column: number;
};

export type UndoMoveEvent = {
  type: GameEvent.UNDO_MOVE;
  moveNumberToUndo: number;
};

export type GameEventProps =
  | SetActiveGameEvent
  | ClearActiveCellEvent
  | SetActiveCellEvent
  | LoadNewGameEvent
  | MakeMoveEvent
  | EraseMoveEvent
  | UndoMoveEvent;

// States

export enum GameState {
  LOADING_ACTIVE_GAME = "LOADING_ACTIVE_GAME",
  LOADING_NEW_GAME = "LOADING_NEW_GAME",
  PLAYING = "PLAYING",
  COMPLETED = "COMPLETED",
}
