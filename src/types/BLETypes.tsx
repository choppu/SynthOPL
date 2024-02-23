import { Device } from "react-native-ble-plx";

export type VoidCallback = (...params: any) => void;

export interface BluetoothLowEnergyApi {
  requestPermissions(cb: VoidCallback): Promise<void>;
  scanForPeripherals(): void;
  connectToDevice: (device: Device, cb: VoidCallback) => Promise<void>;
  disconnectFromDevice: () => void;
  readCharacteristic: (device: Device, characteristicUUID: string) => Promise<string|null>;
  writeCharacteristic: (device: Device, characteristicUUID: string, data: string) => Promise<void>;
  connectedDevice: Device | null;
  allDevices: Device[];
}