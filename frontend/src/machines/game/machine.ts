import { createMachine } from "xstate";
import * as types from "./types";
import { config } from "./config";
import { actions } from "./actions";
import { services } from "./services";
import { initialContext } from "./initial";
import { useInterpret } from "@xstate/react";

export const gameMachine = createMachine<
  types.GameContextProps,
  types.GameEventProps
>(config, { actions: actions, services: services });

export const useGameMachine = ({ ipAddress }: { ipAddress: string }) => {
  return useInterpret(gameMachine, {
    context: { ...initialContext, ipAddress: ipAddress },
  });
};
