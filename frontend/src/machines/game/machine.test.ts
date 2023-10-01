import * as types from "./types";
import { createMachine, interpret } from "xstate";
import { waitFor } from "@testing-library/react";
import { services } from "./services";
import { config } from "./config";
import { actions } from "./actions";
import { sideEffects } from "./sideEffects";
import { guards } from "./guards";
import { SudokuDifficulty, SudokuSize } from "../../utils/constants";

jest.mock("../../services/apiClient/RestAPIClient");

const initialContext = {
  game: {
    id: 37,
    sudoku: {
      problem: [[null]],
      solution: [[1]],
      difficulty: "",
      size: 1,
    },
    moves: [],
    movesGrid: [[null]],
  },
  activeCell: null,
  ipAddress: "",
} as unknown as types.GameContextProps;

test("initially loads active game", async () => {
  const machine = createMachine(config, {
    actions: { ...actions, ...sideEffects },
    guards: guards,
    services: services,
  });
  const service = interpret(machine.withContext(initialContext));
  service.start();

  expect(service.state.matches(types.GameState.LOADING_ACTIVE_GAME)).toBe(true);
  await waitFor(() =>
    expect(service.state.matches(types.GameState.PLAYING)).toBe(true)
  );
});

test("correct move solves trivial sudoku", async () => {
  const testConfig = { ...config, initial: types.GameState.PLAYING };
  const machine = createMachine(testConfig, {
    actions: { ...actions, ...sideEffects },
    guards: guards,
    services: services,
  });
  const service = interpret(machine.withContext(initialContext));
  service.start();

  expect(service.state.matches(types.GameState.PLAYING)).toBe(true);

  service.send({
    type: types.GameEvent.MAKE_MOVE,
    row: 0,
    column: 0,
    value: 1,
  });

  expect(service.state.matches(types.GameState.SOLVED)).toBe(true);
});

test("incorrect move does not solve sudoku", async () => {
  const testConfig = { ...config, initial: types.GameState.PLAYING };
  const machine = createMachine(testConfig, {
    actions: { ...actions, ...sideEffects },
    guards: guards,
    services: services,
  });
  const service = interpret(machine.withContext(initialContext));
  service.start();

  await waitFor(() =>
    expect(service.state.matches(types.GameState.PLAYING)).toBe(true)
  );

  service.send({
    type: types.GameEvent.MAKE_MOVE,
    row: 0,
    column: 0,
    value: 2, // Incorrect
  });

  expect(service.state.matches(types.GameState.PLAYING)).toBe(true);
});

test("can load new game", async () => {
  const testConfig = { ...config, initial: types.GameState.PLAYING };
  const machine = createMachine(testConfig, {
    actions: { ...actions, ...sideEffects },
    guards: guards,
    services: services,
  });
  const service = interpret(machine.withContext(initialContext));
  service.start();

  expect(service.state.matches(types.GameState.PLAYING)).toBe(true);

  service.send({
    type: types.GameEvent.LOAD_NEW_GAME,
    difficulty: SudokuDifficulty.Easy,
    size: SudokuSize.Four,
  });

  expect(service.state.matches(types.GameState.LOADING_NEW_GAME)).toBe(true);
  await waitFor(() =>
    expect(service.state.matches(types.GameState.PLAYING)).toBe(true)
  );
});
