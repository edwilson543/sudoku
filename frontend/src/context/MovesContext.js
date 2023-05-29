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
    default: {
      throw Error("Unknown action " + action.type);
    }
  }
}
