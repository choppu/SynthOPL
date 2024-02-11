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
  synthType: number;
  enable4Operators: boolean;
  operator1: Operator;
  operator2: Operator;
  operator3: Operator | null;
  operator4: Operator | null;
}

export interface Drum {
  id: number;
  note: number;
  feedback: number;
  synthType: number;
  operator1: Operator;
  operator2: Operator;
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