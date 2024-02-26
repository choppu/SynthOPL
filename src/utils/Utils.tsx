import { Device } from "react-native-ble-plx";
import { ProgramsListItem } from "../types/SynthTypes";
import BLE from "./BLE";
import { GATT_OPL_CHR_UUID_LIST_PRG, programDescriptorLength, programsListLast, programsListFirst} from "./AppConsts";
import SynthOPL from "./Synth";

export namespace Utils {
  export async function fetchList(device: Device, programs: ProgramsListItem[], gotFirst: boolean) : Promise<ProgramsListItem[]> {
    let message = await BLE.readCharacteristic(device, GATT_OPL_CHR_UUID_LIST_PRG);

    if(message) {
      let header = message[0];
      let list = message.subarray(1);

      if (header & programsListFirst) {
        gotFirst = true;
        programs.length = 0;
      }

      decodeProgramsList(list, programs);

      if((header & programsListLast) == 0 || !gotFirst) {
        fetchList(device, programs, gotFirst);
      }
    }



    return programs;
  }

  export function decodeProgramsList(list: Uint8Array, programs: ProgramsListItem[]) : void {
    let i = 0;

    while(i < list.length) {
      let item = list.subarray(i, i + programDescriptorLength);
      programs.push(SynthOPL.decodeProgramDescriptor(item));
      i += programDescriptorLength;
    }
  }
}

export default Utils;