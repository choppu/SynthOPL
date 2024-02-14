import { Drum, Keyboard, Operator, Program, ProgramDescriptor } from "../types/SynthTypes";
import { CH_LEFT, CH_RIGHT, DEEP_TREMOLO, DEEP_VIBRATO, FEEDBACK, OP_ATTACK, OP_DECAY, OP_ENV_SCALE, OP_FREQ_MULTIPLICATION, OP_KEY_SCALE, OP_OUTPUT_LEVEL, OP_RELEASE, OP_SUSTAIN, OP_SUSTAINING_VOICE, OP_TREMOLO, OP_VIBRATO, OP_WAVEFORM, SYNTH_TYPE_2OPS, SYNTH_TYPE_4OPS } from "../utils/AppConsts";

const base64js = require('base64-js');

export namespace SynthOPL {
  function decodeOperator(operatorBytes: Uint8Array, operator: Operator) : void {
    operator.tremolo = ((operatorBytes[0] & OP_TREMOLO) == OP_TREMOLO);
    operator.vibrato = ((operatorBytes[0] & OP_VIBRATO) == OP_VIBRATO);
    operator.sustainingVoice = ((operatorBytes[0] & OP_SUSTAINING_VOICE) == OP_SUSTAINING_VOICE);
    operator.envelopeScale = ((operatorBytes[0] & OP_ENV_SCALE) == OP_ENV_SCALE);

    operator.frequencyMultiplication = (operatorBytes[0] & OP_FREQ_MULTIPLICATION);

    operator.keyScaleLevel = ((operatorBytes[1] & OP_KEY_SCALE) >> 6);
    operator.outputLevel = (operatorBytes[1] & OP_OUTPUT_LEVEL);

    operator.attack = ((operatorBytes[2] & OP_ATTACK) >> 4);
    operator.decay = (operatorBytes[2] & OP_DECAY);

    operator.sustain = ((operatorBytes[3] & OP_SUSTAIN) >> 4);
    operator.release = (operatorBytes[3] & OP_RELEASE);

    operator.waveForm = (operatorBytes[4] & OP_WAVEFORM);
  }

  function decodeKeyboard(keyboardBytes: Uint8Array, keyboard: Keyboard) : void {
    keyboard.enable4Operators = !Boolean(keyboardBytes[0]);
    keyboard.deepTremolo = ((keyboardBytes[1] & DEEP_TREMOLO) == DEEP_TREMOLO);
    keyboard.deepVibrato = ((keyboardBytes[1] & DEEP_VIBRATO) == DEEP_VIBRATO);
    keyboard.synthType2Ops = Number(keyboardBytes[2] & SYNTH_TYPE_2OPS);
    keyboard.synthType4Ops = Number((keyboardBytes[2] & SYNTH_TYPE_4OPS) >> 7);
    keyboard.chRight = ((keyboardBytes[2] & CH_RIGHT) == CH_RIGHT);
    keyboard.chLeft = ((keyboardBytes[2] & CH_LEFT) == CH_LEFT);
    keyboard.feedback = ((keyboardBytes[2] & FEEDBACK) >> 1);

    for(var i = 0, y = 3; i < 4; i++, y += 5) {
      decodeOperator(keyboardBytes.subarray(y, y + 5), keyboard.operators[i]);
    }
  }

  function decodeDrum(drumBytes: Uint8Array, drum: Drum, note: number) : void {
    drum.note = note;
    drum.synthType = Number(drumBytes[0] & SYNTH_TYPE_2OPS);
    drum.chRight = ((drumBytes[0] & CH_RIGHT) == CH_RIGHT);
    drum.chLeft = ((drumBytes[0] & CH_LEFT) == CH_LEFT);
    drum.feedback = ((drumBytes[0] & FEEDBACK) >> 1);

    for(var i = 0, y = 1; i < 2; i++, y += 5) {
      decodeOperator(drumBytes.subarray(y, y + 5), drum.operators[i]);
    }
  }

  export function newProgram() : Program {
    return {
      descriptor: {} as ProgramDescriptor,
      keyboard: {id: 6, operators: [{}, {}, {}, {}]} as Keyboard,
      drums: [
        {id: 0, operators: [{}, {}]} as Drum,
        {id: 1, operators: [{}, {}]} as Drum,
        {id: 2, operators: [{}, {}]} as Drum,
        {id: 3, operators: [{}, {}]} as Drum,
        {id: 4, operators: [{}, {}]} as Drum,
        {id: 5, operators: [{}, {}]} as Drum,
      ]
    }
  }

  export function decodeProgram(message: string) : Program {
    const messageBytes = base64js.toByteArray(message);
    let program = newProgram();

    program.descriptor.bank = messageBytes[0];
    program.descriptor.num = messageBytes[1];
    program.descriptor.name = String.fromCharCode.apply(null, messageBytes.subarray(3, 15));

    decodeKeyboard(messageBytes.subarray(15, 38), program.keyboard);

    let notes = messageBytes.subarray(messageBytes - 6);

    for (let i = 0, y = 38; i < program.drums.length; i++, y += 11) {
      decodeDrum(messageBytes.subarray(y, y + 11), program.drums[i], notes[i]);
    }

    return program;
  }
}

export default SynthOPL;