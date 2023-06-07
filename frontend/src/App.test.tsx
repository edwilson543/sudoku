import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";

import App from "./App";

afterEach(cleanup);
jest.mock("./services/apiClient/RestAPIClient");

const testSudokuSize = 9;

test("completes game by entering missing value", async () => {
  await act(() => render(<App />));

  // Check header
  const headStrap = screen.getByText("eduko");
  expect(headStrap).toBeInTheDocument();

  // Check the initial problem is rendered.
  // The test fixture contains a sudoku where all the cells are
  // clues except two of them, and there's an existing move for
  // one of these.
  const grid = screen.getByTestId("grid");
  const solvedValues = ["1", "2", "4", "5", "6", "7", "8", "9"];
  for (const value of solvedValues) {
    expect(within(grid).queryAllByText(value).length).toBe(testSudokuSize);
  }
  // There is only 1 missing clue, which is a 3.
  expect(within(grid).queryAllByText("3").length).toBe(testSudokuSize - 1);

  // Select the only empty cell as the active cell
  const emptyCell = screen.getByTestId("row-0-column-2");
  act(() => {
    fireEvent.click(emptyCell);
  });
  expect(emptyCell.className).toContain("active-cell");

  // Enter the correct solution value in the empty cell (this is 3)
  const threeInputKey = screen.getByTestId("number-input-3");
  act(() => {
    fireEvent.click(threeInputKey);
  });
  expect(emptyCell.className).toContain("cell-solved");

  // TODO -> assert the new game menu has automatically popped up
});

test("start new game before completing current", async () => {
  await act(() => render(<App />));

  // Toggle the new game menu
  const newGameMenuToggle = screen.getByText("new game");
  fireEvent.click(newGameMenuToggle);
  expect(screen.getByText("select difficulty:")).toBeVisible();

  // Start a new medium difficulty game
  const newGameButton = screen.getByText("easy");
  await act(() => fireEvent.click(newGameButton));
});

// TODO -> assert the undo / erase / check buttons are working as expected
// TODO -> also check can erase the move received over the API
