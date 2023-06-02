import data from "./tempData.json";

export default function restAPI() {
  // API client
  return {
    getOrCreateActiveGame(): Game {
      return {
        sudoku: data.sudoku,
        moves: normalizeAPIMoves(data.moves),
        started_at: data.started_at,
      };
    },
  };
}

interface APIMove {
  // Moves in the structure received from the REST API
  id: number;
  row: number;
  column: number;
  value: number;
  is_correct: boolean;
  is_erased: boolean;
}

function normalizeAPIMoves(moves: Array<APIMove>): Array<MoveDetail> {
  return moves.map((move) => {
    return {
      row: move.row,
      column: move.column,
      value: move.value,
      isCorrect: move.is_correct,
      isErased: move.is_erased,
    };
  });
}
