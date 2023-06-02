import "./assets/styles/board.css";
import "./assets/styles/controls.css";
import { MovesProvider } from "./context/movesContext";
import React from "react";

import Game from "./components/Game";
import restAPI from "./services/restAPI";

const restClient = restAPI();
const game = restClient.getOrCreateActiveGame();

function App() {
  return (
    <>
      <h1 className={"headstrap"}>eduko</h1>
      <div className={"page-content"}>
        <MovesProvider>
          <Game sudoku={game.sudoku} initialMoves={game.moves} />
        </MovesProvider>
      </div>
    </>
  );
}

export default App;
