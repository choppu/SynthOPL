export interface Operator {
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
  drums: Drum [];
}

export interface ProgramDescriptor {
  name: string;
  bank: number;
  num: number;
}

export interface ProgramsListItem extends ProgramDescriptor { }

export interface OperatorPatch {
  instrumentId: number;
  operatorId: number;
  updatedValue: object;
}

export interface OptionPatch {
  instrumentId: number;
  updatedValue: object;
}

export interface DescriptorPatch extends ConfigPatch, ConfigPatch { }

export interface ConfigPatch {
  updatedValue: object;
}

export interface NotePatch extends OptionPatch, OptionPatch { }

export interface Synth {
  activeProgram: Program | null;
  programList: ProgramDescriptor [];
  decodeProgram: (message: string) => Program | void;
}