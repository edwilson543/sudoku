import './assets/styles/grid.css';
import './assets/styles/game.css';
import './assets/styles/page.css';

import Game from "./components/Game";

import getOrCreateActiveGame from "./services/rest_api/calls";


function App() {
  const game = getOrCreateActiveGame();
  return (
    <div className={"page-content"}>
        <h1 className={"headstrap"}>Eduko.com</h1>
        <Game sudoku={game.sudoku} existingMoves={game.moves}/>
    </div>
  );
}

export default App;
