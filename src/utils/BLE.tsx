import { PermissionsAndroid, Platform } from "react-native";
import { VoidCallback } from "../types/BLETypes";
import DeviceInfo from "react-native-device-info";
import { PERMISSIONS, requestMultiple } from "react-native-permissions";
import { BleManager, Device } from "react-native-ble-plx";
import { SYTH_OPL_UUID } from "./AppConsts";

const bleManager = new BleManager();
const base64js = require('base64-js');

export namespace BLE {
  export async function requestPermissions(cb: VoidCallback) : Promise<void> {
    if (Platform.OS === 'android') {
      const apiLevel = await DeviceInfo.getApiLevel();

      if (apiLevel < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Bluetooth Low Energy requires Location',
            buttonNeutral: 'Ask Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        cb(granted === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        const result = await requestMultiple([
          PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
          PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ]);

        const isGranted =
          result['android.permission.BLUETOOTH_CONNECT'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.BLUETOOTH_SCAN'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.ACCESS_FINE_LOCATION'] ===
            PermissionsAndroid.RESULTS.GRANTED;

        cb(isGranted);
      }
    } else {
      cb(true);
    }
  };

  function isDuplicateDevice(devices: Device[], nextDevice: Device) : boolean {
    return devices.findIndex(device => nextDevice.id === device.id) > -1;
  }

  function isSynthOPLDevice(device: Device): any {
    if(device.serviceUUIDs) {
      return device.serviceUUIDs[0] == SYTH_OPL_UUID;
    }
  }

  export function scanForPeripherals(devices: Device[], addNewDeviceFunc: any) : void {
    bleManager.startDeviceScan(null, null, (error, newDevice) => {
      if (error) {
        console.log(error);
      }

      if (newDevice) {
          if (!isDuplicateDevice(devices, newDevice)) {
            if(isSynthOPLDevice(newDevice)) {
              addNewDeviceFunc(newDevice);
            }
          }
      }
    });
  };

  export async function connectToDevice(device: Device, cb: VoidCallback, setConnectedFunc: any): Promise<void> {
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id, {requestMTU: 256});
      setConnectedFunc(deviceConnection);
      await deviceConnection.discoverAllServicesAndCharacteristics();
      bleManager.stopDeviceScan();
      cb(true);
    } catch (e) {
      cb(false);
    }
  };

  export function disconnectFromDevice(connectedDevice: Device | null, setDisconnectedFunc: any): void {
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id);
      setDisconnectedFunc();
    }
  };

  export async function readCharacteristic(device: Device, characteristicUUID: string): Promise<Uint8Array | null> {
    let response = (await device.readCharacteristicForService(SYTH_OPL_UUID, characteristicUUID)).value;
    return base64js.toByteArray(response);
  };

  export async function writeCharacteristic(device: Device, characteristicUUID: string, data: Uint8Array): Promise<void> {
    const base64String = base64js.fromByteArray(data);
    const resp = await device.writeCharacteristicWithoutResponseForService(SYTH_OPL_UUID, characteristicUUID, base64String);
  };
}

export default BLE;