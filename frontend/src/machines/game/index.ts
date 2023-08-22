import { useMachine } from "@xstate/react";
import { gameMachine } from "./config";

export const useGameMachine = ({ ipAddress }: { ipAddress: string }) => {
  return useMachine(gameMachine({ ipAddress }));
};
