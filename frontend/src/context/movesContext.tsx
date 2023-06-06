import React, { createContext, useContext, useReducer } from "react";
import { MoveType } from "../utils/constants";

const MovesContext = createContext<Array<MoveDetail>>([]);
const MovesDispatchContext = createContext<React.Dispatch<MoveAction>>(() => {
  return;
});

export function useMoves(): Array<MoveDetail> {
  return useContext(MovesContext);
}

export function useMovesDispatch(): React.Dispatch<MoveAction> {
  return useContext(MovesDispatchContext);
}

type MovesProviderProps = {
  initialMoves: Array<MoveDetail>;
  children?: React.ReactNode;
};

export function MovesProvider({ initialMoves, children }: MovesProviderProps) {
  /** Wrapper for the active game, providing access to the move history and dispatch */
  const [moves, dispatch] = useReducer(movesReducer, initialMoves);
  return (
    <MovesContext.Provider value={moves}>
      <MovesDispatchContext.Provider value={dispatch}>
        {children}
      </MovesDispatchContext.Provider>
    </MovesContext.Provider>
  );
}

function movesReducer(
  moves: Array<MoveDetail>,
  action: MoveAction
): Array<MoveDetail> {
  switch (action.type) {
    // Clear all moves (this is done at the start of a new game)
    case MoveType.ClearAll: {
      return [];
    }

    // Create a new move and add it to the end of the move history.
    case MoveType.Create: {
      const newMove = {
        row: action.row,
        column: action.column,
        value: action.value,
        isUndone: false,
      };
      return [...moves, newMove];
    }

    // Create an "erasing" move and add it to the end of the array.
    // An "erasing" move just has `value: null`, overwriting any
    // previous value in that cell.
    case MoveType.Erase: {
      const erasedMove = {
        row: action.row,
        column: action.column,
        value: null,
        isUndone: false,
      };
      return [...moves, erasedMove];
    }

    // Undo the most recent move that has not already been undone.
    // Special care is taken to ensure the order is preserved.
    case MoveType.Undo: {
      let undoComplete = false;
      const reversedMoves = moves.slice().reverse();
      const undoneMoves = reversedMoves.map((move) => {
        if (move.isUndone || undoComplete) {
          return move;
        } else {
          undoComplete = true;
          return { ...move, isUndone: true };
        }
      });
      return undoneMoves.reverse();
    }

    default:
      throw Error("Unknown action: " + action.type);
  }
}
