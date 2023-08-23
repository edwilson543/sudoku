import { useMachine } from "@xstate/react";
import { gameMachine } from "./config";

export const useGameMachine = ({ ipAddress }: { ipAddress: string }) => {
  // TODO -> useActor
  return useMachine(gameMachine({ ipAddress }));
};
