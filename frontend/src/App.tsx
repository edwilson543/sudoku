import React, { useEffect, useRef, useState } from "react";

import { MovesProvider } from "./context/movesContext";
import Game from "./components/Game";
import RestAPIClient from "./services/apiClient/RestAPIClient";
import { APIClient, APIClientContext } from "./services/apiClient/useAPI";
import getPlayerIpAddress from "./services/__mocks__/profile";
import { ColourTheme } from "./utils/constants";

export default function App() {
  /** Root application. */
  const apiClientRef = useRef<APIClient | null>(null);
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [darkModeOn, setDarkModeOn] = useState(false);
  const colourTheme = darkModeOn ? ColourTheme.Dark : ColourTheme.Light;

  // Initialize the application
  useEffect(() => {
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
  }, []);

  function toggleDarkMode(): void {
    setDarkModeOn(!darkModeOn);
  }

  return (
    <div className={"page-wrapper"} data-theme={colourTheme}>
      <h1 className={"headstrap"}>eduko</h1>
      {activeGame && (
        <div className={"page-content"}>
          <APIClientContext.Provider value={apiClientRef.current}>
            <MovesProvider initialMoves={activeGame.moves}>
              <Game
                activeGame={activeGame}
                setActiveGame={setActiveGame}
                toggleDarkMode={toggleDarkMode}
              />
            </MovesProvider>
          </APIClientContext.Provider>
        </div>
      )}
    </div>
  );
}
