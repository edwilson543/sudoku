import './App.css';
import './assets/styles/grid.css';

import Game from "./components/Game";

import getOrCreateActiveGame from "./services/rest_api/calls";


function App() {
  const game = getOrCreateActiveGame()
  return (
    <>
      <Game sudoku={game.sudoku} existingMoves={game.moves}/>
    </>
  );
}

export default App;
