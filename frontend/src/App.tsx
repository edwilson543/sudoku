import React, { useState, useRef } from "react";

import "./assets/styles/board.css";
import "./assets/styles/controls.css";
import { MovesProvider } from "./context/movesContext";
import Game from "./components/Game";
import {
  RestAPIClient,
  RestAPIClientContext,
} from "./services/apiClient/restAPIClient";

export default function App() {
  /** Initialise the application */
  const restClientRef = useRef<RestAPIClient>(new RestAPIClient());
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  // Instantiate the rest client using the player's IP address
  if (!activeGame) {
    const game = restClientRef.current.getOrCreateActiveGame();
    setActiveGame(game);
  }

  return (
    <>
      <h1 className={"headstrap"}>eduko</h1>
      {activeGame && (
        <div className={"page-content"}>
          <RestAPIClientContext.Provider value={restClientRef.current}>
            <MovesProvider initialMoves={activeGame.moves}>
              <Game activeGame={activeGame} setActiveGame={setActiveGame} />
            </MovesProvider>
          </RestAPIClientContext.Provider>
        </div>
      )}
    </>
  );
}
