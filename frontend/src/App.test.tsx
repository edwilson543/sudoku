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

// Constants relating to the test sudoku fixture
const testSudokuSize = 9;
const testSudokuRank = 3;

const existingMoveRow = 0;
const existingMoveCol = 1;
const existingMoveVal = 1;

const emptyCellRow = 0;
const emptyCellCol = 2;
const emptyCellSolution = 3;

/**
 * Tests for game completion and the new game loop
 * */

test("completes game by entering missing value", async () => {
  await act(() => render(<App />));

  // Spot check that one of the clue cells is showing the correct clue
  const someCell = screen.getByTestId("row-7-column-4");
  expect(someCell).toHaveTextContent("8");

  // Check the existing move received over the API is rendered in the correct cell
  const existingMove = screen.getByTestId(
    `row-${existingMoveRow}-column-${existingMoveCol}`
  );
  expect(existingMove).toHaveTextContent(`${existingMoveVal}`);

  // Check that the (only) cell that should be empty contains no text
  const emptyCell = screen.getByTestId(
    `row-${emptyCellRow}-column-${emptyCellCol}`
  );
  expect(emptyCell).toBeEmptyDOMElement();

  // Select the empty cell as the active cell
  act(() => {
    fireEvent.click(emptyCell);
  });
  expect(emptyCell.className).toContain("active-cell");

  // Enter the correct solution value in the empty cell, which completes the game
  const threeInputKey = screen.getByTestId(`number-input-${emptyCellSolution}`);
  act(() => {
    fireEvent.click(threeInputKey);
  });
  expect(emptyCell.className).toContain("cell-solved");

  // Check the buttons are now disabled
  for (const buttonId of ["undo-button", "erase-button"]) {
    const button = screen.getByTestId(buttonId);
    expect(button).toBeDisabled();
  }
  for (let value = 1; value <= testSudokuSize; value++) {
    const numberInputButton = screen.getByTestId(`number-input-${value}`);
    expect(numberInputButton).toBeDisabled();
  }

  // Check the new game menu has automatically been displayed, and start a new game
  expect(screen.getByText("select difficulty:")).toBeVisible();
  const newGameButton = screen.getByText("easy");
  await act(() => fireEvent.click(newGameButton));

  // Check the moves from the previous game are now not rendered
  expect(existingMove).toBeEmptyDOMElement();
  expect(emptyCell).toBeEmptyDOMElement();
});

test("starts new game before completing current", async () => {
  await act(() => render(<App />));

  // Toggle the new game menu
  const newGameMenuToggle = screen.getByText("new game");
  fireEvent.click(newGameMenuToggle);
  expect(screen.getByText("select difficulty:")).toBeVisible();

  // Start a new medium difficulty game
  const newGameButton = screen.getByText("easy");
  await act(() => fireEvent.click(newGameButton));

  // Spot check that one of the clue cells is showing the correct clue
  const someCell = screen.getByTestId("row-0-column-8");
  expect(someCell).toHaveTextContent("");

  // Check the existing move for the previous game is no longer rendered
  const existingMoveCell = screen.getByTestId(
    `row-${existingMoveRow}-column-${existingMoveCol}`
  );
  expect(existingMoveCell).not.toHaveTextContent(`${existingMoveVal}`);
});

/**
 * Tests for move sequencing
 * */

test("can make then erase a move then undo both", async () => {
  await act(() => render(<App />));

  // Get the empty cell
  const emptyCell = screen.getByTestId(
    `row-${emptyCellRow}-column-${emptyCellCol}`
  );
  expect(emptyCell).toBeEmptyDOMElement();

  // Set the empty cell as the active cell
  fireEvent.click(emptyCell);
  expect(emptyCell.className).toContain("active-cell");

  // Enter some incorrect value in the empty cell
  const incorrectVal = emptyCellSolution + 1;
  const incorrectInputKey = screen.getByTestId(`number-input-${incorrectVal}`);
  fireEvent.click(incorrectInputKey);

  // Check the originally empty cell now has the value in it
  expect(emptyCell).toHaveTextContent(`${incorrectVal}`);
  expect(emptyCell.className).toContain("game-cell-incorrect");

  // Erase the original move
  const eraseButton = screen.getByTestId("erase-button");
  fireEvent.click(eraseButton);
  expect(emptyCell).toBeEmptyDOMElement();

  // Undo the erasing move, which should cause the original incorrect value to be rendered
  const undoButton = screen.getByTestId("undo-button");
  fireEvent.click(undoButton);
  expect(emptyCell).toHaveTextContent(`${incorrectVal}`);

  // Undo the first move, which should make the cell empty again
  fireEvent.click(undoButton);
  expect(emptyCell).toBeEmptyDOMElement();
});

test("can make then undo a single move", async () => {
  await act(() => render(<App />));

  // Get the empty cell.
  const emptyCell = screen.getByTestId(
    `row-${emptyCellRow}-column-${emptyCellCol}`
  );
  expect(emptyCell).toBeEmptyDOMElement();

  // Set the empty cell as the active cell
  fireEvent.click(emptyCell);
  expect(emptyCell.className).toContain("active-cell");

  // Enter some value in the empty cell
  const incorrectVal = emptyCellSolution + 1;
  const incorrectInputKey = screen.getByTestId(`number-input-${incorrectVal}`);
  fireEvent.click(incorrectInputKey);
  expect(emptyCell).toHaveTextContent(`${incorrectVal}`);

  // Undo the move.
  const undoButton = screen.getByTestId("undo-button");
  fireEvent.click(undoButton);
  expect(emptyCell).toBeEmptyDOMElement();
});

test("can make then overwrite a move then undo both", async () => {
  await act(() => render(<App />));

  // Get the empty cell.
  const emptyCell = screen.getByTestId(
    `row-${emptyCellRow}-column-${emptyCellCol}`
  );
  expect(emptyCell).toBeEmptyDOMElement();

  // Set the empty cell as the active cell
  fireEvent.click(emptyCell);
  expect(emptyCell.className).toContain("active-cell");

  // Enter some value in the empty cell
  const incorrectVal = emptyCellSolution + 1;
  const incorrectInputKey = screen.getByTestId(`number-input-${incorrectVal}`);
  fireEvent.click(incorrectInputKey);
  expect(emptyCell).toHaveTextContent(`${incorrectVal}`);

  // Enter some other value in the empty cell
  const otherIncorrectVal = incorrectVal + 1;
  const otherIncorrectInputKey = screen.getByTestId(
    `number-input-${otherIncorrectVal}`
  );
  fireEvent.click(otherIncorrectInputKey);
  expect(emptyCell).toHaveTextContent(`${otherIncorrectVal}`);

  // Undo the last move, which should take us back to the original incorrect entry
  const undoButton = screen.getByTestId("undo-button");
  fireEvent.click(undoButton);
  expect(emptyCell).toHaveTextContent(`${incorrectVal}`);

  // Undo the first move, which should make the cell empty again
  fireEvent.click(undoButton);
  expect(emptyCell).toBeEmptyDOMElement();
});

// TODO -> double clicks on the buttons

test("erase and number input buttons are initially disabled", async () => {
  await act(() => render(<App />));

  // Get the erase button and check its disabled
  const eraseButton = screen.getByTestId("erase-button");
  expect(eraseButton).toBeDisabled();

  // Check each number input key is disabled
  for (let value = 1; value <= testSudokuSize; value++) {
    const numberInputButton = screen.getByTestId(`number-input-${value}`);
    expect(numberInputButton).toBeDisabled();
  }
});

/**
 * Tests for changing the active cell and cell highlighting
 * */

test("can select and then change the active cell", async () => {
  await act(() => render(<App />));

  // Select some cell as the active cell
  const someCellRow = 7;
  const someCellCol = 4;
  const someCell = screen.getByTestId(
    `row-${someCellRow}-column-${someCellCol}`
  );
  const someCellValue = `${someCell.textContent}`;
  act(() => {
    fireEvent.click(someCell);
  });

  // Ensure some cell is active, and its associates are highlighted
  expect(someCell.className).toContain("active-cell");
  checkCorrectCellsAreHighlighted(someCellRow, someCellCol, `${someCellValue}`);

  // Select some other cell as the active cell
  const someOtherCellRow = 1;
  const someOtherCellCol = 8;
  const someOtherCell = screen.getByTestId(
    `row-${someOtherCellRow}-column-${someOtherCellCol}`
  );
  const someOtherCellValue = `${someOtherCell.textContent}`;
  act(() => {
    fireEvent.click(someOtherCell);
  });

  // Ensure some other cell is active and its associates are highlighted, and some cell is not
  checkCorrectCellsAreHighlighted(
    someOtherCellRow,
    someOtherCellCol,
    someOtherCellValue
  );
  expect(someOtherCell.className).toContain("active-cell");
  expect(someCell.className).not.toContain("active-cell");
});

test("incorrect moves are highlighted when validation is on", async () => {
  await act(() => render(<App />));

  // Check validation mode is initially on
  const toggleValidationButton = screen.getByTestId("validate-button");
  expect(toggleValidationButton.className).toContain("validation-toggle-on");

  // Get the empty cell.
  const emptyCell = screen.getByTestId(
    `row-${emptyCellRow}-column-${emptyCellCol}`
  );
  expect(emptyCell).toBeEmptyDOMElement();

  // Set the empty cell as the active cell
  fireEvent.click(emptyCell);
  expect(emptyCell.className).toContain("active-cell");

  // Enter an incorrect value in the empty cell
  const incorrectVal = emptyCellSolution + 1;
  const incorrectInputKey = screen.getByTestId(`number-input-${incorrectVal}`);
  fireEvent.click(incorrectInputKey);
  expect(emptyCell).toHaveTextContent(`${incorrectVal}`);
  expect(emptyCell.className).toContain("game-cell-incorrect");

  // Turn off validation mode, which should remove the error highlighting
  fireEvent.click(toggleValidationButton);
  expect(toggleValidationButton.className).not.toContain(
    "validation-toggle-on"
  );
  expect(emptyCell.className).not.toContain("game-cell-incorrect");
});

/**
 * Tests relating to interactions with the existing move received over the API
 * */

test("can undo existing move received over the API", async () => {
  await act(() => render(<App />));

  // Get the cell containing the existing move received over the API
  const existingMove = screen.getByTestId(
    `row-${existingMoveRow}-column-${existingMoveCol}`
  );
  expect(existingMove).toHaveTextContent(`${existingMoveVal}`);

  // Undo the existing move
  const undoButton = screen.getByTestId("undo-button");
  fireEvent.click(undoButton);
  expect(existingMove).toBeEmptyDOMElement();
});

test("can erase existing move received over the API", async () => {
  await act(() => render(<App />));

  // Get the cell containing the existing move received over the API
  const existingMove = screen.getByTestId(
    `row-${existingMoveRow}-column-${existingMoveCol}`
  );
  expect(existingMove).toHaveTextContent(`${existingMoveVal}`);

  // Set the cell with the existing move as the active cell
  fireEvent.click(existingMove);
  expect(existingMove.className).toContain("active-cell");

  // Undo the existing move.
  const eraseButton = screen.getByTestId("erase-button");
  fireEvent.click(eraseButton);
  expect(existingMove).toBeEmptyDOMElement();
});

/**
 * Helpers
 * */

function checkCorrectCellsAreHighlighted(
  rowIndex: number,
  colIndex: number,
  cellValue: string
) {
  /** Helper to check that the expected cells are highlighted for a given `activeCell`. */
  for (let index = 0; index < testSudokuSize; index++) {
    // All other cell's in the active cell's column should be highlighted
    if (index !== rowIndex) {
      const rowCell = screen.getByTestId(`row-${index}-column-${colIndex}`);
      expect(rowCell.className).toContain("highlighted-cell");
    }

    // All other cell's in the active cell's row should be highlighted
    if (index !== colIndex) {
      const columnCell = screen.getByTestId(`row-${rowIndex}-column-${index}`);
      expect(columnCell.className).toContain("highlighted-cell");
    }
  }

  // All other cell's in the active cell's tile should be highlighted
  const rowTile = Math.floor(rowIndex / testSudokuRank) * testSudokuRank;
  const colTile = Math.floor(colIndex / testSudokuRank) * testSudokuRank;
  for (let row = rowTile; row < rowTile + testSudokuRank; row++) {
    for (let col = colTile; col < colTile + testSudokuRank; col++) {
      if (row !== rowIndex || col !== colIndex) {
        const tileCell = screen.getByTestId(`row-${row}-column-${col}`);
        expect(tileCell.className).toContain("highlighted-cell");
      }
    }
  }

  // All cell's with the same value should be highlighted
  const cellsWithSameValue = within(screen.getByTestId("grid")).queryAllByText(
    cellValue
  );
  for (const cell of cellsWithSameValue) {
    if (!cell.className.includes("active-cell")) {
      expect(cell.className).toContain("highlighted-cell-value");
    }
  }
}
