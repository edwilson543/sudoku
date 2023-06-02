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
  isClueCell: boolean;
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
  // TODO -> maybe delete isCorrect?
  isCorrect: boolean;
}

// enum MoveType {
//   CREATE,
//   ERASE,
//   UNDO,
// }

interface MoveAction {
  type: MoveType;
  row: number;
  column: number;
  value: number;
  isCorrect: boolean;
}
