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
  children?: React.ReactNode;
};

export function MovesProvider({ children }: MovesProviderProps) {
  const initialMoves: Array<MoveDetail> = [];
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
    // Create a new move and add it to the end of the array
    case MoveType.CREATE: {
      // TODO -> fire a create move API call
      const newMove = {
        row: action.row,
        column: action.column,
        value: action.value,
        isCorrect: action.isCorrect,
        isErased: false,
      };
      return [...moves, newMove];
    }

    // Create an erased move and add it to the end of the array.
    // Rather than find the original move and erase it, it's much
    // cleaner and more useful to create an 'overwriting' effect
    case MoveType.ERASE: {
      // TODO -> fire an erase move API call
      const erasedMove = {
        row: action.row,
        column: action.column,
        value: null,
        isCorrect: null,
        isErased: true,
      };
      return [...moves, erasedMove];
    }

    // Undo the previous move (be it an entry or an erasing) */
    case MoveType.UNDO: {
      // TODO -> fire an API call here depending on the move nature
      return moves.slice(0, -1);
    }

    default:
      throw Error("Unknown action: " + action.type);
  }
}
