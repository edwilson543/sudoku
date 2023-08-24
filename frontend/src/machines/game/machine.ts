import { createMachine } from "xstate";
import * as types from "./types";
import { config } from "./config";
import { gameActions } from "./gameActions";
import { gameServices } from "./gameServices";

export const gameMachine = ({ ipAddress }: { ipAddress: string }) =>
  createMachine<types.GameContextProps, types.GameEventProps>(
    config({ ipAddress: ipAddress }),
    { actions: gameActions, services: gameServices }
  );
