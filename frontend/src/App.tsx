import React, { useState, useRef } from "react";

import { MovesProvider } from "./context/movesContext";
import Game from "./components/Game";
import RestAPIClient from "./services/apiClient/RestAPIClient";
import { APIClient, APIClientContext } from "./services/apiClient/useAPI";
import getPlayerIpAddress from "./services/__mocks__/profile";

export default function App() {
  /** Root application. */
  const apiClientRef = useRef<APIClient | null>(null);
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  // Initialize the application
  if (!apiClientRef.current) {
    // Identify the player using their IP address
    getPlayerIpAddress()
      .then((playerIpAddress) => {
        const restClient = new RestAPIClient(playerIpAddress);
        apiClientRef.current = restClient;
        return restClient;
      })
      // Retrieve the player's active game from the backend API
      .then((restClient) => {
        if (!activeGame) {
          restClient.getOrCreateActiveGame().then((game) => {
            setActiveGame(game);
          });
        }
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
