import "./assets/styles/board.css";
import "./assets/styles/controls.css";
import { MovesProvider } from "./context/MovesContext";
import React from "react";

import Game from "./components/Game";
import restAPI from "./services/rest_api/calls";

const restAPIClient = restAPI();
const game = restAPIClient.getOrCreateActiveGame();

function App() {
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
