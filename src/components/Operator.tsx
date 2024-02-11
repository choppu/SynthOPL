import React, {FC, useEffect, useState} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

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

import { ADSRContainerHeight, defaultFontSize, defaultTextColor, mainColor, mainFont, secondaryColor, tvseContainerHeight, wFormSelectorContainerHeight } from '../utils/StyleConsts';
import { defaultSliderMinValue, defaultSliderStep, maxFreqMultiplication, maxKeyScaleLevel, maxOutputLevel } from '../utils/AppConsts';

import { onOffParam } from '../types/ComponentTypes';

type OperatorProps = {
  operatorId: number;
};

const Operator: FC<OperatorProps> = props => {
  const [attack, setAttack] = useState(0);
  const [decay, setDecay] = useState(0);
  const [sustain, setSustain] = useState(0);
  const [release, setRelease] = useState(0);
  const [waveForm, setWaveForm] = useState(0);
  const [level, setLevel] = useState(0);
  const [freqMultiplication, setFreqMultiplication] = useState(0);
  const [keyScale, setKeyScale] = useState(0);

  const onAttackUpdate = (newValue: number) => setAttack(newValue);
  const onDecaykUpdate = (newValue: number) => setDecay(newValue);
  const onSustainUpdate = (newValue: number) => setSustain(newValue);
  const onReleaseUpdate = (newValue: number) => setRelease(newValue);

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

  const onOffParams = [
    {value: false, label: "Tremolo", shortName:"-AM-"},
    {value: false, label: "Vibrato", shortName:"-VIB-"},
    {value: false, label: "Sustaining Voice", shortName:"-EG-"},
    {value: false, label: "Envelope Scale", shortName:"-KSR-"}
  ];

  const [tvseParams, setTVSEParams] = useState(onOffParams);

  const {operatorId} = props;

  const updateOnToggled = (index: number) => {
    setTVSEParams(tvseParams.map((tvseParam, i) =>  ({...tvseParam, value: (i === index) ? !tvseParam.value : tvseParam.value})));
  }

  useEffect(() => {
  }, [tvseParams])

  return (
    <View style={operatorStyle.container}>
      <View style={{height: tvseContainerHeight, flexDirection: 'row'}}>
        {tvseParams.map((tvseParam: onOffParam, i: number) => {
          return <Toggle key={i} layout={tvseParams.length} toggled={tvseParam.value} element={i} label={tvseParam.label} labelAbbr={tvseParam.shortName} onChangeFunc={updateOnToggled}></Toggle>
        })}
      </View>
      <View style={{height: ADSRContainerHeight, flexDirection: 'row'}}>
      <ADSR adsrLabel={'Attack'} adsrValue={attack} onChangeFunc={onAttackUpdate}></ADSR>
      <ADSR adsrLabel={'Decay'} adsrValue={decay} onChangeFunc={onDecaykUpdate}></ADSR>
      <ADSR adsrLabel={'Sustain'} adsrValue={sustain} onChangeFunc={onSustainUpdate}></ADSR>
      <ADSR adsrLabel={'Release'} adsrValue={release} onChangeFunc={onReleaseUpdate}></ADSR>
      </View>
      <View style={{height: wFormSelectorContainerHeight, flexDirection: 'row'}}>
      {Object.entries(waveForms).map(([key, arr]) => {
           return (
            <Selector
            key={key}
            layout={waveFormsLength}
            optKey={key}
            optValue={waveForm}
            label={arr[0] as string}
            icon={arr[1]}
            onChangeFunc={setWaveForm}>
            </Selector>
            );
       })}
      </View>
      <View>
        <HorizontalSlider label='Output Level' value={level} minValue={defaultSliderMinValue} maxValue={maxOutputLevel} step={defaultSliderStep} onChangeFunc={setLevel}></HorizontalSlider>
        <HorizontalSlider label='Frequency Multiplication' value={freqMultiplication} minValue={defaultSliderMinValue} maxValue={maxFreqMultiplication} step={defaultSliderStep} onChangeFunc={setFreqMultiplication}></HorizontalSlider>
        <HorizontalSlider label='Key Scale Level' value={keyScale} minValue={defaultSliderMinValue} maxValue={maxKeyScaleLevel} step={defaultSliderStep} onChangeFunc={setKeyScale}></HorizontalSlider>
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
    borderBottomColor: mainColor,
    borderBottomWidth: 1
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

export default Operator;