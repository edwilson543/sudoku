// Types that are globally relevant

interface Game {
  sudoku: Sudoku;
  moves: Array<MoveDetail>;
  started_at: string;
}

interface Sudoku {
  problem: Array<Array<number | null>>;
  solution: Array<Array<number>>;
  difficulty: string;
  size: number;
  number_of_missing_values: number;
}

interface ActiveCell {
  row: number;
  column: number;
  tile: number;
  value: number | null;
  isClueCell: boolean | null;
}

// Types related to moves in the game

interface MoveDetail {
  // The full detail of a move held in state
  row: number;
  column: number;
  value: number | null;
  isUndone: boolean;
}

interface ClearAllMovesAction {
  type: "clear-all-moves";
}

interface CreateMoveAction {
  type: "create-move";
  row: number;
  column: number;
  value: number;
}

interface EraseMoveAction {
  type: "erase-move";
  row: number;
  column: number;
}

interface UndoMoveAction {
  type: "undo-move";
}

// An action that may be dispatched to the movesReducer
type MoveAction =
  | ClearAllMovesAction
  | CreateMoveAction
  | EraseMoveAction
  | UndoMoveAction;
