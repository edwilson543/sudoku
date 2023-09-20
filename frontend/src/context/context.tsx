import { useContext, createContext } from "react";
import { gameMachine } from "../machines/game";
import { InterpreterFrom } from "xstate";
import { useActor } from "@xstate/react";

export const GameMachineContext = createContext<
  InterpreterFrom<typeof gameMachine>
>({} as InterpreterFrom<typeof gameMachine>);

export const useGameMachineContext = () => {
  const gameMachine = useContext(GameMachineContext);
  const [current, send] = useActor(gameMachine);
  return { current, send };
};
