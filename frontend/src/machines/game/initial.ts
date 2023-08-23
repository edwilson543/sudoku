export const initialContext = {
  game: {
    game_id: 0,
    sudoku: {
      problem: [],
      solution: [],
      difficulty: "",
      size: 0,
    },
    moves: [],
  },
  activeCell: {
    row: -1,
    column: -1,
    tile: -1,
    value: -1,
    isClueCell: null,
  },
  ipAddress: "",
};
