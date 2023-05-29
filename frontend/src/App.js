import './assets/styles/board.css';
import './assets/styles/game.css';
import './assets/styles/page.css';

import Game from "./components/Game";

import getOrCreateActiveGame from "./services/rest_api/calls";


function App() {
  const game = getOrCreateActiveGame();
  return (
    <>
        <h1 className={"headstrap"}>Eduko</h1>
        <div className={"page-content"}>
            <Game sudoku={game.sudoku} existingMoves={game.moves}/>
        </div>
    </>
  );
}

export default App;
