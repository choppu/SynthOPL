import { useState } from "react";
import { Program, ProgramDescriptor, Synth } from "../types/SynthTypes";
import { Descriptor } from "react-native-ble-plx";

const base64js = require('base64-js');

function synthOPL() : Synth {
  const [programList, setPrograms] = useState<ProgramDescriptor[]>([]);
  const [activeProgram, setActiveProgram] = useState<Program | null>(null);

  const decodeProgram = (message: string) : Program | void => {
    const messageBytes = base64js.toByteArray(message);

    let program = {
      descriptor: {} as any
    } as Program;

    program["descriptor"]["bank"] = Number(messageBytes[0]);
    program["descriptor"]["num"] = Number(messageBytes[1]);
    program["descriptor"]["name"] = String.fromCharCode.apply(null, messageBytes.subarray(3, 14));

    console.log(program);
  }

  return {
    activeProgram,
    programList,
    decodeProgram
  }
}

export default synthOPL;