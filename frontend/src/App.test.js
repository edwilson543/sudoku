import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app", () => {
  render(<App />);
  // Check header
  const headStrap = screen.getByText("Eduko");
  expect(headStrap).toBeInTheDocument();
});
