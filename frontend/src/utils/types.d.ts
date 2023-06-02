interface Move {
  value: number;
  isCorrect: boolean;
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
  isClueCell: boolean;
}
