import { createMachine } from "xstate";
import * as types from "./types";
import { config } from "./config";
import { gameActions } from "./gameActions";
import { gameServices } from "./gameServices";
import { initialContext } from "./initial";
import { useInterpret } from "@xstate/react";

export const useGameMachine = ({ ipAddress }: { ipAddress: string }) => {
  const gameMachine = createMachine<
    types.GameContextProps,
    types.GameEventProps
  >(config, { actions: gameActions, services: gameServices });
  return useInterpret(gameMachine, {
    context: { ...initialContext, ipAddress: ipAddress },
  });
};
