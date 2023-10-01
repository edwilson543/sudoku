import { createMachine } from "xstate";
import * as types from "./types";
import { config } from "./config";
import { actions } from "./actions";
import { services } from "./services";
import { guards } from "./guards";
import { initialContext } from "./initial";
import { useInterpret } from "@xstate/react";
import { sideEffects } from "./sideEffects";

export const gameMachine = createMachine<
  types.GameContextProps,
  types.GameEventProps
>(config, {
  actions: { ...actions, ...sideEffects },
  guards: guards,
  services: services,
});

export const useGameMachine = ({ ipAddress }: { ipAddress: string }) => {
  return useInterpret(gameMachine, {
    context: { ...initialContext, ipAddress: ipAddress },
  });
};
