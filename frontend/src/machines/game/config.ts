import { createMachine, assign } from "xstate";
import * as types from "./types";
import { initialContext } from "./initial";
import RestAPIClient from "../../services/apiClient/RestAPIClient";

// Config

const getOrCreateActiveGame = (context: types.ContextProps) => {
  const apiClient = new RestAPIClient(context.ipAddress);
  return apiClient.getOrCreateActiveGame();
  // TODO -> error handling
};

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
        },
      },
    },
  });
