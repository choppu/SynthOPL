import { Dispatch, PropsWithChildren, createContext, useContext, useReducer } from 'react';
import { Drum, Keyboard, Program, ProgramDescriptor } from '../types/SynthTypes';
import { Device } from 'react-native-ble-plx';

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
      activeProgram: {
        descriptor: {} as ProgramDescriptor,
        kick: {id: 0, operators: [{}, {}]} as Drum,
        snare: {id: 1, operators: [{}, {}]} as Drum,
        tom: {id: 2, operators: [{}, {}]} as Drum,
        cymbal: {id: 3, operators: [{}, {}]} as Drum,
        hiHat: {id: 4, operators: [{}, {}]} as Drum,
        extra: {id: 5, operators: [{}, {}]} as Drum,
        keyboard: {id: 6, operators: [{}, {}, {}, {}]} as Keyboard
      },
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
    default: {
      console.log('Unknown action: ' + action.type);
      break;
    }
  }

  return appState;
}


