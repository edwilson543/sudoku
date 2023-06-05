import React, { useState, useRef, useEffect } from "react";

import { MovesProvider } from "./context/movesContext";
import Game from "./components/Game";
import RestAPIClient from "./services/apiClient/RestAPIClient";
import { APIClient, APIClientContext } from "./services/apiClient/useAPI";

export default function App() {
  /** Initialise the application */
  const apiClientRef = useRef<APIClient>(new RestAPIClient());
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  // Retrieve the active game from the API (only if we haven't already)
  if (!activeGame) {
    apiClientRef.current.getOrCreateActiveGame().then((game) => {
      setActiveGame(game);
    });
  }

  return (
    <>
      <h1 className={"headstrap"}>eduko</h1>
      {activeGame && (
        <div className={"page-content"}>
          <APIClientContext.Provider value={apiClientRef.current}>
            <MovesProvider initialMoves={activeGame.moves}>
              <Game activeGame={activeGame} setActiveGame={setActiveGame} />
            </MovesProvider>
          </APIClientContext.Provider>
        </div>
      )}
    </>
  );
}
