import React, { useEffect, useState } from "react";

import Game from "./components/Game";
import getPlayerIpAddress from "./services/__mocks__/profile";
import { ColourTheme } from "./utils/constants";

export default function App() {
  /** Root application. */
  const [darkModeOn, setDarkModeOn] = useState(false);
  const colourTheme = darkModeOn ? ColourTheme.Dark : ColourTheme.Light;
  const [playerIpAddress, setPlayerIpAddress] = useState<string>("");

  // Initialize the application
  useEffect(() => {
    playerIpAddress === "" &&
      getPlayerIpAddress().then((address) => setPlayerIpAddress(address));
  }, []);

  function toggleDarkMode(): void {
    setDarkModeOn(!darkModeOn);
  }

  return (
    <div className={"page-wrapper"} data-theme={colourTheme}>
      <h1 className={"headstrap"}>eduko</h1>
      {playerIpAddress && (
        <div className={"page-content"}>
          <Game ipAddress={playerIpAddress} toggleDarkMode={toggleDarkMode} />
        </div>
      )}
    </div>
  );
}
