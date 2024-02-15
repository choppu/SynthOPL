import { Dispatch, PropsWithChildren, createContext, useContext, useReducer } from 'react';
import { ConfigPatch, NotePatch, OperatorPatch, OptionPatch, Program } from '../types/SynthTypes';
import { Device } from 'react-native-ble-plx';
import SynthOPL from '../utils/Synth';
import BLE from '../utils/BLE';
import { GATT_OPL_CHR_UUID_MSG } from '../utils/AppConsts';

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
      return {...appState, activeProgram: patchOperator(appState.activeProgram, appState.connectedDevice as Device, action.payload as OperatorPatch)}
    case "updateOption":
      return {...appState, activeProgram: patchOption(appState.activeProgram, appState.connectedDevice as Device, action.payload as OptionPatch)}
    case "updateConfig":
      return {...appState, activeProgram: patchConfig(appState.activeProgram, appState.connectedDevice as Device, action.payload as ConfigPatch)}
    case "updateNotes":
      return {...appState, activeProgram: patchNote(appState.activeProgram, appState.connectedDevice as Device, action.payload as NotePatch)}
    default: {
      console.log('Unknown action: ' + action.type);
      break;
    }
  }

  return appState;
}

function patchOperator(program: Program, device: Device, patch: OperatorPatch) {
  let updatedProgram = { ...program };
  let message = [] as any;

  if (patch.instrumentId > 5) {
    updatedProgram.keyboard.operators[patch.operatorId] = { ...updatedProgram.keyboard.operators[patch.operatorId], ...patch.updatedValue };
    message = SynthOPL.encodeChannel(updatedProgram.keyboard);
  } else {
    updatedProgram.drums[patch.instrumentId].operators[patch.operatorId] = { ...updatedProgram.drums[patch.instrumentId].operators[patch.operatorId], ...patch.updatedValue };
    message = SynthOPL.encodeChannel(updatedProgram.drums[patch.instrumentId]);
  }

  BLE.writeCharacteristic(device, GATT_OPL_CHR_UUID_MSG, message);

  return updatedProgram;
}

function patchOption(program: Program, device: Device, patch: OptionPatch) {
  let updatedProgram = { ...program };
  let message = [] as any;

  if (patch.instrumentId > 5) {
    updatedProgram.keyboard = { ...updatedProgram.keyboard, ...patch.updatedValue };
    message = SynthOPL.encodeChannel(updatedProgram.keyboard);
  } else {
    updatedProgram.drums[patch.instrumentId] = { ...updatedProgram.drums[patch.instrumentId], ...patch.updatedValue };
    message = SynthOPL.encodeChannel(updatedProgram.drums[patch.instrumentId]);
  }

  BLE.writeCharacteristic(device, GATT_OPL_CHR_UUID_MSG, message);

  return updatedProgram;
}
function patchConfig(program: Program, device: Device, patch: ConfigPatch) {
  let updatedProgram = { ...program };
  updatedProgram.keyboard = { ...updatedProgram.keyboard, ...patch.updatedValue };
  let config = SynthOPL.encodeOPLConfig(updatedProgram.keyboard);
  BLE.writeCharacteristic(device, GATT_OPL_CHR_UUID_MSG, config);
  return updatedProgram;
}

function patchNote(program: Program, device: Device, patch: NotePatch) {
  let updatedProgram = { ...program };
  updatedProgram.drums[patch.instrumentId] = { ...updatedProgram.drums[patch.instrumentId], ...patch.updatedValue }
  let notes = SynthOPL.encodeDrumNotes(updatedProgram.drums);
  BLE.writeCharacteristic(device, GATT_OPL_CHR_UUID_MSG, notes);
  return updatedProgram;
}

