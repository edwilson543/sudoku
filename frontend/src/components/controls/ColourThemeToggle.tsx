import React from "react";

type ColourThemeToggleProps = {
  toggleDarkMode: () => void;
};

export default function ColourThemeToggle({
  toggleDarkMode,
}: ColourThemeToggleProps) {
  /** A switch for toggling dark mode on & off */
  return (
    <label className="slider-container">
      <input type="checkbox" onChange={() => toggleDarkMode()} />
      <div className="slider"></div>
    </label>
  );
}
