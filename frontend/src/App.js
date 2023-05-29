import "./assets/styles/board.css";
import "./assets/styles/controls.css";
import { MovesProvider } from "./context/MovesContext";

import Game from "./components/Game";

import getOrCreateActiveGame from "./services/rest_api/calls";

function App() {
  const game = getOrCreateActiveGame();
  return (
    <>
      <h1 className={"headstrap"}>Eduko</h1>
      <div className={"page-content"}>
        <MovesProvider>
          <Game sudoku={game.sudoku} existingMoves={game.moves} />
        </MovesProvider>
      </div>
    </>
  );
}

export default App;
