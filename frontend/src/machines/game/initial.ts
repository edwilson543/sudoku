export const initialActiveCell = {
  row: -1,
  column: -1,
  tile: -1,
  value: -1,
  isClueCell: null,
};

export const initialContext = {
  game: {
    id: 0,
    sudoku: {
      problem: [],
      solution: [],
      difficulty: "",
      size: 0,
    },
    moves: [],
  },
  activeCell: initialActiveCell,
  ipAddress: "",
};
