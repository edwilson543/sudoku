import { createContext, useContext, useReducer } from "react";

const MovesContext = createContext([]);
const MovesDispatchContext = createContext(null);

export function useMoves() {
  return useContext(MovesContext);
}

export function useMovesDispatch() {
  return useContext(MovesDispatchContext);
}

export function MovesProvider({ children }) {
  const [moves, dispatch] = useReducer(movesReducer, []);
  return (
    <MovesContext.Provider value={moves}>
      <MovesDispatchContext.Provider value={dispatch}>
        {children}
      </MovesDispatchContext.Provider>
    </MovesContext.Provider>
  );
}

function movesReducer(moves, action) {
  switch (action.type) {
    // Create a new move and add it to the end of the array
    case "create-move": {
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
    case "erase-move": {
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
    default: {
      throw Error("Unknown action " + action.type);
    }
  }
}
