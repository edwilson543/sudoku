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

    // Create a new move and add it to the end of the array
    case MoveType.Create: {
      // TODO -> fire a create move API call (in the event handle, not here)
      const newMove = {
        row: action.row,
        column: action.column,
        value: action.value,
      };
      return [...moves, newMove];
    }

    // Create an erased move and add it to the end of the array.
    // Rather than find the original move and erase it, it's much
    // cleaner and more useful to create an 'overwriting' effect
    case MoveType.Erase: {
      // TODO -> fire an erase move API call
      const erasedMove = {
        row: action.row,
        column: action.column,
        value: null,
      };
      return [...moves, erasedMove];
    }

    // Undo the previous move (be it an entry or an erasing) */
    case MoveType.Undo: {
      // TODO -> fire an API call here depending on the move nature
      return moves.slice(0, -1);
    }

    default:
      throw Error("Unknown action: " + action.type);
  }
}
