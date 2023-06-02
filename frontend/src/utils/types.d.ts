// Types that are globally relevant

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
  isCorrect: boolean | null;
  isErased: boolean;
}

interface Move {
  // A subset of move detail passed to individual cells
  value: number;
  // TODO -> probably delete isCorrect, and therefore this interface?
  isCorrect: boolean;
}

interface CreateMoveAction {
  type: "create-move";
  row: number;
  column: number;
  value: number;
  isCorrect: boolean;
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
type MoveAction = CreateMoveAction | EraseMoveAction | UndoMoveAction;

// Types related to the API payloads

interface APIMove {
  id: number;
  row: number;
  column: number;
  value: number;
  is_correct: boolean;
  is_erased: boolean;
}

interface Game {
  sudoku: Sudoku;
  moves: Array<APIMove>;
  started_at: string;
}
