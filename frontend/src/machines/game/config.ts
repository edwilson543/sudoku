import { createMachine, assign } from "xstate";
import * as types from "./types";
import { initialContext } from "./initial";
import RestAPIClient from "../../services/apiClient/RestAPIClient";

// Config

const getOrCreateActiveGame = (context: types.ContextProps) => {
  const apiClient = new RestAPIClient(context.ipAddress);
  return apiClient.getOrCreateActiveGame();
};

export const gameMachine = ({ ipAddress }: { ipAddress: string }) =>
  createMachine<types.ContextProps, types.EventProps>({
    id: "game",
    initial: types.GameState.LOADING,
    context: { ...initialContext, ipAddress: ipAddress },
    states: {
      loading: {
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
      playing: {
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
