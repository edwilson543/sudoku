import "./assets/styles/board.css";
import "./assets/styles/controls.css";
import { MovesProvider } from "./context/MovesContext";

import Game from "./components/Game";

import getOrCreateActiveGame from "./services/rest_api/calls";

function App() {
  const game = getOrCreateActiveGame();
  return (
    <>
      <h1 className={"headstrap"}>eduko</h1>
      <div className={"page-content"}>
        <MovesProvider>
          <Game game={game} />
        </MovesProvider>
      </div>
    </>
  );
}

export default App;
