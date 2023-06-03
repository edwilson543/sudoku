import React, { useState } from "react";

import "./assets/styles/board.css";
import "./assets/styles/controls.css";
import { MovesProvider } from "./context/movesContext";
import Game from "./components/Game";
import RestAPIClient from "./services/restAPIClient";

// Constants used for initialising the game
const restClient = new RestAPIClient();
const game = restClient.getOrCreateActiveGame();

export default function App() {
  // Store the sudoku currently being played in state
  const [sudoku, setSudoku] = useState<Sudoku>(game.sudoku);

  return (
    <>
      <h1 className={"headstrap"}>eduko</h1>
      <div className={"page-content"}>
        <MovesProvider initialMoves={game.moves}>
          <Game sudoku={sudoku} setSudoku={setSudoku} />
        </MovesProvider>
      </div>
    </>
  );
}
