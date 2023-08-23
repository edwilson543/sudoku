import { createMachine, assign } from "xstate";
import * as types from "./types";
import { initialContext } from "./initial";
import RestAPIClient from "../../services/apiClient/RestAPIClient";

// Config

const getOrCreateActiveGame = (context: types.ContextProps) => {
  const apiClient = new RestAPIClient(context.ipAddress);
  return apiClient.getOrCreateActiveGame();
};

// TODO -> split actions / services out
// TODO -> active / inactive playing state?
// TODO -> split game state into playing_active and playing_inactive

export const gameMachine = ({ ipAddress }: { ipAddress: string }) =>
  createMachine<types.ContextProps, types.EventProps>({
    id: "game",
    initial: types.GameState.LOADING,
    predictableActionArguments: true,
    context: { ...initialContext, ipAddress: ipAddress },
    states: {
      [types.GameState.LOADING]: {
        invoke: {
          id: "active-game",
          src: getOrCreateActiveGame,
          onDone: {
            target: types.GameState.PLAYING,
            actions: assign({
              game: (context, event) => event.data,
            }),
            // TODO -> onError
          },
        },
      },
      [types.GameState.PLAYING]: {
        on: {
          [types.GameEvent.MAKE_MOVE]: {
            actions: [
              assign({
                // TODO -> `Pick`
                game: (context, event: types.MakeMoveEvent) => ({
                  ...context.game,
                  moves: [event.move, ...context.game.moves],
                }),
              }),
            ],
          },
          [types.GameEvent.SET_ACTIVE_CELL]: {
            actions: [
              assign({
                // TODO -> `Pick`
                activeCell: (_, event: types.SetActiveCellEvent) => {
                  return event.cell;
                },
              }),
            ],
          },
        },
      },
      [types.GameState.COMPLETED]: {},
    },
  });
