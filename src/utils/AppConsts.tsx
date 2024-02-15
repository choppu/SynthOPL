{/* UI Consts */}
export const defaultSliderMinValue = 0;
export const maxADSRSliderValue = 15;
export const defaultSliderStep = 1;
export const maxOutputLevel = 63;
export const maxFreqMultiplication = 15;
export const maxKeyScaleLevel = 3;
export const maxNoteValue = 127;

{/* BLE Consts */}
export const SYTH_OPL_UUID = '78790000-60fe-4153-9038-a770b4d65767';
export const GATT_OPL_CHR_UUID_MSG = '78790001-60fe-4153-9038-a770b4d65767';
export const GATT_OPL_CHR_UUID_LIST_PRG = '78790002-60fe-4153-9038-a770b4d65767';
export const GATT_OPL_CHR_UUID_PROGRAM = '78790003-60fe-4153-9038-a770b4d65767';

{/* Program Consts */}
export const DEEP_TREMOLO = 0x80;
export const DEEP_VIBRATO = 0x40;

{/* Keyboard Consts */}
export const SYNTH_TYPE_4OPS = 0x80;
export const SYNTH_TYPE_2OPS = 0x01;
export const CH_RIGHT = 0x20;
export const CH_LEFT = 0x10;
export const FEEDBACK = 0x07;

{/* Operator Consts */}
export const OP_TREMOLO = 0x80;
export const OP_VIBRATO = 0x40;
export const OP_SUSTAINING_VOICE = 0x20;
export const OP_ENV_SCALE = 0x10;
export const OP_FREQ_MULTIPLICATION = 0x0F;
export const OP_KEY_SCALE = 0xC0;
export const OP_OUTPUT_LEVEL = 0x3F;
export const OP_ATTACK = 0xF0;
export const OP_SUSTAIN = 0xF0;
export const OP_DECAY = 0x0F;
export const OP_RELEASE = 0x0F;
export const OP_WAVEFORM = 0x07;

export const DRUMS = {
  "Kick": 0,
  "Snare": 1,
  "Tom": 2,
  "Cymbal": 3,
  "Hi-Hat": 4,
  "Extra": 5
}

export const synthTypes = {
  0: "FM",
  1: "AM"
};

export const CMD_NOTE_ON = 0x00;
export const CMD_NOTE_OFF = 0x01;
export const CMD_OPL_CONFIG = 0x02;
export const CMD_CHANNEL_CONFIG = 0x03;
export const CMD_LOAD_PROGRAM = 0x04;
export const CMD_DRUM_NOTES = 0x05;

export const CMD_CONFIG_LENGTH = 3;
export const CMD_NOTES_LENGTH = 7;
export const CMD_CHANNEL_2_LENGTH = 13;
export const CMD_CHANNEL_4_LENGTH = 23;

export const CMD_OPERATORS_LENGTH = 5;
