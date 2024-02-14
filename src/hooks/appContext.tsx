import { Dispatch, PropsWithChildren, createContext, useContext, useReducer } from 'react';
import { Operator, OperatorPatch, OptionPatch, Program } from '../types/SynthTypes';
import { Device } from 'react-native-ble-plx';
import SynthOPL from '../utils/Synth';

const AppContext = createContext({});

interface AppState {
  activeProgram: Program;
  connectedDevice: Device | null;
}

type AppAction = {
  type: string;
  payload: object | null;
}

type AppContextType = {
  appState: AppState,
  dispatch: Dispatch<AppAction>
}

export function AppProvider({ children }: PropsWithChildren<{}>) {
  const [appState, dispatch] = useReducer(
    appReducer,
    {
      activeProgram: SynthOPL.newProgram(),
      connectedDevice: null
    });

  return (
    <AppContext.Provider value={{appState, dispatch}}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppState(): AppContextType {
  return useContext(AppContext) as AppContextType;
}

function appReducer(appState: AppState, action: AppAction) {
  switch (action.type) {
    case "connect":
      return {...appState, connectedDevice: action.payload} as AppState;
    case "setProgram":
      return {...appState, activeProgram: action.payload} as AppState;
    case "updateOperator":
      return {...appState, activeProgram: patchOperator(appState.activeProgram, action.payload as OperatorPatch)}
    case "updateOption":
      return {...appState, activeProgram: patchOption(appState.activeProgram, action.payload as OptionPatch)}
    default: {
      console.log('Unknown action: ' + action.type);
      break;
    }
  }

  return appState;
}

function patchOperator(program: Program, patch: OperatorPatch) {
  let updatedProgram = { ...program };
  if (patch.instrumentId > 5) {
    updatedProgram.keyboard.operators[patch.operatorId] = { ...updatedProgram.keyboard.operators[patch.operatorId], ...patch.updatedValue }
  } else {
    updatedProgram.drums[patch.instrumentId].operators[patch.operatorId] = { ...updatedProgram.drums[patch.instrumentId].operators[patch.operatorId], ...patch.updatedValue }
  }

  return updatedProgram;
}

function patchOption(program: Program, patch: OptionPatch) {
  let updatedProgram = { ...program };
  if (patch.instrumentId > 5) {
    updatedProgram.keyboard = { ...updatedProgram.keyboard, ...patch.updatedValue }
  } else {
    updatedProgram.drums[patch.instrumentId] = { ...updatedProgram.drums[patch.instrumentId], ...patch.updatedValue }
  }

  return updatedProgram;
}
