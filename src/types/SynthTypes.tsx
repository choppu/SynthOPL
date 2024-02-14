export interface Operator {
  id: number;
  tremolo: boolean;
  vibrato: boolean;
  sustainingVoice: boolean;
  envelopeScale: boolean;
  attack: number;
  decay: number;
  sustain: number;
  release: number;
  waveForm: number;
  outputLevel: number;
  frequencyMultiplication: number;
  keyScaleLevel: number;
}

export interface Keyboard {
  id: number;
  deepTremolo: boolean;
  deepVibrato: boolean;
  feedback: number;
  synthType2Ops: number;
  synthType4Ops: number;
  chLeft: boolean;
  chRight: boolean;
  enable4Operators: boolean;
  operators: Operator [];
}

export interface Drum {
  id: number;
  note: number;
  chLeft: boolean;
  chRight: boolean;
  feedback: number;
  synthType: number;
  operators: Operator [];
}

export interface Program {
  descriptor: ProgramDescriptor;
  keyboard: Keyboard;
  kick: Drum;
  snare: Drum;
  tom: Drum;
  cymbal: Drum;
  hiHat: Drum;
  extra: Drum;
}

export interface ProgramDescriptor {
  name: string;
  bank: number;
  num: number;
}

export interface Synth {
  activeProgram: Program | null;
  programList: ProgramDescriptor [];
  decodeProgram: (message: string) => Program | void;
}