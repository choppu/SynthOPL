import { Drum, Keyboard, Operator, Program, ProgramDescriptor } from "../types/SynthTypes";
import { CH_LEFT, CH_RIGHT, CMD_CHANNEL_2_LENGTH, CMD_CHANNEL_4_LENGTH, CMD_CHANNEL_CONFIG, CMD_CONFIG_LENGTH, CMD_DRUM_NOTES, CMD_NOTES_LENGTH, CMD_OPERATORS_LENGTH, CMD_OPL_CONFIG, CMD_SAVE_LENGTH, DEEP_TREMOLO, DEEP_VIBRATO, FEEDBACK, OP_ATTACK, OP_DECAY, OP_ENV_SCALE, OP_FREQ_MULTIPLICATION, OP_KEY_SCALE, OP_OUTPUT_LEVEL, OP_RELEASE, OP_SUSTAIN, OP_SUSTAINING_VOICE, OP_TREMOLO, OP_VIBRATO, OP_WAVEFORM, SYNTH_TYPE_2OPS, SYNTH_TYPE_4OPS } from "../utils/AppConsts";

export namespace SynthOPL {
  function decodeOperator(operatorBytes: Uint8Array, operator: Operator) : void {
    operator.tremolo = ((operatorBytes[0] & OP_TREMOLO) == OP_TREMOLO);
    operator.vibrato = ((operatorBytes[0] & OP_VIBRATO) == OP_VIBRATO);
    operator.sustainingVoice = ((operatorBytes[0] & OP_SUSTAINING_VOICE) == OP_SUSTAINING_VOICE);
    operator.envelopeScale = ((operatorBytes[0] & OP_ENV_SCALE) == OP_ENV_SCALE);

    operator.frequencyMultiplication = (operatorBytes[0] & OP_FREQ_MULTIPLICATION);

    operator.keyScaleLevel = ((operatorBytes[1] & OP_KEY_SCALE) >> 6);
    operator.outputLevel = 63 - (operatorBytes[1] & OP_OUTPUT_LEVEL);

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
    keyboard.synthType = Number(keyboardBytes[2] & SYNTH_TYPE_2OPS);
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
    drum.synthType = drumBytes[0] & SYNTH_TYPE_2OPS;
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

  export function decodeProgram(messageBytes: Uint8Array) : Program {
    let program = newProgram();

    program.descriptor.bank = messageBytes[0];
    program.descriptor.num = messageBytes[1];
    program.descriptor.name = String.fromCharCode.apply(null, messageBytes.subarray(3, 15) as any);

    decodeKeyboard(messageBytes.subarray(15, 38), program.keyboard);

    let notes = messageBytes.subarray(messageBytes.length - 6);

    for (let i = 0, y = 38; i < program.drums.length; i++, y += 11) {
      decodeDrum(messageBytes.subarray(y, y + 11), program.drums[i], notes[i]);
    }

    return program;
  }

  export function encodeOperator(operator: Operator) : Uint8Array {
    let opBytes = new Uint8Array(CMD_OPERATORS_LENGTH);

    opBytes[0] = operator.frequencyMultiplication | (Number(operator.envelopeScale) << 4) | (Number(operator.sustainingVoice) << 5) | (Number(operator.vibrato) << 6) | (Number(operator.tremolo) << 7);
    opBytes[1] = 63 - operator.outputLevel | (operator.keyScaleLevel << 6);
    opBytes[2] = operator.decay | (operator.attack << 4);
    opBytes[3] = operator.release | (operator.sustain << 4);
    opBytes[4] = operator.waveForm;

    return opBytes;
  }

  export function encodeOPLConfig(keyboard: Keyboard) : Uint8Array {
    let configBytes = new Uint8Array(CMD_CONFIG_LENGTH);
    let deepTremolo = Number(keyboard.deepTremolo) << 7;
    let deepVibrato = Number(keyboard.deepVibrato) << 6;

    configBytes[0] = CMD_OPL_CONFIG;
    configBytes[1] = keyboard.enable4Operators ? 0x00 : 0x01;
    configBytes[2] = (deepTremolo | deepVibrato);

    return configBytes;
  }

  export function encodeDrumNotes(drums: Drum[]) : Uint8Array {
    let notesBytes = new Uint8Array(CMD_NOTES_LENGTH);

    notesBytes[0] = CMD_DRUM_NOTES;
    drums.map(((drum: Drum, index: number) => notesBytes[index + 1] = drum.note));

    return notesBytes;
  }

  export function encodeChannel(channel: Keyboard | Drum) : Uint8Array {
    let arrLength = (channel as Keyboard).enable4Operators ? CMD_CHANNEL_4_LENGTH : CMD_CHANNEL_2_LENGTH;
    let channelBytes = new Uint8Array(arrLength);
    let chFeedback = channel.feedback << 1;
    let chLeftRight = (Number(channel.chLeft) << 4) | (Number(channel.chLeft) << 5);
    let enable4Ops = ((channel as Keyboard).enable4Operators ? (channel as Keyboard).synthType4Ops : 0) << 7;
    let opsI = 3;
    let opCount = (channel as Keyboard).enable4Operators ? 4 : 2;

    channelBytes[0] = CMD_CHANNEL_CONFIG;
    channelBytes[1] = channel.id;
    channelBytes[2] = channel.synthType | chFeedback | chLeftRight | enable4Ops;

    channel.operators.slice(0, opCount).map((operator: Operator, index: number) =>{
      let opBytes = encodeOperator(operator);
      channelBytes.set(opBytes, opsI);
      opsI += 5;
    });

    return channelBytes;
  }

  export function encodeProgramDescriptor(descriptor: ProgramDescriptor) : Uint8Array {
    let descriptorBytes = new Uint8Array(CMD_SAVE_LENGTH);
    let nameBytes = Array.from(descriptor.name, char => char.charCodeAt(0));

    descriptorBytes[0] = descriptor.bank;
    descriptorBytes[1] = descriptor.num;
    descriptorBytes.set(nameBytes, 2);

    return descriptorBytes;
  }
}

export default SynthOPL;