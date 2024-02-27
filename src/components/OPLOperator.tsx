import React, {FC, useEffect, useState} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import { Operator } from '../types/SynthTypes';

import SineWave from '../assets/img/wave-sine.svg';
import SineEvenWave from '../assets/img/wave-sine-even.svg';
import HalfSineWave from '../assets/img/wave-half-sine.svg';
import AbsSineWave from '../assets/img/wave-abs-sine.svg';
import PulseSineWave from '../assets/img/wave-pulse-sine.svg';
import SineAbsEvenWave from '../assets/img/wave-sine-abs-even.svg';
import SquareWave from '../assets/img/wave-square.svg';
import DerivedSquareWave from '../assets/img/wave-derived-square.svg';

import Selector from './Selector';
import Toggle from './Toggle';
import HorizontalSlider from './HorizontalSlider';
import ADSR from './ADSR';

import { ADSRContainerHeight, defaultFontSize, defaultTextColor, extra, mainColor, mainFont, secondaryColor, tvseContainerHeight, wFormSelectorContainerHeight } from '../utils/StyleConsts';
import { defaultSliderMinValue, defaultSliderStep, maxFreqMultiplication, maxKeyScaleLevel, maxOutputLevel } from '../utils/AppConsts';

type TVSE = {
  value: boolean;
  label: string;
  shortName?: string | undefined;
  updateFunc: (newVal: boolean) => void;
}

type OperatorProps = {
  operatorId: number;
  operator: Operator;
  onChangeFunc: (operatorId: number, patch: object) => void;
};

const OPLOperator: FC<OperatorProps> = props => {
  const {operatorId, operator, onChangeFunc} = props;

  const onAttackUpdate = (newValue: number) => {onChangeFunc(operatorId, {attack: newValue})};
  const onDecaykUpdate = (newValue: number) => {onChangeFunc(operatorId, {decay: newValue})};
  const onSustainUpdate = (newValue: number) => {onChangeFunc(operatorId, {sustain: newValue})};
  const onReleaseUpdate = (newValue: number) => {onChangeFunc(operatorId, {release: newValue})};

  const waveForms = {
    0: ["Sine", <SineWave width={40} height={40} />],
    1: ["Half", <HalfSineWave width={40} height={40} />],
    2: ["Absolute", <AbsSineWave width={40} height={40} />],
    3: ["Pulse", <PulseSineWave width={40} height={40} />],
    4: ["Even", <SineEvenWave width={40} height={40} />],
    5: ["Abs Even", <SineAbsEvenWave width={40} height={40} />],
    6: ["Square", <SquareWave width={40} height={40} />],
    7: ["Derived", <DerivedSquareWave width={40} height={40} />]
  }

  const waveFormsLength = Object.keys(waveForms).length;

  const tvse = [
    {value: operator.tremolo, label: "Tremolo", shortName:"-AM-", updateFunc: (newValue: boolean) => {onChangeFunc(operatorId, {tremolo: newValue})}},
    {value: operator.vibrato, label: "Vibrato", shortName:"-VIB-", updateFunc: (newValue: boolean) => {onChangeFunc(operatorId, {vibrato: newValue})}},
    {value: operator.sustainingVoice, label: "Sustaining Voice", shortName:"-EG-", updateFunc: (newValue: boolean) => {onChangeFunc(operatorId, {sustainingVoice: newValue})}},
    {value: operator.envelopeScale, label: "Envelope Scale", shortName:"-KSR-", updateFunc: (newValue: boolean) => {onChangeFunc(operatorId, {envelopeScale: newValue})}}
  ];

  const updateWaveForm = (newValue: number) => {onChangeFunc(operatorId, {waveForm: newValue})};
  const updateOutputLevel = (newValue: number) => {onChangeFunc(operatorId, {outputLevel: newValue})};
  const updateFrequencyMultiplication = (newValue: number) => {onChangeFunc(operatorId, {frequencyMultiplication: newValue})};
  const updateKeyScale = (newValue: number) => {onChangeFunc(operatorId, {keyScaleLevel: newValue})};

  return (
    <View style={operatorStyle.container}>
      <View style={operatorStyle.tvseContainer}>
        {tvse.map((param: TVSE, i: number) => {
          return <Toggle key={i} layout={tvse.length} toggled={param.value} element={i} label={param.label} labelAbbr={param.shortName} onChangeFunc={param.updateFunc}></Toggle>
        })}
      </View>
      <View style={{height: ADSRContainerHeight, flexDirection: 'row'}}>
      <ADSR adsrLabel={'Attack'} adsrValue={operator.attack} onChangeFunc={onAttackUpdate}></ADSR>
      <ADSR adsrLabel={'Decay'} adsrValue={operator.decay} onChangeFunc={onDecaykUpdate}></ADSR>
      <ADSR adsrLabel={'Sustain'} adsrValue={operator.sustain} onChangeFunc={onSustainUpdate}></ADSR>
      <ADSR adsrLabel={'Release'} adsrValue={operator.release} onChangeFunc={onReleaseUpdate}></ADSR>
      </View>
      <View style={{height: wFormSelectorContainerHeight, flexDirection: 'row'}}>
      {Object.entries(waveForms).map(([key, arr]) => {
           return (
            <Selector
            key={key}
            layout={waveFormsLength}
            optKey={key}
            optValue={operator.waveForm}
            label={arr[0] as string}
            icon={arr[1]}
            onChangeFunc={updateWaveForm}>
            </Selector>
            );
       })}
      </View>
      <View>
        <HorizontalSlider label='Output Level' value={operator.outputLevel} minValue={defaultSliderMinValue} maxValue={maxOutputLevel} step={defaultSliderStep} onChangeFunc={updateOutputLevel}></HorizontalSlider>
        <HorizontalSlider label='Frequency Multiplication' value={operator.frequencyMultiplication} minValue={defaultSliderMinValue} maxValue={maxFreqMultiplication} step={defaultSliderStep} onChangeFunc={updateFrequencyMultiplication}></HorizontalSlider>
        <HorizontalSlider label='Key Scale Level' value={operator.keyScaleLevel} minValue={defaultSliderMinValue} maxValue={maxKeyScaleLevel} step={defaultSliderStep} onChangeFunc={updateKeyScale}></HorizontalSlider>
      </View>
    </View>
  );
};

const operatorStyle = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    height: 400,
  },
  tvseContainer: {
    height: tvseContainerHeight,
    flexDirection: 'row',
    overflow: 'hidden'
  },
  checkboxContainer: {
    flexDirection: 'row',
    width: '25%',
    marginBottom: 5
  },
  waveFormContainer: {
    width: '12.5%'
  },
  checked: {
    backgroundColor: mainColor,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unchecked: {
    backgroundColor: secondaryColor,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: mainFont,
    fontSize: defaultFontSize,
    color: defaultTextColor,
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  waveLabel: {
    fontFamily: mainFont,
    fontSize: defaultFontSize,
    color: defaultTextColor,
    textTransform: 'uppercase',
    textAlign: 'center',
    paddingBottom: 5
  }
});

export default OPLOperator;