import React, {FC, useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

import ADSR from './ADSR';

import SineWave from '../assets/img/wave-sine.svg';
import SineEvenWave from '../assets/img/wave-sine-even.svg';
import HalfSineWave from '../assets/img/wave-half-sine.svg';
import AbsSineWave from '../assets/img/wave-abs-sine.svg';
import PulseSineWave from '../assets/img/wave-pulse-sine.svg';
import SineAbsEvenWave from '../assets/img/wave-sine-abs-even.svg';
import SquareWave from '../assets/img/wave-square.svg';
import DerivedSquareWave from '../assets/img/wave-derived-square.svg';
import Slider from '@react-native-community/slider';
import Selector from './Selector';
import { onOffParam } from '../types/ComponentTypes';
import Toggle from './Toggle';

const mainColor = "#04303E";
const unchekedColor = "#89a9b1";

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
    console.log('Thiis is tremolo: ' + tvseParams[0].value);
    console.log('Thiis is vib: ' + tvseParams[1].value);
    console.log('Thiis is sus: ' + tvseParams[2].value);
    console.log('Thiis is env: ' + tvseParams[3].value);
  }, [tvseParams])

  return (
    <View style={operatorStyle.container}>
      <View style={{height: 40, flexDirection: 'row'}}>
        {tvseParams.map((tvseParam: onOffParam, i: number) => {
          return <Toggle key={i} layout={tvseParams.length} toggled={tvseParam.value} element={i} label={tvseParam.label} labelAbbr={tvseParam.shortName} onChangeFunc={updateOnToggled}></Toggle>
        })}
      </View>
      <View style={{height: 190, flexDirection: 'row'}}>
      <ADSR adsrType={'Attack'} adsrValue={attack} adsrValueUpdate={onAttackUpdate}></ADSR>
      <ADSR adsrType={'Decay'} adsrValue={decay} adsrValueUpdate={onDecaykUpdate}></ADSR>
      <ADSR adsrType={'Sustain'} adsrValue={sustain} adsrValueUpdate={onSustainUpdate}></ADSR>
      <ADSR adsrType={'Release'} adsrValue={release} adsrValueUpdate={onReleaseUpdate}></ADSR>
      </View>
      <View style={{height: 60, flexDirection: 'row'}}>
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
      <View style={operatorStyle.horizontalSliderContainer}>
      <Text style={operatorStyle.horizontalSliderLabel}>Level</Text>
      <Slider
      style={operatorStyle.horizontalSlider}
      value={level}
      minimumValue={0}
      maximumValue={63}
      step={1}
      thumbTintColor={mainColor}
      onValueChange={setLevel}
      minimumTrackTintColor={mainColor}
      maximumTrackTintColor="#000000"/>
      <Text style={operatorStyle.horizontalSliderValueLabel}>{level}</Text>
      </View>
      <View style={operatorStyle.horizontalSliderContainer}>
      <Text style={operatorStyle.horizontalSliderLabel}>Frequency Multiplication</Text>
      <Slider
      style={operatorStyle.horizontalSlider}
      value={freqMultiplication}
      minimumValue={0}
      maximumValue={15}
      step={1}
      thumbTintColor={mainColor}
      onValueChange={setFreqMultiplication}
      minimumTrackTintColor={mainColor}
      maximumTrackTintColor="#000000"/>
      <Text style={operatorStyle.horizontalSliderValueLabel}>{freqMultiplication}</Text>
      </View>
      <View style={operatorStyle.horizontalSliderContainer}>
      <Text style={operatorStyle.horizontalSliderLabel}>Key Scale Level</Text>
      <Slider
      style={operatorStyle.horizontalSlider}
      value={keyScale}
      minimumValue={0}
      maximumValue={3}
      step={1}
      thumbTintColor={mainColor}
      onValueChange={setKeyScale}
      minimumTrackTintColor={mainColor}
      maximumTrackTintColor="#000000"/>
      <Text style={operatorStyle.horizontalSliderValueLabel}>{keyScale}</Text>
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
    marginBottom: 5,
    borderRightColor: 'white',
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
    backgroundColor: unchekedColor,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Inconsolata-Medium',
    fontSize: 9,
    color: 'white',
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  waveLabel: {
    fontFamily: 'Inconsolata-Medium',
    fontSize: 9,
    color: 'white',
    textTransform: 'uppercase',
    textAlign: 'center',
    paddingBottom: 5
  },
  horizontalSliderContainer: {
    flexDirection: 'row',
    height: 30,
    justifyContent: 'center',
    padding: 5,
    marginTop: 5
  },
  horizontalSlider: {
    width: '55%'
  },
  horizontalSliderLabel: {
    fontFamily: 'Inconsolata-Medium',
    fontSize: 9,
    lineHeight: 20,
    color: mainColor,
    textTransform: 'uppercase',
    width: '35%',
    textAlign: 'center'
  },
  horizontalSliderValueLabel: {
    fontFamily: 'Inconsolata-Medium',
    fontSize: 9,
    lineHeight: 20,
    color: mainColor,
    textTransform: 'uppercase',
    width: '10%',
    textAlign: 'center'
  }
});

export default Operator;